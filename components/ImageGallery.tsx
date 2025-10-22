import React from 'react';

interface ImageGalleryProps {
  images: { src: string; caption: string }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="my-6 grid grid-cols-2 gap-4">
      {images.map((image, index) => (
        <figure key={index} className="space-y-2">
          <img src={image.src} alt={image.caption} className="rounded-lg shadow-md" />
          <figcaption className="text-sm text-center text-slate-500">{image.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
};

export default ImageGallery;