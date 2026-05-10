import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, CheckCircle, ChevronRight } from 'lucide-react';
import { MERGED_TOPICS } from '../data/merged-topics';
import { getProgress } from '../lib/storage';

export default function TopicScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const topic = MERGED_TOPICS.find((t) => t.id === id);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!topic) return;
    const progress = getProgress();
    const done = new Set(
      progress.filter((p) => p.topicId === topic.id && p.completed).map((p) => p.day)
    );
    setCompletedDays(done);
  }, [topic]);

  if (!topic) {
    return (
      <div className="screen" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Topic not found.</p>
      </div>
    );
  }

  const seriesLabels = ['Foundation', 'Going Deeper', 'Tested', 'Refined'];

  return (
    <div className="screen">
      {/* Header */}
      <div style={{ padding: '16px 16px 0', flexShrink: 0 }}>
        <button
          onClick={() => navigate('/devotions')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 14, fontWeight: 600, marginBottom: 16, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: 'var(--text)' }}>{topic.title}</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4, marginBottom: 16, lineHeight: 1.5 }}>
          {topic.description}
        </p>
        <div style={{ height: 1, background: 'var(--border)', marginBottom: 4 }} />
      </div>

      {/* Day list */}
      <div className="screen-scroll" style={{ padding: '8px 16px 16px' }}>
        {[0, 1, 2, 3].map((seriesIdx) => {
          const seriesDays = topic.days.slice(seriesIdx * 5, seriesIdx * 5 + 5);
          if (seriesDays.length === 0) return null;

          return (
            <div key={seriesIdx} style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 10 }}>
                Series {seriesIdx + 1}: {seriesLabels[seriesIdx]}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {seriesDays.map((d) => {
                  const isDone = completedDays.has(d.day);
                  const prevDone = d.day === 1 || completedDays.has(d.day - 1);
                  const isLocked = !isDone && !prevDone;
                  const isNext = !isDone && prevDone;

                  return (
                    <button
                      key={d.day}
                      onClick={() => {
                        if (isLocked) {
                          alert(`Complete Day ${d.day - 1} first to unlock this day.`);
                          return;
                        }
                        navigate(`/devotions/devotional/${topic.id}/${d.day}`);
                      }}
                      style={{
                        background: 'var(--surface)',
                        border: `1px solid ${isDone ? 'var(--success)' : isNext ? 'var(--primary)' : 'var(--border)'}`,
                        borderRadius: 14,
                        padding: '14px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        cursor: isLocked ? 'default' : 'pointer',
                        opacity: isLocked ? 0.45 : 1,
                        textAlign: 'left',
                        width: '100%',
                      }}
                    >
                      <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: isDone ? 'var(--success)' : isNext ? 'var(--primary)' : 'var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        {isDone ? (
                          <CheckCircle size={18} color="#fff" />
                        ) : isLocked ? (
                          <Lock size={16} color="var(--text-muted)" />
                        ) : (
                          <span style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>{d.day}</span>
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 700, color: isLocked ? 'var(--text-muted)' : 'var(--text)' }}>
                          Day {d.day}: {d.title}
                        </p>
                        {isNext && (
                          <p style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700, marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                            Up Next
                          </p>
                        )}
                        {isDone && (
                          <p style={{ fontSize: 11, color: 'var(--success)', fontWeight: 700, marginTop: 2 }}>
                            Completed
                          </p>
                        )}
                      </div>
                      {!isLocked && <ChevronRight size={18} color="var(--text-muted)" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
