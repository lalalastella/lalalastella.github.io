'use client';

import { useEffect, useRef, useState } from 'react';
import { Bot, BrainCircuit, ChartNoAxesCombined, Database, FileText, Film, GraduationCap, Mail, Search, ShieldCheck } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { SiDjango, SiDocker, SiFastapi, SiNextdotjs, SiNodedotjs, SiPostgresql, SiPytest, SiPython, SiReact, SiRedis, SiTypescript } from 'react-icons/si';
import content from '../content/portfolio-content.json';

const modules = content.modules;
const projects = content.projectsSection.projects;
const experiences = content.experienceSection.roles;
const toolkit = content.aboutSection.toolkit;

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [booting, setBooting] = useState(true);
  const [typedNameLength, setTypedNameLength] = useState(0);
  const contentViewRef = useRef<HTMLElement>(null);

  const openModule = (index: number) => {
    setActive(index);
    setSelected(index);
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let played = false;
    try {
      played = window.sessionStorage.getItem('stella-portfolio-boot-v8') === 'played';
    } catch {
      played = false;
    }

    if (reducedMotion || played) {
      setTypedNameLength(content.identity.heroFirstName.length + content.identity.heroLastName.length);
      setBooting(false);
      return;
    }

    try {
      window.sessionStorage.setItem('stella-portfolio-boot-v8', 'played');
    } catch {
      // The animation still works when storage is unavailable.
    }

    setTypedNameLength(0);
    const firstLength = content.identity.heroFirstName.length;
    const lastLength = content.identity.heroLastName.length;
    const typingTimers: number[] = [];
    const letterInterval = 212;
    const firstNameStart = 850;
    const lastNameStart = firstNameStart + firstLength * letterInterval + 420;

    for (let index = 1; index <= firstLength; index += 1) {
      typingTimers.push(window.setTimeout(() => setTypedNameLength(index), firstNameStart + index * letterInterval));
    }
    for (let index = 1; index <= lastLength; index += 1) {
      typingTimers.push(window.setTimeout(() => setTypedNameLength(firstLength + index), lastNameStart + index * letterInterval));
    }

    const timer = window.setTimeout(() => setBooting(false), 7100);
    return () => {
      window.clearTimeout(timer);
      typingTimers.forEach((typingTimer) => window.clearTimeout(typingTimer));
    };
  }, []);

  useEffect(() => {
    if (selected !== null) {
      contentViewRef.current?.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  }, [selected]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (!entered) setEntered(true);
        else if (selected === null) setSelected(active);
      }
      if (event.key === 'Escape') {
        if (selected !== null) setSelected(null);
        else setEntered(false);
      }
      if (selected === null && event.key === 'ArrowDown') setActive((value) => (value + 1) % modules.length);
      if (selected === null && event.key === 'ArrowUp') setActive((value) => (value - 1 + modules.length) % modules.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [entered, active, selected]);

  return (
    <main
      className={`site-shell ${booting ? 'is-booting' : ''} ${entered ? 'is-entered' : ''} ${selected !== null ? 'is-reading' : ''}`}
      onPointerMove={(event) => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 5;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 3;
        event.currentTarget.style.setProperty('--character-x', `${x.toFixed(2)}px`);
        event.currentTarget.style.setProperty('--character-y', `${y.toFixed(2)}px`);
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty('--character-x', '0px');
        event.currentTarget.style.setProperty('--character-y', '0px');
      }}
    >
      <div className="city-art" aria-hidden="true" />
      <div className="character-layer" aria-hidden="true">
        <span className="character-motion" />
        <span className="character-light" />
      </div>
      <div className="atmosphere" aria-hidden="true">
        <span className="ambient-orb orb-a" /><span className="ambient-orb orb-b" />
        <span className="depth-wall depth-wall-left" /><span className="depth-wall depth-wall-right" />
        <span className="horizon-glow" /><span className="grid-floor" />
      </div>

      <header className="topbar">
        <button className="brand" onClick={() => { setEntered(false); setSelected(null); }} aria-label="Return to home">
          <span className="brand-avatar"><img src="/profile-cat.png" alt="" /></span>
          <span className="brand-copy">{content.identity.fullName.toUpperCase()}</span>
        </button>
        <div className="system-status"><span /> {content.identity.status}</div>
      </header>

      <section className="hero" aria-label="Stella Jiang portfolio introduction">
        <div className="eyebrow"><span>{content.identity.location}</span></div>
        <h1 aria-label={`${content.identity.heroFirstName} ${content.identity.heroLastName}`}>
          <span className="hero-name-line">
            <span className="hero-name">{content.identity.heroFirstName.slice(0, Math.min(typedNameLength, content.identity.heroFirstName.length))}</span>
            {typedNameLength <= content.identity.heroFirstName.length && <span className="cursor" aria-hidden="true">_</span>}
          </span>
          <span className="hero-name-line hero-name-second-line">
            <span className="hero-name">{content.identity.heroLastName.slice(0, Math.max(0, typedNameLength - content.identity.heroFirstName.length))}</span>
            {typedNameLength > content.identity.heroFirstName.length && <span className="cursor" aria-hidden="true">_</span>}
          </span>
        </h1>
        <div className="role-sequence">
          <p className="boot-command" aria-hidden="true"><span>stella@portfolio:~$ initializing...</span></p>
          <p className="role">{content.identity.role}</p>
        </div>
        <p className="intro">{content.identity.introduction}</p>
        <div className="hero-actions">
          <button className="enter-button" onClick={() => setEntered(true)}><span>{content.ui.enterPortfolio}</span><kbd>↵</kbd></button>
          <button className="text-button" onClick={() => { setEntered(true); setSelected(4); }}>{content.ui.viewResume} ↗</button>
        </div>
      </section>

      <section className="terminal" aria-label="Portfolio navigation">
        <div className="terminal-head"><div className="terminal-title"><span className="terminal-dot" /> {content.ui.terminalTitle}</div></div>
        <div className="terminal-body">
          <p className="command">{content.ui.terminalPromptUser} <span>{content.ui.terminalCommand}</span></p>
          <p className="select-label">{content.ui.selectModule}</p>
          <nav className="module-list" aria-label="Portfolio modules">
            {modules.map((module, index) => (
              <button
                key={module.title}
                className={active === index ? 'active' : ''}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => openModule(index)}
              >
                <span className="module-number">{module.number}</span>
                <span className="module-name">{module.title}<small>{module.detail}</small></span>
                <span className="module-arrow">→</span>
              </button>
            ))}
          </nav>
        </div>
        <button className="close-terminal" onClick={() => selected !== null ? setSelected(null) : setEntered(false)}>
          {selected !== null ? '← MENU' : <>ESC&nbsp;&nbsp; {content.ui.return}</>}
        </button>
      </section>

      <section ref={contentViewRef} className={`content-view ${selected === 3 ? 'about-view' : ''} ${selected === 4 ? 'resume-view' : ''}`} aria-live="polite">
        <nav className="reading-nav" aria-label="Portfolio sections">
          <button className="reading-nav-home" onClick={() => setSelected(null)}>← MENU</button>
          {modules.map((module, index) => (
            <button
              key={module.title}
              className={selected === index ? 'active' : ''}
              aria-current={selected === index ? 'page' : undefined}
              onClick={() => openModule(index)}
            >
              <span>{module.number}</span>{module.title}
            </button>
          ))}
        </nav>
        <div className="content-stage">
          {selected === 0 && <Experience />}
          {selected === 1 && <Projects />}
          {selected === 2 && <Research />}
          {selected === 3 && <About />}
          {selected === 4 && <Resume />}
          {selected === 5 && <Contact />}
        </div>
      </section>
    </main>
  );
}

