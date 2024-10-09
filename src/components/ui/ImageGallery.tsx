import { useState, useEffect } from 'react';
import Lightbox from '@icetee/react-image-lightbox';
import '@icetee/react-image-lightbox/style.css'; // 这个文件需要单独引入

const ImageGallery = ({ images }: { images: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    // 当 images 变化时，重置 photoIndex 和 isOpen 状态
    setPhotoIndex(0);
    setIsOpen(false);
  }, [images]);

  const galleryStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
  };

  const thumbnailStyle: React.CSSProperties = {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    margin: '5px',
    cursor: 'pointer',
  };

  return (
    <div>
      <div style={galleryStyle}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Gallery Image ${index + 1}`}
            onClick={() => {
              setPhotoIndex(index);
              setIsOpen(true);
            }}
            style={thumbnailStyle}
          />
        ))}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
};

export default ImageGallery;
