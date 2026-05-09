import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, ChevronLeft, MessageSquare, CheckCircle, Flame } from 'lucide-react';
import { MERGED_TOPICS } from '../data/merged-topics';
import type { DevotionalCard } from '../data/devotionals';
import {
  markDayComplete, saveAnswers, getAnswersForDay,
  recordStreakActivity, getTopicProgress, getMentor,
} from '../lib/storage';

export default function DevotionalScreen() {
  const { topicId, day } = useParams<{ topicId: string; day: string }>();
  const navigate = useNavigate();
  const dayNum = parseInt(day ?? '1', 10);

  const topic = MERGED_TOPICS.find((t) => t.id === topicId);
  const devotionalDay = topic?.days.find((d) => d.day === dayNum);

  const [cardIndex, setCardIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [mentorName, setMentorName] = useState('');
  const [streak, setStreak] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!devotionalDay) return;
    // Pre-fill answers from storage
    const saved = getAnswersForDay(topicId!, dayNum);
    const questions = devotionalDay.cards.filter((c) => c.type === 'question');
    if (saved) {
      setAnswers(saved.answers.map((a) => a.answer));
    } else {
      setAnswers(new Array(questions.length).fill(''));
    }
    const mentor = getMentor();
    setMentorName(mentor.name);
  }, [topicId, dayNum, devotionalDay]);

  if (!topic || !devotionalDay) {
    return (
      <div className="screen" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Devotional not found.</p>
      </div>
    );
  }

  const cards = devotionalDay.cards;
  const currentCard = cards[cardIndex];
  const isFirst = cardIndex === 0;

  // Track question index
  const questionIndex = cards
    .slice(0, cardIndex + 1)
    .filter((c) => c.type === 'question').length - 1;

  const handleComplete = () => {
    const questions = cards.filter((c) => c.type === 'question');
    const answerData = questions.map((q, i) => ({
      question: q.question ?? '',
      answer: answers[i] ?? '',
    }));
    saveAnswers({
      topicId: topic.id,
      day: dayNum,
      dayTitle: devotionalDay.title,
      topicTitle: topic.title,
      answers: answerData,
      completedAt: new Date().toISOString(),
    });
    markDayComplete(topic.id, dayNum);
    const s = recordStreakActivity();
    setStreak(s.current);

    // Check if topic is now complete
    const doneCount = getTopicProgress(topic.id);
    if (doneCount === topic.days.length) {
      setShowCelebration(true);
    } else {
      navigate(`/devotions/topic/${topic.id}`);
    }
  };

  const handleTextMentor = () => {
    const questions = cards.filter((c) => c.type === 'question');
    const lines = questions.map((q, i) => `Q: ${q.question}\nA: ${answers[i] || '(no answer)'}`).join('\n\n');
    const body = encodeURIComponent(
      `Flint & Stone -- ${topic.title} Day ${dayNum}: ${devotionalDay.title}\n\n${lines}`
    );
    const mentor = getMentor();
    const phone = mentor.phone.replace(/\D/g, '');
    window.open(`sms:${phone}?body=${body}`, '_blank');
  };

  const updateAnswer = (val: string) => {
    if (questionIndex < 0) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = val;
      return next;
    });
  };

  const progress = ((cardIndex + 1) / cards.length) * 100;

  return (
    <div className="screen">
      {/* Header */}
      <div style={{ padding: '16px 16px 12px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <button
            onClick={() => navigate(`/devotions/topic/${topic.id}`)}
            style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 14, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 700 }}>
            {cardIndex + 1} / {cards.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div style={{ marginTop: 10 }}>
          <p style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>
            {topic.title} · Day {dayNum}
          </p>
          <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginTop: 2 }}>
            {devotionalDay.title}
          </p>
        </div>
      </div>

      {/* Card content */}
      <div className="screen-scroll" style={{ padding: '8px 16px' }}>
        <CardView
          card={currentCard}
          answer={questionIndex >= 0 ? (answers[questionIndex] ?? '') : ''}
          onAnswerChange={updateAnswer}
          inputRef={inputRef}
        />
      </div>

      {/* Navigation */}
      <div style={{ padding: '12px 16px', flexShrink: 0, borderTop: '1px solid var(--border)' }}>
        {currentCard.type === 'complete' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button className="btn-primary" onClick={handleComplete}>
              <CheckCircle size={18} />
              Mark Complete &amp; Continue
            </button>
            <button
              className="btn-secondary"
              onClick={handleTextMentor}
            >
              <MessageSquare size={16} />
              {mentorName ? `Text ${mentorName}` : 'Text My Mentor'}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            {!isFirst && (
              <button
                className="btn-secondary"
                style={{ flex: 1 }}
                onClick={() => setCardIndex((i) => i - 1)}
              >
                <ChevronLeft size={18} />
                Back
              </button>
            )}
            <button
              className="btn-primary"
              style={{ flex: 2 }}
              onClick={() => setCardIndex((i) => i + 1)}
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Topic-complete celebration overlay */}
      {showCelebration && (
        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.92)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: 32, zIndex: 100,
        }}>
          <div className="animate-scale" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 72, marginBottom: 16 }}>🔥</div>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: 'var(--primary)', marginBottom: 8 }}>
              Topic Complete!
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text)', marginBottom: 8, fontWeight: 700 }}>
              You finished {topic.title}!
            </p>
            {streak > 0 && (
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16 }}>
                🔥 {streak}-day streak
              </p>
            )}
            <p style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 32, lineHeight: 1.6 }}>
              "Well done, good and faithful servant!" — Matthew 25:23
            </p>
            <button className="btn-primary" onClick={() => navigate('/devotions')}>
              Back to Topics
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CardView({
  card,
  answer,
  onAnswerChange,
  inputRef,
}: {
  card: DevotionalCard;
  answer: string;
  onAnswerChange: (val: string) => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
}) {
  if (card.type === 'verse') {
    return (
      <div className="card animate-fade" style={{ borderLeftWidth: 4, borderLeftColor: 'var(--primary)', padding: 20 }}>
        <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 16 }}>
          📖 Scripture
        </p>
        <p style={{ fontSize: 18, lineHeight: 1.7, fontStyle: 'italic', color: 'var(--text)', whiteSpace: 'pre-line' }}>
          {card.content}
        </p>
      </div>
    );
  }

  if (card.type === 'encouragement') {
    return (
      <div className="card animate-fade" style={{ padding: 20 }}>
        <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 16 }}>
          💪 Word for Today
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text)' }}>
          {card.content}
        </p>
      </div>
    );
  }

  if (card.type === 'question') {
    return (
      <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="card" style={{ padding: 20 }}>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 12 }}>
            🤔 Reflect
          </p>
          <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', lineHeight: 1.5 }}>
            {card.question}
          </p>
        </div>
        <textarea
          ref={inputRef}
          rows={5}
          placeholder="Write your answer here..."
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          style={{ minHeight: 120 }}
        />
      </div>
    );
  }

  if (card.type === 'action') {
    return (
      <div className="card animate-fade" style={{ borderLeftWidth: 4, borderLeftColor: 'var(--warning)', padding: 20 }}>
        <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: 'var(--warning)', textTransform: 'uppercase', marginBottom: 16 }}>
          ⚡ Call to Action
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text)' }}>
          {card.content}
        </p>
      </div>
    );
  }

  if (card.type === 'complete') {
    return <DayCompleteCard />;
  }

  return null;
}

