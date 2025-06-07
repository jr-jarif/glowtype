import { Theme, KeyboardLayoutId, KeyboardLayoutMap, TextSourceItem, TextSourceCategory, Game, LeaderboardEntry, PracticeSettings } from './types';
import { FaKeyboard, FaQuoteLeft, FaCode, FaRobot, FaTachometerAlt, FaStar, FaCog } from 'react-icons/fa';

export const SOLAR_FLARE_THEME: Theme = {
  id: 'solar-flare',
  name: 'Solar Flare',
  gradient: 'linear-gradient(-45deg, #FF5F6D, #FFC371, #FF5F6D, #FFC371)',
  glassBgClass: 'bg-orange-400/10',
  textColor: 'text-orange-100',
  accentColor: 'text-red-400',
  accentColorHex: '#F87171', // red-400
  borderColor: 'border-orange-300/30',
  buttonClasses: 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/50',
  kbdBgClass: 'bg-orange-800/50',
  kbdTextClass: 'text-orange-100',
  kbdActiveBgClass: 'bg-red-500/80',
  kbdActiveTextClass: 'text-white',
};

export const ARCTIC_NIGHT_THEME: Theme = {
  id: 'arctic-night',
  name: 'Arctic Night',
  gradient: 'linear-gradient(-45deg, #004e92, #000428, #004e92, #000428)',
  glassBgClass: 'bg-blue-900/20',
  textColor: 'text-blue-200',
  accentColor: 'text-sky-400',
  accentColorHex: '#38BDF8', // sky-400
  borderColor: 'border-blue-400/30',
  buttonClasses: 'bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/50',
  kbdBgClass: 'bg-blue-950/60',
  kbdTextClass: 'text-blue-200',
  kbdActiveBgClass: 'bg-sky-500/80',
  kbdActiveTextClass: 'text-white',
};

export const CYBERPUNK_THEME: Theme = {
  id: 'cyberpunk',
  name: 'Cyberpunk',
  gradient: 'linear-gradient(-45deg, #f0075a, #0d021f, #f0075a, #0d021f)',
  glassBgClass: 'bg-purple-600/10',
  textColor: 'text-pink-300',
  accentColor: 'text-cyan-400',
  accentColorHex: '#22D3EE', // cyan-400
  borderColor: 'border-pink-500/30',
  buttonClasses: 'bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-600/50',
  kbdBgClass: 'bg-purple-900/50',
  kbdTextClass: 'text-pink-300',
  kbdActiveBgClass: 'bg-cyan-500/80',
  kbdActiveTextClass: 'text-black',
};

export const FOREST_DREAM_THEME: Theme = {
  id: 'forest-dream',
  name: 'Forest Dream',
  gradient: 'linear-gradient(-45deg, #134E5E, #71B280, #134E5E, #71B280)',
  glassBgClass: 'bg-green-700/10',
  textColor: 'text-green-200',
  accentColor: 'text-lime-400',
  accentColorHex: '#A3E635', // lime-400
  borderColor: 'border-green-400/30',
  buttonClasses: 'bg-lime-500 hover:bg-lime-600 text-green-900 shadow-lg shadow-lime-500/50',
  kbdBgClass: 'bg-green-900/60',
  kbdTextClass: 'text-green-200',
  kbdActiveBgClass: 'bg-lime-500/80',
  kbdActiveTextClass: 'text-green-900',
};


export const DEFAULT_THEMES: Theme[] = [SOLAR_FLARE_THEME, ARCTIC_NIGHT_THEME, CYBERPUNK_THEME, FOREST_DREAM_THEME];
export const DEFAULT_THEME_ID = ARCTIC_NIGHT_THEME.id;


