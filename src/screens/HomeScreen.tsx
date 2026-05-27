import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Share2 } from 'lucide-react';
import { MERGED_TOPICS } from '../data/merged-topics';
import { getTopicProgress, getStreak, getSeenDays, markTopicSeen, hasNewDays } from '../lib/storage';
import type { StreakData } from '../lib/storage';
import { getVerseOfTheDay } from '../data/verses-of-day';

// Flame SVG icon used for all topic cards
const FlameIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C12 2 7 8 7 13a5 5 0 0 0 10 0c0-3-2-5-2-5s0 3-3 3c0 0 2-5 0-9z" />
  </svg>
);

export default function HomeScreen() {
  const navigate = useNavigate();
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [streak, setStreak] = useState<StreakData>({ current: 0, longest: 0, lastDate: '' });
  const [seenDays, setSeenDays] = useState<Record<string, number>>({});
  const verse = getVerseOfTheDay();

  const loadData = useCallback(() => {
    const map: Record<string, number> = {};
    for (const topic of MERGED_TOPICS) {
      map[topic.id] = getTopicProgress(topic.id);
    }
    setProgressMap(map);
    setStreak(getStreak());
    setSeenDays(getSeenDays());
  }, []);

  useEffect(() => {
    loadData();
    window.addEventListener('focus', loadData);
    return () => window.removeEventListener('focus', loadData);
  }, [loadData]);

  const handleShareVerse = async () => {
    const text = `"${verse.text}"\n\n— ${verse.reference}\n\nFlint & Stone | Daily devotional for men\nflintandstonedevo.com`;
    if (navigator.share) {
      await navigator.share({ text, title: 'Verse of the Day — Flint & Stone' }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(text).catch(() => {});
      alert('Verse copied to clipboard!');
    }
  };

  return (
    <div className="screen">
      <div className="screen-scroll" style={{ padding: '20px 16px 16px' }}>
        {/* Back to Home */}
        <button
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 14, fontWeight: 600, marginBottom: 16, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}
        >
          &#8592; Home
        </button>

        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.5, color: 'var(--text)' }}>
            Flint <span style={{ color: 'var(--primary)' }}>&amp;</span> Stone
          </h1>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 }}>
            Daily Devotional
          </p>
        </div>

        {/* Streak Banner */}
        {streak.current > 0 && (
          <div className="card animate-fade" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, borderColor: 'var(--primary)', borderLeftWidth: 3 }}>
            <Flame size={28} color="var(--primary)" />
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 800, color: 'var(--primary)', fontSize: 16 }}>
                {streak.current}-day streak
              </p>
              {streak.longest > streak.current ? (
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Best: {streak.longest} days</p>
              ) : streak.current > 1 ? (
                <p style={{ fontSize: 12, color: 'var(--success)' }}>Personal best!</p>
              ) : null}
            </div>
            <Flame size={22} color="var(--primary)" />
          </div>
        )}

        {/* Verse of the Day */}
        <div className="card animate-fade" style={{ marginBottom: 20, borderLeftWidth: 4, borderLeftColor: 'var(--primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: 'var(--primary)', textTransform: 'uppercase' }}>
                Verse of the Day
              </span>
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.6, fontStyle: 'italic', color: 'var(--text)', marginBottom: 8 }}>
            "{verse.text}"
          </p>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12 }}>
            -- {verse.reference}
          </p>
          <button
            onClick={handleShareVerse}
            style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontSize: 12, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', paddingTop: 10, borderTop: '1px solid var(--border)', width: '100%' }}
          >
            <Share2 size={14} />
            Share this verse
          </button>
        </div>

        {/* Topics Grid */}
        <h2 style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>
          Topics
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, paddingBottom: 16 }}>
          {MERGED_TOPICS.map((topic) => {
            const progress = progressMap[topic.id] ?? 0;
            const total = topic.days.length;
            const pct = Math.round((progress / total) * 100);
            const isComplete = progress === total;

            const showNewBadge = hasNewDays(topic.id, total) || (seenDays[topic.id] !== undefined && total > seenDays[topic.id]);

            return (
              <button
                key={topic.id}
                onClick={() => {
                  markTopicSeen(topic.id, total);
                  setSeenDays((prev) => ({ ...prev, [topic.id]: total }));
                  navigate(`/devotions/topic/${topic.id}`);
                }}
                style={{
                  background: 'var(--surface)',
                  border: `1px solid ${isComplete ? 'var(--success)' : 'var(--border)'}`,
                  borderRadius: 16,
                  padding: 16,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'opacity 0.15s',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  position: 'relative',
                }}
              >
                {showNewBadge && (
                  <div style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    background: 'var(--primary)',
                    color: '#fff',
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                    padding: '3px 7px',
                    borderRadius: 20,
                  }}>
                    New Days
                  </div>
                )}
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: isComplete ? 'var(--success)' : 'var(--primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <FlameIcon />
                </div>
                <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', lineHeight: 1.3 }}>
                  {topic.title}
                </p>
                <p style={{ fontSize: 11, color: isComplete ? 'var(--success)' : 'var(--text-muted)', fontWeight: 600 }}>
                  {isComplete ? 'v Complete!' : `${progress} / ${total} days`}
                </p>
                <div className="progress-bar" style={{ width: '100%' }}>
                  <div className="progress-fill" style={{ width: `${pct}%`, background: isComplete ? 'var(--success)' : 'var(--primary)' }} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p style={{
          fontSize: 11,
          color: 'var(--text-muted)',
          lineHeight: 1.65,
          textAlign: 'center',
          paddingTop: 16,
          paddingBottom: 24,
          borderTop: '1px solid var(--border)',
          marginTop: 8,
        }}>
          The daily devotional content in this app is my own original writing. The reflection questions and calls to action were developed with AI assistance. The vision, structure, and heart behind this app are my own.
        </p>
      </div>
    </div>
  );
}
