export default function PrivacyPolicyScreen() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#f0f0f0', padding: '40px 24px', maxWidth: 680, margin: '0 auto', fontFamily: 'system-ui, sans-serif', lineHeight: 1.7 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#ffffff', marginBottom: 4 }}>Privacy Policy</h1>
        <p style={{ color: '#888', fontSize: 14 }}>Flint and Stone &mdash; Last updated: June 2025</p>
      </div>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff', marginBottom: 10 }}>Overview</h2>
        <p style={{ color: '#ccc', fontSize: 15 }}>
          Flint and Stone is a daily devotional app for men. We are committed to protecting your privacy. This policy explains what information the app collects, how it is used, and how it is stored.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff', marginBottom: 10 }}>Data We Collect</h2>
        <p style={{ color: '#ccc', fontSize: 15 }}>
          Flint and Stone does not collect, transmit, or store any personal data on external servers. All information you enter in the app, including your name, your mentor's contact information, your reflection answers, and your progress, is stored locally on your device only.
        </p>
        <p style={{ color: '#ccc', fontSize: 15, marginTop: 12 }}>
          We do not create user accounts. We do not require you to sign in. We do not have access to any data you enter in the app.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff', marginBottom: 10 }}>Mentor Messaging</h2>
        <p style={{ color: '#ccc', fontSize: 15 }}>
          When you choose to send your reflection answers to a mentor, the app opens your device's native SMS messaging app with a pre-filled message. This message is sent directly from your device using your own phone number and messaging service. Flint and Stone does not send, intercept, or store any messages.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff', marginBottom: 10 }}>Push Notifications</h2>
        <p style={{ color: '#ccc', fontSize: 15 }}>
          If you enable daily reminders, the app uses your device's local notification system to schedule reminders. No data is sent to any server in connection with notifications. You can disable notifications at any time in your device settings.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff', marginBottom: 10 }}>Third-Party Services</h2>
        <p style={{ color: '#ccc', fontSize: 15 }}>
          Flint and Stone does not use any third-party analytics, advertising, or tracking services. No data is shared with any third party.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff', marginBottom: 10 }}>Children's Privacy</h2>
        <p style={{ color: '#ccc', fontSize: 15 }}>
          Flint and Stone is intended for users aged 13 and older. We do not knowingly collect any information from children under 13.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff', marginBottom: 10 }}>Changes to This Policy</h2>
        <p style={{ color: '#ccc', fontSize: 15 }}>
          We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated date. Continued use of the app after changes are posted constitutes acceptance of the updated policy.
        </p>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff', marginBottom: 10 }}>Contact</h2>
        <p style={{ color: '#ccc', fontSize: 15 }}>
          If you have any questions about this privacy policy, you can reach us at{' '}
          <a href="https://flintandstonedevo.com" style={{ color: '#c0392b', textDecoration: 'none' }}>flintandstonedevo.com</a>.
        </p>
      </section>

      <p style={{ color: '#555', fontSize: 13, borderTop: '1px solid #222', paddingTop: 24 }}>
        &copy; {new Date().getFullYear()} Flint and Stone. All rights reserved.
      </p>
    </div>
  );
}
