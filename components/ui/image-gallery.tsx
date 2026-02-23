import { cn } from "@/lib/utils";

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1719368472026-dc26f70a9b76?q=80&h=800&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1649265825072-f7dd6942baed?q=80&h=800&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&h=800&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1729086046027-09979ade13fd?q=80&h=800&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1601568494843-772eb04aca5d?q=80&h=800&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585687501004-615dfdfde7f1?q=80&h=800&w=800&auto=format&fit=crop",
];

export interface ImageGalleryProps {
  images?: string[];
  title?: string;
  description?: string;
  className?: string;
  galleryHeight?: string;
}

export default function ImageGallery({
  images = DEFAULT_IMAGES,
  title,
  description,
  className,
  galleryHeight = "h-[400px]",
}: ImageGalleryProps) {
  return (
    <section
      className={cn(
        "w-full flex flex-col items-center justify-start py-12",
        className
      )}
    >
      {(title ?? description) && (
        <div className="max-w-3xl text-center px-4">
          {title && (
            <h2 className="text-3xl font-semibold text-foreground">{title}</h2>
          )}
          {description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      )}

      <div
        className={cn(
          "flex items-center gap-2 w-full max-w-5xl px-4 min-w-0",
          (title ?? description) && "mt-10",
          galleryHeight
        )}
      >
        {images.map((src, idx) => (
          <div
            key={`${idx}-${src}`}
            tabIndex={0}
            className="relative group grow basis-0 min-w-0 md:basis-56 rounded-lg overflow-hidden h-full transition-[flex-basis,width] duration-500 ease-in-out hover:w-full md:hover:basis-full focus-within:basis-[36%] md:focus-within:basis-full focus:outline-none"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-full w-full object-cover object-center"
              src={src}
              alt=""
            />
          </div>
        ))}
      </div>
    </section>
  );
}
