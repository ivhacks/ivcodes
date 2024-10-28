import Frame from '@/components/frame'

export default function Home() {
  const bwsi_images = [
    { src: "images/bwsi/bwsi.jpg", alt: "1" },
    { src: "images/bwsi/2.jpg", alt: "2" },
    { src: "images/bwsi/3.jpg", alt: "3" }
  ]

  const ectf_images = [
    { src: "images/ectf/awards.jpg", alt: "1" },
  ]

  return (
    <div className="container mx-1 px-1 py-8">
      <h1 className="font-bold text-center mb-8">In progress... :^)</h1>
      <div className="flex">
        <Frame 
          width={800} 
          height={700} 
          images={bwsi_images}
          title="MIT BWSI Embedded Security & Hardware Hacking" 
          titleColor="white" 
        />
        <Frame 
          width={800} 
          height={400} 
          images={ectf_images}
          title="MITRE Embedded CTF" 
          titleColor="white" 
        />
      </div>
    </div>
  )
}