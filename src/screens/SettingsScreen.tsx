import { useState, useEffect } from 'react';
import { getMentor, saveMentor } from '../lib/storage';

export default function SettingsScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const mentor = getMentor();
    setName(mentor.name);
    setPhone(mentor.phone);
  }, []);

  const handleSave = () => {
    saveMentor({ name: name.trim(), phone: phone.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="screen">
      <div className="screen-scroll" style={{ padding: '20px 16px 32px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 24 }}>Settings</h1>

        {/* Mentor section */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 12 }}>
            Mentor
          </p>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Your mentor's info is used to send your reflection answers via text after completing a devotional day.
            </p>
            <div>
              <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                Mentor's Name
              </label>
              <input
                type="text"
                placeholder="e.g. Coach Davis"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                Mentor's Phone Number
              </label>
              <input
                type="tel"
                placeholder="e.g. 555-867-5309"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button
              className="btn-primary"
              onClick={handleSave}
              style={{ background: saved ? 'var(--success)' : 'var(--primary)' }}
            >
              {saved ? 'v Saved!' : 'Save Mentor Info'}
            </button>
          </div>
        </div>

        {/* About section */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 12 }}>
            About
          </p>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>App</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>Flint &amp; Stone</span>
            </div>
            <div style={{ height: 1, background: 'var(--border)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Topics</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>10</span>
            </div>
            <div style={{ height: 1, background: 'var(--border)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Total Days</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>200</span>
            </div>
            <div style={{ height: 1, background: 'var(--border)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Version</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>1.0</span>
            </div>
            <div style={{ height: 1, background: 'var(--border)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Scripture</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>NIV</span>
            </div>
          </div>
        </div>

        {/* Scripture */}
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.6 }}>
            "As iron sharpens iron, so one person sharpens another."
          </p>
          <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 700, marginTop: 4 }}>
            -- Proverbs 27:17
          </p>
        </div>
      </div>
    </div>
  );
}
