// App shell: background, fixed UI (menu, socials, theme button), page sections and modals.
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LinkConfirmProvider } from './context/LinkConfirm';
import BackgroundScene from './components/background/BackgroundScene';
import SideMenu from './components/layout/SideMenu';
import FixedSocials from './components/layout/FixedSocials';
import ThemeToggle from './components/layout/ThemeToggle';
import Footer from './components/layout/Footer';
import HeroSection from './components/hero/HeroSection';
import AboutSection from './components/about/AboutSection';
import SkillsSection from './components/skills/SkillsSection';
import ProjectsSection from './components/projects/ProjectsSection';
import CredentialsSection from './components/credentials/CredentialsSection';
import HireModal from './components/modals/HireModal';

// Sections are rendered in this order
const SECTIONS = [HeroSection, AboutSection, SkillsSection, ProjectsSection, CredentialsSection];

export default function App() {
  const [hireOpen, setHireOpen] = useState(false);
  return (
    <LinkConfirmProvider>
      <div className="app-root relative min-h-screen w-full overflow-x-hidden text-white selection:bg-hero-magenta selection:text-white">
        <BackgroundScene />
        <SideMenu />
        <FixedSocials onHireClick={() => setHireOpen(true)} />
        {/* Light / dark switch on the right edge */}
        <ThemeToggle />
        <main className="relative z-10 w-full flex flex-col items-center pt-16">
          {SECTIONS.map((Section) => <Section key={Section.name} />)}
        </main>
        <Footer />
        <AnimatePresence>{hireOpen && <HireModal onClose={() => setHireOpen(false)} />}</AnimatePresence>
      </div>
    </LinkConfirmProvider>
  );
}