function DayCompleteCard() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    // Trigger pulse animation on mount
    const t1 = setTimeout(() => setPulse(true), 100);
    const t2 = setTimeout(() => setPulse(false), 700);
    const t3 = setTimeout(() => setPulse(true), 900);
    const t4 = setTimeout(() => setPulse(false), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div className="card animate-fade" style={{ textAlign: 'center', padding: '40px 24px' }}>
      {/* Flame icon with pulse */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 20,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        transform: pulse ? 'scale(1.25)' : 'scale(1)',
        opacity: pulse ? 1 : 0.85,
      }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192,57,43,0.3) 0%, rgba(192,57,43,0.05) 70%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid var(--primary)',
        }}>
          <Flame size={40} color="var(--primary)" />
        </div>
      </div>

      {/* Checkmark badge */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(39,174,96,0.15)',
          border: '1px solid var(--success)',
          borderRadius: 20,
          padding: '6px 14px',
        }}>
          <CheckCircle size={16} color="var(--success)" />
          <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--success)', letterSpacing: 0.5 }}>
            Day Complete
          </span>
        </div>
      </div>

      <h3 style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', marginBottom: 10 }}>
        Well done.
      </h3>
      <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 20 }}>
        Your reflections are saved. You can send them to your mentor, or mark this day complete and keep going.
      </p>
      <p style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--primary)', lineHeight: 1.6 }}>
        "As iron sharpens iron, so one person sharpens another." — Proverbs 27:17 (NIV)
      </p>
    </div>
  );
}
