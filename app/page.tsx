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
  const [heroVariant, setHeroVariant] = useState<'real' | 'semi' | 'cg'>('real');
  const contentViewRef = useRef<HTMLElement>(null);

  const openModule = (index: number) => {
    setActive(index);
    setSelected(index);
  };

  const returnHome = () => {
    setSelected(null);
    setEntered(false);
    setTypedNameLength(content.identity.heroFirstName.length + content.identity.heroLastName.length);
    setBooting(false);
  };

  useEffect(() => {
    const requestedVariant = new URLSearchParams(window.location.search).get('hero');
    setHeroVariant(requestedVariant === 'semi' || requestedVariant === 'cg' ? requestedVariant : 'real');
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let played = false;
    try {
      played = window.localStorage.getItem('stella-portfolio-intro-seen-v1') === 'true';
    } catch {
      played = false;
    }

    if (reducedMotion || played) {
      setTypedNameLength(content.identity.heroFirstName.length + content.identity.heroLastName.length);
      setBooting(false);
      return;
    }

    try {
      window.localStorage.setItem('stella-portfolio-intro-seen-v1', 'true');
    } catch {
      // The animation still works when storage is unavailable.
    }

    setTypedNameLength(0);
    const firstLength = content.identity.heroFirstName.length;
    const lastLength = content.identity.heroLastName.length;
    const typingTimers: number[] = [];
    const letterInterval = 125;
    const firstNameStart = 360;
    const lastNameStart = firstNameStart + firstLength * letterInterval + 160;

    for (let index = 1; index <= firstLength; index += 1) {
      typingTimers.push(window.setTimeout(() => setTypedNameLength(index), firstNameStart + index * letterInterval));
    }
    for (let index = 1; index <= lastLength; index += 1) {
      typingTimers.push(window.setTimeout(() => setTypedNameLength(firstLength + index), lastNameStart + index * letterInterval));
    }

    const timer = window.setTimeout(() => setBooting(false), 3900);
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
        else returnHome();
      }
      if (selected === null && event.key === 'ArrowDown') setActive((value) => (value + 1) % modules.length);
      if (selected === null && event.key === 'ArrowUp') setActive((value) => (value - 1 + modules.length) % modules.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [entered, active, selected]);

  return (
    <main className={`site-shell hero-${heroVariant} ${booting ? 'is-booting' : ''} ${entered ? 'is-entered' : ''} ${selected !== null ? 'is-reading' : ''}`}>
      <div className="city-art" aria-hidden="true" />
      <div className="character-layer" aria-hidden="true">
        <span className="character-motion" />
        <span className="hair-motion" />
        <span className="character-light" />
        <span className="cat-pulse" />
      </div>
      <div className="atmosphere" aria-hidden="true">
        <span className="ambient-orb orb-a" /><span className="ambient-orb orb-b" />
        <span className="depth-wall depth-wall-left" /><span className="depth-wall depth-wall-right" />
        <span className="signal-path signal-path-a"><i /></span>
        <span className="signal-path signal-path-b"><i /></span>
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
        {selected !== null
          ? <button className="close-terminal" onClick={() => setSelected(null)}>← MENU</button>
          : <div className="terminal-key-hints" aria-label="Keyboard controls">
              <button type="button" onClick={returnHome} aria-label="Return to the landing page"><kbd>ESC</kbd></button>
            </div>}
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
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  return <div className="content-inner">
    <SectionIntro index="02" title={content.projectsSection.title} text={content.projectsSection.introduction} />
    <div className="project-grid">
      {projects.map((project) => {
        const expanded = expandedProject === project.name;
        return <article className={`project-card ${project.featured ? 'featured' : ''} ${expanded ? 'is-expanded' : ''}`} key={project.name}>
        <div className="card-top">
          <span>{project.label}</span>
          {'links' in project && project.links.length > 0 && <nav className="project-quick-links" aria-label={`${project.name} links`}>
            {project.links.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label}<span aria-hidden="true">↗</span></a>)}
          </nav>}
        </div>
        <div className="project-heading"><ProjectMark name={project.name} /><div><h3>{project.name}</h3><p className="card-meta">{project.meta}</p></div></div>
        {project.name === 'FocusTrail'
          ? <FocusTrailDemo />
          : project.name === 'PantryAgent'
          ? <PantryAgentDemo />
          : project.demo && <div className={`project-demo project-demo-${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}><img src={project.demo} alt={`${project.name} product demo`} /></div>}
        <p>{project.summary}</p>
        {project.trace && <code>{project.trace}</code>}<div className="tech-line">{project.technology}</div>
        {'caseStudy' in project && <>
          <button className="case-study-toggle" type="button" aria-expanded={expanded} onClick={() => setExpandedProject(expanded ? null : project.name)}>
            <span>{expanded ? 'Close details' : 'Project details'}</span><b aria-hidden="true">{expanded ? '−' : '+'}</b>
          </button>
          <div className="case-study" aria-hidden={!expanded}>
            <div>
              {'detailImage' in project && <figure className="case-study-visual"><img src={project.detailImage} alt={project.detailImageAlt} /><figcaption>SYSTEM FLOW</figcaption></figure>}
              <div className="case-study-grid">{project.caseStudy.map((section) => <section key={section.label}><span>{section.label}</span><p>{section.text}</p></section>)}</div>
            </div>
          </div>
        </>}
      </article>})}
    </div>
  </div>;
}

function FocusTrailDemo() {
  return <div className="focustrail-gallery" aria-label="FocusTrail adaptive execution interface and desktop companion">
    <div className="focus-scene-bar"><img src="/brands/focustrail.svg" alt="" /><span>Home <span aria-hidden="true">›</span> Prepare a 10-minute presentation</span><small>PRODUCT SCENE · DEMO</small></div>
    <div className="focus-scene-sidebar" aria-hidden="true"><FileText /><ChartNoAxesCombined /><BrainCircuit /></div>
    <div className="focus-scene-task">
      <span className="focus-mode">HYPER FOCUS MODE</span>
      <h4>Clarify the finish line</h4>
      <p>Define the required outcome and your next actionable step.</p>
      <span className="focus-duration">5 min</span>
      <div className="focus-timer">09:53</div>
      <span className="focus-pause">Ⅱ &nbsp; Pause Focus</span>
    </div>
    <aside className="focustrail-recovery" aria-label="Example FocusTrail recovery prompt">
      <div className="recovery-heading"><span>✧ FocusTrail Companion · Prototype</span><span aria-hidden="true">×</span></div>
      <span className="recovery-status">OFF TRACK · 03:12</span>
      <strong>I’m keeping your goal in sight.</strong>
      <p>Your plan may need a little adjustment. Come back, or let’s find a shorter path.</p>
      <div className="recovery-goal">Your goal <b>Clarify the finish line</b></div>
      <div className="recovery-actions" aria-hidden="true">
        <span>→ Return to focus</span>
        <span>✧ Update plan</span>
        <span>Pause reminders</span>
      </div>
    </aside>
      <div className="focustrail-companion">
        <img src="/projects/focustrail-pet.png" alt="FocusTrail personality companion character" />
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
        const websiteLink = experience.links.find((link) => link.label === 'WEBSITE');
        const detailLinks = experience.links.filter((link) => link.label !== 'WEBSITE');
        return <article key={experience.company} className={expanded ? 'is-expanded' : ''}>
        <time className="timeline-date">{experience.date}</time>
        <span className={`timeline-node ${experience.current ? 'is-current' : ''}`}>0{index + 1}</span>
        <OrganizationMark company={experience.company} />
        <div className="experience-copy">
          <h3>
            {websiteLink
              ? <a className="experience-company-link" href={websiteLink.href} target="_blank" rel="noreferrer" aria-label={`Visit ${experience.company} website`}>
                  {experience.company} <span aria-hidden="true">↗</span>
                </a>
              : experience.company}
          </h3>
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
              {detailLinks.length > 0 && <div className="experience-links">
                {detailLinks.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label} <span aria-hidden="true">↗</span></a>)}
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
    <SectionIntro index="03" title={content.researchSection.title} text={content.researchSection.subtitle} />
    <div className="research-list">
      {content.researchSection.entries.map((entry, entryIndex) => (
        <article className="research-entry" key={entry.title}>
          <header className="research-entry-header">
            <div className="research-heading-copy">
              <div className="research-entry-label">RESEARCH 0{entryIndex + 1}</div>
              <h3>{entry.title}</h3>
              <p className="card-meta">{entry.subtitle}</p>
            </div>
            <p className="research-meta">
              {entry.metaLines.map((line) => <span key={line}>{line}</span>)}
            </p>
          </header>
          <p className="lead-copy">{entry.lead}</p>
          <div className="research-frame" aria-label={`${entry.title} research framework`}>
            {entry.framework.map((label, index) => <div key={label}><span>0{index + 1}</span><strong>{label}</strong></div>)}
          </div>
          <p className="research-body">{entry.body}</p>
          <div className="research-result">{entry.result}</div>
          <div className="tech-line">{entry.technology}</div>
        </article>
      ))}
    </div>
  </div>;
}

function About() {
  const [showAllNotes, setShowAllNotes] = useState(false);
  const visibleNotes = showAllNotes ? content.aboutSection.fieldNotes : content.aboutSection.fieldNotes.slice(0, 3);
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
    <section className="field-notes" aria-labelledby="field-notes-title">
      <div className="field-notes-heading">
        <span>FIELD NOTES</span>
        <h3 id="field-notes-title">What I notice while building</h3>
        <p>Short reflections on product decisions, engineering tradeoffs, and how my perspective changes through practice.</p>
      </div>
      <div className="field-note-grid">
        {visibleNotes.map((note, index) => <article key={note.title}>
          {note.images
            ? <div className="field-note-image field-note-collage">{note.images.map((image, imageIndex) => <img src={image} alt={imageIndex === 0 ? note.imageAlt : ''} key={image} />)}</div>
            : <div className={`field-note-image ${note.image.includes('/brands/') ? 'is-logo' : ''}`}><img src={note.image} alt={note.imageAlt} /></div>}
          <span>0{index + 1} / {note.context}</span>
          <h4>{note.title}</h4>
          <p>{note.summary}</p>
          <a href={note.href} target="_blank" rel="noreferrer">{note.linkLabel} <span aria-hidden="true">↗</span></a>
        </article>)}
      </div>
      {content.aboutSection.fieldNotes.length > 3 && <button className="field-notes-toggle" type="button" onClick={() => setShowAllNotes((value) => !value)}>
        <span>{showAllNotes ? 'Show fewer notes' : `View all ${content.aboutSection.fieldNotes.length} notes`}</span>
        <b aria-hidden="true">{showAllNotes ? '−' : '+'}</b>
      </button>}
    </section>
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
  const [activeResume, setActiveResume] = useState(content.resumeSection.defaultVariant);
  const resume = content.resumeSection.variants.find((variant) => variant.id === activeResume) ?? content.resumeSection.variants[0];
  return <div className="content-inner resume-content">
    <SectionIntro index="05" title={content.resumeSection.title} text={content.resumeSection.subtitle} />
    <div className="resume-layout">
      <div className="resume-card">
        <div className="resume-card-head"><FileText aria-hidden="true" /><span>PUBLIC PROFILE</span></div>
        <h3>{content.resumeSection.name}</h3>
        <p className="resume-headline">{content.resumeSection.headline}</p>
        <p className="resume-education"><GraduationCap aria-hidden="true" />{content.resumeSection.education}</p>
        <p className="resume-note">{content.resumeSection.note}</p>
        <div className="resume-switcher" aria-label="Resume version">
          {content.resumeSection.variants.map((variant) => <button type="button" className={variant.id === activeResume ? 'active' : ''} onClick={() => setActiveResume(variant.id)} key={variant.id}>{variant.shortLabel}</button>)}
        </div>
        <a className="resume-button" href={resume.href} download>
          DOWNLOAD {resume.shortLabel} PDF <span>↓</span>
        </a>
      </div>
      <div className="resume-preview">
        <div className="resume-preview-bar"><span>{resume.fileLabel}</span><span>{resume.default ? 'DEFAULT · ' : ''}1 / 1</span></div>
        <iframe
          src={`${resume.href}#view=FitH&toolbar=0&navpanes=0`}
          title={`Stella (Yuxuan) Jiang ${resume.shortLabel} resume`}
        />
      </div>
    </div>
  </div>;
}

function ProjectMark({ name }: { name: string }) {
  if (name === 'FocusTrail') return <span className="project-logo"><img src="/brands/focustrail.svg" alt="FocusTrail logo" /></span>;
  if (name === 'PantryAgent') return <span className="project-logo"><img src="/brands/pantryagent.svg" alt="PantryAgent logo" /></span>;
  if (name === 'Intent2Escrow') return <span className="project-logo project-symbol"><ShieldCheck aria-hidden="true" /></span>;
  if (name === 'C&S MovieStore') return <span className="project-logo project-symbol"><Film aria-hidden="true" /></span>;
  if (name === 'Mosaic') return <span className="project-logo project-symbol"><ChartNoAxesCombined aria-hidden="true" /></span>;
  return <span className="project-logo project-symbol"><Search aria-hidden="true" /></span>;
}

function OrganizationMark({ company }: { company: string }) {
  if (company === 'Alibaba Group') return <span className="org-logo alibaba-logo"><img src="/brands/alibaba-group.png" alt="Alibaba Group logo" /></span>;
  if (company.startsWith('Capybara')) return <span className="org-logo uci-ics-logo"><img src="/brands/uci-ics.png" alt="UCI Donald Bren School of Information and Computer Sciences logo" /></span>;
  if (company.startsWith('FessorAI')) return <span className="org-logo fessor-logo"><img src="/brands/fessorai.png" alt="FessorAI logo" /></span>;
  if (company === 'FocusTrail') return <span className="org-logo focustrail-logo"><img src="/brands/focustrail.svg" alt="" /><strong>FocusTrail</strong></span>;
  if (company === 'NextTier') return <span className="org-logo nexttier-logo"><img src="/brands/nexttier.png" alt="NextTier logo" /></span>;
  if (company.startsWith('Beijing Join-Cheer')) return <span className="org-logo join-cheer-logo"><img src="/brands/join-cheer.jpg" alt="JOIN-CHEER and Beijing Jiuqi Software official logo" /></span>;
  if (company.startsWith('Guolian Minsheng')) return <span className="org-logo guolian-logo"><img src="/brands/guolian-minsheng-securities.png" alt="Guolian Minsheng Securities official logo" /></span>;
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
