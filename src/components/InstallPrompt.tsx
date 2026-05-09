import { useEffect, useState } from 'react';
import { Share, X, Download, Smartphone } from 'lucide-react';

const DISMISSED_KEY = 'fs_install_dismissed';
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as { standalone?: boolean }).standalone === true
  );
}

function wasDismissedRecently(): boolean {
  try {
    const raw = localStorage.getItem(DISMISSED_KEY);
    if (!raw) return false;
    const ts = parseInt(raw, 10);
    return Date.now() - ts < DISMISS_DURATION_MS;
  } catch {
    return false;
  }
}

function recordDismissal(): void {
  try {
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
  } catch {
    // ignore
  }
}

type Platform = 'ios' | 'android-chrome' | 'other';

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/.test(ua);
  const isAndroid = /Android/.test(ua);
  const isChrome = /Chrome/.test(ua) && !/Edg|OPR/.test(ua);
  if (isIOS) return 'ios';
  if (isAndroid && isChrome) return 'android-chrome';
  return 'other';
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [visible, setVisible] = useState(false);
  const [platform, setPlatform] = useState<Platform>('other');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Never show if already installed as PWA
    if (isStandalone()) return;
    // Never show if dismissed recently
    if (wasDismissedRecently()) return;

    const detected = detectPlatform();
    setPlatform(detected);

    // Listen for Android/Chrome native install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Show after a short delay so the page loads first
    const timer = setTimeout(() => {
      setVisible(true);
    }, 2000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(timer);
    };
  }, []);

  function dismiss() {
    recordDismissal();
    setVisible(false);
  }

  async function handleInstall() {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setVisible(false);
      } else {
        recordDismissal();
        setVisible(false);
      }
      setDeferredPrompt(null);
    }
  }

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={dismiss}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          zIndex: 9998,
        }}
      />

      {/* Sheet */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: '#1a1a1a',
          borderTop: '1px solid #333',
          borderRadius: '16px 16px 0 0',
          padding: '24px 20px 36px',
          boxShadow: '0 -4px 32px rgba(0,0,0,0.5)',
          maxWidth: 480,
          margin: '0 auto',
        }}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          style={{
            position: 'absolute',
            top: 14,
            right: 16,
            background: 'none',
            border: 'none',
            color: '#888',
            cursor: 'pointer',
            padding: 4,
          }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Icon + Heading */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: '#c0392b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Smartphone size={28} color="#fff" />
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 17, lineHeight: 1.2 }}>
              Add Flint &amp; Stone to your home screen
            </div>
            <div style={{ color: '#aaa', fontSize: 13, marginTop: 3 }}>
              Your progress is saved on this device — installing keeps it safe.
            </div>
          </div>
        </div>

        {/* Platform-specific instructions */}
        {platform === 'ios' && (
          <div
            style={{
              background: '#111',
              borderRadius: 10,
              padding: '14px 16px',
              marginBottom: 16,
              border: '1px solid #2a2a2a',
            }}
          >
            <div style={{ color: '#ccc', fontSize: 14, lineHeight: 1.6 }}>
              <Step num={1}>
                Tap the{' '}
                <Share size={14} style={{ display: 'inline', verticalAlign: 'middle', marginBottom: 2 }} />{' '}
                <strong style={{ color: '#fff' }}>Share</strong> button at the bottom of Safari
              </Step>
              <Step num={2}>
                Scroll down and tap{' '}
                <strong style={{ color: '#fff' }}>"Add to Home Screen"</strong>
              </Step>
              <Step num={3}>
                Tap <strong style={{ color: '#fff' }}>"Add"</strong> — done!
              </Step>
            </div>
          </div>
        )}

        {platform === 'android-chrome' && deferredPrompt && (
          <button
            onClick={handleInstall}
            style={{
              width: '100%',
              background: '#c0392b',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '14px 0',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginBottom: 12,
            }}
          >
            <Download size={18} />
            Install App
          </button>
        )}

        {platform === 'other' && (
          <div
            style={{
              background: '#111',
              borderRadius: 10,
              padding: '12px 16px',
              marginBottom: 16,
              border: '1px solid #2a2a2a',
              color: '#aaa',
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            In your browser menu, look for{' '}
            <strong style={{ color: '#fff' }}>"Install App"</strong> or{' '}
            <strong style={{ color: '#fff' }}>"Add to Home Screen"</strong> to save this app to your device.
          </div>
        )}

        {/* Dismiss link */}
        <button
          onClick={dismiss}
          style={{
            background: 'none',
            border: 'none',
            color: '#666',
            fontSize: 14,
            cursor: 'pointer',
            width: '100%',
            textAlign: 'center',
            paddingTop: 4,
          }}
        >
          Maybe later
        </button>
      </div>
    </>
  );
}

function Step({ num, children }: { num: number; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
      <span
        style={{
          background: '#c0392b',
          color: '#fff',
          borderRadius: '50%',
          width: 20,
          height: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 700,
          flexShrink: 0,
          marginTop: 1,
        }}
      >
        {num}
      </span>
      <span>{children}</span>
    </div>
  );
}
