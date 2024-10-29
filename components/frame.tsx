'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DiagonalCornerImageProps {
  width?: number;
  height?: number;
  images: { src: string; alt: string }[];
  title?: string;
  titleColor?: string;
}

export default function DiagonalCornerImage({
  images,
  title,
  titleColor = 'white',
}: DiagonalCornerImageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  if (isExpanded) {
    return (
      // Dim background
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'auto',
        }}
        onClick={() => setIsExpanded(false)}
      >
        <div
          style={{
            position: 'relative',
            maxWidth: '90%',
            maxHeight: '90%',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setIsExpanded(false)}
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              cursor: 'pointer',
            }}
          >
            &times;
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                aria-label="Previous image"
                style={{
                  position: 'absolute',
                  left: '-50px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  border: 'none',
                  color: 'white',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  padding: '10px',
                }}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                aria-label="Next image"
                style={{
                  position: 'absolute',
                  right: '-50px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  border: 'none',
                  color: 'white',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  padding: '10px',
                }}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
              style={{
                width: '80vw',
                height: '80vh',
                objectFit: 'contain',
              }}
            />
            <div className='flex justify-center bg-red-500'>
              <div
                style={{
                  marginTop: '10px',
                  color: 'white',
                  textAlign: 'center',
                  width: "60vw",
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  margin: 'auto',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                }}
              >
                {images[currentImageIndex].alt}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-[90vw] md:w-[40vw]"
      style={{
        height: `50vh`,
        position: 'relative',
        overflow: 'hidden',
        margin: '1vw',
      }}
    >
      <div
        onClick={() => setIsExpanded(true)}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        <img
          src={images[currentImageIndex].src}
          alt={images[currentImageIndex].alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {title && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '80%',
              padding: '10px',
              marginLeft: '10%',
              marginRight: '10%',
              textAlign: 'center',
              color: titleColor,
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: '#00000080',
              zIndex: 10,
            }}
          >
            {title}
          </div>
        )}
      </div>
      {/* Description text */}
      <div
        style={{
          marginTop: '10px',
          color: 'black',
          textAlign: 'center',
          width: '60vw',
        }}
      >
        {images[currentImageIndex].alt}
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
}