export const QWERTY_LAYOUT: KeyboardLayoutMap = [
  [
    { base: '\`', shift: '~', code: 'Backquote' }, { base: '1', shift: '!', code: 'Digit1' }, { base: '2', shift: '@', code: 'Digit2' },
    { base: '3', shift: '#', code: 'Digit3' }, { base: '4', shift: '$', code: 'Digit4' }, { base: '5', shift: '%', code: 'Digit5' },
    { base: '6', shift: '^', code: 'Digit6' }, { base: '7', shift: '&', code: 'Digit7' }, { base: '8', shift: '*', code: 'Digit8' },
    { base: '9', shift: '(', code: 'Digit9' }, { base: '0', shift: ')', code: 'Digit0' }, { base: '-', shift: '_', code: 'Minus' },
    { base: '=', shift: '+', code: 'Equal' }, { base: 'Backspace', isSpecial: true, grow: 2, code: 'Backspace' }
  ],
  [
    { base: 'Tab', isSpecial: true, grow: 1.5, code: 'Tab' }, { base: 'q', shift: 'Q', code: 'KeyQ' }, { base: 'w', shift: 'W', code: 'KeyW' },
    { base: 'e', shift: 'E', code: 'KeyE' }, { base: 'r', shift: 'R', code: 'KeyR' }, { base: 't', shift: 'T', code: 'KeyT' },
    { base: 'y', shift: 'Y', code: 'KeyY' }, { base: 'u', shift: 'U', code: 'KeyU' }, { base: 'i', shift: 'I', code: 'KeyI' },
    { base: 'o', shift: 'O', code: 'KeyO' }, { base: 'p', shift: 'P', code: 'KeyP' }, { base: '[', shift: '{', code: 'BracketLeft' },
    { base: ']', shift: '}', code: 'BracketRight' }, { base: '\\', shift: '|', isSpecial: true, grow: 1.5, code: 'Backslash' }
  ],
  [
    { base: 'Caps Lock', isSpecial: true, grow: 1.8, code: 'CapsLock' }, { base: 'a', shift: 'A', code: 'KeyA' }, { base: 's', shift: 'S', code: 'KeyS' },
    { base: 'd', shift: 'D', code: 'KeyD' }, { base: 'f', shift: 'F', code: 'KeyF' }, { base: 'g', shift: 'G', code: 'KeyG' },
    { base: 'h', shift: 'H', code: 'KeyH' }, { base: 'j', shift: 'J', code: 'KeyJ' }, { base: 'k', shift: 'K', code: 'KeyK' },
    { base: 'l', shift: 'L', code: 'KeyL' }, { base: ';', shift: ':', code: 'Semicolon' }, { base: '\'', shift: '"', code: 'Quote' },
    { base: 'Enter', isSpecial: true, grow: 2.2, code: 'Enter' }
  ],
  [
    { base: 'Shift', isSpecial: true, grow: 2.5, code: 'ShiftLeft' }, { base: 'z', shift: 'Z', code: 'KeyZ' }, { base: 'x', shift: 'X', code: 'KeyX' },
    { base: 'c', shift: 'C', code: 'KeyC' }, { base: 'v', shift: 'V', code: 'KeyV' }, { base: 'b', shift: 'B', code: 'KeyB' },
    { base: 'n', shift: 'N', code: 'KeyN' }, { base: 'm', shift: 'M', code: 'KeyM' }, { base: ',', shift: '<', code: 'Comma' },
    { base: '.', shift: '>', code: 'Period' }, { base: '/', shift: '?', code: 'Slash' }, { base: 'Shift', isSpecial: true, grow: 2.5, code: 'ShiftRight' }
  ],
  [
    { base: 'Ctrl', isSpecial: true, grow: 1.5, code: 'ControlLeft' }, { base: 'Win', isSpecial: true, code: 'MetaLeft' },
    { base: 'Alt', isSpecial: true, code: 'AltLeft' }, { base: 'Space', isSpecial: true, grow: 8, code: 'Space' },
    { base: 'Alt', isSpecial: true, code: 'AltRight' }, { base: 'Menu', isSpecial: true, code: 'ContextMenu' },
    { base: 'Ctrl', isSpecial: true, grow: 1.5, code: 'ControlRight' }
  ]
];

// Simplified layouts for selection, actual rendering will use QWERTY_LAYOUT for now.
export const KEYBOARD_LAYOUTS = [
  { id: KeyboardLayoutId.QWERTY, name: 'QWERTY', map: QWERTY_LAYOUT },
  { id: KeyboardLayoutId.DVORAK, name: 'Dvorak (Coming Soon)', map: QWERTY_LAYOUT }, // Placeholder
  { id: KeyboardLayoutId.COLEMAK, name: 'Colemak (Coming Soon)', map: QWERTY_LAYOUT }, // Placeholder
];

export const COMMON_WORDS_TEXT: TextSourceItem = {
  id: 'common-words-1',
  title: 'Common English Words',
  category: TextSourceCategory.COMMON_WORDS,
  content: "the of and a to in is you that it he was for on are as with his they I at be this have from or one had by words but not what all were we when your can said there use an each which she do how their if will up other about out many then them these so some her would make like him into time has look two more write go see number no way could people my than first water been called who am its now find long down day did get come made may part"
};

