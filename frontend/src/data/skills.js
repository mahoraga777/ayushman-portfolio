// Skill groups shown in the Skills section. `accent` is a palette key.
export const skillGroups = [
  {
    title: 'Languages', accent: 'pink',
    items: [
      { name: 'C++', tag: 'Core', info: 'My main language for DSA and competitive programming: 300+ LeetCode problems solved, rating 1600.' },
      { name: 'Python', tag: 'Core', info: 'Powers the XShouyin gesture daemon, Flask backends, and data handling.' },
      { name: 'SQL', tag: 'Data', info: 'Used for querying data during threat detection work in the Google Cybersecurity certificate.' },
      { name: 'HTML & CSS', tag: 'Web', info: 'The front-end foundation of my web projects.' },
      
    ],
  },
  {
    title: 'Libraries & Frameworks', accent: 'neonGreen',
    items: [
      { name: 'OpenCV', tag: 'Vision', info: 'Image processing on live camera frames, the vision side of XShouyin.' },
      { name: 'MediaPipe', tag: 'ML', info: 'Runs the gesture recognizer that turns hand movements into mouse and system events.' },
      { name: 'APIs', tag: 'Integration', info: 'Connecting tools and services together end to end.' },
    ],
  },
  {
    title: 'Tools & DevOps', accent: 'yellow',
    items: [
      { name: 'Docker', tag: 'Containers', info: 'Packaging projects into reproducible containers.' },
      { name: 'Git & GitHub', tag: 'Version control', info: 'Every project lives in version control on GitHub.' },
      { name: 'Shell Scripting', tag: 'Automation', info: 'Automating repetitive work from the terminal, mostly in Fish.' },
    ],
  },
  {
    title: 'Operating Systems', accent: 'cyan',
    items: [
      { name: 'Linux (Fedora/Arch/Debian)', tag: 'Native', info: 'My primary environment. Comfortable building low-level system daemons and managing Linux security.' },
      { name: 'Windows', tag: 'OS', info: 'Comfortable with Windows for everyday development.' },
    ],
  },
];
// Colored pills under the skill groups
export const specializations = ['Computer Vision', 'Digital Image Processing', 'Data Structures & Algorithms', 'Automation'];
