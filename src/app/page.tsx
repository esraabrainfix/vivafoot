"use client";

import { FormEvent, useEffect, useState } from "react";

const layers = [
  ["01", "Upper", "rPET / rTPU"], ["02", "Thermal module", "Bi₂Te₃ Peltier"],
  ["03", "Structure", "T300 carbon fiber"], ["04", "Sensing", "NTC thermistors · IMU · PPG"],
  ["05", "Power", "Li-ion battery"], ["06", "Control", "ARM Cortex-M4 · BLE 5"], ["07", "Sole", "Contact surface"],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [thermalState, setThermalState] = useState("neutral");
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState("");
  const [activeSection, setActiveSection] = useState("top");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const sections = ["top", "technology", "viva-ai", "science", "applications", "team", "contact"];
    const updateScrollState = () => {
      setShowTop(window.scrollY > 700);
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0);
      const current = sections.reduce((visible, id) => {
        const element = document.getElementById(id);
        return element && element.getBoundingClientRect().top <= 150 ? id : visible;
      }, "top");
      setActiveSection(current);
    };
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const closeMenu = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", closeMenu);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { window.removeEventListener("keydown", closeMenu); document.body.style.overflow = ""; };
  }, [menuOpen]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))) });
      if (!response.ok) throw new Error("Unable to send inquiry");
      setSent(true);
    } catch {
      setFormError("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const nav = [["Technology", "technology"], ["VIVA AI", "viva-ai"], ["Science", "science"], ["Applications", "applications"], ["Team", "team"], ["About", "about"]];

  return <main>
    <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" /><header className="site-header"><a href="#top" className="wordmark"><img src="/vivafoot-logo.png.jpg" alt="VivaFoot" /></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"}><span /><span /></button><nav id="main-navigation" className={menuOpen ? "main-nav open" : "main-nav"}>{nav.map(([label, id]) => <a className={activeSection === id ? "active" : ""} href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="button button-small" href="#contact" onClick={() => setMenuOpen(false)}>Explore VivaFoot <span>↗</span></a></nav></header>

    <section className="hero" id="top"><div className="hero-copy"><h1>MASTER YOUR CORE<br /><em>THROUGH YOUR SOLE.</em></h1><p className="lede">Dual-direction thermal control, engineered into a wearable platform.</p><div className="hero-actions"><a className="button" href="#technology">Explore the technology <span>↗</span></a><a className="text-link" href="#how-it-works">See how it works <span>↓</span></a></div></div><div className="hero-product" aria-label="Editorial footwear reference image"><img src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=85" alt="Unbranded footwear photographed in studio" /><div className="thermal-arc" /></div></section>

    <section className="black-section problem" id="how-it-works"><div className="problem-photo" role="img" aria-label="A person moving through an outdoor environment" /><div className="section-kicker">01 — THE IDEA</div><h2>TEMPERATURE<br /><span>CHANGES EVERYTHING.</span></h2><div className="problem-footnote"><span>ENVIRONMENT</span><b>↓</b><span>FOOT</span><b>↓</b><span>SENSORY SIGNALS</span><b>↓</b><span>THERMAL RESPONSE</span></div></section>

    <section className="idea-section"><div className="section-kicker">02 — PHYSIOLOGY</div><div className="split-heading"><h2>THE BODY<br />ALREADY KNOWS<br /><em>HOW TO ADAPT.</em></h2><p>VivaFoot starts with a simple observation: the foot is a high-information interface between the body and its environment. It is worn for hours, carries a dense sensory network, and contains thermal vascular pathways.</p></div><div className="foot-reasons"><div className="adaptation-visual" role="img" aria-label="Diagram showing environmental input becoming a bodily response"><div className="adaptation-orbit orbit-one" /><div className="adaptation-orbit orbit-two" /><div className="adaptation-core">ADAPT</div><span className="adaptation-label label-environment">ENVIRONMENT</span><span className="adaptation-label label-signal">SIGNAL</span><span className="adaptation-label label-response">RESPONSE</span></div><div className="reason-list">{[["01", "SENSORY", "Dense sensory network"], ["02", "VASCULAR", "Thermal vascular pathways"], ["03", "THERMAL", "An interface with the environment"], ["04", "CONTACT", "Worn for hours every day"]].map(([number, title, text]) => <div className="reason" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

    <section className={`thermal-section ${thermalState}`} id="technology"><div className="section-kicker">03 — THERMAL SYSTEM</div><div className="thermal-content"><div><h2>ONE SYSTEM.<br /><em>TWO DIRECTIONS.</em></h2></div><div className="thermal-visual"><div className="thermal-ring" /><strong>VIVA<br />FOOT</strong><button className="state-button heat-button" onClick={() => setThermalState("heat")}>HEAT</button><button className="state-button cool-button" onClick={() => setThermalState("cool")}>COOL</button><button className="neutral-button" onClick={() => setThermalState("neutral")}>○</button></div></div></section>

    <section className="technology-section" id="viva-ai"><div className="section-kicker">04 — THE SYSTEM</div><div className="split-heading"><h2>SENSE.<br />THINK.<br /><em>ACT. LEARN.</em></h2><p>Signals become context. Context becomes a response. The response becomes data for future personalization. This is the direction of the platform, clearly separated from what the current hardware deploys today.</p></div><div className="journey">{[["01", "SENSE", "Sensors capture", "Skin temperature · Heart rate / PPG · Gait / IMU · GSR · Ambient temperature · Humidity"], ["02", "THINK", "VIVA AI interprets", "A future intelligence layer for physiological signals and context", "ROADMAP"], ["03", "ACT", "Thermal system responds", "Dual-direction thermal control with safety constraints", "CURRENT"], ["04", "LEARN", "Response becomes data", "A foundation for future personalization", "VISION"]].map(([num, title, label, text, badge]) => <article className="journey-step" key={num}><span className="step-number">{num}</span><h3>{title}</h3><strong>{label}</strong><p>{text}</p>{badge && <small>{badge}</small>}</article>)}</div></section>

    <section className="hardware-section" id="science"><div className="section-kicker">05 — HARDWARE ARCHITECTURE</div><div className="hardware-intro"><h2>WHAT'S<br /><em>INSIDE.</em></h2><p>An engineered stack, progressively revealing the physical system beneath the surface.</p></div><div className="exploded"><div className="exploded-shoe"><div className="exp-layer layer-upper">UPPER</div><div className="exp-layer layer-thermal">THERMAL MODULE</div><div className="exp-layer layer-carbon">CARBON FIBER</div><div className="exp-layer layer-sensors">SENSORS</div><div className="exp-layer layer-battery">BATTERY</div><div className="exp-layer layer-sole">SOLE</div></div><div className="layer-list">{layers.map(([num, name, material]) => <div key={num}><span>{num}</span><h3>{name}</h3><p>{material}</p></div>)}</div></div></section>

    <section className="ai-section"><div className="section-kicker">06 — VIVA AI</div><div className="ai-heading"><h2>THE INTELLIGENCE<br /><em>BEHIND THE SYSTEM.</em></h2></div><div className="ai-flow">{["BODY", "SENSORS", "VIVA AI", "DECISION", "THERMAL RESPONSE", "FEEDBACK"].map((item, index) => <div key={item} className={index === 2 ? "ai-node active" : "ai-node"}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < 5 && <b>→</b>}</div>)}</div><div className="today-next"><div><small>CURRENT · V0</small><h3>RULE-BASED CONTROL</h3><p>Thresholds · PID · PWM · Safety constraints</p></div><div><small>ROADMAP · V1 → V5+</small><h3>ADAPTIVE INTELLIGENCE</h3><p>Personal baseline · Multimodal physiology · Personalized intervention · Closed-loop AI</p></div></div></section>

    <section className="flywheel-section"><div className="section-kicker">07 — DATA FLYWHEEL</div><div className="flywheel-heading"><h2>THE DATA<br /><em>FLYWHEEL.</em></h2><p>A platform direction where each cycle creates better context, not a claim of current autonomous medical intelligence.</p></div><div className="flywheel-flow">{["MORE USERS", "MORE PHYSIOLOGICAL DATA", "BETTER AI", "BETTER PERSONALIZATION", "BETTER INTERVENTIONS", "BETTER OUTCOMES"].map((item, index) => <div className="flywheel-node" key={item}><span>0{index + 1}</span><strong>{item}</strong>{index < 5 && <b>↓</b>}</div>)}</div><p className="roadmap-badge">PLATFORM VISION · FUTURE DIRECTION</p></section>

    <section className="validation-section" id="about"><div className="section-kicker">08 — VALIDATION</div><h2>BUILT ON SCIENCE.<br /><em>DESIGNED FOR THE REAL WORLD.</em></h2><div className="validation-grid"><div><strong>MVP</strong><span>Fully built</span></div><div><strong>IP</strong><span>Patent holder</span></div><div><strong>PUBLICATION</strong><span>Springer Nature</span></div><div><strong>RECOGNITION</strong><span>Nile University winner<br />Rally AAST winner · UGRF</span></div></div></section>

    <section className="platform-section" id="applications"><div className="section-kicker">09 — PLATFORM DIRECTION</div><div className="split-heading"><h2>FROM ONE PRODUCT<br /><em>TO A GLOBAL PLATFORM.</em></h2><p>VivaFoot is the first embodiment. The broader VIVA AI platform is designed to extend across hardware, applications, and research directions over time.</p></div><div className="platform-flow"><div><small>CURRENT</small><strong>VIVAFOOT</strong><span>Smart thermal footwear</span></div><b>↓</b><div><small>PLATFORM</small><strong>VIVA AI</strong><span>Physiological intelligence</span></div><b>↓</b><div><small>FUTURE DIRECTIONS</small><strong>WEARABLES</strong><span>Vests · Belts · Outdoor wearables</span></div><b>↓</b><div><small>RESEARCH DIRECTION</small><strong>ENTERPRISE</strong><span>Industrial · Rehabilitation · Safety</span></div></div><div className="research-note"><span>RESEARCH ROADMAP — NOT CURRENT MEDICAL CLAIMS</span><p>Raynaud&apos;s · Multiple Sclerosis · Diabetic Neuropathy · CRPS · Rehabilitation · Pain</p></div></section>

    <section className="team-section" id="team"><div className="section-kicker">09 — THE PEOPLE</div><div className="team-heading"><h2>BUILT BY PEOPLE<br /><em>WHO BUILD.</em></h2><p>Engineering, research, and an ambition to make the body&apos;s signals more useful.</p></div><div className="team-grid">{[["ESSRA ELMORSHEDY", "Co-Founder & CTO", "Researcher & Innovator", "esraaelmorshedy2@gmail.com"], ["DR. MOHAMED SALLAM", "Founder & CEO", "Postdoctoral Researcher & Biotech Innovator", "m.sallam@aucegypt.edu"]].map(([name, role, bio, email], index) => <article className="team-member" key={name}><div className={`portrait portrait-${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span></div><h3>{name}</h3><strong>{role}</strong><p>{bio}</p><a className="team-email" href={`mailto:${email}`}>{email}</a></article>)}</div></section>

    <section className="contact-section" id="contact"><div className="section-kicker">10 — CONTACT</div><div className="contact-grid"><div><h2>BUILD THE<br /><em>FUTURE WITH US.</em></h2><p>For research, partnerships, investment, or product inquiries.</p><div className="contact-details"><strong>Esraa Elmorshedy</strong><span>Co-Founder & CTO · Researcher & Innovator</span><a href="mailto:esraaelmorshedy2@gmail.com">esraaelmorshedy2@gmail.com</a><strong>Dr. Mohamed Sallam</strong><span>Founder & CEO · Postdoctoral Researcher & Biotech Innovator</span><a href="mailto:m.sallam@aucegypt.edu">m.sallam@aucegypt.edu</a></div></div><form onSubmit={submit} aria-live="polite">{sent ? <div className="form-success"><span>✓</span><h3>Thank you.</h3><p>Your inquiry is ready for the VivaFoot team.</p></div> : <><label htmlFor="contact-name">Name<input id="contact-name" required name="name" /></label><label htmlFor="contact-email">Email<input id="contact-email" required type="email" name="email" /></label><label htmlFor="contact-org">Organization<input id="contact-org" name="organization" /></label><label htmlFor="contact-type">Inquiry type<select id="contact-type" name="type" defaultValue="general"><option value="general">General inquiry</option><option value="research">Research</option><option value="partnership">Partnership</option></select></label><label htmlFor="contact-message">Message<textarea id="contact-message" required name="message" rows={4} /></label>{formError && <p className="form-error" role="alert">{formError}</p>}<button className="button" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send inquiry"} <span>{isSubmitting ? "" : "↗"}</span></button></>}</form></div></section>
    <footer className="site-footer"><a href="#top" className="wordmark"><img src="/vivafoot-logo.png.jpg" alt="VivaFoot" /></a><p>MASTER YOUR CORE<br />THROUGH YOUR SOLE.</p><div><a href="#technology">Technology</a><a href="#viva-ai">VIVA AI</a><a href="#science">Science</a><a href="#applications">Applications</a><a href="#team">Team</a><a href="#contact">Contact</a></div><small>© 2026 VivaFoot. Current product and roadmap clearly distinguished.</small></footer>{showTop && <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">↑</button>}
  </main>;
}