export const FAMOUS_QUOTES_TEXT: TextSourceItem[] = [
  { id: 'quote-1', title: 'Quote: Albert Einstein', category: TextSourceCategory.FAMOUS_QUOTES, content: "Life is like riding a bicycle. To keep your balance, you must keep moving." },
  { id: 'quote-2', title: 'Quote: Oscar Wilde', category: TextSourceCategory.FAMOUS_QUOTES, content: "Be yourself; everyone else is already taken." },
  { id: 'quote-3', title: 'Quote: Mahatma Gandhi', category: TextSourceCategory.FAMOUS_QUOTES, content: "Be the change that you wish to see in the world." },
];

export const CODE_SNIPPETS_JS_TEXT: TextSourceItem[] = [
  { id: 'code-js-1', title: 'JS: Hello World Function', category: TextSourceCategory.CODE_SNIPPETS_JS, language: 'javascript', content: "function greet(name) {\n  console.log(`Hello, ${name}!`);\n}\ngreet('World');" },
  { id: 'code-js-2', title: 'JS: Array Map', category: TextSourceCategory.CODE_SNIPPETS_JS, language: 'javascript', content: "const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(num => num * 2);\nconsole.log(doubled);" },
];

export const CODE_SNIPPETS_PYTHON_TEXT: TextSourceItem[] = [
    { id: 'code-py-1', title: 'Python: Hello World', category: TextSourceCategory.CODE_SNIPPETS_PYTHON, language: 'python', content: "def greet(name):\n  print(f\"Hello, {name}!\")\n\ngreet('World')" },
    { id: 'code-py-2', title: 'Python: List Comprehension', category: TextSourceCategory.CODE_SNIPPETS_PYTHON, language: 'python', content: "numbers = [1, 2, 3, 4, 5]\nsquared = [num**2 for num in numbers]\nprint(squared)" },
];

export const ALL_TEXT_SOURCES: TextSourceItem[] = [
  COMMON_WORDS_TEXT,
  ...FAMOUS_QUOTES_TEXT,
  ...CODE_SNIPPETS_JS_TEXT,
  ...CODE_SNIPPETS_PYTHON_TEXT
];

export const DEFAULT_PRACTICE_SETTINGS: PracticeSettings = {
  testDuration: 60, // seconds
  testMode: 'time',
  wordCount: 50,
  selectedLayout: KeyboardLayoutId.QWERTY,
  soundEffects: true,
  soundProfile: 'clicky',
  keypressVisualEffect: 'glow',
  liveWpmGraph: true,
  textSource: TextSourceCategory.COMMON_WORDS,
};


export const MOCK_LEADERBOARD_DATA: LeaderboardEntry[] = [
    { rank: 1, username: "Alex 'Speedy' Chen", wpm: 155, accuracy: 98.5, date: new Date(Date.now() - 86400000 * 1).toISOString(), testMode: "60s English Words" },
    { rank: 2, username: "Mia 'NinjaKeys' Patel", wpm: 148, accuracy: 99.2, date: new Date(Date.now() - 86400000 * 2).toISOString(), testMode: "60s English Words" },
    { rank: 3, username: "KeyMaster K.", wpm: 142, accuracy: 97.0, date: new Date(Date.now() - 86400000 * 1.5).toISOString(), testMode: "Quote Mode" },
    { rank: 4, username: "Glow Typer Pro", wpm: 135, accuracy: 99.8, date: new Date(Date.now() - 86400000 * 3).toISOString(), testMode: "JS Code Snippet" },
    { rank: 5, username: "Sam 'WordSmith' Lee", wpm: 130, accuracy: 96.5, date: new Date(Date.now() - 86400000 * 0.5).toISOString(), testMode: "30s English Words" },
    { rank: 6, username: "PyCoder Eva", wpm: 125, accuracy: 100, date: new Date(Date.now() - 86400000 * 4).toISOString(), testMode: "Python Code Snippet" },
    { rank: 7, username: "FastFingers Finn", wpm: 120, accuracy: 95.2, date: new Date(Date.now() - 86400000 * 2.5).toISOString(), testMode: "60s English Words" },
    { rank: 8, username: "QwertyQueen Liz", wpm: 115, accuracy: 98.0, date: new Date(Date.now() - 86400000 * 5).toISOString(), testMode: "120s English Words" },
    { rank: 9, username: "TypingPro Tom", wpm: 110, accuracy: 97.3, date: new Date(Date.now() - 86400000 * 1).toISOString(), testMode: "Quote Mode" },
    { rank: 10, username: "RookieRacer", wpm: 60, accuracy: 90.1, date: new Date(Date.now() - 86400000 * 0.2).toISOString(), testMode: "30s English Words" },
];


