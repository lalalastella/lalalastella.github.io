'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type MouseEvent } from 'react';
import { Bot, BrainCircuit, ChartNoAxesCombined, ChevronDown, Database, FileText, Film, GitBranch, GraduationCap, Mail, Moon, Search, ShieldCheck, Sun } from 'lucide-react';
import { FaGithub, FaJava, FaLinkedinIn } from 'react-icons/fa6';
import { SiCelery, SiDjango, SiDocker, SiFastapi, SiFlask, SiKubernetes, SiLangchain, SiNextdotjs, SiNodedotjs, SiPostgresql, SiPytest, SiPython, SiReact, SiRedis, SiSqlalchemy, SiTypescript } from 'react-icons/si';
import content from '../content/portfolio-content.json';

const modules = content.modules;
const projects = content.projectsSection.projects;
const experiences = content.experienceSection.roles;
const toolkit = content.aboutSection.toolkit;
type HeroVariant = 'real' | 'semi' | 'cg';
type Theme = 'day' | 'night';

const getHeroVariant = (): HeroVariant => {
  const requestedVariant = new URLSearchParams(window.location.search).get('hero');
  return requestedVariant === 'semi' || requestedVariant === 'cg' ? requestedVariant : 'real';
};

const subscribeToHeroVariant = (onStoreChange: () => void) => {
  window.addEventListener('popstate', onStoreChange);
  return () => window.removeEventListener('popstate', onStoreChange);
};

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [booting, setBooting] = useState(true);
  const [typedNameLength, setTypedNameLength] = useState(0);
  const [theme, setTheme] = useState<Theme>('night');
  const heroVariant = useSyncExternalStore(subscribeToHeroVariant, getHeroVariant, () => 'real');
  const contentViewRef = useRef<HTMLElement>(null);

  const openModule = (index: number) => {
    setActive(index);
    setSelected(index);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const container = contentViewRef.current;
        const target = container?.querySelector<HTMLElement>(`[data-module-index="${index}"]`);
        if (!container || !target) return;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        container.scrollTo({ top: Math.max(0, target.offsetTop - 24), behavior: reducedMotion ? 'auto' : 'smooth' });
      });
    });
  };

  const returnHome = () => {
    contentViewRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    setSelected(null);
    setActive(0);
    setEntered(false);
    setTheme('night');
    setTypedNameLength(content.identity.heroFirstName.length + content.identity.heroLastName.length);
    setBooting(false);
  };

  const chooseTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);
  };

  useEffect(() => {
    const typingTimers: number[] = [];
    let bootTimer: number | null = null;
    const initializationFrame = window.requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let played = false;
      try {
        played = window.sessionStorage.getItem('stella-portfolio-intro-seen-v2') === 'true';
      } catch {
        played = false;
      }

      if (reducedMotion || played) {
        setTypedNameLength(content.identity.heroFirstName.length + content.identity.heroLastName.length);
        setBooting(false);
        return;
      }

      try {
        window.sessionStorage.setItem('stella-portfolio-intro-seen-v2', 'true');
      } catch {
        // The animation still works when storage is unavailable.
      }

      const firstLength = content.identity.heroFirstName.length;
      const lastLength = content.identity.heroLastName.length;
      const letterInterval = 35;
      const firstNameStart = 90;
      const lastNameStart = firstNameStart + firstLength * letterInterval + 45;

      for (let index = 1; index <= firstLength; index += 1) {
        typingTimers.push(window.setTimeout(() => setTypedNameLength(index), firstNameStart + index * letterInterval));
      }
      for (let index = 1; index <= lastLength; index += 1) {
        typingTimers.push(window.setTimeout(() => setTypedNameLength(firstLength + index), lastNameStart + index * letterInterval));
      }

      bootTimer = window.setTimeout(() => setBooting(false), 1200);
    });

    return () => {
      window.cancelAnimationFrame(initializationFrame);
      if (bootTimer !== null) window.clearTimeout(bootTimer);
      typingTimers.forEach((typingTimer) => window.clearTimeout(typingTimer));
    };
  }, []);

  useEffect(() => {
    const container = contentViewRef.current;
    if (!entered || !container) return;

    let animationFrame: number | null = null;
    const updateActiveModule = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        const containerRect = container.getBoundingClientRect();
        const markerX = containerRect.left + containerRect.width * 0.68;
        const markerY = containerRect.top + Math.min(container.clientHeight * 0.28, 220);
        const section = document.elementFromPoint(markerX, markerY)?.closest<HTMLElement>('[data-module-index]');
        const nextIndex = Number(section?.dataset.moduleIndex ?? 0);
        setActive(nextIndex);
        setSelected(nextIndex);
      });
    };

    container.addEventListener('scroll', updateActiveModule, { passive: true });
    updateActiveModule();
    return () => {
      container.removeEventListener('scroll', updateActiveModule);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, [entered]);

  useEffect(() => {
    const navigation = document.querySelector<HTMLElement>('.module-list');
    const activeButton = navigation?.querySelectorAll<HTMLElement>('button')[active];
    if (!navigation || !activeButton || navigation.scrollWidth <= navigation.clientWidth) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targetLeft = activeButton.offsetLeft - (navigation.clientWidth - activeButton.clientWidth) / 2;
    navigation.scrollTo({ left: Math.max(0, targetLeft), behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [active]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (!entered) {
          setEntered(true);
          openModule(0);
        }
        else if (selected === null) setSelected(active);
      }
      if (event.key === 'Escape') {
        if (selected !== null) returnHome();
        else returnHome();
      }
      if (selected === null && event.key === 'ArrowDown') setActive((value) => (value + 1) % modules.length);
      if (selected === null && event.key === 'ArrowUp') setActive((value) => (value - 1 + modules.length) % modules.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [entered, active, selected]);

  return (
    <main className={`site-shell theme-${entered ? theme : 'night'} hero-${heroVariant} ${booting ? 'is-booting' : ''} ${entered ? 'is-entered' : ''} ${selected !== null ? 'is-reading' : ''}`}>
      <div className="city-art" aria-hidden="true" />
      <div className="character-layer" aria-hidden="true">
        <span className="character-motion" />
      </div>

      <header className="topbar">
        <button className="brand" onClick={returnHome} aria-label="Return to home">
          <span className="brand-avatar"><img src="/profile-cat.png?v=20261023" alt="" /></span>
          <span className="brand-copy">{content.identity.fullName.toUpperCase()}</span>
        </button>
        <div className="topbar-actions">
          <div className="system-status"><span /><b>{content.identity.status}</b></div>
          {entered && <div className="theme-switcher" role="group" aria-label="Color theme">
            <button type="button" className={theme === 'day' ? 'active' : ''} aria-pressed={theme === 'day'} onClick={() => chooseTheme('day')}>
              <Sun aria-hidden="true" /><span>DAY</span>
            </button>
            <button type="button" className={theme === 'night' ? 'active' : ''} aria-pressed={theme === 'night'} onClick={() => chooseTheme('night')}>
              <Moon aria-hidden="true" /><span>NIGHT</span>
            </button>
          </div>}
        </div>
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
          <button className="enter-button" onClick={() => { setEntered(true); openModule(0); }}><span>{content.ui.enterPortfolio}</span><kbd>↵</kbd></button>
          <nav className="hero-shortcuts" aria-label="Portfolio shortcuts">
            <button className="text-button" onClick={() => { setEntered(true); openModule(2); }}>PROJECTS ↗</button>
            <button className="text-button" onClick={() => { setEntered(true); openModule(5); }}>{content.ui.viewResume} ↗</button>
          </nav>
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
          ? <button className="close-terminal" onClick={returnHome}>← HOME</button>
          : <div className="terminal-key-hints" aria-label="Keyboard controls">
              <button type="button" onClick={returnHome} aria-label="Return to the landing page"><kbd>ESC</kbd></button>
            </div>}
      </section>

      <section ref={contentViewRef} className="content-view" aria-label="Portfolio content">
        <nav className="reading-nav" aria-label="Portfolio sections">
          <button className="reading-nav-home" onClick={returnHome}>← HOME</button>
          {modules.map((module, index) => (
            <button
              key={module.title}
              className={selected === index ? 'active' : ''}
              aria-current={selected === index ? 'location' : undefined}
              onClick={() => openModule(index)}
            >
              <span>{module.number}</span>{module.title}
            </button>
          ))}
        </nav>
        <div className="content-stage">
          <section className="module-section" data-module-index="0" aria-label="About"><About /></section>
          <section className="module-section" data-module-index="1" aria-label="Experience"><Experience /></section>
          <section className="module-section" data-module-index="2" aria-label="Projects"><Projects /></section>
          <section className="module-section" data-module-index="3" aria-label="Research"><Research /></section>
          <section className="module-section" data-module-index="4" aria-label="Activities"><Activities /></section>
          <section className="module-section" data-module-index="5" aria-label="Resume"><Resume /></section>
          <section className="module-section" data-module-index="6" aria-label="Contact"><Contact /></section>
        </div>
      </section>
    </main>
  );
}

function SectionIntro({ index, title }: { index: string; title: string }) {
  return <header className="content-intro"><span>{index}</span><h2>{title}</h2></header>;
}

function Projects() {
  return <div className="content-inner">
    <SectionIntro index="03" title={content.projectsSection.title} />
    <div className="project-grid">
      {projects.map((project) => <article className={`project-card ${project.featured ? 'featured' : ''}`} key={project.name}>
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
      </article>)}
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
    { src: '/projects/pantryagent-overview.jpg', label: 'OVERVIEW', alt: 'PantryAgent overview with receipt, pantry, meal plan, and recipe actions' },
    { src: '/projects/pantryagent-scan.jpg', label: 'RECEIPT SCAN', alt: 'PantryAgent receipt scanning interface' },
    { src: '/projects/pantryagent-plan.jpg', label: 'MEAL PLANNING', alt: 'PantryAgent weekly meal planning interface' },
  ];

  return <div className="pantryagent-gallery" aria-label="PantryAgent product flow">
    {screens.map((screen) => <figure className="pantryagent-screen" key={screen.src}>
      <div className="pantryagent-device"><img src={screen.src} alt={screen.alt} /></div>
      <figcaption>{screen.label}</figcaption>
    </figure>)}
  </div>;
}

