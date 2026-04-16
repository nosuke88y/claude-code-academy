// Claude Code Academy — 進捗管理ストア
// localStorageを使ってレッスン完了状態・XP・ストリークを永続化する

export interface LessonProgress {
  completed: boolean;
  completedAt?: string; // ISO日付
}

export interface ChapterProgress {
  lessons: Record<string, LessonProgress>;
}

export interface ProgressData {
  chapters: Record<string, ChapterProgress>;
  xp: number;
  level: number;
  streak: number;
  lastStudyDate: string | null; // "YYYY-MM-DD"
  achievements: string[]; // 解放済み実績ID
}

const STORAGE_KEY = "cca-progress";

// デフォルトの初期値
const defaultProgress: ProgressData = {
  chapters: {},
  xp: 0,
  level: 1,
  streak: 0,
  lastStudyDate: null,
  achievements: [],
};

// localStorageから進捗を読み込む
export function loadProgress(): ProgressData {
  if (typeof window === "undefined") return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
}

// localStorageに進捗を保存する
export function saveProgress(data: ProgressData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// レッスンを完了にする
export function completeLesson(
  chapterId: string,
  lessonId: string,
  xpGain: number = 20
): ProgressData {
  const data = loadProgress();

  if (!data.chapters[chapterId]) {
    data.chapters[chapterId] = { lessons: {} };
  }
  data.chapters[chapterId].lessons[lessonId] = {
    completed: true,
    completedAt: new Date().toISOString(),
  };

  data.xp += xpGain;
  data.level = Math.floor(data.xp / 200) + 1;

  // ストリーク更新
  const today = new Date().toISOString().slice(0, 10);
  if (data.lastStudyDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    data.streak = data.lastStudyDate === yesterday ? data.streak + 1 : 1;
    data.lastStudyDate = today;
  }

  saveProgress(data);
  return data;
}

// レッスンが完了しているか確認
export function isLessonCompleted(
  chapterId: string,
  lessonId: string
): boolean {
  const data = loadProgress();
  return !!data.chapters[chapterId]?.lessons[lessonId]?.completed;
}

// チャプター内の完了レッスン数を取得
export function getChapterCompletedCount(
  chapterId: string,
  totalLessons: number
): { completed: number; total: number; percent: number } {
  const data = loadProgress();
  const chapter = data.chapters[chapterId];
  const completed = chapter
    ? Object.values(chapter.lessons).filter((l) => l.completed).length
    : 0;
  return {
    completed,
    total: totalLessons,
    percent: totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0,
  };
}

// コースの全チャプター定義（レッスン数）
export const COURSE_STRUCTURE: Record<string, { totalLessons: number; requiredBy?: string }> = {
  ch1: { totalLessons: 4 },
  ch2: { totalLessons: 4 },
  ch3: { totalLessons: 5 },
  ch4: { totalLessons: 5 },
  ch5: { totalLessons: 6 },
  ch6: { totalLessons: 6 },
};

// チャプター解放順（前のチャプターを完了で次が解放）
const CHAPTER_ORDER = ["ch1", "ch2", "ch3", "ch4", "ch5", "ch6"];

// チャプターが完了しているか判定
export function isChapterCompleted(chapterId: string): boolean {
  const info = COURSE_STRUCTURE[chapterId];
  if (!info) return false;
  const { completed } = getChapterCompletedCount(chapterId, info.totalLessons);
  return completed >= info.totalLessons;
}

// チャプターが解放されているか判定
export function isChapterUnlocked(chapterId: string): boolean {
  const idx = CHAPTER_ORDER.indexOf(chapterId);
  if (idx <= 0) return true; // ch1は常に解放
  return isChapterCompleted(CHAPTER_ORDER[idx - 1]);
}

// 全体の統計を取得
export function getOverallStats(): {
  chaptersCompleted: number;
  totalChapters: number;
  lessonsCompleted: number;
  totalLessons: number;
  percent: number;
  xp: number;
  level: number;
  streak: number;
} {
  const data = loadProgress();
  const totalChapters = CHAPTER_ORDER.length;
  const totalLessons = Object.values(COURSE_STRUCTURE).reduce((s, c) => s + c.totalLessons, 0);

  let chaptersCompleted = 0;
  let lessonsCompleted = 0;

  for (const chId of CHAPTER_ORDER) {
    const ch = data.chapters[chId];
    if (!ch) continue;
    const done = Object.values(ch.lessons).filter((l) => l.completed).length;
    lessonsCompleted += done;
    if (done >= COURSE_STRUCTURE[chId].totalLessons) chaptersCompleted++;
  }

  return {
    chaptersCompleted,
    totalChapters,
    lessonsCompleted,
    totalLessons,
    percent: totalLessons > 0 ? Math.round((lessonsCompleted / totalLessons) * 100) : 0,
    xp: data.xp,
    level: data.level,
    streak: data.streak,
  };
}

// XPだけ加算する（クイズの正解など）
export function addXp(amount: number): ProgressData {
  const data = loadProgress();
  data.xp += amount;
  data.level = Math.floor(data.xp / 200) + 1;
  saveProgress(data);
  return data;
}

// 進捗をリセット（デバッグ用）
export function resetProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
