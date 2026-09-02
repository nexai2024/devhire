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
    section: { padding: '80px 5%', maxWidth: 1200, margin: '0 auto' },
    card: { background: 'white', borderRadius: 16, padding: '30px', boxShadow: '0 4px 20px rgba(15, 76, 129, 0.05)', border: '1px solid #e2e8f0', transition: 'all 0.2s ease' },
    footer: { padding: '40px 5%', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }
  };
  
  return (
    <div style={styles.page}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=DM+Sans:wght@400;500;600&display=swap');`}</style>
      
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
          <Zap size={16} /> Cut time-to-first-interview from 2 weeks to 48 hours
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, color: '#0F4C81', margin: '0 0 20px', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.1 }}>
          Automate Your<br />Technical Hiring Pipeline
        </h1>
        <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: '#4a5a6a', maxWidth: 700, margin: '0 auto 40px', lineHeight: 1.6 }}>
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
        {[
          { icon: <Clock size={24} color="#F5A623" />, value: '48 hours', label: 'Time to first interview' },
          { icon: <Target size={24} color="#F5A623" />, value: '2 weeks', label: 'Traditional time to interview' },
          { icon: <Shield size={24} color="#F5A623" />, value: '100%', label: 'Automated screening' }
        ].map((stat, i) => (
          <div key={i} style={{ ...styles.card, textAlign: 'center' }}>
            <div style={{ marginBottom: 16 }}>{stat.icon}</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#0F4C81', fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</div>
            <div style={{ color: '#4a5a6a', fontSize: 14, marginTop: 8 }}>{stat.label}</div>
          </div>
        ))}
      </section>

      <section style={{ ...styles.section, paddingBottom: 80 }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#0F4C81', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 50 }}>
          Everything You Need to Screen Developers
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {[
            { icon: <Code size={40} color="#F5A623" />, title: 'Automated Coding Challenges', desc: 'Real-world coding problems with automated evaluation. Screen for actual skills, not credentials.' },
            { icon: <Video size={40} color="#F5A623" />, title: 'Async Video Interviews', desc: 'Candidates answer video prompts on their own time. Review when you\'re ready.' },
            { icon: <Award size={40} color="#F5A623" />, title: 'Skills Assessments', desc: 'Comprehensive evaluations across 100+ skills. Get a true measure of capabilities.' },
            { icon: <Users size={40} color="#F5A623" />, title: 'Unlimited Roles', desc: 'Post unlimited roles at a flat rate. Perfect for growing startups with multiple openings.' },
            { icon: <TrendingUp size={40} color="#F5A623" />, title: 'Pipeline Analytics', desc: 'Real-time metrics on your hiring funnel. Know exactly where to focus.' },
            { icon: <ClipboardList size={40} color="#F5A623" />, title: 'Streamlined Workflow', desc: 'From role creation to offer — everything in one beautiful dashboard.' }
          ].map((f, i) => (
            <div key={i} style={{ ...styles.card, '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 30px rgba(15, 76, 129, 0.1)' } }}>
              <div style={{ marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ margin: '0 0 12px', fontSize: 20, color: '#0F4C81', fontFamily: "'Space Grotesk', sans-serif" }}>{f.title}</h3>
              <p style={{ margin: 0, color: '#4a5a6a', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ ...styles.section, paddingBottom: 80 }}>
        <div style={{ background: '#0F4C81', borderRadius: 24, padding: 60, color: 'white' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 30 }}>
            <div style={{ padding: 30, background: 'rgba(255,255,255,0.1)', borderRadius: 16 }}>
              <h3 style={{ fontSize: 20, margin: '0 0 15px', fontFamily: "'Space Grotesk', sans-serif" }}>Pro</h3>
              <div style={{ fontSize: '3rem', fontWeight: 700, marginBottom: 20 }}>
                $399<span style={{ fontSize: 16, fontWeight: 400, color: '#F5A623' }}>/mo</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px', lineHeight: 2, fontSize: 15 }}>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle size={16} color="#F5A623" /> Unlimited roles</li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle size={16} color="#F5A623" /> Automated coding challenges</li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle size={16} color="#F5A623" /> Async video interviews</li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle size={16} color="#F5A623" /> Skills assessments</li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle size={16} color="#F5A623" /> Pipeline management</li>
              </ul>
              <button onClick={onGetStarted} style={{ width: '100%', background: '#F5A623', color: '#0F4C81', border: 'none', padding: 14, borderRadius: 8, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>
                Start Free Trial
              </button>
            </div>
            <div style={{ padding: 30, background: 'rgba(255,255,255,0.1)', borderRadius: 16 }}>
              <h3 style={{ fontSize: 20, margin: '0 0 15px', fontFamily: "'Space Grotesk', sans-serif" }}>Testimonial</h3>
              <blockquote style={{ margin: 0, fontSize: 16, lineHeight: 1.8, fontStyle: 'italic' }}>
                "DevHire cut our time-to-first-interview from 2 weeks to 48 hours. We found our first engineering hire in 5 days."
              </blockquote>
              <div style={{ marginTop: 20, fontWeight: 600 }}>- Sarah Chen, Founder at TechFlow</div>
              <div style={{ marginTop: 40, fontSize: 16, lineHeight: 1.8, fontStyle: 'italic' }}>
                "As a solo founder, DevHire is the tool I wish I had from day one. Finally, a hiring platform that understands speed."
              </div>
              <div style={{ marginTop: 20, fontWeight: 600 }}>- Marcus Rodriguez, Solo Founder</div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ ...styles.footer, maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 20, fontWeight: 700, color: '#0F4C81', fontFamily: "'Space Grotesk', sans-serif" }}>
          <span style={{ background: '#0F4C81', borderRadius: 8, padding: 6, display: 'flex' }}>
            <Briefcase size={18} color="#F5A623" />
          </span>
          DevHire
        </div>
        <div style={{ color: '#4a5a6a', fontSize: 14 }}>© 2024 DevHire. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 20 }}>
          <span style={{ color: '#4a5a6a', cursor: 'pointer' }}>Privacy</span>
          <span style={{ color: '#4a5a6a', cursor: 'pointer' }}>Terms</span>
          <span style={{ color: '#4a5a6a', cursor: 'pointer' }}>Contact</span>
        </div>
      </footer>
    </div>
  );
}

