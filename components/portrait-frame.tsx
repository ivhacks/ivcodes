import Image from 'next/image'

interface PortraitFrameProps {
  image: string;
  alt: string;
}

export default function PortraitFrame({ 
  image, 
  alt, 
}: PortraitFrameProps) {

  return (
      <div 
        className="relative overflow-hidden portrait-bg w-[60vw] md:w-[20vw]"
      >
        <Image
            src={image}
            alt={alt}
            width={1634}
            height={1634}
            className="object-cover"
          />
      </div>
  )
}