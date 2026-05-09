import { useNavigate } from 'react-router-dom';

export default function BibleStudiesScreen() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate('/')}>
          &lt;- Back
        </button>
        <h1 style={styles.title}>Bible Studies</h1>
      </div>

      <div style={styles.body}>
        {/* Coming soon hero */}
        <div style={styles.heroCard}>
          <h2 style={styles.heroTitle}>Coming Soon</h2>
          <p style={styles.heroText}>
            Book-by-book studies are being written. Each study walks you through
            a book of the Bible day by day -- with real readings, honest
            reflections, and questions that cut deep.
          </p>
        </div>

        {/* What to expect */}
        <div style={styles.section}>
          <p style={styles.sectionLabel}>WHAT TO EXPECT</p>
          <div style={styles.featureList}>
            {[
              { icon: '', text: 'Daily passage readings' },
              { icon: '', text: 'Original reflections from the author' },
              { icon: '', text: 'Deep-dive questions per chapter' },
              { icon: '', text: 'Space to write your own responses' },
              { icon: '', text: 'Share answers with your mentor' },
            ].map((item, i) => (
              <div key={i} style={styles.featureItem}>
                <span style={styles.featureIcon}>{item.icon}</span>
                <span style={styles.featureText}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Placeholder books */}
        <div style={styles.section}>
          <p style={styles.sectionLabel}>FIRST STUDIES COMING</p>
          <div style={styles.bookList}>
            {['Proverbs', 'James', 'Philippians'].map((book) => (
              <div key={book} style={styles.bookItem}>
                <span style={styles.bookName}>{book}</span>
                <span style={styles.bookBadge}>In Progress</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: '#0f1012',
    color: '#ecedee',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '52px 20px 16px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#b41e1e',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    padding: '4px 0',
  },
  title: {
    fontSize: 22,
    fontWeight: 800,
    margin: 0,
    color: '#ecedee',
    letterSpacing: 0.5,
  },
  body: {
    flex: 1,
    padding: '24px 20px 40px',
    display: 'flex',
    flexDirection: 'column',
    gap: 28,
    maxWidth: 480,
    width: '100%',
    margin: '0 auto',
  },
  heroCard: {
    background: 'rgba(180,30,30,0.08)',
    border: '1px solid rgba(180,30,30,0.2)',
    borderRadius: 16,
    padding: '32px 24px',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 800,
    margin: '0 0 12px',
    color: '#ecedee',
  },
  heroText: {
    fontSize: 14,
    color: '#9ba1a6',
    lineHeight: 1.7,
    margin: 0,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 2,
    color: '#687076',
    margin: 0,
  },
  featureList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.06)',
  },
  featureIcon: {
    fontSize: 20,
    flexShrink: 0,
  },
  featureText: {
    fontSize: 14,
    color: '#9ba1a6',
  },
  bookList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  bookItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.06)',
  },
  bookName: {
    fontSize: 15,
    fontWeight: 600,
    color: '#ecedee',
  },
  bookBadge: {
    fontSize: 11,
    fontWeight: 600,
    color: '#b41e1e',
    background: 'rgba(180,30,30,0.12)',
    padding: '3px 10px',
    borderRadius: 20,
    letterSpacing: 0.5,
  },
};
