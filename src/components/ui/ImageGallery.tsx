import { useState, useEffect } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';

const ImageGallery = ({ mainImage, moreImages, width, height }: { mainImage: string, moreImages: string[], width: number, height: number }) => {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    setGalleryImages(moreImages);
  }, [moreImages]);

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
    transition: 'transform 0.2s', // Add transition for smooth zoom effect
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.style.transform = 'scale(1.1)'; // Zoom in on hover
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.style.transform = 'scale(1)'; // Zoom out on mouse out
  };

  return (
    <div>

      <Gallery>
        <div className="main-image" style={{ textAlign: 'center', marginBottom: '20px' }}>

          <Item key={0}
            original={mainImage}
            thumbnail={mainImage}
            width={width}
            height={height}>

            {({ ref, open }) => (
              <img
                src={mainImage}
                alt="Main"
                style={{ width: '320px', height: '320px', cursor: 'pointer' }}
                ref={ref}
                onClick={open}
              />

            )}

          </Item>
        </div>

        <div style={galleryStyle}>
          {galleryImages.map((image, index) => (
            <Item
              key={index}
              original={image}
              thumbnail={image}
              width={width}
              height={height}
            // title={`Gallery Image ${index + 1}`} // Add title for better description
            >
              {({ ref, open }) => (
                <img
                  ref={ref}
                  onClick={open}
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  style={thumbnailStyle}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                />
              )}
            </Item>
          ))}
        </div>
      </Gallery>
    </div>
  );
};

export default ImageGallery;

