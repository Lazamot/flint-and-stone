import { useState, useEffect } from 'react';
import { getMentor, saveMentor, getUserName, saveUserName } from '../lib/storage';
import { MERGED_TOPICS } from '../data/merged-topics';

export default function SettingsScreen() {
  const [userName, setUserName] = useState('');
  const [mentorName, setMentorName] = useState('');
  const [phone, setPhone] = useState('');
  const [saved, setSaved] = useState(false);
  const releasedTopics = MERGED_TOPICS.filter((t) => t.released);
  const releasedDays = releasedTopics.reduce((sum, t) => sum + t.days.length, 0);

  useEffect(() => {
    setUserName(getUserName());
    const mentor = getMentor();
    setMentorName(mentor.name);
    setPhone(mentor.phone);
  }, []);

  const handleSave = () => {
    saveUserName(userName.trim());
    saveMentor({ name: mentorName.trim(), phone: phone.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="screen">
      <div className="screen-scroll" style={{ padding: '20px 16px 32px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 24 }}>Settings</h1>

        {/* Unified Profile + Mentor card */}
        <div style={{ marginBottom: 32 }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Profile section */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 12 }}>
                Profile
              </p>
              <div>
                <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. James"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>

            <div style={{ height: 1, background: 'var(--border)' }} />

            {/* Mentor section */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 8 }}>
                Mentor
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 12 }}>
                Add a mentor — a coach, pastor, dad, or older brother — and send your reflection answers straight to them after each devotional.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                    Mentor's Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Coach Davis"
                    value={mentorName}
                    onChange={(e) => setMentorName(e.target.value)}
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
            </div>

            {/* Single save button */}
            <button
              className="btn-primary"
              onClick={handleSave}
              style={{ background: saved ? 'var(--success)' : 'var(--primary)' }}
            >
              {saved ? 'v Saved!' : 'Save Settings'}
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
              <span style={{ fontSize: 14, fontWeight: 700 }}>{releasedTopics.length}</span>
            </div>
            <div style={{ height: 1, background: 'var(--border)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Available Days</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{releasedDays}</span>
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
