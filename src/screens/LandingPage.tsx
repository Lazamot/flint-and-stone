import { useNavigate } from 'react-router-dom';
import { MERGED_TOPICS } from '../data/merged-topics';

export default function LandingPage() {
  const navigate = useNavigate();
  const releasedTopics = MERGED_TOPICS.filter((t) => t.released);
  const releasedDays = releasedTopics.reduce((sum, t) => sum + t.days.length, 0);

  return (
    <div style={styles.container}>
      {/* Background texture overlay */}
      <div style={styles.overlay} />

      {/* Content */}
      <div style={styles.content}>
        {/* Logo / Icon */}
        <div style={styles.logoWrap}>
          <img
            src="/icon-192.png"
            alt="Flint & Stone"
            style={styles.logo}
          />
        </div>

        {/* Brand name */}
        <div style={styles.brandWrap}>
          <span style={styles.brandFlint}>FLINT</span>
          <span style={styles.brandAmp}> &amp; </span>
          <span style={styles.brandStone}>STONE</span>
        </div>

        {/* Tagline */}
        <p style={styles.tagline}>Ignite Your Faith</p>

        {/* Verse */}
        <p style={styles.verse}>
          "His word is in my heart like a fire, a fire shut up in my bones."
        </p>
        <p style={styles.verseRef}>-- Jeremiah 20:9</p>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Navigation buttons */}
        <div style={styles.buttonGroup}>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate('/devotions')}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <div style={styles.btnText}>
              <span style={styles.btnTitle}>Devotionals</span>
              <span style={styles.btnSub}>{releasedTopics.length} topics · {releasedDays} days</span>
            </div>
            <span style={styles.btnArrow}></span>
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => navigate('/bible-studies')}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <div style={styles.btnText}>
              <span style={styles.btnTitle}>Bible Studies</span>
              <span style={styles.btnSub}>Book-by-book deep dives</span>
            </div>
            <span style={styles.btnArrow}></span>
          </button>
        </div>

        {/* Footer */}
        <p style={styles.footer}>Built for men who want more.</p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #0a0a0a 0%, #1a0a0a 50%, #0d0d0d 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      radial-gradient(ellipse at 20% 20%, rgba(180,30,30,0.12) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 80%, rgba(180,30,30,0.08) 0%, transparent 60%)
    `,
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 24px 48px',
    maxWidth: 420,
    width: '100%',
    textAlign: 'center',
  },
  logoWrap: {
    marginBottom: 20,
  },
  logo: {
    width: 88,
    height: 88,
    borderRadius: '50%',
    border: '2px solid rgba(180,30,30,0.6)',
    boxShadow: '0 0 32px rgba(180,30,30,0.3)',
  },
  brandWrap: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 0,
    marginBottom: 6,
  },
  brandFlint: {
    fontSize: 38,
    fontWeight: 900,
    letterSpacing: 4,
    color: '#ffffff',
    fontFamily: 'Georgia, serif',
  },
  brandAmp: {
    fontSize: 28,
    fontWeight: 400,
    color: '#b41e1e',
    margin: '0 4px',
    fontFamily: 'Georgia, serif',
  },
  brandStone: {
    fontSize: 38,
    fontWeight: 900,
    letterSpacing: 4,
    color: '#ffffff',
    fontFamily: 'Georgia, serif',
  },
  tagline: {
    fontSize: 15,
    letterSpacing: 6,
    textTransform: 'uppercase',
    color: '#b41e1e',
    margin: '0 0 20px',
    fontWeight: 600,
  },
  verse: {
    fontSize: 14,
    color: '#9ba1a6',
    fontStyle: 'italic',
    lineHeight: 1.6,
    margin: '0 0 4px',
    maxWidth: 320,
  },
  verseRef: {
    fontSize: 12,
    color: '#687076',
    margin: '0 0 28px',
  },
  divider: {
    width: 48,
    height: 2,
    background: 'linear-gradient(90deg, transparent, #b41e1e, transparent)',
    marginBottom: 28,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    width: '100%',
    marginBottom: 32,
  },
  primaryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    width: '100%',
    padding: '18px 20px',
    background: 'linear-gradient(135deg, #b41e1e 0%, #8b1515 100%)',
    border: 'none',
    borderRadius: 14,
    cursor: 'pointer',
    transition: 'opacity 0.15s',
    boxShadow: '0 4px 20px rgba(180,30,30,0.35)',
    textAlign: 'left',
  },
  secondaryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    width: '100%',
    padding: '18px 20px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 14,
    cursor: 'pointer',
    transition: 'opacity 0.15s',
    textAlign: 'left',
  },

  btnText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    flex: 1,
  },
  btnTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  btnSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: 400,
  },
  btnArrow: {
    fontSize: 22,
    color: 'rgba(255,255,255,0.5)',
    flexShrink: 0,
  },
  footer: {
    fontSize: 12,
    color: '#444',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
};
