import { useEffect, useState } from 'react';
import { motion, type Variants, type EasingDefinition } from 'framer-motion';
import { FiGithub, FiLinkedin, FiSun, FiMoon } from 'react-icons/fi';
import HeroCanvas from './components/HeroCanvas';
import {
  aboutContent,
  certificates,
  contactInfo,
  experiences,
  heroContent,
  projects,
  skillGroups,
} from './content';

const easeCurve: EasingDefinition = [0.16, 1, 0.3, 1];

const sectionFade: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeCurve },
  },
};

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark';
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="page">
      <header className="nav">
        <a href="#" className="brand">
          <span>{heroContent.name}</span>
          <small>Information Systems</small>
        </a>
        <nav>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>
        <button
          aria-label="Toggle color mode"
          className="theme-toggle"
          onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        >
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="eyebrow">{heroContent.location}</p>
            <h1>{heroContent.tagline}</h1>
            <p className="lead">{heroContent.description}</p>
            <div className="chips">
              {heroContent.focus.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
            <motion.a
              href="#projects"
              className="cta"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              Lihat Proyek Unggulan
            </motion.a>
            <p className="availability">{heroContent.availability}</p>
            <div className="socials">
              <a href={contactInfo.socials[0].url} target="_blank" rel="noreferrer">
                <FiLinkedin />
              </a>
              <a href={contactInfo.socials[1].url} target="_blank" rel="noreferrer">
                <FiGithub />
              </a>
            </div>
          </motion.div>
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <HeroCanvas />
            <div className="hero-overlay">
              <span>3D Cyber Globe</span>
              <small>Menggambarkan konektivitas teknologi</small>
            </div>
          </motion.div>
        </section>

        <motion.section id="about" className="panel" variants={sectionFade} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div className="section-heading">
            <p className="eyebrow">Identitas</p>
            <h2>About Me</h2>
          </div>
          <p className="lead">{aboutContent.mission}</p>
          <p className="body">{aboutContent.story}</p>
          <div className="grid three">
            {aboutContent.highlights.map((line) => (
              <div key={line} className="card highlight">
                {line}
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section id="skills" className="panel" variants={sectionFade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="section-heading">
            <p className="eyebrow">Capabilities</p>
            <h2>Skills & Toolkit</h2>
          </div>
          <div className="grid two">
            {skillGroups.map((group) => (
              <div key={group.category} className="card skill-card">
                <h3>{group.category}</h3>
                <ul>
                  {group.skills.map((skill) => (
                    <li key={skill.name}>
                      <span>{skill.name}</span>
                      <small>{skill.level}</small>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section id="projects" className="panel" variants={sectionFade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="section-heading">
            <p className="eyebrow">Case Studies</p>
            <h2>Selected Projects</h2>
          </div>
          <div className="grid three">
            {projects.map((project) => (
              <motion.article key={project.title} className="card project-card" whileHover={{ translateY: -6 }}>
                <div className="project-image" style={{ backgroundImage: `url(${project.image})` }} />
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="chips small">
                    {project.tech.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                    Lihat detail →
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section id="experience" className="panel" variants={sectionFade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="section-heading">
            <p className="eyebrow">Journey</p>
            <h2>Experience</h2>
          </div>
          <div className="timeline">
            {experiences.map((exp) => (
              <div key={exp.role} className="timeline-item">
                <div>
                  <h3>{exp.role}</h3>
                  <p className="muted">{exp.period}</p>
                </div>
                <p>{exp.detail}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section id="certificates" className="panel" variants={sectionFade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="section-heading">
            <p className="eyebrow">Validation</p>
            <h2>Certificates</h2>
          </div>
          <div className="grid two">
            {certificates.map((certificate) => (
              <div key={certificate.title} className="card certificate">
                <h3>{certificate.title}</h3>
                <p className="muted">{certificate.issuer}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section id="contact" className="panel contact" variants={sectionFade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="section-heading">
            <p className="eyebrow">Let’s Talk</p>
            <h2>Contact</h2>
          </div>
          <p>
            Saya terbuka untuk kolaborasi, freelance project, maupun diskusi komunitas teknologi. Kirimkan email atau hubungi saya lewat platform favorit Anda.
          </p>
          <div className="contact-grid">
            <a href={`mailto:${contactInfo.email}`} className="card contact-card">
              <span>Email</span>
              <strong>{contactInfo.email}</strong>
            </a>
            <a href={`https://wa.me/${contactInfo.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="card contact-card">
              <span>WhatsApp</span>
              <strong>{contactInfo.phone}</strong>
            </a>
            {contactInfo.socials.map((social) => (
              <a key={social.label} href={social.url} target="_blank" rel="noreferrer" className="card contact-card">
                <span>{social.label}</span>
                <strong>Kunjungi profil</strong>
              </a>
            ))}
          </div>
          <motion.a href="https://www.linkedin.com/in/anugrah-putra-fajar-9360a6368/" target="_blank" rel="noreferrer" className="cta secondary" whileHover={{ scale: 1.03 }}>
            Hubungi via LinkedIn
          </motion.a>
        </motion.section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} {heroContent.name}. Crafted with React, Three.js, and cinta pada teknologi Sumatera Barat.</p>
      </footer>
    </div>
  );
};

export default App;

