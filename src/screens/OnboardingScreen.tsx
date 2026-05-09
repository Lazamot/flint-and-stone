import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveMentor, setOnboarded } from '../lib/storage';

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleGo = () => {
    if (name.trim() || phone.trim()) {
      saveMentor({ name: name.trim(), phone: phone.trim() });
    }
    setOnboarded();
    navigate('/devotions', { replace: true });
  };

  const handleSkip = () => {
    setOnboarded();
    navigate('/devotions', { replace: true });
  };

  return (
    <div className="screen" style={{ justifyContent: 'center', padding: '32px 24px' }}>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'var(--primary)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px', overflow: 'hidden',
        }}>
          <img src="/icon-192.png" alt="Flint and Stone" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: 2, color: 'var(--primary)', textTransform: 'uppercase' }}>
          Flint
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', letterSpacing: 3, textTransform: 'uppercase', marginTop: 2 }}>
          &amp; Stone
        </p>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8, fontStyle: 'italic' }}>
          As iron sharpens iron -- Prov. 27:17
        </p>
      </div>

      {/* Welcome card */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Welcome!</h2>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Every man needs someone in his corner. Add a mentor -- a coach, pastor, dad, or older
          brother -- and you can send your reflection answers straight to them after each devotional.
        </p>
      </div>

      {/* Form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
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
      </div>

      <button className="btn-primary" onClick={handleGo} style={{ marginBottom: 12 }}>
        v Let's Go
      </button>
      <button className="btn-ghost" onClick={handleSkip} style={{ width: '100%', textAlign: 'center' }}>
        Skip for now -- I'll add this in Settings later
      </button>
    </div>
  );
}