function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);

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
    <SectionIntro index="02" title={content.experienceSection.title} />
    <div className="experience-list" ref={timelineRef}>
      {experiences.map((experience) => {
        const websiteLink = experience.links.find((link) => link.label === 'WEBSITE');
        return <article key={experience.company}>
        <time className="timeline-date">{experience.date}</time>
        <div className={`timeline-mark ${experience.current ? 'is-current' : ''}`}><OrganizationMark company={experience.company} /></div>
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
        </div>
      </article>;
      })}
    </div>
  </div>;
}

function Research() {
  return <div className="content-inner research-content">
    <SectionIntro index="04" title={content.researchSection.title} />
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
          <div className="research-entry-copy">
            <p className="lead-copy">{entry.lead}</p>
            <div className="research-detail">
              <span>APPROACH</span>
              <p className="research-body">{entry.body}</p>
            </div>
            <div className="research-result"><span>EVIDENCE</span>{entry.result}</div>
            <div className="tech-line">{entry.technology}</div>
          </div>
        </article>
      ))}
    </div>
  </div>;
}

function About() {
  return <div className="content-inner about-content">
    <SectionIntro index="01" title={content.aboutSection.title} />
    <div className="about-overview">
      <div className="about-copy">
        {content.aboutSection.paragraphs.map((paragraph, index) => <p className={index === 0 ? 'lead-copy' : ''} key={index}>
          {paragraph.segments.map((segment, segmentIndex) => {
            const label = segment.emphasis ? <strong>{segment.text}</strong> : segment.text;
            return 'href' in segment
              ? <a href={segment.href} target="_blank" rel="noreferrer" key={`${segment.text}-${segmentIndex}`}>{label}<span aria-hidden="true">↗</span></a>
              : <span key={`${segment.text}-${segmentIndex}`}>{label}</span>;
          })}
        </p>)}
        <h3 className="toolkit-heading">{content.aboutSection.toolkitTitle}</h3>
        <div className="toolkit">{toolkit.map((item) => <span key={item}><TechnologyMark name={item} />{item}</span>)}</div>
      </div>
      <figure className="about-portrait">
        <img src="/stella-linkedin-portrait.jpg" alt="Stella (Yuxuan) Jiang" />
      </figure>
    </div>
  </div>;
}

