import React, { useState, useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useLocation } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

const LINKS = {
  github: "https://github.com/nilesh-mukherji",
  linkedin: "https://www.linkedin.com/in/nilesh-mukherji/",
  email: "mailto:nm3335+portfoliosite@nyu.edu",
};

// Define contact data
const CONTACT_DATA = [
  {
    title: 'GitHub',
    link: LINKS.github,
    icon: <FaGithub className="text-green-400 text-2xl" />,
  },
  {
    title: 'LinkedIn',
    link: LINKS.linkedin,
    icon: <FaLinkedin className="text-green-400 text-2xl" />,
  },
  {
    title: 'Email',
    link: LINKS.email,
    icon: <FaEnvelope className="text-green-400 text-2xl" />,
  },
];

// New ContactSection component with a grid layout
const ContactSection = () => (
  <div className="grid md:grid-cols-3 gap-6 w-full">
    {CONTACT_DATA.map((item) => (
      <a
        key={item.title}
        href={item.link}
        target={item.title !== 'Email' ? "_blank" : undefined}
        rel={item.title !== 'Email' ? "noopener noreferrer" : undefined}
        className="border border-green-400 p-4 rounded-lg bg-black flex flex-col items-center hover:underline"
      >
        {item.icon}
        <div className="mt-2 text-green-400 text-sm">{item.title}</div>
      </a>
    ))}
  </div>
);

const OUTPUT_LINES = [
    'My professional journey began in high school with a deep interest in biotech and healthcare technology. I worked as a technical intern at the Northwestern Cancer Rehabilitation Studies Lab and explored 3D scanning and image analysis through a startup concept called 3dema.',
    '',
    'I earned my undergraduate degree in Computer Science from NYU, complemented by minors in Cybersecurity, Financial Engineering, and Management. In college, I transitioned into software consulting, where I delivered data tools and led engineering initiatives across industry-facing projects. This was also when I began exploring markets more seriously — launching a research-focused asset management initiative rooted in volatility and quantitative modeling.',
    '',
    'I’ve since continued to build on that foundation through an M.S in Finance and M.S. in Data Science with a specialization in Advanced AI at IE University (known as the Stanford of Spain) and my current role as an AI Engineering Intern, where I’m developing intelligent systems to support utilities and financial services clients.',
    '',
    'I’m deeply interested in building intelligent systems at the intersection of data, economics, and engineering—and thrive in environments where rigorous logic meets practical application.'
  ];

const EDUCATION_DATA = [
  {
    title: 'New York University',
    detail: 'B.S. Computer Science',
    minor: 'Minors: Cybersecurity, Financial Engineering, Management',
    link: 'https://www.linkedin.com/in/nilesh-mukherji/details/certifications/1747273019497/single-media-viewer?type=DOCUMENT&profileId=ACoAACHYnYUBIQqKMywuB6mXW7GcTMFtcqe7hzg&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3Br3aV%2BQxXRI2OhDYpB0Txlg%3D%3D'
  },
  {
    title: 'IE Business School',
    detail: 'M.S. in Finance',
    link: 'https://www.SmartCertificate.com/SmartCertificate/?1%7c7d6ec38c-e31e-4a5e-97dc-ad4374908554%7c2709d05b-38c2-4b9c-b454-8ec9959e8666'
  },
  {
    title: 'IE School of Science & Technology',
    detail: 'M.S. in Data Science',
    minor: 'Specialization: Advanced AI',
    link: 'https://www.SmartCertificate.com/SmartCertificate/?1%7c089e7abe-6533-4430-bf70-115e3683b532%7c11fcb733-c860-4c51-a619-4940faa57cc0'
  },
];