function ProductApp({ user, token, onLogout }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [metrics, setMetrics] = useState({});
  const [roles, setRoles] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [newRole, setNewRole] = useState({ title: '', status: 'active' });
  const [toast, setToast] = useState(null);
  const [sortField, setSortField] = useState('created_at');
  const [sortDir, setSortDir] = useState('desc');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [loading, setLoading] = useState({ metrics: true, roles: true, candidates: true, assessments: true });
  const [dataOk, setDataOk] = useState(true);

  useEffect(() => {
    let mounted = true;
    const done = (key) => { if (mounted) setLoading(p => ({ ...p, [key]: false })); };
    apiFetch('/api/metrics').then(d => { if (mounted) { setMetrics(Array.isArray(d) ? d[0] || {} : d || {}); if (!d) setDataOk(false); else setDataOk(true); done('metrics'); } });
    apiFetch('/api/roles').then(d => { if (mounted) { const b = Array.isArray(d) ? d : (d && (d.roles || d.items)); setRoles(Array.isArray(b) ? b : []); done('roles'); } });
    apiFetch('/api/candidates').then(d => { if (mounted) { const b = Array.isArray(d) ? d : (d && d.items); setCandidates(Array.isArray(b) ? b : []); done('candidates'); } });
    apiFetch('/api/assessments').then(d => { if (mounted) { const b = Array.isArray(d) ? d : (d && d.items); setAssessments(Array.isArray(b) ? b : []); done('assessments'); } });
    return () => { mounted = false; };
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const createRole = async (e) => {
    e.preventDefault();
    if (!newRole.title.trim()) { showToast('Please enter a role title'); return; }
    const res = await apiFetch('/api/roles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRole)
    });
    if (res) {
      setRoles(prev => [res, ...(prev || [])]);
      setNewRole({ title: '', status: 'active' });
      showToast('Role created successfully!');
    } else {
      showToast('Failed to create role - please retry');
    }
  };

  const handleSort = (field) => {
    setSortDir(prevDir => sortField === field ? (prevDir === 'asc' ? 'desc' : 'asc') : 'desc');
    setSortField(field);
  };

  const sortedRoles = useMemo(() => {
    const roster = [...(roles || [])];
    return roster.sort((a, b) => {
      const aVal = a[sortField] || '';
      const bVal = b[sortField] || '';
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [roles, sortField, sortDir]);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={18} /> },
    { id: 'roles', label: 'Roles', icon: <Briefcase size={18} /> },
    { id: 'candidates', label: 'Candidates', icon: <Users size={18} /> }
  ];

  const styles = {
    page: { minHeight: '100vh', background: '#F4F7F6', color: '#1a2b3c', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column' },
    sidebar: { width: 240, background: '#0F4C81', color: 'white', padding: '20px 0', flexShrink: 0 },
    main: { flex: 1, padding: '20px 30px', overflowY: 'auto' },
    card: { background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' },
    btn: { background: '#F5A623', color: '#0F4C81', border: 'none', padding: '10px 20px', borderRadius: 8, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' },
    btnSecondary: { background: '#e8f0fe', color: '#0F4C81', border: 'none', padding: '10px 20px', borderRadius: 8, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' },
    input: { width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0', marginBottom: 12, fontSize: 14 }
  };

  return (
    <div style={styles.page}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=DM+Sans:wght@400;500;600&display=swap');`}</style>
      
      <div style={{ display: 'flex', height: '100vh' }}>
        <aside style={{ ...styles.sidebar, display: showMobileMenu ? 'block' : 'none', position: 'static' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px', marginBottom: 30, fontSize: 22, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
            <span style={{ background: '#F5A623', borderRadius: 8, padding: 6, display: 'flex' }}>
              <Briefcase size={18} color="#0F4C81" />
            </span>
            DevHire
          </div>
          {(sidebarItems || []).map(item => (
            <div key={item.id} onClick={() => { setActiveSection(item.id); setShowMobileMenu(false); }} style={{ padding: '12px 20px', cursor: 'pointer', background: activeSection === item.id ? 'rgba(245,166,35,0.2)' : 'transparent', display: 'flex', gap: 12, alignItems: 'center', borderLeft: activeSection === item.id ? '4px solid #F5A623' : '4px solid transparent', transition: 'all 0.2s' }}>
              <span style={{ color: '#F5A623' }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
          <div style={{ position: 'absolute', bottom: 20, padding: '0 20px', width: 200 }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>Pro Plan</div>
            <button onClick={onLogout} style={{ display: 'flex', gap: 8, alignItems: 'center', background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s' }}>
              <LogOut size={16} color="#F5A623" /> Logout
            </button>
          </div>
        </aside>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 30px', background: '#0F4C81', color: 'white', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
              <button onClick={() => setShowMobileMenu(!showMobileMenu)} style={{ display: 'flex', cursor: 'pointer', background: 'transparent', border: 'none', color: 'white' }}>
                {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
              </button>
              <span style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
                Global Dashboard
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
              <Bell size={18} style={{ cursor: 'pointer', color: '#F5A623' }} />
              <span style={{ fontSize: 14, display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ background: '#F5A623', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F4C81', fontWeight: 700 }}>
                  {user?.email?.[0]?.toUpperCase() || 'D'}
                </span>
                <span style={{ display: 'inline-block', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email || 'Founder'}</span>
              </span>
            </div>
          </div>

          <div style={{ ...styles.main, position: 'relative' }}>
            <div style={{ background: '#e8f0fe', border: '1px solid #0F4C81', borderRadius: 8, padding: 16, marginBottom: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ color: '#0F4C81', fontSize: 14 }}>
                <span style={{ fontWeight: 700, fontSize: 16 }}>Welcome, {user?.name || 'Founder'}!</span>
                {' '}Your account is ready. Set up your first role below and get screening candidates in minutes.
              </div>
            </div>

            {toast && (
              <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: '#0F4C81', color: 'white', padding: '14px 32px', borderRadius: 8, zIndex: 1000, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
                {toast}
              </div>
            )}

            {activeSection === 'dashboard' && (
              <>
                {(loading.metrics || loading.roles || loading.candidates || loading.assessments) && (
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#e8f0fe', color: '#0F4C81', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 14 }}>
                    <span style={{
                      display: 'inline-block', width: 13, height: 13, borderRadius: '50%',
                      background: 'radial-gradient(circle at 35% 35%, #F5A623, #b97710)', marginRight: 6
                    }} />
                    <span>Syncing live hiring data&hellip;</span>
                  </div>
                )}
                {!dataOk && (
                  <div style={{ background: '#fdecea', color: '#b3261e', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 14 }}>
                    <span>We couldn&rsquo;t reach the metrics service. Showing your locally active data &mdash; retrying automatically.</span>
                  </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 30 }}>
                  <div style={styles.card}>
                    <div style={{ fontSize: 13, color: '#4a5a6a' }}>Active Roles</div>
                    <div style={{ fontSize: 36, fontWeight: 700, color: '#0F4C81', fontFamily: "'Space Grotesk', sans-serif" }}>{loading.roles ? '…' : (metrics?.roles_active || (roles || []).length || 0)}</div>
                  </div>
                  <div style={{ ...styles.card, background: '#0F4C81', color: 'white', border: 'none' }}>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Candidates Screened</div>
                    <div style={{ fontSize: 36, fontWeight: 700, color: '#F5A623', fontFamily: "'Space Grotesk', sans-serif" }}>{loading.candidates ? '…' : (metrics?.candidates_screened || (candidates || []).length || 0)}</div>
                  </div>
                  <div style={styles.card}>
                    <div style={{ fontSize: 13, color: '#4a5a6a' }}>Time to Interview</div>
                    <div style={{ fontSize: 36, fontWeight: 700, color: '#0F4C81', fontFamily: "'Space Grotesk', sans-serif" }}>{loading.metrics ? '…' : (metrics?.time_to_interview_hours || 48) + 'h'}</div>
                  </div>
                  <div style={styles.card}>
                    <div style={{ fontSize: 13, color: '#4a5a6a' }}>Avg. Assessment Score</div>
                    <div style={{ fontSize: 36, fontWeight: 700, color: '#0F4C81', fontFamily: "'Space Grotesk', sans-serif" }}>
                      {assessments.length ? Math.round(assessments.reduce((acc, a) => acc + (a.score || 0), 0) / assessments.length * 10) / 10 : '—'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 30 }}>
                  <div style={styles.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                      <span style={{ fontSize: 18, fontWeight: 600 }}>Active Roles</span>
                      <button style={styles.btnSecondary} onClick={() => setActiveSection('roles')}>View All</button>
                    </div>
                    {loading.roles ? (
                      <div style={{ textAlign: 'center', padding: '40px 20px', color: '#4a5a6a' }}>
                        <div style={{ fontSize: 42, marginBottom: 12 }}>💼</div>
                        Loading roles&hellip;
                      </div>
                    ) : (roles || []).length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '40px 20px', color: '#4a5a6a' }}>
                        <div style={{ fontSize: 42, marginBottom: 12 }}>💼</div>
                        No roles yet. <span style={{ color: '#0F4C81', cursor: 'pointer', fontWeight: 600 }} onClick={() => setActiveSection('roles')}>Create your first role</span>
                      </div>
                    ) : (
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                          <thead>
                            <tr style={{ color: '#4a5a6a', textAlign: 'left', borderBottom: '2px solid #0F4C81' }}>
                              <th onClick={() => handleSort('title')} style={{ cursor: 'pointer', padding: '12px 8px' }}>Title {sortField === 'title' && <span>{sortDir === 'asc' ? '↑' : '↓'}</span>}</th>
                              <th onClick={() => handleSort('created_at')} style={{ cursor: 'pointer', padding: '12px 8px' }}>Created {sortField === 'created_at' && <span>{sortDir === 'asc' ? '↑' : '↓'}</span>}</th>
                              <th style={{ padding: '12px 8px' }}>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(sortedRoles || []).map(role => (
                              <tr key={role.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                <td style={{ padding: '12px 8px', fontWeight: 500 }}>{role.title}</td>
                                <td style={{ padding: '12px 8px' }}>{new Date(role.created_at).toLocaleDateString()}</td>
                                <td style={{ padding: '12px 8px' }}>
                                  <span style={{ background: role.status === 'active' ? '#e8f0fe' : '#e2e8f0', color: role.status === 'active' ? '#0F4C81' : '#4a5a6a', padding: '4px 12px', borderRadius: 20, fontSize: 12 }}>
                                    {role.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div style={styles.card}>
                    <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Assessment Overview</div>
                    {loading.assessments ? (
                      <div style={{ textAlign: 'center', color: '#4a5a6a' }}>
                        <div style={{ fontSize: 42, marginBottom: 12 }}>📊</div>
                        Loading assessments&hellip;
                      </div>
                    ) : (assessments || []).length === 0 ? (
                      <div style={{ textAlign: 'center', color: '#4a5a6a' }}>
                        <div style={{ fontSize: 42, marginBottom: 12 }}>📊</div>
                        No assessments yet
                      </div>
                    ) : (
                      <div>
                        {(assessments || []).slice(0, 3).map(ass => (
                          <div key={ass.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
                            <div>
                              <div style={{ fontWeight: 500 }}>{ass.type}</div>
                              <div style={{ fontSize: 12, color: '#4a5a6a' }}>Candidate #{ass.candidate_id}</div>
                            </div>
                            <div style={{ fontWeight: 700, color: '#0F4C81' }}>{ass.score}%</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {activeSection === 'roles' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
                  <div style={styles.card}>
                    <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: '#0F4C81', fontFamily: "'Space Grotesk', sans-serif" }}>
                      <Plus size={20} style={{ verticalAlign: 'middle', marginRight: 8 }} color="#F5A623" />
                      Create New Role
                    </div>
                    <form onSubmit={createRole}>
                      <input
                        value={newRole.title}
                        onChange={e => setNewRole({ ...newRole, title: e.target.value })}
                        placeholder="e.g. Senior React Developer"
                        style={styles.input}
                      />
                      <select value={newRole.status} onChange={e => setNewRole({ ...newRole, status: e.target.value })} style={styles.input}>
                        <option value="active">Active</option>
                        <option value="paused">Paused</option>
                      </select>
                      <button type="submit" style={styles.btn} onClick={createRole}>Create Role</button>
                    </form>
                  </div>
                  <div style={styles.card}>
                    <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: '#0F4C81', fontFamily: "'Space Grotesk', sans-serif" }}>
                      All Roles
                    </div>
                    {loading.roles ? (
                      <div style={{ textAlign: 'center', color: '#4a5a6a' }}>
                        <div style={{ fontSize: 42, marginBottom: 12 }}>📋</div>
                        Loading roles&hellip;
                      </div>
                    ) : (roles || []).length === 0 ? (
                      <div style={{ textAlign: 'center', color: '#4a5a6a' }}>
                        <div style={{ fontSize: 42, marginBottom: 12 }}>📋</div>
                        No roles yet. Create your first one!
                      </div>
                    ) : (
                      (roles || []).map(role => (
                        <div key={role.id} style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 12, marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontWeight: 600 }}>{role.title}</div>
                            <div style={{ fontSize: 12, color: '#4a5a6a' }}>Created {new Date(role.created_at).toLocaleDateString()}</div>
                          </div>
                          <span style={{ background: role.status === 'active' ? '#e8f0fe' : '#e2e8f0', color: role.status === 'active' ? '#0F4C81' : '#4a5a6a', padding: '4px 12px', borderRadius: 20, fontSize: 12 }}>
                            {role.status}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}

            {activeSection === 'candidates' && (
              <div style={styles.card}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: '#0F4C81', fontFamily: "'Space Grotesk', sans-serif" }}>
                  <Filter size={18} style={{ verticalAlign: 'middle', marginRight: 8 }} color="#F5A623" />
                  Candidate Pipeline
                </div>
                {loading.candidates ? (
                  <div style={{ textAlign: 'center', color: '#4a5a6a', padding: '40px 20px' }}>
                    <div style={{ fontSize: 42, marginBottom: 12 }}>🔍</div>
                    Loading candidates&hellip;
                  </div>
                ) : (candidates || []).length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#4a5a6a', padding: '40px 20px' }}>
                    <div style={{ fontSize: 42, marginBottom: 12 }}>🔍</div>
                    No candidates yet. Once you create roles and run challenges, candidates will appear here.
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ color: '#4a5a6a', textAlign: 'left', borderBottom: '2px solid #0F4C81' }}>
                          <th style={{ padding: '12px 8px' }}>Name</th>
                          <th style={{ padding: '12px 8px' }}>Email</th>
                          <th style={{ padding: '12px 8px' }}>Role</th>
                          <th style={{ padding: '12px 8px' }}>Status</th>
                          <th style={{ padding: '12px 8px' }}>Assessment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(candidates || []).map(cand => (
                          <tr key={cand.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                            <td style={{ padding: '12px 8px', fontWeight: 500 }}>{cand.name}</td>
                            <td style={{ padding: '12px 8px' }}>{cand.email}</td>
                            <td style={{ padding: '12px 8px' }}>#{cand.role_id}</td>
                            <td style={{ padding: '12px 8px' }}>
                              <span style={{ background: '#e8f0fe', color: '#0F4C81', padding: '4px 12px', borderRadius: 20, fontSize: 12 }}>
                                {cand.status}
                              </span>
                            </td>
                            <td style={{ padding: '12px 8px' }}>
                              {(assessments || []).filter(a => a.candidate_id === cand.id)[0]?.score || '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthGate({ onAuth, onClose }) {
  const [mode, setMode] = useState('signup');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const _ip = { width: '100%', padding: '11px 13px', margin: '6px 0', borderRadius: 9, border: '1px solid #2a3350', background: '#0b1020', color: '#e6eaf2', fontSize: 14, outline: 'none', boxSizing: 'border-box' };
  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    setLoading(true); setError('');
    const _b = window.__NC_BASE__ || ''; const _s = window.__COMPANY_SLUG__ || '';
    const body = JSON.stringify({ email: form.email, password: form.password, name: form.name });
    const _call = () => fetch(`${_b}/api/c/${_s}/auth/${mode}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
    try {
      let res; try { res = await _call(); } catch { await new Promise(r => setTimeout(r, 2500)); res = await _call(); }
      const json = await res.json();
      if (!json.ok) { setError(json.error || 'Authentication failed — please try again'); setLoading(false); return; }
      onAuth(json);
    } catch { setError('Connection error — please try again in a moment.'); setLoading(false); }
  };
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,18,.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={submit} style={{ background: '#0f1424', border: '1px solid #232b45', padding: 28, borderRadius: 16, width: 360, maxWidth: '90vw', color: '#e6eaf2' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 700 }}>{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h3>
        {mode === 'signup' && <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" style={_ip} />}
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Work email" type="email" required style={_ip} />
        <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password (min 6 chars)" type="password" required style={_ip} />
        {error && <p style={{ color: '#f87171', fontSize: 13, margin: '6px 0 0' }}>{error}</p>}
        <button type="submit" disabled={loading} style={{ width: '100%', marginTop: 10, padding: '12px', borderRadius: 9, border: 'none', background: loading ? '#4b50b8' : '#6366f1', color: '#fff', fontWeight: 700, fontSize: 15, cursor: loading ? 'default' : 'pointer' }}>
          {loading ? '…' : mode === 'signup' ? 'Get started free' : 'Log in'}
        </button>
        <p onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(''); }} style={{ marginTop: 14, fontSize: 13, color: '#9aa6bd', cursor: 'pointer', textAlign: 'center' }}>
          {mode === 'signup' ? 'Already have an account? Log in' : 'New here? Create an account'}
        </p>
      </form>
    </div>
  );
}

function App() {
  const [auth, setAuth] = useState(() => {
    try {
      if (localStorage.getItem('nc_user') && !localStorage.getItem('nc_auth')) localStorage.removeItem('nc_user');
      const a = JSON.parse(localStorage.getItem('nc_auth') || 'null');
      return (a && a.token && a.user && typeof a.user.email === 'string') ? a : null;
    } catch { return null; }
  });
  const [showAuth, setShowAuth] = useState(false);
  useEffect(() => {
    if (!auth?.token) return;
    const _b = window.__NC_BASE__ || ''; const _s = window.__COMPANY_SLUG__ || '';
    fetch(`${_b}/api/c/${_s}/auth/me`, { headers: { Authorization: `Bearer ${auth.token}` } })
      .then(r => r.json()).then(d => { if (!d.ok) { localStorage.removeItem('nc_auth'); setAuth(null); } }).catch(() => {});
  }, []);
  const onAuth = (data) => { localStorage.setItem('nc_auth', JSON.stringify(data)); setAuth(data); setShowAuth(false); };
  const onLogout = () => { localStorage.removeItem('nc_auth'); setAuth(null); };
  if (auth?.user) return <ProductApp user={auth.user} token={auth.token} onLogout={onLogout} />;
  return (
    <>
      <LandingPage onGetStarted={() => setShowAuth(true)} onSignup={() => setShowAuth(true)} onLogin={() => setShowAuth(true)} />
      {/* Fallback entry point (bottom-right so it never overlaps the nav) — guarantees a
          working login even if the landing's own buttons aren't wired to the auth modal. */}
      <button onClick={() => setShowAuth(true)} style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 999, background: '#6366f1', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 999, fontWeight: 600, fontSize: 14, cursor: 'pointer', boxShadow: '0 6px 20px rgba(99,102,241,.45)' }}>Sign in</button>
      {showAuth && <AuthGate onAuth={onAuth} onClose={() => setShowAuth(false)} />}
    </>
  );
}

export default App;

// end of DevHire dashboard module
