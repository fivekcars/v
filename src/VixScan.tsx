import { useEffect, useRef, useState, type FormEvent } from "react";
import "./vix-scan.css";
import { mailtoLink, site } from "./site-config";

const topics = [
  "Mobile diagnostics",
  "Independent vehicle inspection",
  "Pre-purchase inspection",
  "Vehicle Intelligence Passport",
  "Fleet condition desk",
  "Dealer stock day",
  "Trade diagnostic support",
  "Future EV battery compatibility",
  "Other / not sure yet",
];

function BrandMark() {
  return (
    <svg className="vix-brand-mark" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path d="M8 7.5h27.5v8M8 36.5V7.5M8 22h18.5M26.5 22v14.5H8" stroke="currentColor" strokeWidth="2.4" />
      <path d="m14 15 8 13 8-13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
      <circle cx="35.5" cy="35.5" r="3" fill="#35C4B4" />
    </svg>
  );
}

function Brand() {
  return (
    <a className="vix-brand" href="#top" aria-label="VIX-SCAN home">
      <BrandMark />
      <span className="vix-brand-name">
        VIX-SCAN
        <small>INDEPENDENT · MOBILE · EVIDENCE-LED</small>
      </span>
    </a>
  );
}

function InspectionFrame() {
  return (
    <svg className="vix-frame-glyph" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <path d="M5 11V5h6M23 5h6v6M29 23v6h-6M11 29H5v-6M8 17h18" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="25.5" cy="25.5" r="2.5" fill="#35C4B4" />
    </svg>
  );
}

function VehicleSchematic() {
  return (
    <svg className="vix-car-figure" viewBox="0 0 700 310" role="img" aria-labelledby="vix-car-title vix-car-desc">
      <title id="vix-car-title">Illustrative vehicle inspection schematic</title>
      <desc id="vix-car-desc">A technical line drawing of a vehicle within an inspection frame, with two evidence points.</desc>
      <defs>
        <pattern id="vix-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="#527078" strokeOpacity=".23" strokeWidth=".8" />
        </pattern>
        <linearGradient id="vix-body-wash" x1="200" y1="110" x2="500" y2="250" gradientUnits="userSpaceOnUse">
          <stop stopColor="#35C4B4" stopOpacity=".2" />
          <stop offset="1" stopColor="#35C4B4" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="15" y="17" width="670" height="270" fill="url(#vix-grid)" />
      <path d="M93 213h37l24-55c7-16 20-27 38-32l64-18 46-41c11-10 24-15 39-15h86c17 0 32 7 43 20l50 61 42 17c12 5 20 16 20 29v34h-58" fill="url(#vix-body-wash)" stroke="#8CCBC4" strokeWidth="2" />
      <path d="M93 213v-18c0-9 6-16 14-18l47-9m21-44 89-24 41-37m15 2-3 43h142l-37-45m-75 2v43m-132 39h382" fill="none" stroke="#8CCBC4" strokeWidth="1.3" strokeDasharray="3 5" />
      <path d="M130 213h71m315 0h75M209 228h260" fill="none" stroke="#F0AC48" strokeWidth="2" />
      <circle cx="213" cy="214" r="32" fill="#172832" stroke="#8CCBC4" strokeWidth="2" />
      <circle cx="213" cy="214" r="12" fill="none" stroke="#8CCBC4" strokeWidth="1.5" />
      <path d="M213 178v10m0 52v10m36-36h-10m-52 0h-10" stroke="#8CCBC4" strokeWidth="1.5" />
      <circle cx="482" cy="214" r="32" fill="#172832" stroke="#8CCBC4" strokeWidth="2" />
      <circle cx="482" cy="214" r="12" fill="none" stroke="#8CCBC4" strokeWidth="1.5" />
      <path d="M482 178v10m0 52v10m36-36h-10m-52 0h-10" stroke="#8CCBC4" strokeWidth="1.5" />
      <circle cx="292" cy="108" r="4" fill="#F0AC48" />
      <path d="M292 108V73h-57" fill="none" stroke="#F0AC48" strokeWidth="1" />
      <text x="174" y="69" fill="#D0DAD9" fontSize="9" letterSpacing="1">BODY / OBSERVE</text>
      <circle cx="518" cy="140" r="4" fill="#35C4B4" />
      <path d="M518 140h68V96" fill="none" stroke="#35C4B4" strokeWidth="1" />
      <text x="537" y="87" fill="#D0DAD9" fontSize="9" letterSpacing="1">SYSTEM / REVIEW</text>
      <path d="M92 251h516M92 247v8m516-8v8" fill="none" stroke="#74878A" strokeWidth="1" />
      <text x="326" y="271" fill="#9EAFB1" fontSize="9" letterSpacing="1">CONDITION · CONTEXT · NEXT STEP</text>
    </svg>
  );
}

