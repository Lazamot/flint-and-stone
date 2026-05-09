import { useState, useEffect } from 'react';
import { MERGED_TOPICS } from '../data/merged-topics';
import { getProgress, getStreak, getMentor, getAllAnswers } from '../lib/storage';

const TOPIC_ICONS: Record<string, string> = {
  purity: '', strength: '', identity: '', brotherhood: '', anger: '',
  integrity: '', discipline: '', fear: '', forgiveness: '', leadership: '',
};

export default function ProgressScreen() {
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [streak, setStreak] = useState({ current: 0, longest: 0, lastDate: '' });
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [mentorName, setMentorName] = useState('');

  useEffect(() => {
    const progress = getProgress();
    const map: Record<string, number> = {};
    for (const topic of MERGED_TOPICS) {
      map[topic.id] = progress.filter((p) => p.topicId === topic.id && p.completed).length;
    }
    setProgressMap(map);
    setStreak(getStreak());
    setTotalAnswers(getAllAnswers().length);
    setMentorName(getMentor().name);
  }, []);

  const totalDays = MERGED_TOPICS.reduce((s, t) => s + t.days.length, 0);
  const completedDays = Object.values(progressMap).reduce((s, v) => s + v, 0);
  const overallPct = Math.round((completedDays / totalDays) * 100);

  const handleShareAll = () => {
    const answers = getAllAnswers();
    if (answers.length === 0) {
      alert('No answers to share yet. Complete some devotionals first!');
      return;
    }
    const lines = answers.map((a) =>
      `${a.topicTitle} -- Day ${a.day}: ${a.dayTitle}\n` +
      a.answers.map((qa) => `  Q: ${qa.question}\n  A: ${qa.answer || '(no answer)'}`).join('\n')
    ).join('\n\n---\n\n');
    const body = encodeURIComponent(`Flint & Stone -- My Reflections\n\n${lines}`);
    const mentor = getMentor();
    const phone = mentor.phone.replace(/\D/g, '');
    window.open(`sms:${phone}?body=${body}`, '_blank');
  };

  return (
    <div className="screen">
      <div className="screen-scroll" style={{ padding: '20px 16px 16px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 20 }}>Progress</h1>

        {/* Overall stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'Days Done', value: completedDays },
            { label: 'Streak', value: `${streak.current}` },
            { label: 'Reflections', value: totalAnswers },
          ].map(({ label, value }) => (
            <div key={label} className="card" style={{ textAlign: 'center', padding: 14 }}>
              <p style={{ fontSize: 22, fontWeight: 900, color: 'var(--primary)' }}>{value}</p>
              <p style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Overall progress bar */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <p style={{ fontSize: 13, fontWeight: 700 }}>Overall Progress</p>
            <p style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 800 }}>{overallPct}%</p>
          </div>
          <div className="progress-bar" style={{ height: 8 }}>
            <div className="progress-fill" style={{ width: `${overallPct}%`, height: 8 }} />
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
            {completedDays} of {totalDays} days completed
          </p>
        </div>

        {/* Per-topic breakdown */}
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>
          By Topic
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {MERGED_TOPICS.map((topic) => {
            const done = progressMap[topic.id] ?? 0;
            const total = topic.days.length;
            const pct = Math.round((done / total) * 100);
            const isComplete = done === total;
            return (
              <div key={topic.id} className="card" style={{ borderColor: isComplete ? 'var(--success)' : 'var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 20 }}>{TOPIC_ICONS[topic.id] ?? ''}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700 }}>{topic.title}</p>
                    <p style={{ fontSize: 11, color: isComplete ? 'var(--success)' : 'var(--text-muted)' }}>
                      {isComplete ? 'v Complete!' : `${done} / ${total} days`}
                    </p>
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 800, color: isComplete ? 'var(--success)' : 'var(--primary)' }}>{pct}%</p>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${pct}%`, background: isComplete ? 'var(--success)' : 'var(--primary)' }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Send to mentor */}
        <button className="btn-secondary" onClick={handleShareAll} style={{ marginBottom: 8 }}>
           {mentorName ? `Send All to ${mentorName}` : 'Send All to Mentor'}
        </button>
      </div>
    </div>
  );
}
