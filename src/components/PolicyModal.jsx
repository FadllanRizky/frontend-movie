import { X } from "lucide-react";

const policies = {
  privacy: {
    title: "Privacy Policy",
    content: `
Last updated: January 2025

1. Information We Collect

When you use MovieMbur, we may collect the following information:
- Account Information: Your name, email address, and password when you create an account.
- Usage Data: Information about how you interact with our platform, including movies you watch, search queries, and viewing history.
- Device Information: Device type, operating system, browser type, and IP address.

2. How We Use Your Information

We use the information we collect to:
- Provide, personalize, and improve our streaming services.
- Recommend movies and content based on your preferences.
- Send you notifications about new releases and updates.
- Ensure the security and integrity of our platform.
- Communicate with you about your account or our services.

3. Data Security

We implement industry-standard security measures to protect your personal information, including:
- Encryption of data in transit and at rest.
- Regular security audits and vulnerability assessments.
- Access controls and authentication mechanisms.
- Secure data storage practices.

4. Your Rights

You have the right to:
- Access the personal information we hold about you.
- Request correction of inaccurate data.
- Request deletion of your personal data.
- Opt out of marketing communications.

5. Contact Us

If you have any questions about this Privacy Policy, please contact us at:
Email: privacy@moviembur.com
    `,
  },
  terms: {
    title: "Terms of Service",
    content: `
Last updated: January 2025

1. Acceptance of Terms

By accessing and using MovieMbur, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.

2. User Accounts

- You must be at least 13 years old to create an account.
- You are responsible for maintaining the confidentiality of your account credentials.
- You agree to provide accurate and complete information when creating your account.
- One person may not maintain more than one account.

3. Content Policy

- All movies and content on MovieMbur are provided for personal, non-commercial use only.
- You may not download, distribute, or redistribute content without explicit permission.
- Content availability may vary by region and is subject to change.
- We reserve the right to modify or remove content at any time.

4. Acceptable Use

You agree not to:
- Use the platform for any unlawful purpose.
- Attempt to gain unauthorized access to any part of the platform.
- Interfere with or disrupt the platform's functionality.
- Share your account credentials with others.
- Use automated tools to access or scrape content.

5. Intellectual Property

All content, trademarks, and intellectual property on MovieMbur are owned by or licensed to us. You may not use our intellectual property without prior written consent.

6. Limitation of Liability

MovieMbur shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform. Our total liability shall not exceed the amount paid by you in the twelve months preceding the claim.

7. Changes to Terms

We reserve the right to modify these Terms of Service at any time. Continued use of the platform after changes constitutes acceptance of the new terms.

8. Contact

For questions about these Terms, contact us at:
Email: legal@moviembur.com
    `,
  },
  cookies: {
    title: "Cookie Policy",
    content: `
Last updated: January 2025

1. What Are Cookies

Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work efficiently and to provide information to website owners.

2. How We Use Cookies

MovieMbur uses the following types of cookies:

Essential Cookies:
- Authentication cookies to keep you logged in.
- Session cookies to maintain your preferences during your visit.

Functional Cookies:
- Preference cookies to remember your settings (language, playback quality).
- History cookies to track recently watched content.

Analytics Cookies:
- Performance cookies to understand how users interact with our platform.
- Usage statistics to improve our services.

3. Managing Cookies

You can control and manage cookies through your browser settings:
- Chrome: Settings > Privacy and Security > Cookies
- Firefox: Settings > Privacy & Security > Cookies
- Safari: Preferences > Privacy > Manage Website Data
- Edge: Settings > Privacy, Search, and Services > Cookies

Note: Disabling certain cookies may affect the functionality of our platform.

4. Third-Party Cookies

We may allow third-party services (such as analytics providers) to place cookies on your device. These cookies are governed by the respective third party's privacy policy.

5. Changes to This Policy

We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.

6. Contact

If you have questions about our use of cookies, please contact:
Email: cookies@moviembur.com
    `,
  },
};

export default function PolicyModal({ type, onClose }) {
  const policy = policies[type];

  if (!policy) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-b from-gray-900 to-black border border-gray-800/50 max-w-2xl w-full max-h-[85vh] rounded-2xl overflow-hidden relative shadow-2xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{policy.title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-gray-800/50 hover:bg-red-900/30 text-gray-400 hover:text-white transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto max-h-[calc(85vh-80px)]">
          <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
            {policy.content.trim()}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800/50 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all duration-300"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
