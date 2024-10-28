'use client';

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface DiagonalCornerImageProps {
  width?: number
  height?: number
  images: { src: string; alt: string }[]
  title?: string
  titleColor?: string
}

export default function DiagonalCornerImage({ 
  width = 300, 
  height = 200, 
  images,
  title,
  titleColor = 'white'
}: DiagonalCornerImageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const cutSize = 70 // Size of the diagonal cut

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative',
        overflow: 'hidden',
        margin: '1vw'
      }}
    >
      <svg
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <mask id="cornerMask">
            <rect width={width} height={height} fill="white" />
            <polygon points={`0,0 ${cutSize},0 0,${cutSize}`} fill="black" />
            <polygon 
              points={`${width},${height} ${width-cutSize},${height} ${width},${height-cutSize}`} 
              fill="black" 
            />
          </mask>
        </defs>
        <rect
          width={width}
          height={height}
          fill="white"
          mask="url(#cornerMask)"
        />
      </svg>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          maskImage: 'url(#cornerMask)',
          WebkitMaskImage: 'url(#cornerMask)',
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
      </div>
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
            fontSize: '2rem',
            fontWeight: 'bold',
            zIndex: 10,
          }}
        >
          {title}
        </div>
      )}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            aria-label="Next image"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  )
}