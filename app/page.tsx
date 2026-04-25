"use client";
import { useEffect, useRef, useState } from "react";

/* ───────────────────────────────────── DATA */
const EXPERIENCES = [
  {
    year: "2024–2025",
    role: "Frontend Developer",
    company: "LDB Africa",
    desc: "Led UI development for a fintech platform serving thousands of users across Africa. Architected reusable component systems, integrated real-time APIs, and slashed load times by 40%.",
    tags: ["React", "TypeScript", "REST APIs", "Performance"],
  },
  {
    year: "2023–2024",
    role: "Backend Mentor",
    company: "Genesys Tech Hub",
    desc: "Shaped the next generation of Nigerian developers — guiding cohorts through server-side architecture, database design, and production-grade API development.",
    tags: ["Node.js", "Mentorship", "API Design", "MongoDB"],
  },
  {
    year: "2021–Now",
    role: "Full-Stack Developer",
    company: "Freelance",
    desc: "Built and shipped end-to-end web products for clients across industries — from e-commerce platforms to dashboards — owning the full lifecycle from wireframe to deployment.",
    tags: ["Next.js", "Node.js", "MongoDB", "React"],
  },
  {
    year: "2021–2022",
    role: "Web Dev Internship",
    company: "University of Ibadan",
    desc: "Immersive training across the full web stack: React on the frontend, Node.js on the backend, MongoDB for data, all wrapped with Git-based collaborative workflows.",
    tags: ["HTML/CSS", "JavaScript", "React", "Git"],
  },
];

const SKILLS = [
  {
    num: "01",
    title: "Frontend",
    pills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind", "Responsive Design"],
  },
  {
    num: "02",
    title: "Backend",
    pills: ["Node.js", "Express.js", "REST APIs", "MongoDB", "Database Design", "Server-Side Logic"],
  },
  {
    num: "03",
    title: "Tooling",
    pills: ["Git & GitHub", "Version Control", "Web Security", "API Integration", "Testing & QA"],
  },
  {
    num: "04",
    title: "People",
    pills: ["Technical Mentorship", "Team Collaboration", "Curriculum Design", "Problem-Solving", "Adaptability"],
  },
];

const TECHS = ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "Express", "Git", "REST APIs", "Tailwind CSS", "JavaScript"];

const MARQUEE_ITEMS = ["Full-Stack Developer", "•", "React & Node.js", "•", "Abuja, Nigeria", "•", "Open to Work", "•"];

/* ─── UNSPLASH IMAGES (dev-themed, royalty-free) */
const ABOUT_IMG = "https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?w=600&q=80";
const HERO_SHAPE_IMG = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80";

