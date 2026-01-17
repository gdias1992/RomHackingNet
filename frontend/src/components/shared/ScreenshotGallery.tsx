import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { cn } from "@/utils/cn";
import { ImageOff } from "lucide-react";

interface Screenshot {
  src: string;
  alt?: string;
  caption?: string;
}

interface ScreenshotGalleryProps {
  screenshots: Screenshot[];
  className?: string;
}

/**
 * Resilient image loader with lightbox zoom functionality.
 */
export function ScreenshotGallery({
  screenshots,
  className,
}: ScreenshotGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);
  const [failedImages, setFailedImages] = React.useState<Set<number>>(
    new Set()
  );

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set([...prev, index]));
  };

  const handleImageClick = (index: number) => {
    if (!failedImages.has(index)) {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
  };

  const validSlides = screenshots
    .map((s, i) => ({ ...s, originalIndex: i }))
    .filter((_, i) => !failedImages.has(i))
    .map((s) => ({ src: s.src, alt: s.alt }));

  if (screenshots.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">No screenshots available</p>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2",
          className
        )}
      >
        {screenshots.map((screenshot, index) => (
          <div
            key={index}
            className={cn(
              "relative aspect-video rounded-lg overflow-hidden bg-muted",
              !failedImages.has(index) &&
                "cursor-pointer hover:ring-2 hover:ring-primary transition-all"
            )}
            onClick={() => handleImageClick(index)}
          >
            {failedImages.has(index) ? (
              <div className="flex items-center justify-center h-full">
                <ImageOff className="h-6 w-6 text-muted-foreground" />
              </div>
            ) : (
              <img
                src={screenshot.src}
                alt={screenshot.alt || `Screenshot ${index + 1}`}
                className="w-full h-full object-cover"
                onError={() => handleImageError(index)}
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={validSlides}
      />
    </>
  );
}