function SectionIntro({ index, title, text }: { index: string; title: string; text: string }) {
  return <header className="content-intro"><span>{index}</span><h2>{title}</h2><p>{text}</p></header>;
}

function Projects() {
  return <div className="content-inner">
    <SectionIntro index="02" title={content.projectsSection.title} text={content.projectsSection.introduction} />
    <div className="project-grid">
      {projects.map((project) => <article className={`project-card ${project.featured ? 'featured' : ''}`} key={project.name}>
        <div className="card-top"><span>{project.label}</span><span>↗</span></div>
        <div className="project-heading"><ProjectMark name={project.name} /><div><h3>{project.name}</h3><p className="card-meta">{project.meta}</p></div></div>
        {project.name === 'PantryAgent'
          ? <PantryAgentDemo />
          : project.demo && <div className={`project-demo project-demo-${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}><img src={project.demo} alt={`${project.name} product demo`} /></div>}
        <p>{project.summary}</p>
        {project.trace && <code>{project.trace}</code>}<div className="tech-line">{project.technology}</div>
      </article>)}
    </div>
  </div>;
}

function PantryAgentDemo() {
  const screens = [
    { src: '/projects/pantryagent-overview.jpg', label: '01 / PRODUCT LOOP', alt: 'PantryAgent overview with receipt, pantry, meal plan, and recipe actions' },
    { src: '/projects/pantryagent-scan.jpg', label: '02 / SCAN RECEIPT', alt: 'PantryAgent receipt scanning interface' },
    { src: '/projects/pantryagent-plan.jpg', label: '03 / MEAL PLAN', alt: 'PantryAgent weekly meal planning interface' },
  ];

  return <div className="pantryagent-gallery" aria-label="PantryAgent product flow">
    {screens.map((screen) => <figure className="pantryagent-screen" key={screen.src}>
      <figcaption>{screen.label}</figcaption>
      <div className="pantryagent-device"><img src={screen.src} alt={screen.alt} /></div>
    </figure>)}
  </div>;
}

function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  useEffect(() => {
    const entries = timelineRef.current?.querySelectorAll<HTMLElement>('article');
    if (!entries?.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      entries.forEach((entry) => entry.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((observed) => {
      observed.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.22, rootMargin: '0px 0px -10% 0px' });

    const focusObserver = new IntersectionObserver((observed) => {
      observed.forEach((entry) => {
        entry.target.classList.toggle('is-active', entry.isIntersecting);
      });
    }, { threshold: 0.12, rootMargin: '-28% 0px -38% 0px' });

    entries.forEach((entry, index) => {
      entry.style.setProperty('--timeline-delay', `${Math.min(index * 45, 180)}ms`);
      observer.observe(entry);
      focusObserver.observe(entry);
    });

    return () => {
      observer.disconnect();
      focusObserver.disconnect();
    };
  }, []);

  return <div className="content-inner">
    <SectionIntro index="01" title={content.experienceSection.title} text={content.experienceSection.introduction} />
    <div className="experience-list" ref={timelineRef}>
      {experiences.map((experience, index) => {
        const expanded = expandedCompany === experience.company;
        return <article key={experience.company} className={expanded ? 'is-expanded' : ''}>
        <time className="timeline-date">{experience.date}</time>
        <span className={`timeline-node ${experience.current ? 'is-current' : ''}`}>0{index + 1}</span>
        <OrganizationMark company={experience.company} />
        <div className="experience-copy">
          <h3>{experience.company}</h3>
          <p className="card-meta">{experience.role}</p>
          <p className="experience-location">{experience.location}</p>
          <p className="experience-summary">{experience.summary}</p>
          <button
            className="experience-toggle"
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpandedCompany(expanded ? null : experience.company)}
          >
            {expanded ? 'HIDE DETAILS' : 'VIEW DETAILS'} <span aria-hidden="true">{expanded ? '−' : '+'}</span>
          </button>
          <div className="experience-details" aria-hidden={!expanded}>
            <div>
              <ul>{experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
              <div className="experience-tech">{experience.technology.map((item) => <span key={item}>{item}</span>)}</div>
              {experience.links.length > 0 && <div className="experience-links">
                {experience.links.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label} <span aria-hidden="true">↗</span></a>)}
              </div>}
            </div>
          </div>
        </div>
      </article>;
      })}
    </div>
  </div>;
}

function Research() {
  return <div className="content-inner research-content">
    <SectionIntro index="01" title={content.researchSection.title} text={content.researchSection.subtitle} />
    <p className="research-meta">{content.researchSection.metaLines.map((line) => <span key={line}>{line}<br /></span>)}</p>
    <p className="lead-copy">{content.researchSection.lead}</p>
    <div className="research-frame" aria-label="Research framework">
      {content.researchSection.framework.map((label, index) => <div key={label}><span>0{index + 1}</span><strong>{label}</strong></div>)}
    </div>
    <p>{content.researchSection.body}</p>
    <article className="research-entry cost-aware-entry">
      <div className="research-entry-label">02 / APPLIED AI RESEARCH</div>
      <h3>{content.researchSection.costAware.title}</h3>
      <p className="card-meta">{content.researchSection.costAware.subtitle}</p>
      <p className="research-meta research-guidance">{content.researchSection.costAware.guidance}</p>
      <p className="lead-copy">{content.researchSection.costAware.lead}</p>
      <p>{content.researchSection.costAware.body}</p>
      <div className="research-result">{content.researchSection.costAware.result}</div>
      <div className="tech-line">{content.researchSection.costAware.technology}</div>
    </article>
  </div>;
}

function About() {
  return <div className="content-inner about-content">
    <SectionIntro index="04" title={content.aboutSection.title} text={content.aboutSection.subtitle} />
    <div className="about-overview">
      <div className="about-copy">
        {content.aboutSection.paragraphs.map((paragraph, index) => <p className={index === 0 ? 'lead-copy' : ''} key={paragraph}>{paragraph}</p>)}
        <h3 className="toolkit-heading">{content.aboutSection.toolkitTitle}</h3>
        <div className="toolkit">{toolkit.map((item) => <span key={item}><TechnologyMark name={item} />{item}</span>)}</div>
      </div>
      <figure className="about-portrait">
        <img src="/stella-linkedin-portrait.jpg" alt="Stella (Yuxuan) Jiang" />
      </figure>
    </div>
  </div>;
}

function Contact() {
  return <div className="content-inner contact-content">
    <SectionIntro index="06" title={content.contactSection.title} text={content.contactSection.subtitle} />
    <div className="contact-links">
      {content.contactSection.links.map((link) => {
        const Icon = link.label === 'EMAIL' ? Mail : link.label === 'GITHUB' ? FaGithub : FaLinkedinIn;
        return <a href={link.href} key={link.label}><span className="contact-label"><Icon aria-hidden="true" />{link.label}</span>{link.text}<b>↗</b></a>;
      })}
    </div>
  </div>;
}

function Resume() {
  return <div className="content-inner resume-content">
    <SectionIntro index="05" title={content.resumeSection.title} text={content.resumeSection.subtitle} />
    <div className="resume-layout">
      <div className="resume-card">
        <div className="resume-card-head"><FileText aria-hidden="true" /><span>PUBLIC PROFILE</span></div>
        <h3>{content.resumeSection.name}</h3>
        <p className="resume-headline">{content.resumeSection.headline}</p>
        <p className="resume-education"><GraduationCap aria-hidden="true" />{content.resumeSection.education}</p>
        <p className="resume-note">{content.resumeSection.note}</p>
        <a className="resume-button" href={content.resumeSection.href} download>
          DOWNLOAD PDF <span>↓</span>
        </a>
      </div>
      <div className="resume-preview">
        <div className="resume-preview-bar"><span>STELLA_JIANG_RESUME.PDF</span><span>1 / 1</span></div>
        <iframe
          src={`${content.resumeSection.href}#view=FitH&toolbar=0&navpanes=0`}
          title="Stella (Yuxuan) Jiang resume"
        />
      </div>
    </div>
  </div>;
}

function ProjectMark({ name }: { name: string }) {
  if (name === 'PantryAgent') return <span className="project-logo"><img src="/brands/pantryagent.svg" alt="PantryAgent logo" /></span>;
  if (name === 'Intent2Escrow') return <span className="project-logo project-symbol"><ShieldCheck aria-hidden="true" /></span>;
  if (name === 'C&S MovieStore') return <span className="project-logo project-symbol"><Film aria-hidden="true" /></span>;
  if (name === 'Mosaic') return <span className="project-logo project-symbol"><ChartNoAxesCombined aria-hidden="true" /></span>;
  return <span className="project-logo project-symbol"><Search aria-hidden="true" /></span>;
}

function OrganizationMark({ company }: { company: string }) {
  if (company === 'Alibaba Group') return <span className="org-logo alibaba-logo"><img src="/brands/alibaba-group.png" alt="Alibaba Group logo" /></span>;
  if (company.startsWith('Capybara')) return <span className="org-logo org-wordmark uci-logo">UCI</span>;
  if (company.startsWith('FessorAI')) return <span className="org-logo fessor-logo"><img src="/brands/fessorai.png" alt="FessorAI logo" /></span>;
  if (company === 'FocusTrail') return <span className="org-logo focustrail-logo"><img src="/brands/focustrail.svg" alt="" /><strong>FocusTrail</strong></span>;
  if (company === 'NextTier') return <span className="org-logo nexttier-logo"><img src="/brands/nexttier.png" alt="NextTier logo" /></span>;
  if (company.startsWith('Beijing Join-Cheer')) return <span className="org-logo join-cheer-logo"><img src="/brands/join-cheer.jpg" alt="JOIN-CHEER and Beijing Jiuqi Software official logo" /></span>;
  if (company.startsWith('Guolian Securities')) return <span className="org-logo guolian-logo"><img src="/brands/guolian-securities.png" alt="" /><strong>国联证券<span>GUOLIAN SECURITIES</span></strong></span>;
  return <span className="org-logo org-wordmark">ORG</span>;
}

function TechnologyMark({ name }: { name: string }) {
  if (name === 'Python') return <SiPython aria-hidden="true" />;
  if (name === 'TypeScript') return <SiTypescript aria-hidden="true" />;
  if (name === 'FastAPI') return <SiFastapi aria-hidden="true" />;
  if (name === 'Django') return <SiDjango aria-hidden="true" />;
  if (name === 'Node.js') return <SiNodedotjs aria-hidden="true" />;
  if (name === 'React') return <SiReact aria-hidden="true" />;
  if (name === 'Next.js') return <SiNextdotjs aria-hidden="true" />;
  if (name === 'PostgreSQL') return <SiPostgresql aria-hidden="true" />;
  if (name === 'Redis') return <SiRedis aria-hidden="true" />;
  if (name === 'RAG') return <BrainCircuit aria-hidden="true" />;
  if (name === 'LLM Agents') return <Bot aria-hidden="true" />;
  if (name === 'Evaluation') return <ChartNoAxesCombined aria-hidden="true" />;
  if (name === 'Docker') return <SiDocker aria-hidden="true" />;
  if (name === 'Pytest') return <SiPytest aria-hidden="true" />;
  return <Database aria-hidden="true" />;
}