function Activities() {
  const [showAllNotes, setShowAllNotes] = useState(false);
  const [expandedCommunity, setExpandedCommunity] = useState<string | null>(null);
  const visibleNotes = showAllNotes ? content.aboutSection.fieldNotes : content.aboutSection.fieldNotes.slice(0, 3);
  return <div className="content-inner activities-content">
    <SectionIntro index="05" title="Activities" />
    <section className="community-list" aria-labelledby="community-title">
      <h3 id="community-title">{content.aboutSection.communityTitle}</h3>
      <ul>
        {content.aboutSection.community.map((item, index) => {
          const isExpanded = expandedCommunity === item.organization;
          const detailsId = `community-details-${index}`;
          return <li className={isExpanded ? 'is-open' : ''} key={item.organization}>
            <div className="community-card">
              <button className="community-card-toggle" type="button" aria-expanded={isExpanded} aria-controls={detailsId} onClick={() => setExpandedCommunity(isExpanded ? null : item.organization)}>
                <span className={`community-mark ${item.organization === 'UCI CUCS' ? 'is-wordmark' : ''}`}><img src={item.logo} alt={item.logoAlt} /></span>
                <span className="community-card-heading">
                  <strong>{item.organization}</strong>
                  <span>{item.role}</span>
                </span>
                <ChevronDown className="community-chevron" aria-hidden="true" />
              </button>
              <div className="community-details-shell" id={detailsId} aria-hidden={!isExpanded}>
                <div className="community-details-clip">
                  <div className="community-details">
                    <p className="community-full-name">{item.fullName}</p>
                    <p className="community-date">{item.date}</p>
                    <div className="community-activities">
                      {item.activities.map((activity) => <div className="community-activity" key={activity.name}>
                        <strong>{activity.name}</strong>
                        <span>{activity.impact}</span>
                      </div>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>})}
      </ul>
    </section>
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
      <footer className="field-notes-continuation">
        <span>MORE FIELD NOTES TO COME</span>
        <blockquote>{content.aboutSection.motto}</blockquote>
      </footer>
    </section>
  </div>;
}

function Contact() {
  const backToTop = () => {
    const container = document.querySelector<HTMLElement>('.content-view');
    if (!container) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    container.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return <div className="content-inner contact-content">
    <SectionIntro index="07" title={content.contactSection.title} />
    <div className="contact-links">
      {content.contactSection.links.map((link) => {
        const Icon = link.label === 'EMAIL' ? Mail : link.label === 'GITHUB' ? FaGithub : FaLinkedinIn;
        return <a href={link.href} key={link.label}><span className="contact-label"><Icon aria-hidden="true" />{link.label}</span>{link.text}<b>↗</b></a>;
      })}
    </div>
    <footer className="site-footer">
      <strong>{content.identity.fullName}</strong>
      <span>© 2026 Stella Jiang</span>
      <button type="button" onClick={backToTop}>Back to top <b aria-hidden="true">↑</b></button>
    </footer>
  </div>;
}

function Resume() {
  const [activeResume, setActiveResume] = useState(content.resumeSection.defaultVariant);
  const [resumeLoading, setResumeLoading] = useState(true);
  const resumeLoaderFrame = useRef<number | null>(null);
  const resumeLoaderTimeout = useRef<number | null>(null);
  const previewImageRef = useRef<HTMLImageElement>(null);
  const resume = content.resumeSection.variants.find((variant) => variant.id === activeResume) ?? content.resumeSection.variants[0];

  const finishResumeLoad = () => {
    if (resumeLoaderFrame.current !== null) window.cancelAnimationFrame(resumeLoaderFrame.current);
    if (resumeLoaderTimeout.current !== null) window.clearTimeout(resumeLoaderTimeout.current);
    resumeLoaderFrame.current = window.requestAnimationFrame(() => {
      resumeLoaderFrame.current = window.requestAnimationFrame(() => setResumeLoading(false));
    });
  };

  useEffect(() => {
    setResumeLoading(true);
    resumeLoaderTimeout.current = window.setTimeout(() => setResumeLoading(false), 3000);

    const image = previewImageRef.current;
    if (image?.complete && image.naturalWidth > 0) finishResumeLoad();

    return () => {
      if (resumeLoaderFrame.current !== null) window.cancelAnimationFrame(resumeLoaderFrame.current);
      if (resumeLoaderTimeout.current !== null) window.clearTimeout(resumeLoaderTimeout.current);
    };
  }, [resume.previewHref]);

  const selectResume = (variantId: string) => {
    if (variantId === activeResume) return;
    if (resumeLoaderFrame.current !== null) window.cancelAnimationFrame(resumeLoaderFrame.current);
    setResumeLoading(true);
    setActiveResume(variantId);
  };

  const openResumePdf = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const previewTab = window.open('about:blank', '_blank');
    if (!previewTab) return;
    previewTab.opener = null;
    previewTab.document.title = `${resume.shortLabel} Resume`;
    previewTab.document.body.innerHTML = '<p style="font:14px system-ui;padding:24px;color:#24333b">Opening PDF preview...</p>';

    try {
      const response = await fetch(resume.href);
      if (!response.ok) throw new Error(`Unable to load PDF: ${response.status}`);
      const pdfBlob = new Blob([await response.arrayBuffer()], { type: 'application/pdf' });
      const previewUrl = URL.createObjectURL(pdfBlob);
      previewTab.location.replace(previewUrl);
      window.setTimeout(() => URL.revokeObjectURL(previewUrl), 300_000);
    } catch {
      previewTab.location.replace(resume.href);
    }
  };

  return <div className="content-inner resume-content">
    <SectionIntro index="06" title={content.resumeSection.title} />
    <div className="resume-layout">
      <div className="resume-card">
        <div className="resume-card-head"><FileText aria-hidden="true" /><span>PUBLIC PROFILE</span></div>
        <h3>{content.resumeSection.name}</h3>
        <p className="resume-headline">{content.resumeSection.headline}</p>
        <p className="resume-education"><GraduationCap aria-hidden="true" />{content.resumeSection.education}</p>
        <p className="resume-note">{content.resumeSection.note}</p>
        <div className="resume-switcher" aria-label="Resume version">
          {content.resumeSection.variants.map((variant) => <button type="button" className={variant.id === activeResume ? 'active' : ''} onClick={() => selectResume(variant.id)} key={variant.id}>{variant.shortLabel}</button>)}
        </div>
        <div className="resume-actions">
          <a className="resume-button" href={resume.href} target="_blank" rel="noreferrer" onClick={openResumePdf}>
            {content.resumeSection.button} <span>↗</span>
          </a>
          <a className="resume-download" href={resume.href} download>
            {content.resumeSection.downloadButton} <span>↓</span>
          </a>
        </div>
      </div>
      <div className="resume-preview">
        <div className="resume-preview-bar"><span>{resume.fileLabel}</span><span>{resume.default ? 'DEFAULT · ' : ''}1 / 1</span></div>
        <a className="resume-preview-body" href={resume.href} target="_blank" rel="noreferrer" onClick={openResumePdf} aria-label={`Open the full ${resume.shortLabel} resume PDF in a new tab`}>
          <img
            key={resume.id}
            ref={previewImageRef}
            className="resume-preview-image"
            src={resume.previewHref}
            alt={`Stella (Yuxuan) Jiang ${resume.shortLabel} resume preview`}
            onLoad={finishResumeLoad}
            onError={finishResumeLoad}
          />
          <div className={`resume-loader ${resumeLoading ? 'is-visible' : ''}`} role="status" aria-hidden={!resumeLoading}>
            {resumeLoading && <div className="resume-loader-scene" aria-hidden="true">
              <img className="resume-loader-cat" src="/resume-cat-run.gif" alt="" />
              <span className="resume-loader-ground" />
            </div>}
            <span className="resume-loader-label">LOADING RESUME</span>
          </div>
        </a>
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
  if (company === 'FocusTrail') return <span className="org-logo focustrail-logo"><img src="/brands/focustrail.svg" alt="" /><b>FocusTrail</b></span>;
  if (company === 'NextTier') return <span className="org-logo nexttier-logo"><img src="/brands/nexttier.png" alt="NextTier logo" /></span>;
  if (company === 'Join-Cheer') return <span className="org-logo join-cheer-logo"><img src="/brands/join-cheer.jpg" alt="Join-Cheer logo" /></span>;
  if (company.startsWith('Guolian Minsheng')) return <span className="org-logo guolian-logo"><img src="/brands/guolian-minsheng-securities.png" alt="Guolian Minsheng Securities official logo" /></span>;
  return <span className="org-logo org-wordmark">ORG</span>;
}

function TechnologyMark({ name }: { name: string }) {
  if (name === 'Python') return <SiPython aria-hidden="true" />;
  if (name === 'TypeScript') return <SiTypescript aria-hidden="true" />;
  if (name === 'Java') return <FaJava aria-hidden="true" />;
  if (name === 'SQL') return <Database aria-hidden="true" />;
  if (name === 'FastAPI') return <SiFastapi aria-hidden="true" />;
  if (name === 'Django') return <SiDjango aria-hidden="true" />;
  if (name === 'Flask') return <SiFlask aria-hidden="true" />;
  if (name === 'Node.js') return <SiNodedotjs aria-hidden="true" />;
  if (name === 'React') return <SiReact aria-hidden="true" />;
  if (name === 'Next.js') return <SiNextdotjs aria-hidden="true" />;
  if (name === 'PostgreSQL') return <SiPostgresql aria-hidden="true" />;
  if (name === 'Redis') return <SiRedis aria-hidden="true" />;
  if (name === 'SQLAlchemy') return <SiSqlalchemy aria-hidden="true" />;
  if (name === 'Celery') return <SiCelery aria-hidden="true" />;
  if (name === 'LangChain') return <SiLangchain aria-hidden="true" />;
  if (name === 'RAG') return <BrainCircuit aria-hidden="true" />;
  if (name === 'LLM Agents') return <Bot aria-hidden="true" />;
  if (name === 'Model Evaluation') return <ChartNoAxesCombined aria-hidden="true" />;
  if (name === 'Docker') return <SiDocker aria-hidden="true" />;
  if (name === 'Kubernetes') return <SiKubernetes aria-hidden="true" />;
  if (name === 'CI/CD') return <GitBranch aria-hidden="true" />;
  if (name === 'Pytest') return <SiPytest aria-hidden="true" />;
  return <Database aria-hidden="true" />;
}
