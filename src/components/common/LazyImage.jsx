import { useState, useEffect } from 'react';

function LazyImage({ src, alt, placeholder }) {
  const [loadedSrc, setLoadedSrc] = useState(placeholder);
  
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoadedSrc(src);
    };
  }, [src]);

  return (
    <img 
      src={loadedSrc} 
      alt={alt}
      className={loadedSrc === placeholder ? 'loading' : 'loaded'}
    />
  );
}

export default LazyImage; 