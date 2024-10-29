import Frame from '@/components/frame'
import PortraitFrame from '@/components/portrait-frame'

export default function Home() {
  const bwsi_images = [
    { src: "images/bwsi/bwsi.jpg", alt: "1" },
    { src: "images/bwsi/2.jpg", alt: "2" },
    { src: "images/bwsi/3.jpg", alt: "3" }
  ]

  const ectf_images = [
    { src: "images/ectf/1.jpg", alt: "1" },
    { src: "images/ectf/awards.jpg", alt: "2" },
  ]

  const mqp_images = [
    { src: "images/mqp/walls.jpg", alt: "1" }
  ]
  return (
    <>
      <div className="intro-section flex items-center">
        <div className="p-20">
          <p className="intro">Hi! I'm</p>
          <h1 className="leading-none">Iv Robinson.</h1>
          <p className="intro">Iv rhymes with "give."</p>
        </div>
        <div className="flex justify-end">
          <PortraitFrame image='/images/iv.png' alt='picture of me' size={400} />
        </div>

      </div>
      <div className="flex justify-center">
        <Frame
          width={800}
          height={700}
          images={bwsi_images}
          title="MIT BWSI Embedded Security & Hardware Hacking"
          titleColor="white"
        />
        <Frame
          width={800}
          height={700}
          images={ectf_images}
          title="MITRE Embedded CTF"
          titleColor="white"
        />
      </div>
      <div className="flex justify-center">
        <Frame
          width={800}
          height={700}
          images={ectf_images}
          title="Cyber Security Club"
          titleColor="white"
        />
        <Frame
          width={800}
          height={700}
          images={mqp_images}
          title="Major Qualifying Project (undergrad capstone)"
          titleColor="white"
        />
      </div>
    </>
  )
}