function PassportMark() {
  return (
    <svg className="vix-passport-mark" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path d="M29 12h44l18 18v77H29V12Z" fill="#F4F6F7" stroke="currentColor" strokeWidth="1.7" />
      <path d="M73 12v19h18M42 49h38M42 61h38M42 73h23" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="77" cy="83" r="15" fill="#172832" stroke="#35C4B4" strokeWidth="1.5" />
      <path d="m70.5 83 4.5 4.5 9-10" stroke="#35C4B4" strokeWidth="1.8" />
    </svg>
  );
}

function CoverageSchematic() {
  return (
    <div className="vix-map" role="img" aria-label="Diagram of the Furness service area showing Dalton-in-Furness, Barrow-in-Furness and Ulverston">
      <span className="vix-map-north">N <b>↑</b></span>
      <svg viewBox="0 0 480 420" aria-hidden="true">
        <path d="m81 95 82-41 73 25 45-12 59 35-12 64 35 55-22 45 11 59-67 24-51-34-44 26-57-21-12-61-52-35 15-62-27-67Z" fill="#e9f0ef" stroke="#b2c9c6" strokeWidth="1.4" />
        <path d="m108 122 57-14 36 39-8 50 35 38-13 46 22 39m-65-173 47-31 34 40 52-8 39 23m-147 26 50-20 47 20 51-26m-113 92 57-17 48 16 26 53" fill="none" stroke="#a7bfbc" strokeWidth="1" strokeDasharray="2 5" />
        <path d="M131 147c13 26 28 45 46 66s27 37 38 66" fill="none" stroke="#087E80" strokeWidth="2.2" strokeDasharray="5 5" />
        <circle cx="132" cy="145" r="7" fill="#F0AC48" stroke="#fff" strokeWidth="3" />
        <circle cx="178" cy="212" r="7" fill="#087E80" stroke="#fff" strokeWidth="3" />
        <circle cx="216" cy="279" r="7" fill="#087E80" stroke="#fff" strokeWidth="3" />
        <path d="M132 145H69" stroke="#172832" strokeWidth="1" />
        <text x="22" y="141" fill="#172832" fontSize="12" fontWeight="700">DALTON</text>
        <text x="22" y="155" fill="#70808A" fontSize="9">IN FURNESS</text>
        <path d="M178 212h65" stroke="#172832" strokeWidth="1" />
        <text x="248" y="208" fill="#172832" fontSize="12" fontWeight="700">BARROW</text>
        <text x="248" y="222" fill="#70808A" fontSize="9">IN FURNESS</text>
        <path d="M216 279h66" stroke="#172832" strokeWidth="1" />
        <text x="286" y="275" fill="#172832" fontSize="12" fontWeight="700">ULVERSTON</text>
        <text x="321" y="371" fill="#70808A" fontSize="9" letterSpacing="1">SERVICE AREA / NOT TO SCALE</text>
      </svg>
    </div>
  );
}