const TerminalHome = () => {
  const location = useLocation();

  const [phase, setPhase] = useState(0);
  const [skipIntro, setSkipIntro] = useState(false);
  const [resuming, setResuming] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const typingAudio = useRef<HTMLAudioElement | null>(null);
  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle URL parameter for skipping intro
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('skipIntro') === 'true') {
      setSkipIntro(true);
      setResuming(true);
      setTimeout(() => {
        setResuming(false);
        setPhase(6); // directly jump to projects
        setLines(OUTPUT_LINES);
      }, 600);
    } else {
      setPhase(0);
    }
  }, [location.search]);

  // Enable audio on user interaction
  useEffect(() => {
    const enableAudio = () => {
      setSoundEnabled(true);
      window.removeEventListener('pointerdown', enableAudio);
    };
    window.addEventListener('pointerdown', enableAudio);
    return () => window.removeEventListener('pointerdown', enableAudio);
  }, []);

  // Typing animation for the about text when phase is 4
  useEffect(() => {
    if (skipIntro || phase !== 4 || lineIndex >= OUTPUT_LINES.length) return;

    const lineToType = OUTPUT_LINES[lineIndex];
    let charIndex = 0;

    const interval = setInterval(() => {
      charIndex++;
      if (charIndex > lineToType.length) {
        clearInterval(interval);
        setLines((prev) => [...prev, lineToType]);
        setCurrentLine('');
        // When the last line is done, move to the next phase
        if (lineIndex === OUTPUT_LINES.length - 1) {
          setTimeout(() => setPhase(5), 500);
        } else {
          setLineIndex((prev) => prev + 1);
        }
      } else {
        setCurrentLine(lineToType.slice(0, charIndex));
        if (soundEnabled && typingAudio.current) {
          typingAudio.current.currentTime = 0;
          typingAudio.current.play().catch(() => {});
        }
      }
    }, 10);

    return () => clearInterval(interval);
  }, [phase, lineIndex, skipIntro, soundEnabled]);

  // Automatically increment phase for parts other than phase 0 and 4
  useEffect(() => {
    // Only set timer if conditions are met and no timer is already running
    if (!skipIntro && phase !== 0 && phase !== 4 && phase < 10 && !phaseTimerRef.current) {
      phaseTimerRef.current = setTimeout(() => {
        setPhase((prev) => prev + 1);
        phaseTimerRef.current = null;
      }, 1000);
    }
    // Cleanup the timer on unmount or if effect runs again and timer exists
    return () => {
      if (phaseTimerRef.current) {
        clearTimeout(phaseTimerRef.current);
        phaseTimerRef.current = null;
      }
    };
  }, [phase, skipIntro]);

  // Component Helpers
  const BlinkingCursor = () => <span className="animate-pulse ml-1">|</span>;

  const EducationSection = () => (
    <div className="grid md:grid-cols-3 gap-6 w-full">
      {EDUCATION_DATA.map((edu) => (
        <a key={edu.title} className="border border-green-400 p-4 rounded-lg bg-black text-left" href={edu.link} target="_blank" rel="noopener noreferrer">
          <div className="text-lg font-semibold text-green-400">{edu.title}</div>
          <div className="text-green-300">{edu.detail}</div>
          {edu.minor && <div className="text-sm text-green-400 mt-1">{edu.minor}</div>}
        </a>
      ))}
    </div>
  );

  return (
    <div className="bg-black text-green-400 font-mono min-h-screen flex flex-col items-center justify-center p-8">
      {skipIntro ? (
        resuming ? (
          <div className="text-green-400 text-2xl font-mono">
            &gt; resuming session... <BlinkingCursor />
          </div>
        ) : (
          <div className="w-full max-w-6xl flex flex-col items-center">
            <p className="text-white text-3xl text-center mb-2">Nilesh Mukherji Portfolio</p>
            <p className="text-green-400 text-2xl text-center">&gt; Quant | AI | Markets</p>
            <p className="text-white text-2xl text-left w-full mt-10 mb-2">&gt; cat about.md</p>
            <div className="whitespace-pre-line text-green-400 flex flex-col md:flex-row gap-6 w-full">
              <img src="/ascii-portrait.png" alt="ASCII Portrait" className="max-w-xs h-auto object-contain" />
              <div className="space-y-4">{OUTPUT_LINES.map((line, idx) => <div key={idx}>{line}</div>)}</div>
            </div>
            <p className="text-white text-2xl text-left w-full mt-10 mb-2">&gt; ls projects</p>
            <div className="grid md:grid-cols-3 gap-6 w-full">
              {projects.slice(0, 3).map((proj) => <ProjectCard key={proj.slug} project={proj} />)}
            </div>
            <div className="mt-2 flex justify-center">
              <a
                href="/#/projects"
                className="px-6 py-3 border border-green-400 text-green-400 rounded hover:bg-green-400 hover:text-black transition-colors duration-300"
              >
                &gt; View All Projects
              </a>
            </div>
            <p className="text-white text-2xl text-left w-full mt-10 mb-2">&gt; ls education</p>
            <EducationSection />
            <p className="text-white text-2xl text-left w-full mt-10 mb-2">&gt; echo $contact</p>
            <ContactSection />
          </div>
        )
      ) : (
        <>
          {phase === 0 && (
            <div className="text-4xl text-white text-center">
              <TypeAnimation
                sequence={[
                  '> whoami', // Display the text
                  1000,       // Wait for 1 second
                  () => setPhase((prev) => prev + 1), // Increment phase from 0 to 1
                ]}
                speed={50}
                wrapper="span"
              />
            </div>
          )}
          {phase >= 1 && (
            <div className="w-full max-w-6xl flex flex-col items-center">
              {phase >= 1 && <div className="text-3xl text-white text-center mb-2">Nilesh Mukherji Portfolio</div>}
              {phase >= 2 && <div className="text-2xl text-green-400 text-center">&gt; Quant | AI | Markets</div>}
              {phase >= 3 && <div className="text-2xl text-white text-left w-full mt-10 mb-2">&gt; cat about.md</div>}
              {phase >= 4 && (
                <div className="whitespace-pre-line text-green-400 flex flex-col md:flex-row gap-6 w-full">
                  <img src="/ascii-portrait.png" alt="ASCII Portrait" className="max-w-xs h-auto object-contain" />
                  <div className="space-y-4">
                    {lines.map((line, idx) => <div key={idx}>{line}</div>)}
                    {currentLine && <div>{currentLine}</div>}
                  </div>
                </div>
              )}
              {phase >= 5 && <div className="text-2xl text-white text-left w-full mt-10 mb-2 animate-fade-in">&gt; ls projects</div>}
              {phase >= 6 && (
                <>
                  <div className="grid md:grid-cols-3 gap-6 w-full">
                    {projects.slice(0, 3).map((proj) => <ProjectCard key={proj.slug} project={proj} />)}
                  </div>
                  <div className="mt-2 flex justify-center">
                    <a
                      href="/#/projects"
                      className="px-6 py-3 border border-green-400 text-green-400 rounded hover:bg-green-400 hover:text-black transition-colors duration-300"
                    >
                      View All Projects
                    </a>
                  </div>
                </>
              )}
              {phase >= 7 && <div className="text-2xl text-white text-left w-full mt-10 mb-2 animate-fade-in">&gt; ls education</div>}
              {phase >= 8 && <EducationSection />}
              {phase >= 9 && <div className="text-2xl text-white text-left w-full mt-10 mb-2 animate-fade-in">&gt; echo $contact</div>}
              {phase >= 10 && <ContactSection />}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TerminalHome;
