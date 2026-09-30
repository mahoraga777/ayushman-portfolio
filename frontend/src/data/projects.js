// Project cards. `slug` picks the media files, `color` is a palette key, `url: null` = card is not clickable.
export const projects = [
  { id: '01', slug: 'xshouyin', kind: 'Project', title: 'XShouyin', color: 'magenta', stack: 'MediaPipe / OpenCV / uinput',
    summary: 'Built a Linux-native daemon that runs MediaPipe\'s gesture recognizer asynchronously on a live camera feed, converting hand gestures into kernel-level mouse events via /dev/uinput. Implemented a dynamic exponential-smoothing filter for cursor movement and active-zone mapping. Added voice-dictation trigger and auto-idle shutdown.',
    url: 'https://github.com/mahoraga777/XShouyin' },
  { id: '02', slug: 'portfolio', kind: 'Project', title: 'Portfolio Website', color: 'neonGreen', stack: 'React / Tailwind / Vite',
    summary: 'A high-energy, animation-heavy portfolio built with React and Tailwind CSS. Features dynamic particle backgrounds, scroll-linked animations, and a vibrant neon aesthetic tailored to highlight my developer persona.',
    url: 'https://github.com/mahoraga777/ayushman-portfolio' },
  { id: '03', slug: 'cybersec', kind: 'Certification', title: 'Cybersecurity', color: 'yellow', stack: 'Linux security',
    summary: 'Google Cybersecurity Professional Certificate (Coursera). Gained hands-on experience in threat detection and incident response.', url: null },
  { id: '04', slug: 'fastfetch-logo', kind: 'Design', title: 'Fastfetch Logo', color: 'orange', stack: 'ASCII / Terminal',
    summary: 'A custom, random fastfetch ASCII logo configuration designed for system terminal aesthetics. Enhances the visual appeal of Linux system information fetching and showcases terminal customization.', url: null },
  { id: '05', slug: 'classified-system', kind: 'Classified', title: 'Redacted', color: 'purple', stack: 'System dev',
    summary: 'Redacted internal project.', url: null },
  { id: '06', slug: 'classified-cp', kind: 'Classified', title: 'CP Sheet', color: 'red', stack: 'Algorithms',
    summary: 'The algorithm grind, problem by problem.', url: null },
];
