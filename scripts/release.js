#!/usr/bin/env node

const { execSync } = require('child_process');

const DEFAULT_AUTHOR_NAME = 'Kim Seyeon';
const DEFAULT_AUTHOR_EMAIL = '141703065+sennydayk@users.noreply.github.com';

function run(command, options = {}) {
  return execSync(command, {
    cwd: process.cwd(),
    encoding: 'utf8',
    stdio: options.stdio || 'pipe',
    env: {
      ...process.env,
      ...options.env,
    },
  });
}

function printStep(message) {
  console.log(`\n▶ ${message}`);
}

function getChangedFiles() {
  const output = run('git status --porcelain -z');
  return output
    .split('\0')
    .filter(Boolean)
    .map((entry) => entry.slice(3));
}

function ensureNoProtectedFiles(files) {
  const blockedPatterns = [/^\.env/, /credentials\.json$/i, /secret/i];
  const blockedFiles = files.filter((file) =>
    blockedPatterns.some((pattern) => pattern.test(file))
  );

  if (blockedFiles.length > 0) {
    throw new Error(`민감한 파일은 자동 커밋할 수 없습니다: ${blockedFiles.join(', ')}`);
  }
}

function inferPrefixFromHistory() {
  const history = run('git log -10 --pretty=%s')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const prefixes = history
    .map((line) => line.match(/^(\S+)/)?.[1])
    .filter(Boolean);

  if (prefixes.length === 0) {
    return '🔧';
  }

  const counts = prefixes.reduce((acc, prefix) => {
    acc[prefix] = (acc[prefix] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function inferScope(files) {
  const joined = files.join(' ');

  if (/release|\.sisyphus|sisyphus-commands/.test(joined)) return '릴리즈 명령어';
  if (/notion|blog|revalidate/i.test(joined)) return '노션 블로그';
  if (/components\//.test(joined) && /app\//.test(joined)) return '메인 UI';
  if (/components\//.test(joined)) return '컴포넌트';
  if (/app\/api\//.test(joined)) return 'API';
  if (/app\//.test(joined)) return '페이지';
  if (/lib\//.test(joined)) return '코어 로직';

  const topLevels = [...new Set(files.map((file) => file.split('/')[0]).filter(Boolean))];
  if (topLevels.length === 1) {
    return `${topLevels[0]} 설정`;
  }

  return '프로젝트';
}

function inferAction(files) {
  const diff = run('git diff --stat');
  const joined = `${files.join(' ')} ${diff}`.toLowerCase();

  if (/release|command-runner|sisyphus/.test(joined)) return '추가';
  if (/fix|bug|error|cache|revalidate|thumbnail|notion/.test(joined)) return '개선';
  if (/api|route|endpoint/.test(joined)) return '추가';
  if (/readme|docs|guide|md/.test(joined)) return '정리';
  return '업데이트';
}

function buildCommitMessage(files, args = {}) {
  if (args.message) {
    return {
      subject: args.message,
      body: args.body || '',
    };
  }

  const prefix = inferPrefixFromHistory();
  const scope = inferScope(files);
  const action = inferAction(files);
  const subject = `${prefix} ${scope} ${action}`;
  const body = [
    `${scope} 관련 변경사항을 main 배포 흐름에 맞게 정리합니다.`,
    `빌드 검증 후 원격 main 브랜치에 반영할 수 있도록 자동화 흐름을 따릅니다.`,
  ].join(' ');

  return { subject, body };
}

function createCommit(subject, body, authorName, authorEmail, dryRun) {
  const env = {
    GIT_AUTHOR_NAME: authorName,
    GIT_AUTHOR_EMAIL: authorEmail,
    GIT_COMMITTER_NAME: authorName,
    GIT_COMMITTER_EMAIL: authorEmail,
  };

  if (dryRun) {
    console.log(`🧾 Commit subject: ${subject}`);
    if (body) {
      console.log(`🧾 Commit body: ${body}`);
    }
    return;
  }

  const escapedSubject = subject.replace(/"/g, '\\"');
  let command = `git commit -m "${escapedSubject}"`;

  if (body) {
    const escapedBody = body.replace(/"/g, '\\"');
    command += ` -m "${escapedBody}"`;
  }

  run(command, { stdio: 'inherit', env });
}

async function release(args = {}) {
  try {
    const branch = run('git branch --show-current').trim();
    const dryRun = Boolean(args.dry_run || args['dry-run']);
    const authorName = args.author_name || process.env.GIT_AUTHOR_NAME_OVERRIDE || DEFAULT_AUTHOR_NAME;
    const authorEmail = args.author_email || process.env.GIT_AUTHOR_EMAIL_OVERRIDE || DEFAULT_AUTHOR_EMAIL;

    if (branch !== 'main') {
      throw new Error(`release는 main 브랜치에서만 실행할 수 있습니다. 현재 브랜치: ${branch}`);
    }

    printStep('변경사항 확인');
    const files = getChangedFiles();

    if (files.length === 0) {
      throw new Error('커밋할 변경사항이 없습니다.');
    }

    ensureNoProtectedFiles(files);
    console.log(files.map((file) => `- ${file}`).join('\n'));

    printStep('최근 커밋 스타일 확인');
    console.log(run('git log -5 --oneline'));

    printStep('빌드 검증');
    if (dryRun) {
      console.log('🧪 dry_run=true 이므로 build 실행은 건너뜁니다.');
    } else {
      run('npm run build', { stdio: 'inherit' });
    }

    printStep('변경사항 스테이징');
    if (dryRun) {
      console.log('📦 dry_run=true 이므로 git add -A 를 실행하지 않습니다.');
    } else {
      run('git add -A', { stdio: 'inherit' });
    }

    printStep('커밋 메시지 생성');
    const { subject, body } = buildCommitMessage(files, args);
    console.log(`subject: ${subject}`);
    if (body) {
      console.log(`body: ${body}`);
    }

    printStep('author 설정 및 커밋');
    createCommit(subject, body, authorName, authorEmail, dryRun);

    printStep('main 푸시');
    if (dryRun) {
      console.log('🚀 dry_run=true 이므로 push를 실행하지 않습니다.');
    } else {
      run('git push origin main', { stdio: 'inherit' });
    }

    console.log('\n✅ release 명령이 완료되었습니다.');
  } catch (error) {
    console.error(`\n❌ release 실패: ${error.message}`);
    process.exit(1);
  }
}

module.exports = release;
