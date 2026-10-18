import { imageSrc, imageSrcSet, type SiteImage } from '@/lib/images';
import { ImageWithFallback } from '@/components/image-with-fallback';

interface ResponsiveImageProps {
  image: SiteImage;
  className?: string;
  /** `sizes` attribute; defaults to full viewport width. */
  sizes?: string;
  /** Load eagerly with high fetch priority (above-the-fold hero images only). */
  priority?: boolean;
  /** Override the registry alt text, e.g. "" for purely decorative use. */
  alt?: string;
}

export function ResponsiveImage({ image, className, sizes = '100vw', priority, alt }: ResponsiveImageProps) {
  const largest = image.widths[image.widths.length - 1];
  return (
    <ImageWithFallback
      src={imageSrc(image)}
      srcSet={imageSrcSet(image)}
      sizes={sizes}
      alt={alt ?? image.alt}
      width={largest}
      height={Math.round((largest * 2) / 3)}
      decoding="async"
      priority={priority}
      fetchPriority={priority ? 'high' : undefined}
      className={className}
    />
  );
}
