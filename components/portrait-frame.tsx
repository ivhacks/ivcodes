import Image from 'next/image'

interface PortraitFrameProps {
  image: string;
  alt: string;
  size: number;
}

export default function PortraitFrame({ 
  image, 
  alt, 
  size
}: PortraitFrameProps) {

  return (
      <div 
        className="relative overflow-hidden portrait-bg"
        style={{ width: size, height: size }}
      >
        <Image
            src={image}
            alt={alt}
            width={size}
            height={size}
            className="object-cover"
          />
      </div>
  )
}