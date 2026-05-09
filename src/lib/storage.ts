// localStorage-based persistence for Flint and Stone web app

const PROGRESS_KEY = 'fs_progress';
const ANSWERS_KEY = 'fs_answers';
const STREAK_KEY = 'fs_streak';
const MENTOR_KEY = 'fs_mentor';
const ONBOARDING_KEY = 'fs_onboarded';

export interface DayProgress {
  topicId: string;
  day: number;
  completed: boolean;
  completedAt?: string;
}

export interface DayAnswers {
  topicId: string;
  day: number;
  dayTitle: string;
  topicTitle: string;
  answers: { question: string; answer: string }[];
  completedAt: string;
}

export interface StreakData {
  current: number;
  longest: number;
  lastDate: string;
}

export interface MentorInfo {
  name: string;
  phone: string;
}

// --- Helpers ---
function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded or private mode
  }
}

// --- Progress ---
export function getProgress(): DayProgress[] {
  return load<DayProgress[]>(PROGRESS_KEY, []);
}

export function markDayComplete(topicId: string, day: number): void {
  const progress = getProgress();
  const idx = progress.findIndex((p) => p.topicId === topicId && p.day === day);
  const entry: DayProgress = { topicId, day, completed: true, completedAt: new Date().toISOString() };
  if (idx >= 0) progress[idx] = entry;
  else progress.push(entry);
  save(PROGRESS_KEY, progress);
}

export function isDayComplete(topicId: string, day: number): boolean {
  return getProgress().some((p) => p.topicId === topicId && p.day === day && p.completed);
}

export function getTopicProgress(topicId: string): number {
  return getProgress().filter((p) => p.topicId === topicId && p.completed).length;
}

// --- Answers ---
export function saveAnswers(data: DayAnswers): void {
  const all = load<DayAnswers[]>(ANSWERS_KEY, []);
  const idx = all.findIndex((a) => a.topicId === data.topicId && a.day === data.day);
  if (idx >= 0) all[idx] = data;
  else all.push(data);
  save(ANSWERS_KEY, all);
}

export function getAnswersForDay(topicId: string, day: number): DayAnswers | null {
  const all = load<DayAnswers[]>(ANSWERS_KEY, []);
  return all.find((a) => a.topicId === topicId && a.day === day) ?? null;
}

export function getAllAnswers(): DayAnswers[] {
  return load<DayAnswers[]>(ANSWERS_KEY, []);
}

// --- Streak ---
function toDateStr(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getStreak(): StreakData {
  return load<StreakData>(STREAK_KEY, { current: 0, longest: 0, lastDate: '' });
}

export function recordStreakActivity(): StreakData {
  const streak = getStreak();
  const today = toDateStr(new Date());
  if (streak.lastDate === today) return streak;
  const yesterday = toDateStr(new Date(Date.now() - 86400000));
  const newCurrent = streak.lastDate === yesterday ? streak.current + 1 : 1;
  const newLongest = Math.max(newCurrent, streak.longest);
  const updated: StreakData = { current: newCurrent, longest: newLongest, lastDate: today };
  save(STREAK_KEY, updated);
  return updated;
}

// --- Mentor ---
export function getMentor(): MentorInfo {
  return load<MentorInfo>(MENTOR_KEY, { name: '', phone: '' });
}

export function saveMentor(info: MentorInfo): void {
  save(MENTOR_KEY, info);
}

// --- Onboarding ---
export function hasOnboarded(): boolean {
  return load<boolean>(ONBOARDING_KEY, false);
}

export function setOnboarded(): void {
  save(ONBOARDING_KEY, true);
}
