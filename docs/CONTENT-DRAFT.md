# Stella Portfolio — Content Draft

> Human-editable content record. The website reads from `content/portfolio-content.json`; approved edits in this document must be synchronized to that JSON file.

Last updated: 2026-09-02

## Identity

- Display name: **Stella (Yuxuan) Jiang**
- Hero name: **STELLA JIANG**
- Location: **Irvine, CA**
- Role: **Software Engineer × Applied AI**
- Status: **Available for opportunities**
- Hero introduction: **Building reliable software systems and user-facing AI products across backend services, data pipelines, full-stack development, retrieval, and evaluation.**
- Browser title: **Stella Jiang | AI & Software Engineer**

## Navigation

1. Experience — Engineering, product, and industry experience
2. Projects — FocusTrail · PantryAgent · Intent2Escrow · selected systems
3. Research — LLM agent reliability · trajectory evaluation
4. About — Background, focus, and technical toolkit
5. Resume — Education · experience · selected work
6. Contact — Email · GitHub · LinkedIn

## Experience

Display rule: use a recruiter-scannable web summary rather than copying every resume bullet. Each role contains its date, location, title, and one visible positioning sentence. `VIEW DETAILS` reveals at most two strongest outcomes and compact technology tags; only one role expands at a time. The resume remains the complete record.

Section introduction:

> Engineering experience across applied AI, product development, data systems, and full-stack software.

Current entries:

- **Alibaba Group** — AI Algorithm Intern · Jul 2026–Present · Hangzhou, China  
  Applied AI systems and production-oriented algorithm engineering.
- **FessorAI · UCI Capstone** — Software Engineer · Apr–Jun 2026 · Irvine, CA  
  Built a full-stack AI education platform that generates structured textbooks through a six-stage LLM workflow and lets users query and edit content with an agentic page assistant.
