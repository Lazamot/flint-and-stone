import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart2, BookOpen, Settings } from 'lucide-react';
import { hasOnboarded } from './lib/storage';

import LandingPage from './screens/LandingPage';
import BibleStudiesScreen from './screens/BibleStudiesScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import TopicScreen from './screens/TopicScreen';
import DevotionalScreen from './screens/DevotionalScreen';
import ProgressScreen from './screens/ProgressScreen';
import JournalScreen from './screens/JournalScreen';
import SettingsScreen from './screens/SettingsScreen';

// Paths that show the devotional tab bar
const DEVOTIONAL_TAB_PATHS = [
  '/devotions',
  '/devotions/progress',
  '/devotions/journal',
  '/devotions/settings',
];

const TABS = [
  { path: '/devotions', label: 'Home', Icon: Home },
  { path: '/devotions/progress', label: 'Progress', Icon: BarChart2 },
  { path: '/devotions/journal', label: 'Journal', Icon: BookOpen },
  { path: '/devotions/settings', label: 'Settings', Icon: Settings },
];

function TabBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isTab = DEVOTIONAL_TAB_PATHS.includes(location.pathname);
  if (!isTab) return null;

  return (
    <nav className="tab-bar">
      {TABS.map(({ path, label, Icon }) => {
        const active = location.pathname === path;
        return (
          <button
            key={path}
            className={`tab-item${active ? ' active' : ''}`}
            onClick={() => navigate(path)}
          >
            <Icon size={22} />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function DevotionalApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Only redirect to onboarding if user hasn't onboarded yet
    // and they're entering the devotional section for the first time
    if (!hasOnboarded() && location.pathname !== '/devotions/onboarding') {
      navigate('/devotions/onboarding', { replace: true });
    }
    setChecked(true);
  }, []);

  if (!checked) return null;

  return (
    <>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/devotions/onboarding" element={<OnboardingScreen />} />
          <Route path="/devotions" element={<HomeScreen />} />
          <Route path="/devotions/topic/:id" element={<TopicScreen />} />
          <Route path="/devotions/devotional/:topicId/:day" element={<DevotionalScreen />} />
          <Route path="/devotions/progress" element={<ProgressScreen />} />
          <Route path="/devotions/journal" element={<JournalScreen />} />
          <Route path="/devotions/settings" element={<SettingsScreen />} />
        </Routes>
      </div>
      <TabBar />
    </>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isDevotionalSection = location.pathname.startsWith('/devotions');

  if (isDevotionalSection) {
    return <DevotionalApp />;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/bible-studies" element={<BibleStudiesScreen />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}
