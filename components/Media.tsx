'use client';

import Image from 'next/image';
import { useState } from 'react';

type FillImageProps = {
  src: string;
  /** Swapped in if `src` fails to load (used for the bundled /media files). */
  fallback?: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  /** CSS object-position, e.g. "68% 58%". */
  position?: string;
  className?: string;
};

/**
 * Replacement for the design-time `<image-slot>` custom element: an image that
 * fills its positioned parent and crops to cover. Keeps a remote fallback so a
 * missing local asset degrades to the published photograph instead of a gap.
 */
export function FillImage({
  src,
  fallback,
  alt = '',
  sizes = '100vw',
  priority = false,
  position,
  className,
}: FillImageProps) {
  const [current, setCurrent] = useState(src);

  return (
    <Image
      key={current}
      src={current}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      style={{ objectFit: 'cover', objectPosition: position }}
      onError={() => {
        if (fallback && current !== fallback) setCurrent(fallback);
      }}
    />
  );
}

/**
 * The club crest, with the "BP" monogram showing through if the remote image
 * is unavailable.
 */
export function Crest({ size, fontSize = 12 }: { size: number | string; fontSize?: number }) {
  const [failed, setFailed] = useState(false);
  const dim = typeof size === 'number' ? `${size}px` : size;

  return (
    <span
      style={{
        position: 'relative',
        width: dim,
        height: dim,
        display: 'block',
        flexShrink: 0,
        transition: 'width .4s ease, height .4s ease',
      }}
    >
      <span
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'var(--navy-panel)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          fontSize,
          letterSpacing: '-.02em',
          color: '#fff',
        }}
      >
        BP
      </span>
      {!failed && (
        <Image
          src="https://bluephoenixfc.com/wp-content/uploads/2026/09/BluePhoenixFCLogo.png"
          alt=""
          fill
          sizes="80px"
          style={{ objectFit: 'contain' }}
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