/* ───────────────────────────────────── COMPONENT */
export default function Portfolio() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  /* cursor */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorDot.current) {
        cursorDot.current.style.left = e.clientX + "px";
        cursorDot.current.style.top = e.clientY + "px";
      }
      if (cursorRing.current) {
        cursorRing.current.style.left = e.clientX + "px";
        cursorRing.current.style.top = e.clientY + "px";
      }
    };
    const over = () => cursorRing.current?.classList.add("hovered");
    const out = () => cursorRing.current?.classList.remove("hovered");
    const interactables = document.querySelectorAll("a,button,.btn,.exp-item,.skill-group,.tech-chip");
    window.addEventListener("mousemove", move);
    interactables.forEach(el => { el.addEventListener("mouseenter", over); el.addEventListener("mouseleave", out); });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* scroll tracking */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["home","about","experience","skills","contact"];
      const y = window.scrollY + 120;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) setActive(id);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* intersection observer for fade-in */
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); } });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <style>{`
        .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }
        .hero-title-word { display: inline-block; overflow: hidden; }
        .hero-title-word span { display: inline-block; animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards; opacity: 0; }
        @keyframes slideUp {
          from { transform: translateY(110%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .word-1 span { animation-delay: 0.1s; }
        .word-2 span { animation-delay: 0.25s; }
        .word-3 span { animation-delay: 0.4s; }
        .hero-meta { animation: fadeSlide 0.9s 0.7s ease forwards; opacity: 0; }
        @keyframes fadeSlide { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
        .mobile-menu {
          position: fixed; inset: 0; z-index: 49; background: var(--black);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 40px;
          transform: translateX(100%); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .mobile-menu.open { transform: translateX(0); }
        .mobile-nav-link {
          font-family: 'Bebas Neue', sans-serif; font-size: 48px; letter-spacing: 0.05em;
          color: var(--muted); text-decoration: none; transition: color 0.2s;
        }
        .mobile-nav-link:hover { color: var(--accent); }
      `}</style>

      {/* Cursor */}
      <div className="cursor-dot" ref={cursorDot} />
      <div className="cursor-ring" ref={cursorRing} />

      {/* Nav */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#" className="nav-logo" onClick={e => { e.preventDefault(); scrollTo("home"); }}>
          Jesse<span>.</span>
        </a>
        <ul className="nav-links">
          {["home","about","experience","skills","contact"].map(l => (
            <li key={l}>
              <a href={`#${l}`} className={`nav-link ${active === l ? "active" : ""}`}
                onClick={e => { e.preventDefault(); scrollTo(l); }}>{l}</a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: "none", background: "none", border: "none", color: "var(--offwhite)", fontSize: 24, cursor: "pointer", zIndex: 60, position: "relative" }}
          className="hamburger"
          aria-label="menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
        <style>{`.hamburger { display: none !important; } @media(max-width:768px){ .hamburger { display: block !important; } }`}</style>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        {["home","about","experience","skills","contact"].map(l => (
          <a key={l} className="mobile-nav-link" href={`#${l}`}
            onClick={e => { e.preventDefault(); scrollTo(l); }}>{l.toUpperCase()}</a>
        ))}
      </div>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section id="home" className="hero">
        <div className="hero-bg-orb orb-1" />
        <div className="hero-bg-orb orb-2" />

        {/* Floating code card */}
        <div style={{
          position: "absolute", right: "6%", top: "22%",
          background: "var(--surface2)", border: "1px solid var(--border)",
          borderRadius: 8, padding: "20px 24px",
          fontFamily: "monospace", fontSize: 12, color: "var(--muted)",
          lineHeight: 1.8, zIndex: 3, maxWidth: 280,
          animation: "float 5s ease-in-out infinite",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
        }}>
          <div style={{ color: "var(--accent)", marginBottom: 8, fontSize: 11, letterSpacing: "0.15em" }}>// jesse.config.js</div>
          <div><span style={{ color: "#c792ea" }}>const</span> <span style={{ color: "#82aaff" }}>dev</span> = {"{"}</div>
          <div style={{ paddingLeft: 16 }}><span style={{ color: "var(--accent2)" }}>name</span>: <span style={{ color: "#c3e88d" }}>&quot;Jesse Obinna&quot;</span>,</div>
          <div style={{ paddingLeft: 16 }}><span style={{ color: "var(--accent2)" }}>stack</span>: <span style={{ color: "#c3e88d" }}>&quot;Full-Stack&quot;</span>,</div>
          <div style={{ paddingLeft: 16 }}><span style={{ color: "var(--accent2)" }}>open</span>: <span style={{ color: "#ff9f7f" }}>true</span>,</div>
          <div style={{ paddingLeft: 16 }}><span style={{ color: "var(--accent2)" }}>location</span>: <span style={{ color: "#c3e88d" }}>&quot;Abuja 🇳🇬&quot;</span>,</div>
          <div>{"}"}</div>
        </div>

        {/* Floating stat card */}
        <div style={{
          position: "absolute", right: "5%", bottom: "20%",
          background: "var(--accent)", color: "var(--black)",
          borderRadius: 8, padding: "20px 28px",
          zIndex: 3, animation: "float 6s ease-in-out infinite 1s",
          boxShadow: "0 30px 60px rgba(200,255,87,0.2)",
        }}>
          <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 48, lineHeight: 1 }}>4+</div>
          <div style={{ fontSize: 12, letterSpacing: "0.1em", marginTop: 4, opacity: 0.7 }}>YEARS BUILDING</div>
        </div>

        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            Full-Stack Developer · Abuja, Nigeria
          </div>

          <h1 className="hero-title">
            <div className="hero-title-word word-1"><span>JESSE</span></div>
            <br />
            <div className="hero-title-word word-2"><span style={{ color: "var(--accent)" }}>OBINNA</span></div>
            <br />
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div className="hero-title-word word-3"><span>BUILDS</span></div>
              <div className="animate-float" style={{
                width: 80, height: 80, borderRadius: "50%",
                overflow: "hidden", border: "2px solid var(--accent)",
                flexShrink: 0, alignSelf: "flex-end", marginBottom: 12,
              }}>
                <img src={HERO_SHAPE_IMG} alt="code" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(30%)" }} />
              </div>
            </div>
          </h1>

          <div className="hero-subtitle-row hero-meta">
            <p className="hero-desc">
              Crafting scalable web applications with clean code, thoughtful architecture, and pixel-perfect interfaces.
            </p>
            <div className="hero-ctas">
              <a href="#experience" className="btn btn-lime" onClick={e => { e.preventDefault(); scrollTo("experience"); }}>
                View Work ↗
              </a>
              <a href="#contact" className="btn btn-ghost" onClick={e => { e.preventDefault(); scrollTo("contact"); }}>
                Let&apos;s Talk
              </a>
            </div>
          </div>
        </div>

        <div className="hero-scroll-indicator" style={{ alignSelf: "center" }}>
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="marquee-item">
              {item === "•" ? <span className="marquee-dot">✦</span> : item}&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ─────────────────────────────────────────── */}
      <section id="about" className="section">
        <div className="section-label">About Me</div>
        <h2 className="section-title reveal">WHO I AM</h2>

        <div className="about-grid">
          {/* Image column */}
          <div className="about-image-wrap reveal">
            <div className="about-image-frame">
              <img src={ABOUT_IMG} alt="Developer at work" />
            </div>
            <div className="about-image-accent" />
            <div className="about-tag">FULL-STACK DEV</div>
          </div>

          {/* Text column */}
          <div>
            <p className="about-text reveal reveal-delay-1">
              I&apos;m <strong>Jesse Igweachi Obinna</strong> — a Full-Stack Developer who believes great software is equal parts engineering precision and human empathy. I don&apos;t just write code; I craft <strong>experiences that work</strong>.
            </p>
            <p className="about-text reveal reveal-delay-2" style={{ marginTop: 20 }}>
              My foundation in <strong>Mathematics</strong> (B.Sc, Nnamdi Azikiwe University) means I approach every problem analytically — decomposing complexity, finding elegant solutions, and building systems that scale.
            </p>
            <p className="about-text reveal reveal-delay-3" style={{ marginTop: 20 }}>
              Beyond coding, I&apos;ve mentored the next wave of Nigerian developers at Genesys Tech Hub, and I bring that same collaborative energy to every team I join.
            </p>

            <div className="about-stats reveal reveal-delay-4">
              <div className="stat-item">
                <div className="stat-number">4+</div>
                <div className="stat-label">Years Building</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">20+</div>
                <div className="stat-label">Projects Shipped</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Devs Mentored</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 16, marginTop: 32 }} className="reveal">
              <a href="mailto:jesseobinna7@gmail.com" className="btn btn-lime">
                📧 Email Me
              </a>
              <a href="https://github.com/obaikoko" target="_blank" rel="noreferrer" className="btn btn-ghost">
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STRIP ─────────────────────────────────────── */}
      <div className="tech-strip" style={{ borderBottom: "1px solid var(--border)" }}>
        <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginRight: 8 }}>Tech I use:</span>
        {TECHS.map(t => (
          <div className="tech-chip" key={t}>
            <div className="tech-chip-dot" />
            {t}
          </div>
        ))}
      </div>

      {/* ── EXPERIENCE ─────────────────────────────────────── */}
      <section id="experience" className="section">
        <div className="section-label">Career</div>
        <h2 className="section-title reveal">EXPERIENCE</h2>

        <div className="experience-list">
          {EXPERIENCES.map((exp, i) => (
            <div className={`exp-item reveal reveal-delay-${Math.min(i + 1, 4)}`} key={i}>
              <div className="exp-year">{exp.year}</div>
              <div className="exp-content">
                <div className="exp-role">{exp.role}</div>
                <div className="exp-company">{exp.company}</div>
                <div className="exp-desc">{exp.desc}</div>
                <div className="exp-tags">
                  {exp.tags.map(t => <span key={t} className="exp-tag">{t}</span>)}
                </div>
              </div>
              <div className="exp-arrow">↗</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SKILLS ─────────────────────────────────────────── */}
      <section id="skills" className="section" style={{ paddingTop: 0 }}>
        <div className="section-label">Capabilities</div>
        <h2 className="section-title reveal">SKILLS</h2>

        <div className="skills-grid reveal">
          {SKILLS.map((g, i) => (
            <div className="skill-group" key={i}>
              <div className="skill-group-num">{g.num}</div>
              <div className="skill-group-title">{g.title}</div>
              <div className="skill-pills">
                {g.pills.map(p => <span key={p} className="skill-pill">{p}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────── */}
      <section id="contact" className="contact-section">
        <div className="contact-bg-text">LET&apos;S TALK</div>
        <div className="section-label reveal" style={{ justifyContent: "center" }}>Contact</div>
        <h2 className="contact-title reveal">
          GOT A<br />
          <span style={{ color: "var(--accent)", fontStyle: "italic" }}>PROJECT?</span>
        </h2>
        <p className="contact-sub reveal reveal-delay-1">
          I&apos;m open to full-time roles, freelance projects, and interesting collaborations. Let&apos;s build something great together.
        </p>
        <div className="contact-links reveal reveal-delay-2">
          <a href="mailto:jesseobinna7@gmail.com" className="btn btn-lime">
            📧 jesseobinna7@gmail.com
          </a>
          <a href="https://ng.linkedin.com/in/jesse-igweachia9baa4237" target="_blank" rel="noreferrer" className="btn btn-ghost">
            LinkedIn ↗
          </a>
          <a href="https://github.com/obaikoko" target="_blank" rel="noreferrer" className="btn btn-ghost">
            GitHub ↗
          </a>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="footer">
        <span>© {new Date().getFullYear()} Jesse Igweachi Obinna</span>
        <span style={{ color: "var(--muted)" }}>Built with Next.js · Abuja, Nigeria 🇳🇬</span>
        <div className="footer-socials">
          <a href="https://github.com/obaikoko" target="_blank" rel="noreferrer" className="footer-social">GH</a>
          <a href="https://ng.linkedin.com/in/jesse-igweachia9baa4237" target="_blank" rel="noreferrer" className="footer-social">LI</a>
          <a href="mailto:jesseobinna7@gmail.com" className="footer-social">EM</a>
        </div>
      </footer>
    </>
  );
}