export const GAMES_LIST: Game[] = [
  { id: 'asteroid-blaster', title: 'Asteroid Blaster', description: 'Type words to destroy incoming asteroids.', imageUrl: 'https://picsum.photos/seed/asteroid/400/300', path: '/games/asteroid-blaster' },
  { id: 'typing-racer', title: 'Typing Racer (Multiplayer)', description: 'Race against others by typing fast and accurately. (Coming Soon)', imageUrl: 'https://picsum.photos/seed/racer/400/300', path: '/games/typing-racer' },
  { id: 'code-defender', title: 'Code Defender', description: 'Type code snippets to patch vulnerabilities. (Coming Soon)', imageUrl: 'https://picsum.photos/seed/codedef/400/300', path: '/games/code-defender' },
];

export const NAV_LINKS = [
  { name: 'Practice', path: '/practice', icon: FaKeyboard },
  { name: 'Games', path: '/games', icon: FaRobot },
  { name: 'Dashboard', path: '/dashboard', icon: FaTachometerAlt },
  { name: 'Leaderboards', path: '/leaderboards', icon: FaStar },
  { name: 'Settings', path: '/settings', icon: FaCog }, // Changed to FaCog
];

export const KEY_CODE_TO_CHAR: { [key: string]: string } = {
    'Backquote': '\`~', 'Digit1': '1!', 'Digit2': '2@', 'Digit3': '3#', 'Digit4': '4$', 'Digit5': '5%', 
    'Digit6': '6^', 'Digit7': '7&', 'Digit8': '8*', 'Digit9': '9(', 'Digit0': '0)', 'Minus': '-_', 
    'Equal': '=+', 'KeyQ': 'qQ', 'KeyW': 'wW', 'KeyE': 'eE', 'KeyR': 'rR', 'KeyT': 'tT', 'KeyY': 'yY', 
    'KeyU': 'uU', 'KeyI': 'iI', 'KeyO': 'oO', 'KeyP': 'pP', 'BracketLeft': '[{', 'BracketRight': ']}', 
    'Backslash': '\\|', 'KeyA': 'aA', 'KeyS': 'sS', 'KeyD': 'dD', 'KeyF': 'fF', 'KeyG': 'gG', 'KeyH': 'hH', 
    'KeyJ': 'jJ', 'KeyK': 'kK', 'KeyL': 'lL', 'Semicolon': ';:', 'Quote': '\'"', 'KeyZ': 'zZ', 'KeyX': 'xX', 
    'KeyC': 'cC', 'KeyV': 'vV', 'KeyB': 'bB', 'KeyN': 'nN', 'KeyM': 'mM', 'Comma': ',<', 'Period': '.>', 
    'Slash': '/?', 'Space': ' '
    // Special keys like Enter, Shift, Tab, Backspace are handled by their 'code' directly
};

// Constants for Practice Page Quick Settings & general Behavior Settings
export const PRACTICE_TEST_DURATIONS = [15, 30, 60, 120]; // seconds
export const PRACTICE_TEST_MODES: {id: PracticeSettings['testMode'], name: string}[] = [
    {id: 'time', name: 'Time'},
    {id: 'words', name: 'Words'},
    {id: 'quote', name: 'Quote'},
    {id: 'code', name: 'Code'}
];
export const PRACTICE_WORD_COUNTS = [10, 25, 50, 100];

// Comprehensive list of text source categories with user-friendly names
// Used by both QuickSettingsPanel on PracticePage and BehaviorSettings on SettingsPage
// Components can filter this list as needed (e.g., QuickSettingsPanel filters out 'CUSTOM')
export const ALL_TEXT_SOURCE_CATEGORIES_WITH_NAMES: {id: TextSourceCategory, name: string}[] = [
    {id: TextSourceCategory.COMMON_WORDS, name: 'Common Words'},
    {id: TextSourceCategory.FAMOUS_QUOTES, name: 'Famous Quotes'},
    {id: TextSourceCategory.CODE_SNIPPETS_JS, name: 'JavaScript Code'},
    {id: TextSourceCategory.CODE_SNIPPETS_PYTHON, name: 'Python Code'},
    {id: TextSourceCategory.CUSTOM, name: 'Custom Text (Upload)'}, // Included for BehaviorSettings, filtered out by QuickSettingsPanel
];
