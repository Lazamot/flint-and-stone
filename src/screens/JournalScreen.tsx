import { useState, useEffect } from 'react';
import { Share2, X } from 'lucide-react';
import { getAllAnswers, DayAnswers, getMentor } from '../lib/storage';

export default function JournalScreen() {
  const [entries, setEntries] = useState<DayAnswers[]>([]);
  const [selected, setSelected] = useState<DayAnswers | null>(null);

  useEffect(() => {
    const all = getAllAnswers().sort(
      (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );
    setEntries(all);
  }, []);

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch { return iso; }
  };

  const handleShare = async (entry: DayAnswers) => {
    const lines = entry.answers.map((qa, i) => `Q${i + 1}: ${qa.question}\nA: ${qa.answer || '(no answer)'}`).join('\n\n');
    const text = `Flint & Stone -- ${entry.topicTitle} Day ${entry.day}: ${entry.dayTitle}\n${formatDate(entry.completedAt)}\n\n${lines}`;
    if (navigator.share) {
      await navigator.share({ text, title: 'My Reflections' }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(text).catch(() => {});
      alert('Copied to clipboard!');
    }
  };

  const handleTextMentor = (entry: DayAnswers) => {
    const lines = entry.answers.map((qa) => `Q: ${qa.question}\nA: ${qa.answer || '(no answer)'}`).join('\n\n');
    const body = encodeURIComponent(`Flint & Stone -- ${entry.topicTitle} Day ${entry.day}: ${entry.dayTitle}\n\n${lines}`);
    const mentor = getMentor();
    const phone = mentor.phone.replace(/\D/g, '');
    window.open(`sms:${phone}?body=${body}`, '_blank');
  };

  return (
    <div className="screen">
      <div className="screen-scroll" style={{ padding: '20px 16px 16px' }}>
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900 }}>My Journal</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'} recorded
          </p>
        </div>

        {entries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: 40, marginBottom: 16 }}></p>
            <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No entries yet</p>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Complete a devotional day and your reflection answers will appear here.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {entries.map((entry) => (
              <button
                key={`${entry.topicId}-${entry.day}`}
                onClick={() => setSelected(entry)}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  padding: 16,
                  textAlign: 'left',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span className="badge">{entry.topicTitle}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{formatDate(entry.completedAt)}</span>
                </div>
                <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
                  Day {entry.day}: {entry.dayTitle}
                </p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {entry.answers.length > 0 && entry.answers[0].answer
                    ? entry.answers[0].answer.slice(0, 80) + (entry.answers[0].answer.length > 80 ? '...' : '')
                    : `${entry.answers.length} reflection${entry.answers.length !== 1 ? 's' : ''} recorded`}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div style={{
          position: 'absolute', inset: 0, background: 'var(--bg)',
          display: 'flex', flexDirection: 'column', zIndex: 50,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 16px 12px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
            <button
              onClick={() => setSelected(null)}
              style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none' }}
            >
              <X size={18} color="var(--text)" />
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => handleTextMentor(selected)}
                className="btn-secondary"
                style={{ padding: '8px 14px', width: 'auto', fontSize: 13 }}
              >
                 Text Mentor
              </button>
              <button
                onClick={() => handleShare(selected)}
                style={{ background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 20, padding: '8px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Share2 size={14} /> Share
              </button>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 32px' }}>
            <span className="badge" style={{ marginBottom: 12, display: 'inline-flex' }}>{selected.topicTitle}</span>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>
              Day {selected.day}: {selected.dayTitle}
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>{formatDate(selected.completedAt)}</p>
            {selected.answers.map((qa, i) => (
              <div key={i} style={{ background: 'var(--surface)', borderRadius: 12, padding: 16, marginBottom: 14, borderLeft: '3px solid var(--primary)' }}>
                <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, lineHeight: 1.5 }}>{qa.question}</p>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {qa.answer || '(No answer provided)'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
