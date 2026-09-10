import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import EmberLine from './motif/EmberLine.jsx'
import BigNumeral from './motif/BigNumeral.jsx'
import RailPath from './motif/RailPath.jsx'
import { LADDER, VISIBLE_CAPABILITIES } from '../data/ladder.js'
import { waLink } from '../constants.js'
import { fadeUp, stagger, staggerCapped } from '../motion.js'

// La escalera: Auditoría (01) → Diagnóstico (02) → Taller / Software (03).
// Un rail vertical a la izquierda se dibuja con el scroll y enciende cada
// etapa; entre 02 y 03 dos ramas verticales conectan Gente→Taller y
// Proceso→Software. Sin tabs: es un recorrido, no un catálogo.

function LadderStep({ num, kicker, name, desc, lit, children, id }) {
  return (
    <motion.div className="ladder-step" variants={fadeUp} id={id}>
      <div className="ladder-side">
        <BigNumeral lit={lit}>{num}</BigNumeral>
      </div>
      <div className="ladder-body">
        <div className="ladder-kicker">{kicker}</div>
        <h3 className="ladder-title">{name}</h3>
        <p className="ladder-desc">{desc}</p>
        {children}
      </div>
    </motion.div>
  )
}

function AuditLevels({ levels, cta }) {
  return (
    <>
      <motion.div className="card-grid audit-grid" variants={staggerCapped(levels.length)}>
        {levels.map((lv) => (
          <motion.div
            className={`service-card audit-card ${lv.upsellOnly ? 'is-upsell' : ''}`}
            key={lv.id}
            variants={fadeUp}
          >
            <div className="card-top">
              <span className="card-tag">{lv.scope}</span>
              {lv.badge && <span className="card-badge">{lv.badge}</span>}
            </div>
            <h4 className="card-name">{lv.name}</h4>
            <p className="card-desc">
              {lv.role}
              {lv.note && <span className="card-note"> {lv.note}</span>}
            </p>
            {lv.cta && (
              <a
                className="btn-secondary btn-inline"
                href={waLink(lv.cta.waKey)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {lv.cta.label} <span className="arrow">→</span>
              </a>
            )}
          </motion.div>
        ))}
      </motion.div>
      <motion.div variants={fadeUp} className="ladder-cta">
        <a className="btn-primary" href={waLink(cta.waKey)} target="_blank" rel="noopener noreferrer">
          {cta.label} <span className="arrow">→</span>
        </a>
      </motion.div>
    </>
  )
}

function DiagnosisFork({ outcomes, bothNote }) {
  return (
    <>
      <motion.div className="fork-grid" variants={stagger()}>
        {outcomes.map((o) => (
          <motion.div className="fork-card" key={o.id} variants={fadeUp}>
            <div className="fork-label">{o.label}</div>
            <p className="fork-desc">{o.desc}</p>
            <div className="fork-arrow">
              <span className="arrow">→</span> {o.leadsToLabel}
            </div>
          </motion.div>
        ))}
      </motion.div>
      <motion.p className="fork-note" variants={fadeUp}>
        {bothNote}
      </motion.p>
    </>
  )
}

function CapabilityList({ items, label }) {
  return (
    <div className="cap-block">
      <div className="cap-eyebrow">— {label}</div>
      <ul className="cap-list">
        {items.map((c) => (
          <li key={c.id}>
            <strong>{c.name}</strong>
            <span>{c.blurb}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function OutcomeCard({ step, onShowCases }) {
  return (
    <motion.div className="service-card outcome-card" id={`paso-${step.id}`} variants={fadeUp}>
      <div className="card-top">
        <span className="card-tag">{step.kicker}</span>
      </div>
      <h4 className="card-name outcome-name">{step.name}</h4>
      <p className="card-desc">{step.desc}</p>
      <ul className="card-benefits">
        {step.benefits.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      {step.capabilitiesLabel && <CapabilityList items={VISIBLE_CAPABILITIES} label={step.capabilitiesLabel} />}
      <a
        className="outcome-link"
        href="#casos"
        onClick={() => onShowCases?.(step.id)}
      >
        {step.casesLabel} <span className="arrow">→</span>
      </a>
    </motion.div>
  )
}

export default function Ladder({ onShowCases }) {
  const ladderRef = useRef(null)
  const [stage, setStage] = useState(0)
  const { scrollYProgress } = useScroll({
    target: ladderRef,
    offset: ['start 78%', 'end 70%'],
  })
  const branch = useTransform(scrollYProgress, [0.52, 0.78], [0, 1])
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = v > 0.72 ? 3 : v > 0.42 ? 2 : v > 0.08 ? 1 : 0
    if (next !== stage) setStage(next)
  })

  const { intro, audit, fork, outcomes } = LADDER

  return (
    <Reveal as="section" id="servicios" className="section section-ladder" data-texture="true">
      <EmberLine />
      <SectionHead
        label={intro.label}
        lines={[intro.headline[0], <span className="ac ac-burn">{intro.headline[1]}</span>]}
        subtext={intro.subtext}
      />

      <div className="ladder" ref={ladderRef} data-stage={stage}>
        <div className="ladder-rail" aria-hidden="true">
          <motion.span className="ladder-rail-fill" style={{ scaleY: scrollYProgress }} />
        </div>

        <LadderStep {...audit} lit={stage >= 1} id="paso-auditoria">
          <AuditLevels levels={audit.levels} cta={audit.cta} />
        </LadderStep>

        <LadderStep {...fork} lit={stage >= 2} id="paso-diagnostico">
          <DiagnosisFork outcomes={fork.outcomes} bothNote={fork.bothNote} />
        </LadderStep>

        <div className="ladder-step ladder-step-lines" aria-hidden="true">
          <div className="ladder-side" />
          <div className="ladder-body">
            <svg className="fork-lines" viewBox="0 0 100 80" preserveAspectRatio="none">
              <RailPath d="M25 0 V80" progress={branch} />
              <RailPath d="M75 0 V80" progress={branch} />
            </svg>
          </div>
        </div>

        <LadderStep
          num="03"
          kicker="Paso 03 · La solución"
          name="Con tu equipo, sin dependencia"
          desc="Dos formas de resolverlo. El diagnóstico dice cuál va primero."
          lit={stage >= 3}
          id="paso-solucion"
        >
          <motion.div className="outcome-grid" variants={stagger()}>
            {outcomes.map((o) => (
              <OutcomeCard step={o} key={o.id} onShowCases={onShowCases} />
            ))}
          </motion.div>
        </LadderStep>
      </div>
    </Reveal>
  )
}
