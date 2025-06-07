
export interface Theme {
  id: string;
  name: string;
  gradient: string;
  glassBgClass: string;
  textColor: string;
  accentColor: string;
  accentColorHex?: string; // For things like chart colors
  borderColor: string;
  buttonClasses: string;
  kbdBgClass: string;
  kbdTextClass: string;
  kbdActiveBgClass: string;
  kbdActiveTextClass: string;
}

export interface TestStats {
  wpm: number;
  accuracy: number;
  errors: number;
  rawWpm: number;
  charsTyped: number;
  timeElapsed: number; // in seconds
  rawChars: string;
  textSourceTitle: string;
}

export interface WpmDataPoint {
  time: number; // second
  wpm: number;
}

export interface User {
  id: string; // Typically email or a unique UUID
  name: string; // Mandatory display name
  email: string; // Mandatory for login
  password?: string; // For local accounts; HASHED in real app
  avatarUrl?: string; // data: URL for local uploads, or http for social
  personalBestWpm?: number;
  averageAccuracy?: number;
  totalTestsTaken?: number;
}

export enum KeyboardLayoutId {
  QWERTY = 'qwerty',
  DVORAK = 'dvorak',
  COLEMAK = 'colemak',
}

export interface KeyDefinition {
  base: string;
  shift?: string;
  isSpecial?: boolean;
  grow?: number; // flex-grow factor
  code: string; // KeyboardEvent.code
}

export type KeyboardLayoutRow = KeyDefinition[];
export type KeyboardLayoutMap = KeyboardLayoutRow[];


export interface PracticeSettings {
  testDuration: number; // seconds, 0 for infinite/word count mode
  testMode: 'time' | 'words' | 'quote' | 'code';
  wordCount: number; // if testMode is 'words'
  selectedLayout: KeyboardLayoutId;
  soundEffects: boolean;
  soundProfile: 'clicky' | 'tactile' | 'linear' | 'silent';
  keypressVisualEffect: 'glow' | 'ripple' | 'burst';
  liveWpmGraph: boolean;
  textSource: TextSourceCategory;
}

export enum TextSourceCategory {
  COMMON_WORDS = 'common_words',
  FAMOUS_QUOTES = 'famous_quotes',
  CODE_SNIPPETS_JS = 'code_snippets_js',
  CODE_SNIPPETS_PYTHON = 'code_snippets_python',
  CUSTOM = 'custom',
}

export interface TextSourceItem {
  id: string;
  title: string;
  content: string;
  category: TextSourceCategory;
  language?: string; // for code snippets
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode; // or string for image path/SVG
  unlocked: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  username: string; // This should be User['name']
  wpm: number;
  accuracy: number;
  date: string; // ISO string
  testMode: string; // e.g., "60s English Words"
}

export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  path: string;
}