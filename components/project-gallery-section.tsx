'use client';

import { useRouter } from 'next/navigation';
import { Folder, ExternalLink } from 'lucide-react';
import { RadialScrollGallery } from '@/components/ui/portfolio-and-image-gallery';
import { Project } from '@/lib/projects';

interface ProjectGallerySectionProps {
  projects: Project[];
}

export default function ProjectGallerySection({ projects }: ProjectGallerySectionProps) {
  const router = useRouter();

  return (
    <section className="relative z-10">
      <div className="text-center space-y-2 mb-2">
        {/* <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
          Side Projects
        </p>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Projects
        </h2> */}
        <p className="text-muted-foreground text-sm max-w-[340px] mx-auto">
        Browse the projects below.
        </p>
      </div>

      <RadialScrollGallery
        className="min-h-[600px]!"
        baseRadius={230}
        mobileRadius={150}
        scrollDuration={1800}
        visiblePercentage={42}
        onItemSelect={(index) => {
          const project = projects[index];
          if (project) {
            router.push(`/projects/${project.slug}`);
          }
        }}
      >
        {(hoveredIndex) =>
          projects.map((project, index) => {
            const isActive = hoveredIndex === index;
            return (
              <div
                key={project.slug}
                className={`
                  w-[150px] h-[210px] sm:w-[180px] sm:h-[250px]
                  rounded-xl border p-4 flex flex-col justify-between items-start
                  transition-all duration-500 shadow-sm
                  ${isActive
                    ? 'bg-primary border-primary text-primary-foreground shadow-xl'
                    : 'bg-card border-border text-card-foreground opacity-70'
                  }
                `}
              >
                <div className="w-full flex justify-between items-start">
                  <Folder className={`w-5 h-5 ${isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'}`} />
                  <span className={`font-mono text-xs ${isActive ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                    {project.year}
                  </span>
                </div>

                <div className="w-full">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className={`text-[9px] px-1.5 py-0.5 rounded-md border ${
                          isActive
                            ? 'border-primary-foreground/20 text-primary-foreground/70'
                            : 'border-border text-muted-foreground'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-sm font-bold mb-0.5 leading-tight line-clamp-2">{project.title}</h3>
                  <p className={`text-[10px] leading-snug line-clamp-2 ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    {project.description}
                  </p>
                  {isActive && (
                    <ExternalLink className="w-3 h-3 text-primary-foreground/60 mt-1.5" />
                  )}
                </div>
              </div>
            );
          })
        }
      </RadialScrollGallery>
    </section>
  );
}
