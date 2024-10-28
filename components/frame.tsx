import React from 'react'

interface DiagonalCornerImageProps {
  width?: number
  height?: number
  imageSrc: string
  alt: string
  title?: string
  titleColor?: string
}

export default function DiagonalCornerImage({ 
  width = 300, 
  height = 200, 
  imageSrc, 
  alt,
  title,
  titleColor = 'white'
}: DiagonalCornerImageProps) {
  const cutSize = 70 // Size of the diagonal cut

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative',
        overflow: 'hidden',
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
          src={imageSrc}
          alt={alt}
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
    </div>
  )
}