export function VixScan() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogRequested, setDialogRequested] = useState(false);
  const [topic, setTopic] = useState(topics[0]);
  const [draft, setDraft] = useState("");
  const [copyFeedback, setCopyFeedback] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !dialogRequested || dialog.open) return;
    dialog.showModal();
    dialog.querySelector<HTMLSelectElement>("select")?.focus();
  }, [dialogRequested]);

  const openEnquiry = (selectedTopic?: string) => {
    setTopic(selectedTopic && topics.includes(selectedTopic) ? selectedTopic : topics[0]);
    setDraft("");
    setCopyFeedback("");
    setDialogRequested(true);
  };

  const closeEnquiry = () => {
    if (dialogRef.current?.open) dialogRef.current.close();
    setDialogRequested(false);
  };

  const createDraft = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (field: string) => String(data.get(field) || "").trim();
    const lines = [
      "VIX-SCAN — new enquiry",
      "",
      `Name: ${value("name") || "Not provided"}`,
      `Phone or email: ${value("contact") || "Not provided"}`,
      `Enquiry topic: ${value("topic") || "Not specified"}`,
      `Vehicle make / model: ${value("vehicle") || "Not provided"}`,
      `Approximate year: ${value("year") || "Not provided"}`,
      `Vehicle location: ${value("location") || "Not provided"}`,
      "",
      "What I would like help understanding:",
      value("details") || "Not provided",
      "",
      "Please confirm scope, travel and current availability before any booking.",
    ];
    setDraft(lines.join("\n"));
    setCopyFeedback("");
    window.setTimeout(() => outputRef.current?.focus(), 0);
  };

  const copyDraft = async () => {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft);
      setCopyFeedback("Copied to clipboard.");
    } catch {
      const output = outputRef.current;
      output?.focus();
      output?.select();
      const copied = document.execCommand("copy");
      setCopyFeedback(copied ? "Copied to clipboard." : "Select the draft text and copy it.");
    }
  };

  const downloadDraft = () => {
    if (!draft) return;
    const blob = new Blob([draft], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "vix-scan-enquiry-draft.txt";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setCopyFeedback("Draft downloaded to your device.");
  };

  const emailDraft = () => {
    if (!draft) return;
    window.location.href = mailtoLink(`VIX-SCAN enquiry — ${topic}`, draft);
    setCopyFeedback(`Opening your email app. If nothing opens, email ${site.email} directly.`);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="vix-scan">
      <a className="vix-skip" href="#main">Skip to content</a>
      <header className="vix-header">
        <div className="vix-header-inner">
          <Brand />
          <button
            className="vix-menu"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="vix-primary-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span />
          </button>
          <nav className={`vix-nav${menuOpen ? " is-open" : ""}`} id="vix-primary-nav" aria-label="Main navigation">
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#approach" onClick={closeMenu}>How it works</a>
            <a href="#fleet" onClick={closeMenu}>For business</a>
            <a href="#coverage" onClick={closeMenu}>Working area</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
            <a
              className="vix-header-phone"
              href={site.phoneLink}
              onClick={closeMenu}
              aria-label={`Call VIX-SCAN on ${site.phoneDisplay}`}
            >
              <span aria-hidden="true">☏</span> {site.phoneDisplay}
            </a>
            <button className="vix-nav-cta" type="button" onClick={() => { closeMenu(); openEnquiry("Independent vehicle inspection"); }}>
              Request an assessment <span aria-hidden="true">↗</span>
            </button>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="vix-hero" id="top">
          <div className="vix-hero-inner">
            <div className="vix-hero-copy">
              <p className="vix-kicker vix-kicker-light"><span className="vix-signal-dot" /> Vehicle intelligence, brought to you</p>
              <h1>Clear answers.<br /><em>Better vehicle</em><br />decisions.</h1>
              <p>Independent mobile diagnostics and inspections for people who want to understand the evidence before choosing what to do next. Serving Dalton-in-Furness, Barrow, Ulverston and the wider Furness area.</p>
              <div className="vix-hero-actions">
                <button className="vix-button" type="button" onClick={() => openEnquiry("Independent vehicle inspection")}>
                  Request an assessment <span aria-hidden="true">↗</span>
                </button>
                <a className="vix-text-link" href="#sample-report">See how a report reads <span aria-hidden="true">↓</span></a>
              </div>
              <div className="vix-hero-assurance">Dalton-in-Furness base · Mobile across Furness · By appointment</div>
              <div className="vix-hero-contact">
                <a href={site.phoneLink} aria-label={`Call VIX-SCAN on ${site.phoneDisplay}`}>
                  <span aria-hidden="true">☏</span> {site.phoneDisplay}
                </a>
                <a href={mailtoLink("VIX-SCAN enquiry")} aria-label={`Email VIX-SCAN at ${site.email}`}>
                  <span aria-hidden="true">✉</span> {site.email}
                </a>
              </div>
            </div>
            <div className="vix-hero-visual">
              <div className="vix-visual-labels"><span>ASSESSMENT / FIELD NOTE</span><span>ILLUSTRATIVE SCHEMATIC</span></div>
              <VehicleSchematic />
              <div className="vix-visual-caption"><span>One vehicle. A clearly scoped question.</span><b aria-hidden="true">+</b></div>
              <div className="vix-readout" aria-label="VIX-SCAN assessment method">
                <div className="vix-readout-label">THE VIX-SCAN METHOD</div>
                <div className="vix-readout-line"><span>Observed</span><b>What can be seen</b><i /></div>
                <div className="vix-readout-line"><span>Checked</span><b>What was tested</b><i /></div>
                <div className="vix-readout-line"><span>Next</span><b>What to consider</b><i /></div>
              </div>
            </div>
          </div>
          <div className="vix-hero-bottom"><span>INDEPENDENT VEHICLE INTELLIGENCE</span><span>DALTON · BARROW · ULVERSTON · FURNESS</span></div>
        </section>

        <section className="vix-paths vix-wrap" aria-labelledby="vix-path-title">
          <div className="vix-path-intro">
            <p className="vix-kicker"><b>01</b> Start with your situation</p>
            <h2 className="vix-section-title" id="vix-path-title">What do you<br /><em>need to know?</em></h2>
            <p>Choose the question in front of you. The right scope is confirmed before any work is agreed.</p>
          </div>
          <div className="vix-path-list">
            <a className="vix-path-row" href="#services">
              <span className="vix-path-index">A / 01</span><span className="vix-path-title">Something is wrong with my vehicle</span><span className="vix-path-detail">Diagnostics &amp; second opinions</span><span className="vix-path-arrow" aria-hidden="true">↗</span>
            </a>
            <a className="vix-path-row" href="#buyer">
              <span className="vix-path-index">A / 02</span><span className="vix-path-title">I am thinking of buying a vehicle</span><span className="vix-path-detail">Independent buyer inspection</span><span className="vix-path-arrow" aria-hidden="true">↗</span>
            </a>
            <a className="vix-path-row" href="#fleet">
              <span className="vix-path-index">A / 03</span><span className="vix-path-title">I look after vehicles for a business</span><span className="vix-path-detail">Fleet condition visibility</span><span className="vix-path-arrow" aria-hidden="true">↗</span>
            </a>
            <a className="vix-path-row" href="#trade">
              <span className="vix-path-index">A / 04</span><span className="vix-path-title">I work in the motor trade</span><span className="vix-path-detail">Stock days &amp; diagnostic support</span><span className="vix-path-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="vix-services" id="services" aria-labelledby="vix-services-title">
          <div className="vix-wrap">
            <div className="vix-section-heading">
              <div>
                <p className="vix-kicker"><b>02</b> Independent insight, clearly scoped</p>
                <h2 className="vix-section-title" id="vix-services-title">Make the next decision<br /><em>with better information.</em></h2>
              </div>
              <p>A diagnostic scan is one source of evidence—not a diagnosis by itself. Every assessment is shaped around the question, the vehicle and what can be safely accessed.</p>
            </div>
            <div className="vix-service-feature">
              <article className="vix-service-main">
                <div className="vix-service-meta"><span>01 / Understand a fault</span><InspectionFrame /></div>
                <h3>Mobile diagnostics &amp; independent inspections</h3>
                <p>Start with the concern, not an assumption about the repair. A scoped visit can help make warning indicators, reported symptoms or accessible condition points easier to understand.</p>
                <ul className="vix-inclusion-list">
                  <li>Diagnostic code retrieval where system access supports it</li>
                  <li>Selected visual checks and symptom context</li>
                  <li>Independent pre-purchase inspection for buyers</li>
                  <li>Clear written findings and practical next steps</li>
                </ul>
                <button className="vix-button vix-button-dark" type="button" onClick={() => openEnquiry("Mobile diagnostics")}>
                  Discuss a diagnostic concern <span aria-hidden="true">↗</span>
                </button>
              </article>
              <article className="vix-service-aside" id="buyer">
                <div className="vix-service-meta"><span>02 / Buy with eyes open</span><InspectionFrame /></div>
                <h3>Buyer inspections</h3>
                <p>A practical review of accessible condition points before you commit. The scope may cover visible body and interior condition, tyres, accessible under-bonnet observations, safe operation checks and supported diagnostic information.</p>
                <p>No inspection can guarantee a fault-free vehicle or future reliability. Road testing only where legal, insured, authorised and safe; access and seller permission can limit checks.</p>
                <button className="vix-text-link" type="button" onClick={() => openEnquiry("Pre-purchase inspection")}>
                  Ask about a buyer inspection <span aria-hidden="true">↗</span>
                </button>
              </article>
            </div>
            <div className="vix-boundary-note">
              <span className="vix-info-mark" aria-hidden="true">i</span>
              <p>Scope, access, compatibility, safety, weather and available information can limit an assessment. Findings describe observations at a point in time; no inspection replaces an MOT, statutory roadworthiness duties or a specialist test where required.</p>
              <a href="#approach">How it works <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <section className="vix-passport vix-wrap" aria-labelledby="vix-passport-title">
          <div className="vix-passport-grid">
            <div className="vix-passport-copy">
              <p className="vix-kicker"><b>03</b> A record that can build over time</p>
              <h2 className="vix-section-title" id="vix-passport-title">The Vehicle<br /><em>Intelligence Passport.</em></h2>
              <p>A dated history of your VIX-SCAN assessments, bringing scope, findings and evidence into one place. Each eligible inspection adds a new record rather than replacing the last.</p>
              <button className="vix-text-link" type="button" onClick={() => openEnquiry("Vehicle Intelligence Passport")}>
                Ask about a vehicle record <span aria-hidden="true">↗</span>
              </button>
              <p className="vix-passport-caveat">Records are linked to an eligible vehicle assessment and shared with you after the visit. A Passport is not an MOT, statutory roadworthiness certificate or guarantee.</p>
            </div>
            <div className="vix-passport-visual" aria-label="Illustration of a VIX-SCAN vehicle inspection record">
              <span className="vix-passport-orbit" aria-hidden="true" />
              <PassportMark />
              <div className="vix-passport-record">
                <span className="vix-passport-record-label">VEHICLE RECORD</span>
                <h3>One history. Clear scope.</h3>
                <div className="vix-record-line"><span>Assessment date</span><b>Added per visit</b></div>
                <div className="vix-record-line"><span>Inspection scope</span><b>Recorded clearly</b></div>
                <div className="vix-record-line"><span>Findings &amp; limits</span><b>Kept together</b></div>
                <span className="vix-concept-tag">ISSUED AFTER AN ELIGIBLE ASSESSMENT</span>
              </div>
            </div>
          </div>
        </section>

        <section className="vix-report" id="sample-report" aria-labelledby="vix-report-title">
          <div className="vix-report-grid vix-wrap">
            <div className="vix-report-copy">
              <p className="vix-kicker vix-kicker-light"><b>04</b> Evidence before conclusions</p>
              <h2 className="vix-section-title" id="vix-report-title">Not just a code.<br /><em>A clearer picture.</em></h2>
              <p>Useful reporting separates what was reported, what was checked, what was found and what remains unknown. Findings are put in context—not turned into pressure to authorise a repair.</p>
              <a className="vix-button vix-button-dark" href="#report-example">Read the illustrative report <span aria-hidden="true">↘</span></a>
              <div className="vix-report-principle">Retrieved is not the same as diagnosed.<br />Suspected is not the same as confirmed.</div>
            </div>
            <article className="vix-paper" id="report-example" aria-label="Clearly fictional sample inspection report">
              <div className="vix-paper-head">
                <div className="vix-paper-brand"><span className="vix-paper-mark"><BrandMark /></span><span>VIX-SCAN<span className="vix-paper-type">FIELD REPORT / EXAMPLE</span></span></div>
                <span className="vix-demo-stamp">FICTIONAL DEMO<br />NOT CUSTOMER EVIDENCE</span>
              </div>
              <div className="vix-paper-meta"><span>REFERENCE<b>DEMO-014</b></span><span>DATE<b>EXAMPLE ONLY</b></span></div>
              <div className="vix-paper-vehicle">
                <div><small>VEHICLE</small><b>Fictional example vehicle</b></div>
                <div><small>ASSESSMENT TYPE</small><b>Defined concern</b></div>
              </div>
              <div className="vix-finding">
                <div className="vix-finding-top"><span className="vix-finding-index">01</span><span className="vix-status">OBSERVED</span><span className="vix-finding-code">SYSTEM REVIEW</span></div>
                <h3>Warning indicator recorded</h3>
                <p>Fictional example: a diagnostic code was retrieved from a supported system. A code records a condition detected by a module; on its own, it does not confirm a failed component.</p>
              </div>
              <div className="vix-finding">
                <div className="vix-finding-top"><span className="vix-finding-index">02</span><span className="vix-status vix-status-amber">NEXT STEP</span><span className="vix-finding-code">LIMITATION</span></div>
                <h3>Further testing may be appropriate</h3>
                <p>Example: confirm the relevant circuit and operating conditions before recommending a component replacement.</p>
              </div>
              <div className="vix-report-limit"><b>LIMIT</b><span>Illustrative wording only. No real vehicle was assessed; a retrieval does not establish root cause.</span></div>
              <div className="vix-paper-foot"><span>Fictional report layout · No real customer or vehicle</span><span>VIX-SCAN / 01</span></div>
            </article>
          </div>
        </section>

        <section className="vix-process vix-wrap" id="approach" aria-labelledby="vix-process-title">
          <div className="vix-process-head">
            <div>
              <p className="vix-kicker"><b>05</b> A considered process</p>
              <h2 className="vix-section-title" id="vix-process-title">Understand the scope.<br /><em>Then decide.</em></h2>
            </div>
            <p>Every job starts with a conversation about the question—not an assumption about the repair.</p>
          </div>
          <div className="vix-steps">
            <article className="vix-step"><span className="vix-step-number">01</span><div className="vix-step-rail" /><h3>Tell us what is happening</h3><p>Share the vehicle, location, symptoms and the decision you need to make.</p></article>
            <article className="vix-step"><span className="vix-step-number">02</span><div className="vix-step-rail" /><h3>Agree a clear scope</h3><p>Suitability, practical limits, travel and an indicative cost are discussed before a booking.</p></article>
            <article className="vix-step"><span className="vix-step-number">03</span><div className="vix-step-rail" /><h3>Assess and record</h3><p>Checks are made within the agreed scope and safe, practical access; relevant evidence is noted.</p></article>
            <article className="vix-step"><span className="vix-step-number">04</span><div className="vix-step-rail" /><h3>Leave with next steps</h3><p>Receive a plain-English explanation and written findings, including limits and sensible next actions.</p></article>
          </div>
          <div className="vix-process-note"><strong>Before work is agreed:</strong><span>Current availability, coverage and final scope must be confirmed for each request. No live booking slots are shown here.</span></div>
        </section>

        <section className="vix-fleet" id="fleet" aria-labelledby="vix-fleet-title">
          <div className="vix-fleet-grid vix-wrap">
            <div className="vix-fleet-copy">
              <p className="vix-kicker vix-kicker-light"><b>06</b> For local businesses</p>
              <h2 id="vix-fleet-title">The Fleet<br /><em>Condition Desk.</em></h2>
              <p>A practical way to keep vehicle condition, reported defects and inspection history visible—helping a manager organise follow-up across cars and light commercial vehicles.</p>
              <button className="vix-button" type="button" onClick={() => openEnquiry("Fleet condition desk")}>
                Request a fleet consultation <span aria-hidden="true">↗</span>
              </button>
              <div className="vix-fleet-caveat">Plans are agreed in writing. Vehicle count, visit frequency, reporting scope and response arrangements are confirmed before any start date.</div>
            </div>
            <div className="vix-desk" aria-label="Example view of a fleet condition desk">
              <div className="vix-desk-head"><span>FLEET CONDITION / EXAMPLE</span><span>EXAMPLE VIEW</span></div>
              <div className="vix-desk-summary">
                <div><small>VEHICLE REGISTER</small><strong>One clearer view</strong></div>
                <span className="vix-demo-readout">—</span>
              </div>
              <div className="vix-desk-row vix-desk-row-head"><span>REF</span><span>WHAT IT CAN HELP TRACK</span><span>STATUS</span></div>
              <div className="vix-desk-row"><span className="vix-desk-num">01</span><span><strong>Inspection history</strong><small>Dated condition records</small></span><span className="vix-desk-tag">VISIBLE</span></div>
              <div className="vix-desk-row"><span className="vix-desk-num">02</span><span><strong>Reported defects</strong><small>Issue notes and follow-up</small></span><span className="vix-desk-tag vix-desk-tag-amber">TO REVIEW</span></div>
              <div className="vix-desk-row"><span className="vix-desk-num">03</span><span><strong>Upcoming dates</strong><small>Customer-supplied reminders</small></span><span className="vix-desk-tag">PLANNED</span></div>
              <p className="vix-desk-foot">Example view only. Condition support—not a compliance system. Does not replace driver checks, maintenance duties, MOT tests or statutory inspections.</p>
            </div>
          </div>
        </section>

        <section className="vix-trade vix-wrap" id="trade" aria-labelledby="vix-trade-title">
          <div className="vix-trade-intro">
            <p className="vix-kicker"><b>07</b> For dealers, garages &amp; repairers</p>
            <h2 className="vix-section-title" id="vix-trade-title">Useful evidence.<br /><em>Shared without noise.</em></h2>
            <p>Trade-facing work is built around clearly agreed scope, site access, competence and evidence handover.</p>
          </div>
          <div className="vix-offers">
            <article className="vix-offer">
              <span className="vix-offer-num">T / 01</span>
              <div><h3>Dealer stock intelligence</h3><p>Consistent, scoped checks and written findings across a planned stock visit. Vehicle count, site access and per-vehicle depth shape the proposal.</p><button type="button" onClick={() => openEnquiry("Dealer stock day")}>Discuss a stock day <span aria-hidden="true">↗</span></button></div>
            </article>
            <article className="vix-offer">
              <span className="vix-offer-num">T / 02</span>
              <div><h3>Trade diagnostic support</h3><p>A structured evidence review or agreed on-site investigation when an electrical or electronic fault needs another line of enquiry. Competence, access and case scope must be confirmed.</p><button type="button" onClick={() => openEnquiry("Trade diagnostic support")}>Share a case outline <span aria-hidden="true">↗</span></button></div>
            </article>
            <article className="vix-offer vix-ev-offer">
              <span className="vix-offer-num">T / 03</span>
              <div><span className="vix-conditional">VEHICLE COMPATIBILITY CHECK FIRST</span><h3>EV battery assessment</h3><p>Battery health assessment is arranged only when the vehicle, testing method and provider are confirmed as compatible. Suitability is checked before any payment is taken, and a result is an assessment at a point in time—not a guarantee of future range or capacity.</p><button type="button" onClick={() => openEnquiry("Future EV battery compatibility")}>Check EV compatibility <span aria-hidden="true">↗</span></button></div>
            </article>
          </div>
        </section>

        <section className="vix-coverage" id="coverage" aria-labelledby="vix-coverage-title">
          <CoverageSchematic />
          <div className="vix-coverage-copy">
            <p className="vix-kicker"><b>08</b> Local, by arrangement</p>
            <h2 className="vix-section-title" id="vix-coverage-title">Furness is<br /><em>where we work.</em></h2>
            <p>Based in Dalton-in-Furness, visiting Barrow-in-Furness, Ulverston and nearby Furness communities. If you are just outside the area, ask—we will tell you honestly whether we can reach you.</p>
            <p className="vix-coverage-caution">Travel, access and availability are confirmed for each request. Enquiries are welcome from across the Furness peninsula.</p>
            <a className="vix-text-link" href={mailtoLink("VIX-SCAN — location and availability")}>Check your location <span aria-hidden="true">↗</span></a>
            <div className="vix-places"><span>DALTON-IN-FURNESS</span><span>BARROW-IN-FURNESS</span><span>ULVERSTON</span><span>ASKAM</span><span>WALNEY</span><span>LINDAL</span><span>KIRKBY</span><span>MILLOM</span></div>
          </div>
        </section>

        <section className="vix-faq vix-wrap" aria-labelledby="vix-faq-title">
          <div className="vix-faq-grid">
            <div className="vix-faq-intro">
              <p className="vix-kicker"><b>09</b> A few useful answers</p>
              <h2 className="vix-section-title" id="vix-faq-title">Clear on what<br /><em>we can say.</em></h2>
              <p>Good decisions start with knowing what an assessment can—and cannot—tell you.</p>
            </div>
            <div className="vix-faq-list">
              <details>
                <summary>Does a diagnostic code tell me which part has failed?</summary>
                <p>Not on its own. A code describes a condition detected by a vehicle system. The context, status, supporting tests and vehicle-specific information matter; further testing may be needed before identifying a root cause.</p>
              </details>
              <details>
                <summary>Will an inspection guarantee the vehicle is fault-free?</summary>
                <p>No. It is a scoped assessment of accessible items and available evidence at a particular time. Some faults are intermittent, hidden, outside the agreed scope or not detectable by the checks available.</p>
              </details>
              <details>
                <summary>Can you inspect a vehicle before I buy it?</summary>
                <p>Pre-purchase inspections are a core part of the service. The scope, access, seller permission, location and any safe operation checks must be confirmed in advance. It supports a buyer decision; it is not a guarantee or substitute for your own checks.</p>
              </details>
              <details>
                <summary>Can you test an EV battery?</summary>
                <p>Battery health assessment depends on the specific vehicle, the testing method and provider coverage. Send the make, model and year and we will confirm whether a suitable assessment is available before you book or pay anything.</p>
              </details>
              <details>
                <summary>Is the Vehicle Intelligence Passport already available?</summary>
                <p>The Passport is a dated record of your VIX-SCAN assessments. An eligible inspection adds a new record with scope, findings and any limits noted. Access arrangements are explained when your report is issued.</p>
              </details>
              <details>
                <summary>How do I know if you cover my location?</summary>
                <p>We are based in Dalton-in-Furness and visit Barrow-in-Furness, Ulverston and the surrounding Furness area. Include your location in your enquiry and travel will be confirmed before anything is agreed.</p>
              </details>
              <details>
                <summary>How do I send an enquiry?</summary>
                <p>Use the enquiry form to build your message, then choose “Email this enquiry” to send it to vix.scan@yahoo.com from your own email app. Nothing is stored on this website. You can also call or message {site.phoneDisplay}.</p>
              </details>
              <details>
                <summary>What happens after I get in touch?</summary>
                <p>We reply to confirm the vehicle, the question you need answered, the location and the practical limits of the assessment. Scope and price are agreed before any visit, and you are told when further time would be needed.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="vix-contact" id="contact" aria-labelledby="vix-contact-title">
          <div className="vix-wrap vix-contact-grid">
            <div className="vix-contact-intro">
              <p className="vix-kicker"><b>10</b> Talk to a person</p>
              <h2 className="vix-section-title" id="vix-contact-title">Tell us what<br /><em>you need to know.</em></h2>
              <p>Call, message or email with the vehicle, the area and the question you need answering. Scope, travel and price are confirmed before any work is agreed.</p>
              <p className="vix-contact-hours">{site.openingHours} · Based in {site.base}</p>
            </div>
            <div className="vix-contact-options">
              <a className="vix-contact-card" href={site.phoneLink}>
                <span className="vix-contact-label">CALL</span>
                <strong>{site.phoneDisplay}</strong>
                <span className="vix-contact-note">Quickest way to check availability <span aria-hidden="true">↗</span></span>
              </a>
              <a className="vix-contact-card" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                <span className="vix-contact-label">WHATSAPP</span>
                <strong>Message {site.phoneDisplay}</strong>
                <span className="vix-contact-note">Send a photo or describe the symptom <span aria-hidden="true">↗</span></span>
              </a>
              <a className="vix-contact-card" href={mailtoLink("VIX-SCAN enquiry")}>
                <span className="vix-contact-label">EMAIL</span>
                <strong>{site.email}</strong>
                <span className="vix-contact-note">Best for reports, fleet briefs and detail <span aria-hidden="true">↗</span></span>
              </a>
              <button className="vix-contact-card vix-contact-card-button" type="button" onClick={() => openEnquiry()}>
                <span className="vix-contact-label">ENQUIRY FORM</span>
                <strong>Build a scoped enquiry</strong>
                <span className="vix-contact-note">Vehicle, area and symptoms in one message <span aria-hidden="true">↗</span></span>
              </button>
            </div>
          </div>
        </section>

        <section className="vix-cta" id="enquire" aria-labelledby="vix-cta-title">
          <div className="vix-cta-inner vix-wrap">
            <p className="vix-kicker vix-kicker-light"><span className="vix-signal-dot" /> Start with a question, not a commitment</p>
            <h2 id="vix-cta-title">What would you like<br /><em>to understand?</em></h2>
            <p className="vix-cta-copy">Send the vehicle, location and the question in front of you. Scope, travel and price are confirmed before anything is booked.</p>
            <div className="vix-cta-actions">
              <button className="vix-button" type="button" onClick={() => openEnquiry()}>Start an enquiry <span aria-hidden="true">↗</span></button>
              <a className="vix-button vix-button-outline" href={site.phoneLink}>Call {site.phoneDisplay}</a>
            </div>
            <div className="vix-cta-note">Or email {site.email} directly. {site.openingHours}.</div>
          </div>
        </section>
      </main>

      <footer className="vix-footer">
        <div className="vix-footer-main vix-wrap">
          <Brand />
          <div className="vix-footer-contact">
            <p className="vix-footer-tagline">Clear answers.<br />Better vehicle decisions.</p>
            <a className="vix-footer-contact-link" href={site.phoneLink}>{site.phoneDisplay}</a>
            <a className="vix-footer-contact-link" href={mailtoLink("VIX-SCAN enquiry")}>{site.email}</a>
            <span className="vix-footer-contact-note">{site.openingHours} · {site.base}</span>
            <a className="vix-footer-whatsapp" href={site.whatsapp} target="_blank" rel="noopener noreferrer">Message on WhatsApp ↗</a>
          </div>
          <nav className="vix-footer-links" aria-label="Footer navigation">
            <a href="#services">Services</a>
            <a href="#sample-report">Sample report</a>
            <a href="#approach">Our approach</a>
            <a href="#fleet">Fleet desk</a>
            <a href="#trade">Trade &amp; dealers</a>
            <a href="#coverage">Working area</a>
            <a href="#contact">Contact</a>
            <button type="button" onClick={() => openEnquiry()}>Enquiry</button>
          </nav>
        </div>
        <div className="vix-footer-bottom vix-wrap">
          <span>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> VIX-SCAN · Mobile vehicle diagnostics &amp; independent inspections · Furness, Cumbria</span>
          <span>{site.domain}</span>
          <a href="#top">Back to top ↑</a>
        </div>
        <p className="vix-footer-disclaimer vix-wrap">Assessments are scoped observations at a point in time. They are not an MOT certificate, statutory roadworthiness assessment, guarantee of future reliability or substitute for the vehicle operator’s legal responsibilities. EV battery assessment is subject to vehicle compatibility and provider confirmation.</p>
      </footer>

      <dialog
        className="vix-dialog"
        ref={dialogRef}
        aria-labelledby="vix-dialog-title"
        onClose={() => setDialogRequested(false)}
        onCancel={() => setDialogRequested(false)}
      >
        <div className="vix-dialog-head">
          <div><p className="vix-kicker"><b>ENQUIRY</b></p><h2 id="vix-dialog-title">Send an enquiry</h2></div>
          <button className="vix-dialog-close" type="button" aria-label="Close enquiry form" onClick={closeEnquiry}>×</button>
        </div>
        <p className="vix-dialog-disclaimer">Fill in what you can, then choose “Email this enquiry”. Your details go straight to {site.email} through your own email app—nothing is stored on this website. Prefer to talk? Call {site.phoneDisplay}.</p>
        <form className="vix-form" onSubmit={createDraft}>
          <div className="vix-form-row">
            <label htmlFor="vix-name">Your name
              <input id="vix-name" name="name" autoComplete="name" required placeholder="Name" />
            </label>
            <label htmlFor="vix-contact">Phone or email <span>(optional)</span>
              <input id="vix-contact" name="contact" autoComplete="tel" placeholder="Best way to reach you" />
            </label>
          </div>
          <label htmlFor="vix-topic">Your enquiry is about
            <select id="vix-topic" name="topic" value={topic} onChange={(event) => setTopic(event.target.value)}>
              {topics.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <div className="vix-form-row">
            <label htmlFor="vix-vehicle">Vehicle make / model <span>(optional)</span>
              <input id="vix-vehicle" name="vehicle" autoComplete="off" placeholder="e.g. make and model" />
            </label>
            <label htmlFor="vix-year">Approximate year <span>(optional)</span>
              <input id="vix-year" name="year" inputMode="numeric" autoComplete="off" placeholder="e.g. 2019" />
            </label>
          </div>
          <label htmlFor="vix-location">Vehicle location <span>(optional)</span>
            <input id="vix-location" name="location" autoComplete="off" placeholder="Town or area" />
          </label>
          <label htmlFor="vix-details">What would you like help understanding? <span>(optional)</span>
            <textarea id="vix-details" name="details" rows={4} placeholder="Include symptoms, timing, warning messages or what you need to decide." />
          </label>
          <div className="vix-form-actions">
            <button className="vix-button vix-button-dark" type="submit">Create enquiry <span aria-hidden="true">↗</span></button>
            <button className="vix-button vix-button-outline" type="button" onClick={closeEnquiry}>Close</button>
          </div>
        </form>
        <div className="vix-draft-result" hidden={!draft} aria-live="polite">
          <div className="vix-draft-result-head"><div><p className="vix-kicker"><b>READY TO SEND</b></p><h3>Your enquiry</h3></div><span className="vix-local-tag">NOT SENT YET</span></div>
          <textarea className="vix-draft-output" ref={outputRef} readOnly value={draft} aria-label="Generated enquiry" />
          <div className="vix-draft-actions">
            <button className="vix-button vix-button-dark" type="button" onClick={emailDraft}>Email this enquiry</button>
            <button className="vix-button vix-button-outline" type="button" onClick={copyDraft}>Copy</button>
            <button className="vix-button vix-button-outline" type="button" onClick={downloadDraft}>Download .txt</button>
          </div>
          <p className="vix-copy-feedback" role="status">{copyFeedback}</p>
          <p className="vix-draft-note">Send it to {site.email}. Nothing has been sent or stored by this website. You can also call {site.phoneDisplay}.</p>
        </div>
      </dialog>
    </div>
  );
}