- **FocusTrail** — Founder & Software Engineer · Jan 2026–Present · Irvine, CA  
  Building a local-first AI execution coach for adaptive task planning and recovery; selected for the Alibaba Tmall Campus One Person Company (OPC) student entrepreneurship program.
  Detail layer:
  - Designed dynamic execution recovery that preserves completed work and regenerates the next actionable steps when attention drifts or plans change.
  - Launched the ADTI attention-personality test and 16 original character identities—one for each personality type—extending them into a desktop companion that uses local activity signals to visualize goal progress, flag distraction, and guide recovery.
  - Links: [ADTI Test](https://focustrail-adti.jyxsju.chatgpt.site/) · [Product Demo](https://focus-trail.vercel.app/)
- **NextTier** — Software Engineer Intern · Dec 2025–Feb 2026 · Sacramento, CA  
  Developed applied AI workflows, backend services, and evaluation capabilities for a policy-grounded expense-audit copilot.
- **Beijing Join-Cheer Software Co., Ltd.** — Software Engineer Intern · Jun–Sep 2025 · Beijing, China  
  Contributed to an enterprise AI-agent platform and data services for government and financial-reporting workflows.
- **Guolian Minsheng Securities** — Software Engineer Intern · Jul–Sep 2024 · Shanghai, China  
  Rebuilt Python/SQL ETL pipelines on MaxCompute, improving data accuracy by 25%; automated RDS validation and dashboards, reducing manual QA effort by 30%.
  - Link: [LinkedIn](https://www.linkedin.com/company/guolianminsheng-securities-co-ltd/)

Editorial decision:

- Capybara Science Lab appears only in Research, where its advisor, timeline, research questions, and methodology can be presented without duplicating Experience.

## Projects

Section introduction:

> Software products and systems built around real workflows, reliable architecture, and measurable behavior.

### FocusTrail

- Label: Founder-Built Product
- Meta: Local-First Execution Coach · Alibaba Tmall Campus OPC
- Summary: A local-first productivity product that turns changing goals and activity signals into adaptive plans, distraction feedback, and recoverable next steps.
- Flow: Plan → Observe → Detect drift → Preserve progress → Replan
- Stack: React · Node.js · Express · Gemma · SSE · Local-First AI
- Visual: live product interface showing task entry, navigation, progress, and local quick notes
- Links: [Product Demo](https://focus-trail.vercel.app/) · [ADTI Test](https://focustrail-adti.jyxsju.chatgpt.site/)

### PantryAgent

- Label: Featured
- Meta: Full-Stack / AI Engineer · UC Berkeley AI Hackathon 2026
- Summary: An AI-assisted food management system connecting receipt understanding, pantry inventory, recipes, meal planning, and grocery replenishment.
- Flow: Receipt → Review → Pantry → Plan → Shop → Update
- Stack: Next.js · TypeScript · Supabase · PostgreSQL · Claude
- Visual: complete vertical product screenshot, displayed without cropping
- Link: [GitHub](https://github.com/lalalastella/Pantry-Agent)

### Intent2Escrow

- Label: Featured
- Meta: 3rd Place · MSX Hackathon 2026
- Summary: Natural-language deal terms become validated, inspectable on-chain settlements while signing authority and fund custody remain outside the LLM.
- Flow: Describe → Parse → Validate → Sign → Fund → Verify
- Stack: FastAPI · Pydantic · Solidity · Foundry · Base Sepolia
- Link: [GitHub](https://github.com/lalalastella/Intent2Escrow)

### C&S MovieStore

- Label: Full-Stack System
- Meta: Full-Stack Movie Commerce Platform · Team C&S Restaurant
- Summary: A Java-based movie commerce platform with authenticated search and browsing, session-backed cart workflows, employee operations, and a MySQL-to-MongoDB migration path.
- Flow: Search → Browse → Cart → Checkout → Admin
- Stack: Java Servlets · Apache Tomcat · MySQL · MongoDB · JavaScript · reCAPTCHA
- Visual: employee dashboard from the project demo

### Mosaic

- Label: Personal System
- Meta: Privacy-Aware Activity Analytics
- Summary: A personal activity analytics system that reconstructs digital activity streams into privacy-aware timelines and reflective daily reports.
- Flow: Capture → Reconstruct → Summarize → Reflect
- Focus: Activity Analytics · Timeline Reconstruction · Privacy-Aware Reporting
- Visual: generated daily review that demonstrates the reflective-report output

### AtlasSearch

- Label: Search System
- Meta: Disk-Backed Indexing and Ranked Retrieval
- Summary: A Python search engine that keeps postings on disk, retrieves them through byte offsets, and ranks Boolean-AND candidates with TF-IDF, field boosts, proximity, and PageRank.
- Flow: Parse → Partial offload → Merge → Offset lookup → Rank
- Stack: Python · Flask · NLTK · Inverted Index · PageRank
- Visual: a mock search-result screen faithfully based on the real Flask frontend, paired with an implementation-grounded architecture diagram. Query results, latency, and scores are illustrative.
- Link: [GitHub](https://github.com/lalalastella/AtlasSearch)

## Research

### Trajalysis: LLM Agent Reliability & Evaluation

- Undergraduate Researcher · Capybara Science Lab, UCI
- Advised by Prof. Thomas Zimmermann · April 2026–Present

Lead:

> Studying when correct localization hypotheses emerge, persist, or disappear across software-engineering agent trajectories.

Body:

> I am conducting a trajectory-level study across 50 SWE-bench Verified Mini instances using mini-swe-agent. The work extracts hypotheses from reasoning traces to classify generation, selection, and execution failures and compares four search policies on localization quality, patch correctness, hypothesis survival, and token and step cost.

### Cost-Aware Active Failure Diagnosis

- Applied AI Systems Research · Summer 2026
- Under the guidance of Prof. Kalev Kask

Lead:

> A decision-support system for diagnosing software-service failures when the available evidence is incomplete, noisy, or misleading.

Result:

> A learned Selective RAG gate preserved the accuracy of Always-RAG on Qwen 9B (0.794 vs. 0.792) while reducing retrieval invocation from 100% to 34.4%, harmful switches from 14 to 6, and estimated sequential latency from 4.050s to 2.703s.

## About

Title: **About Stella**

Subtitle:

> I’m interested in what happens after an AI demo works once.

Main copy:

> Computer Science undergraduate with experience building production-oriented LLM applications, retrieval-augmented generation systems, agentic workflows, multimodal data pipelines, and full-stack AI products. Strong background in Python and TypeScript development across FastAPI, Django, Node.js, React, relational databases, asynchronous processing, testing, and cloud deployment. Interested in AI Engineer and Software Engineer roles focused on reliable, user-facing AI systems.

Technical toolkit:

Python · TypeScript · FastAPI · Django · Node.js · React · Next.js · PostgreSQL · Redis · RAG · LLM Agents · Evaluation · Docker · Pytest

## Resume

- Name: Stella (Yuxuan) Jiang
- Headline: AI Engineer · Full-Stack Software Engineer
- Education: B.S. Computer Science · University of California, Irvine · Expected June 2027
- Public version: Software Engineering + Applied AI Systems
- Website behavior: embedded one-page preview with a secondary Download PDF action

## Contact

- Email: jyxsju@gmail.com
- GitHub: github.com/lalalastella
- LinkedIn: linkedin.com/in/yuxuanstellajiang

## Content Editing Rules

1. Do not invent metrics, dates, job titles, awards, or technologies.
2. Avoid repeating the same item across Experience, Research, and Projects unless the repetition serves a distinct navigation purpose.
3. Keep one public resume on the website; use the current SWE + Applied AI version as the broadest profile.
4. Keep the career content primary. The game interface is a visual system, not the subject of the copy.
5. After every approved copy change, update this document and `content/portfolio-content.json` together.
