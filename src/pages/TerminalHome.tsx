import React, { useState, useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useLocation } from 'react-router-dom';

import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

import { FaUniversity, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

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

  const outputLines = [
    'With a dual master’s in Finance and Big Data, I specialize in developing quantitative strategies and research using AI and statistical models.',
    '',
    'My journey began in high school with a deep interest in biotech and healthcare technology. I worked as a technical intern at the Northwestern Cancer Rehabilitation Studies Lab and explored 3D scanning and image analysis through a startup concept called 3dema.',
    '',
    'In college, I transitioned into software consulting, where I delivered data tools and led engineering initiatives across industry-facing projects. This was also when I began exploring markets more seriously—launching and managing a research-focused asset management initiative rooted in volatility and quantitative modeling.',
    '',
    'I earned my undergraduate degree in Computer Science from NYU, complemented by minors in Cybersecurity, Financial Engineering, and Management — equipping me with a blend of technical depth and economic perspective.',
    '',
    'I’ve since continued to build on that foundation through dual graduate degrees at IE and my current role as an AI Engineering Intern, where I’m developing intelligent systems to support utilities and financial services clients.',
    '',
    'I’m deeply interested in building intelligent systems at the intersection of data, economics, and engineering—and thrive in environments where rigorous logic meets practical application.'
  ];


  const educationData = [
    {
      title: 'New York University',
      detail: 'B.S. Computer Science',
      minor: 'Minors: Cybersecurity, Financial Engineering, Management',
    },
    {
      title: 'IE Business School',
      detail: 'M.S. in Finance',
    },
    {
      title: 'IE School of Science & Technology',
      detail: 'M.S. in Data Science',
      minor: 'Specialization: Advanced AI',
    },
  ];

  const githubLink = "https://github.com/nilesh-mukherji"
  const linkedinLink = "https://www.linkedin.com/in/nilesh-mukherji/"
  const email = "mailto:nm3335+portfoliosite@nyu.edu"

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const shouldSkip = params.get('skipIntro') === 'true';

    if (shouldSkip) {
      setSkipIntro(true);
      setResuming(true);
      setTimeout(() => {
        setResuming(false);
        setPhase(6);
        setLines(outputLines);
      }, 600);
    } else {
      setPhase(0);
    }
  }, []);

  useEffect(() => {
    const enableAudio = () => {
      setSoundEnabled(true);
      window.removeEventListener('pointerdown', enableAudio);
    };
    window.addEventListener('pointerdown', enableAudio);
    return () => window.removeEventListener('pointerdown', enableAudio);
  }, []);

  useEffect(() => {
    typingAudio.current = new Audio('/typing.ogg');
    typingAudio.current.volume = 0.2;
  }, []);

  useEffect(() => {
    if (skipIntro) return;

    if (phase === 4 && lineIndex < outputLines.length) {
      const lineToType = outputLines[lineIndex];
      let charIndex = 0;

      const interval = setInterval(() => {
        charIndex++;

        if (charIndex > lineToType.length) {
          clearInterval(interval);
          setLines((prevLines) => [...prevLines, lineToType]);
          setCurrentLine('');
          setLineIndex((prev) => prev + 1);
        } else {
          setCurrentLine(lineToType.slice(0, charIndex));
          if (soundEnabled && typingAudio.current) {
            typingAudio.current.currentTime = 0;
            typingAudio.current.play().catch(() => {});
          }
        }
      }, 5);

      return () => clearInterval(interval);
    }

    if (phase === 4 && lineIndex >= outputLines.length && currentLine === '') {
      setPhase(5);
    }
  }, [phase, lineIndex, skipIntro]);

  const blinkingCursor = <span className="animate-pulse ml-1"></span>;

  return (
    <div className="bg-black text-green-400 font-mono min-h-screen flex flex-col items-center justify-center p-8">
      {skipIntro ? (
        resuming ? (
          <div className="text-green-400 text-2xl font-mono">
            &gt; resuming session...{blinkingCursor}
          </div>
        ) : (
          <div className="w-full max-w-6xl flex flex-col items-center opacity-0 animate-fade-in">
            <p className="text-white text-3xl text-center mb-2">Nilesh Mukherji Portfolio</p>
            <p className="text-green-400 text-2xl text-center mb-8">&gt; Quant | AI | Markets</p>
            <p className="text-white text-2xl text-left w-full mb-8">&gt; cat about.md</p>

            <div className="whitespace-pre-line text-green-400 flex flex-col md:flex-row md:items-start md:gap-12 gap-6 w-full">
              <div className="md:h-full md:w-72 w-full max-w-xs flex justify-center items-start">
                <img
                  src="/ascii-portrait.png"
                  alt="ASCII Portrait"
                  className="w-full h-full object-contain border border-green-400"
                />
              </div>
              <div className="space-y-4 text-left flex-1 min-w-[250px]">
                {outputLines.map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            </div>

            <p className="text-white text-2xl text-left w-full mt-12 mb-8">&gt; ls projects</p>

            <div className="grid md:grid-cols-3 gap-6 w-full mb-6">
              {projects.slice(0, 3).map((proj) => (
                <ProjectCard key={proj.slug} project={proj} />
              ))}
            </div>

            <p className="text-white text-2xl text-left w-full mt-12 mb-8">&gt; ls education</p>

            <div className="grid md:grid-cols-3 gap-6 w-full mb-12">
              {educationData.map((edu, idx) => (
                <div
                  key={edu.title}
                  className="border border-green-400 p-4 rounded-lg bg-black text-left"
                >
                  <div className="flex items-center mb-2 text-lg font-semibold text-green-400">
                    {/* <FaUniversity className="mr-2 text-green-400" /> */}
                    {edu.title}
                  </div>
                  <div className="text-green-300">{edu.detail}</div>
                  <div className="text-sm text-green-400 mt-1">{edu.minor}</div>
                </div>
              ))}
            </div>

            <p className="text-white text-2xl text-left w-full mb-8">&gt; echo $contact</p>
            <div className="space-y-4 text-left w-full mb-6">
              <a
                href={githubLink}
                className="flex items-center text-green-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="mr-2" /> {githubLink}
              </a>
              <a
                href={linkedinLink}
                className="flex items-center text-green-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="mr-2" /> {linkedinLink}
              </a>
              <a
                href={email}
                className="flex items-center text-green-400 hover:underline"
              >
                <FaEnvelope className="mr-2" /> {email.slice(7)}
              </a>
            </div>
          </div>
        )
      ) : (
        <>
          {phase === 0 && (
            <div className="text-4xl text-white text-center">
              <TypeAnimation
                sequence={['> whoami', 1000, () => setPhase(1)]}
                speed={20}
                wrapper="span"
              />
              {blinkingCursor}
            </div>
          )}

          {phase > 0 && (
            <div className="w-full max-w-6xl flex flex-col items-center">
              {phase >= 1 && (
                <div className="mb-2 text-3xl text-white text-center">
                  {phase === 1 ? (
                    <>
                      <TypeAnimation
                        sequence={['Nilesh Mukherji Portfolio', () => setPhase(2)]}
                        speed={40}
                        wrapper="span"
                      />
                      {blinkingCursor}
                    </>
                  ) : (
                    'Nilesh Mukherji Portfolio'
                  )}
                </div>
              )}

              {phase >= 2 && (
                <div className="mb-4 text-2xl text-green-400 text-center">
                  {phase === 2 ? (
                    <>
                      <TypeAnimation
                        sequence={['> Quant | AI | Markets', () => setPhase(3)]}
                        speed={40}
                        wrapper="span"
                      />
                      {blinkingCursor}
                    </>
                  ) : (
                    <span>&gt; Quant | AI | Markets</span>
                  )}
                </div>
              )}

              {phase >= 3 && (
                <div className="mb-8 w-full text-left text-2xl text-white">
                  {phase === 3 ? (
                    <>
                      <TypeAnimation
                        sequence={['> cat about.md', () => setPhase(4)]}
                        speed={40}
                        wrapper="span"
                      />
                      {blinkingCursor}
                    </>
                  ) : (
                    <span>&gt; cat about.md</span>
                  )}
                </div>
              )}

              {phase >= 4 && (
                <div className="whitespace-pre-line text-green-400 flex flex-col md:flex-row md:items-start md:gap-12 gap-6 w-full">
                  <div className="md:h-full md:w-72 w-full max-w-xs flex justify-center items-start">
                    <img
                      src="/ascii-portrait.png"
                      alt="ASCII Portrait"
                      className="w-full h-full object-contain border border-green-400"
                    />
                  </div>
                  <div className="space-y-4 text-left flex-1 min-w-[250px]">
                    {lines.map((line, idx) => (
                      <div key={idx}>{line}</div>
                    ))}
                    {currentLine && <div>{currentLine}</div>}
                  </div>
                </div>
              )}

              {phase >= 5 && (
                <>
                  <div className="mb-8 w-full text-left text-white text-2xl">
                    {phase === 5 ? (
                      <>
                        <TypeAnimation
                          sequence={['> ls projects', () => setPhase(6)]}
                          speed={40}
                          wrapper="span"
                        />
                        {blinkingCursor}
                      </>
                    ) : (
                      <span>&gt; ls projects</span>
                    )}
                  </div>

                  {phase >= 6 && (
                    <>
                      <div className="grid md:grid-cols-3 gap-6 w-full mb-6">
                        {projects.slice(0, 3).map((proj, i) => (
                          <div
                            key={proj.slug}
                            style={{ animationDelay: `${i * 100}ms` }}
                            className="opacity-0 animate-[fade-in_0.6s_ease-out_forwards]"
                          >
                            <ProjectCard project={proj} />
                          </div>
                        ))}
                      </div>

                      <div className="w-full flex justify-start mb-12">
                        <a
                          href="/projects"
                          className="text-green-400 border border-green-400 px-4 py-2 rounded hover:bg-green-400 hover:text-black transition-colors duration-200 font-mono text-sm"
                        >
                          &gt; see more
                        </a>
                      </div>
                    </>
                  )}
                </>
              )}

              {phase >= 6 && (
                <>
                  <div className="mb-8 w-full text-left text-white text-2xl">
                    {phase === 6 ? (
                      <>
                        <TypeAnimation
                          sequence={['> ls education', () => setPhase(7)]}
                          speed={40}
                          wrapper="span"
                        />
                        {blinkingCursor}
                      </>
                    ) : (
                      <span>&gt; ls education</span>
                    )}
                  </div>

                  {phase >= 7 && (
                    <div className="grid md:grid-cols-3 gap-6 w-full mb-12">
                      {educationData.map((edu, idx) => (
                        <div
                          key={edu.title}
                          style={{ animationDelay: `${idx * 100}ms` }}
                          className="opacity-0 animate-[fade-in_0.6s_ease-out_forwards] border border-green-400 p-4 rounded-lg bg-black text-left"
                        >
                          <div className="flex items-center mb-2 text-lg font-semibold text-green-400">
                            {/* <FaUniversity className="mr-2 text-green-400" /> */}
                            {edu.title}
                          </div>
                          <div className="text-green-300">{edu.detail}</div>
                          <div className="text-sm text-green-400 mt-1">{edu.minor}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {phase >= 7 && (
                <>
                  <div className="mb-8 w-full text-left text-white text-2xl">
                    {phase === 7 ? (
                      <>
                        <TypeAnimation
                          sequence={['> echo $contact', () => setPhase(8)]}
                          speed={40}
                          wrapper="span"
                        />
                        {blinkingCursor}
                      </>
                    ) : (
                      <span>&gt; echo $contact</span>
                    )}
                  </div>

                  {phase >= 8 && (
                    <div className="space-y-4 text-left w-full mb-6 animate-fade-in">
                      <a
                        href={githubLink}
                        className="flex items-center text-green-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub className="mr-2" /> {githubLink}
                      </a>
                      <a
                        href={linkedinLink}
                        className="flex items-center text-green-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin className="mr-2" /> {linkedinLink}
                      </a>
                      <a
                        href={email}
                        className="flex items-center text-green-400 hover:underline"
                      >
                        <FaEnvelope className="mr-2" /> {email.slice(7)}
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TerminalHome;
