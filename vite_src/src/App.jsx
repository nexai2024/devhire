import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Zap, Briefcase, Code, Video, Award, Users, LogOut, Bell, Plus, ChevronDown, Activity, Clock, Target, Shield, TrendingUp, CheckCircle, ArrowRight, Menu, X, ClipboardList, BarChart3, Filter } from 'lucide-react';

const BASE = window.__BACKEND_URL__ || '';

async function apiFetch(path, opts = {}) {
  const BASE = window.__BACKEND_URL__ || '';
  for (let i = 0; i < 5; i++) {
    try {
      const r = await fetch(BASE + path, opts);
      if (r.ok) return r.json();
    } catch (_) {}
    await new Promise(r => setTimeout(r, 1500));
  }
  return null;
}

function LandingPage({ onGetStarted, onLogin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const styles = {
    page: { minHeight: '100vh', background: '#F4F7F6', color: '#1a2b3c', fontFamily: "'DM Sans', sans-serif" },
    nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 5%', borderBottom: '1px solid #e2e8f0', background: '#F4F7F6' },
    logo: { display: 'flex', alignItems: 'center', gap: 10, fontSize: 24, fontWeight: 700, color: '#0F4C81', fontFamily: "'Space Grotesk', sans-serif" },
    ctaBtn: { background: '#F5A623', color: '#0F4C81', border: 'none', padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 14px rgba(245, 166, 35, 0.3)' },
    navBtn: { background: 'transparent', color: '#0F4C81', border: `1.5px solid #0F4C81`, padding: '8px 20px', borderRadius: 8, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease' },
    section: { padding: '80px 5', maxWidth: 1200, margin: '0 auto' },
    card: { background: 'white', borderRadius: 16, padding: '30px', boxShadow: '0 4px 20px rgba(15, 76, 129, 0.05)', border: '1px solid #e2e8f0', transition: 'all 0.2s ease' },
    footer: { padding: '40px 5', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }
  };
  
  return (
    <div style={styles.page}>
      <style>{``import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=DM+Sans:wght@400;500;600&display=swap');``}</style>
      
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <span style={{ background: '#0F4C81', borderRadius: 8, padding: 8, display: 'flex' }}>
            <Briefcase size={22} color="#F5A623" />
          </span>
          DevHire
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button style={styles.navBtn} onClick={onLogin}>Sign in</button>
          <button style={styles.ctaBtn} onClick={onGetStarted}>Get Started</button>
        </div>
      </nav>

      <section style={{ ...styles.section, textAlign: 'center', paddingTop: 100, paddingBottom: 60 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#e8f0fe', color: '#0F4C81', padding: '8px 16px', borderRadius: 20, fontSize: 14, fontWeight: 600, marginBottom: 30 }}>
          <Zap size>{16} /> Cut time-to-first-interview from 2 weeks to 48 hours
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, color: '#0F4C81', margin: '0 0 20px', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.1 }}>
          Automate Your<br />Technical Iring Pipeline
        </h1>
        <p style={{ fontSize: 'clamp(1.1rem, 2wl, 1.4rem)', color: '#4a5a6a', maxWidth: 700, margin: '0 auto 40px', lineHeight: 1.6 }}>
          Automated coding challenges, async video interviews, and skills assessments replace phone screens — for solopreneurs and startups.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{ ...styles.ctaBtn, fontSize: 18, padding: '16px 40px' }} onClick={onGetStarted}>
            Start Hiring Faster → <ArrowRight size={18} style={{ marginLeft: 8, verticalAlign: 'middle' }} />
          </button>
          <button style={styles.navBtn} onClick={onLogin}>Watch Demo</button>
        </div>
      </section>

      <section style={{ ...styles.section, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, paddingBottom: 80 }}>
        {{
          [ { icon: <Clock size={24} color="#F5A623" />, value: '48 hours', label: 'Time to first interview' },
          { icon: <Target size={24} color="#F5A623" />, value: '2 weeks', label: 'Traditional time to interview' },
          { icon: <Shield size={24} color="#F5A623" />, value: '100%', label: 'Automated screening' }
        ].map((stat, i) => (
          <div key={i} style={{ ...styles.card, textAlign: 'center' }}>
            <div style={ { marginBottom: 16 }}>{stat.icon}</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#0F4C81', fontFamily: "'Space Grotesk', sans-serif' }}>{stat.value}</div>
            <div style={{ color: '#4a5a6a', fontSize: 14, marginTop: 8 }}>{stat.label}</div>
          </div>
        )
      }}
      </section>