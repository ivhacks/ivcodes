import Frame from '@/components/frame'
import PortraitFrame from '@/components/portrait-frame'

export default function Home() {
  const bwsi_images = [
    { src: "images/bwsi/bwsi.jpg", alt: "For the last two years, I have been the lead instructor of MIT's BWSI Embedded Security and Hardware Hacking course. This is a month-long summer program for high schoolers that covers C and Python programming, cryptography, and software and hardware exploitation basics. The main focus is the design challenge, where teams of four build secure firmware update systems. Teams who finish enter the attack phase, where they try to hack other teams' designs. The course is very intense, for the students, instructors, and TAs. I hope silly details like running 110 feet of LED gamer lightstrips around the classroom made it even more fun and memorable. " },
    { src: "images/bwsi/staff.png", alt: "BWSI encourages hiring former students as TAs. All but one of the teaching staff pictured here were my students in 2023 or 2022 (when I was an intern working on the course). Most of them flew in and lived in Airbnbs during July. It was inspiring and humbling to see how passionate they were about the course. Some of them consistently hit their 50-hour per week allowance making new teaching materials and interactive coding labs." },
    { src: "images/bwsi/3.jpg", alt: "This is a system one of the students designed to attack a rival team's design. They're exploiting a buffer overread vulnerability that can be strategically called thousands of times to dump the entire firmware." }
  ]

  const ectf_images = [
    { src: "images/ectf/1.jpg", alt: "MITRE's Embedded Capture the Flag (eCTF) is an attack/defense style competition spanning about 3 months. Teams of college students attempt to design a secure embedded system, then they try to exploit vulnerabilities in other school's designs. eCTF is the basis for the BWSI Embedded Security design challenge. Pictured: an automation harness I and a teammate created for our 2023 eCTF design: a secure car/key fob pairing system." },
    { src: "images/ectf/awards.jpg", alt: "On behalf of the WPI team, I presented our design and attack strategies at the 2023 eCTF awards ceremony." },
  ]

  const mqp_images = [
    { src: "images/mqp/walls.jpg", alt: "1" }
  ]
  return (
    <>
      <div className='intro-section '>
        <div className="sub-intro-section flex flex-wrap items-center">
          <div className="pl-20 pt-40 md:pt-0">
            <p className="intro">Hi! I'm</p>
            <h1 className="leading-none">Iv Robinson.</h1>
            <p className="intro">Iv rhymes with "give."</p>
          </div>
          <div className="flex-1 h-3/6 flex items-center">
            <div className="flex-1 pb-40 md:pb-0">
              <div className="flex justify-center">
                <PortraitFrame image='/images/iv.png' alt='picture of me' />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex justify-center p-0 m-0 h-min'>
          <p className="intro">Scroll to check out some of my projects!</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        <Frame
          images={bwsi_images}
          title="MIT BWSI Embedded Security & Hardware Hacking"
          titleColor="white"
        />
        <Frame
          images={ectf_images}
          title="MITRE Embedded CTF"
          titleColor="white"
        />
        <Frame
          images={mqp_images}
          title="Major Qualifying Project (undergrad capstone)"
          titleColor="white"
        />
      </div>
    </>
  )
}