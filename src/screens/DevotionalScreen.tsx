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
      {/* Compact header */}
      <div style={{ padding: '12px 16px 10px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <button
            onClick={() => navigate(`/devotions/topic/${topic.id}`)}
            style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 13, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: 0.5 }}>
            {cardIndex + 1} / {cards.length}
          </span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div style={{ marginTop: 8 }}>
          <p style={{ fontSize: 10, color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5 }}>
            {topic.title} · Day {dayNum}
          </p>
          <p style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginTop: 2, lineHeight: 1.3 }}>
            {devotionalDay.title}
          </p>
        </div>
      </div>

      {/* Card content — fills remaining space */}
      <div className="screen-scroll" style={{ padding: '4px 16px 8px' }}>
        <CardView
          card={currentCard}
          answer={questionIndex >= 0 ? (answers[questionIndex] ?? '') : ''}
          onAnswerChange={updateAnswer}
          inputRef={inputRef}
        />
      </div>

      {/* Navigation */}
      <div style={{ padding: '10px 16px 14px', flexShrink: 0, borderTop: '1px solid var(--border)' }}>
        {currentCard.type === 'complete' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button className="btn-primary" onClick={handleComplete}>
              <CheckCircle size={18} />
              Mark Complete &amp; Continue
            </button>
            <button className="btn-secondary" onClick={handleTextMentor}>
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
            <Flame size={64} color="var(--primary)" style={{ marginBottom: 16 }} />
            <h2 style={{ fontSize: 26, fontWeight: 900, color: 'var(--primary)', marginBottom: 8 }}>
              Topic Complete!
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text)', marginBottom: 8, fontWeight: 700 }}>
              You finished {topic.title}.
            </p>
            {streak > 0 && (
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16 }}>
                {streak}-day streak
              </p>
            )}
            <p style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 32, lineHeight: 1.6 }}>
              "Well done, good and faithful servant." — Matthew 25:23 (NIV)
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
      <div className="card animate-fade" style={{
        borderLeftWidth: 4,
        borderLeftColor: 'var(--primary)',
        padding: '24px 20px',
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 20 }}>
          Scripture
        </p>
        <p style={{ fontSize: 19, lineHeight: 1.75, fontStyle: 'italic', color: 'var(--text)', whiteSpace: 'pre-line' }}>
          {card.content}
        </p>
      </div>
    );
  }

  if (card.type === 'encouragement') {
    return (
      <div className="card animate-fade" style={{
        padding: '24px 20px',
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 20 }}>
          Word for Today
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--text)' }}>
          {card.content}
        </p>
      </div>
    );
  }

  if (card.type === 'question') {
    return (
      <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="card" style={{ padding: '24px 20px' }}>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 16 }}>
            Reflect
          </p>
          <p style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', lineHeight: 1.55 }}>
            {card.question}
          </p>
        </div>
        <textarea
          ref={inputRef}
          rows={6}
          placeholder="Write your answer here..."
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          style={{ minHeight: 140 }}
        />
      </div>
    );
  }

  if (card.type === 'action') {
    return (
      <div className="card animate-fade" style={{
        borderLeftWidth: 4,
        borderLeftColor: 'var(--warning)',
        padding: '24px 20px',
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: 'var(--warning)', textTransform: 'uppercase', marginBottom: 20 }}>
          Call to Action
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--text)' }}>
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
    const t1 = setTimeout(() => setPulse(true), 100);
    const t2 = setTimeout(() => setPulse(false), 700);
    const t3 = setTimeout(() => setPulse(true), 900);
    const t4 = setTimeout(() => setPulse(false), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div className="card animate-fade" style={{ textAlign: 'center', padding: '48px 24px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 24,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        transform: pulse ? 'scale(1.25)' : 'scale(1)',
        opacity: pulse ? 1 : 0.85,
      }}>
        <div style={{
          width: 88,
          height: 88,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192,57,43,0.25) 0%, rgba(192,57,43,0.04) 70%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid var(--primary)',
        }}>
          <Flame size={44} color="var(--primary)" />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(39,174,96,0.12)',
          border: '1px solid var(--success)',
          borderRadius: 20,
          padding: '6px 16px',
        }}>
          <CheckCircle size={15} color="var(--success)" />
          <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--success)', letterSpacing: 0.5, textTransform: 'uppercase' }}>
            Day Complete
          </span>
        </div>
      </div>

      <h3 style={{ fontSize: 24, fontWeight: 900, color: 'var(--text)', marginBottom: 12 }}>
        Well done.
      </h3>
      <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24 }}>
        Your reflections are saved. Send them to your mentor or mark this day complete and keep going.
      </p>
      <p style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--primary)', lineHeight: 1.65 }}>
        "As iron sharpens iron, so one person sharpens another."
        <br />
        <span style={{ fontStyle: 'normal', fontWeight: 700 }}>— Proverbs 27:17 (NIV)</span>
      </p>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 16, opacity: 0.7, fontStyle: 'italic' }}>
        More days coming — check back for updates.
      </p>
    </div>
  );
}
