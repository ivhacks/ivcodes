import Frame from '@/components/frame'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-bold text-center mb-8">In progress... :^)</h1>
      <div className="flex">
        <Frame 
          width={800} 
          height={700} 
          imageSrc="/images/bwsi.jpg" 
          alt="classroom" 
          title="MIT BWSI Embedded Security & Hardware Hacking" 
          titleColor="white" 
        />
      </div>
    </div>
  )
}