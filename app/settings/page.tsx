'use client';

import { useState } from 'react';
import PageHeader from '@/app/components/ui/PageHeader/PageHeader';

/**
 * Renders settings page with account, notification, appearance, and security configurations.
 * Allows users to manage their profile and system preferences.
 *
 * @return Settings page component with tabbed interface
 * @category Settings
 * @security Protected route requiring authentication, sensitive data isolated to local state
 * @performance Client-side rendering with tabbed state management and form inputs
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'account' | 'notifications' | 'appearance' | 'security'>('account');
  const [accountSettings, setAccountSettings] = useState({
    fullName: 'Max Mustermann',
    email: 'max.mustermann@example.com',
    phone: '+49 123 45789',
    company: 'CRM Solutions GmbH',
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    customerUpdates: true,
    systemAlerts: true,
  });
  const [appearance, setAppearance] = useState({
    theme: 'dark',
    language: 'de',
    dateFormat: 'DD.MM.YYYY',
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: '30',
  });

  const handleAccountChange = (field: string, value: string) => {
    setAccountSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const handleAppearanceChange = (field: string, value: string) => {
    setAppearance(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field: string, value: string | boolean) => {
    setSecuritySettings(prev => ({ ...prev, [field]: value }));
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
    { id: 'notifications', label: 'Notifications', icon: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.86 5.36 6.25 7.92 6.25 11v5l-2 2v1h15v-1l-2-2z' },
    { id: 'appearance', label: 'Appearance', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 9 15.5 9 14 9.67 14 10.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 9 8.5 9 7 9.67 7 10.5 7.67 12 8.5 12zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z' },
    { id: 'security', label: 'Security', icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z' },
  ];

  return (
    <div className="flex flex-col">
      <PageHeader
        h1="Settings"
        h2="Manage your account preferences and application settings"
        color="#1f2937"
        img="M19.14 12.94c.04-.3.06-.61.06-.94 0-2.05-1.53-3.76-3.56-3.97l1.07-1.07c.3-.29.3-.77 0-1.07-.29-.29-.77-.29-1.07 0l-2.5 2.5c-.29.29-.29.77 0 1.07.29.29.77.29 1.07 0l1.07-1.07c1.48.18 2.68 1.35 2.68 2.87 0 .24-.02.47-.06.7h2.24zm-7.14 0c-.04-.23-.06-.46-.06-.7 0-1.52 1.2-2.69 2.68-2.87l1.07 1.07c.3.29.77.29 1.07 0 .29-.3.29-.78 0-1.07l-2.5-2.5c-.29-.29-.77-.29-1.07 0-.29.29-.29.77 0 1.07l1.07 1.07C8.39 8.27 6.86 9.98 6.86 12c0 .33.02.64.06.94H4.68c-.04-.3-.06-.61-.06-.94 0-2.05 1.53-3.76 3.56-3.97l-1.07-1.07c-.3-.29-.3-.77 0-1.07.29-.29.77-.29 1.07 0l2.5 2.5c.29.29.29.77 0 1.07-.29.29-.77.29-1.07 0l-1.07-1.07c1.48.18 2.68 1.35 2.68 2.87 0 .24-.02.47-.06.7h2.24z"
      />

      <div className="flex-1 overflow-y-auto scrollbar-dark">
        <section className="max-w-6xl mx-auto px-8 py-8">
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8 border-b border-zinc-700">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'account' | 'notifications' | 'appearance' | 'security')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all font-semibold text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'account' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-lg border border-zinc-700/50 p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/>
                  </svg>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Full Name', key: 'fullName' },
                    { label: 'Email Address', key: 'email' },
                    { label: 'Phone Number', key: 'phone' },
                    { label: 'Company', key: 'company' },
                  ].map(field => (
                    <div key={field.key} className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-300">{field.label}</label>
                      <input
                        type="text"
                        value=""
                        placeholder={accountSettings[field.key as keyof typeof accountSettings] as string}
                        onChange={(e) => handleAccountChange(field.key, e.target.value)}
                        className="bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 transition-all"
                      />
                    </div>
                  ))}
                </div>
                <button className="mt-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
                  </svg>
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Notifications Settings Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-lg border border-zinc-700/50 p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.86 5.36 6.25 7.92 6.25 11v5l-2 2v1h15v-1l-2-2z"/>
                  </svg>
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Email Notifications', key: 'emailNotifications', desc: 'Receive emails for important updates' },
                    { label: 'Push Notifications', key: 'pushNotifications', desc: 'Get push notifications on your devices' },
                  ].map(notif => (
                    <div key={notif.key} className="flex items-center justify-between p-4 bg-zinc-700/30 rounded-lg border border-zinc-600/50 hover:border-zinc-600 transition-colors">
                      <div>
                        <p className="font-semibold text-white">{notif.label}</p>
                        <p className="text-sm text-gray-400 mt-1">{notif.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[notif.key as keyof typeof notifications]}
                          onChange={(e) => handleNotificationChange(notif.key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-zinc-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings Tab */}
          {activeTab === 'appearance' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-lg border border-zinc-700/50 p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                  </svg>
                  Display Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white mb-4">Theme</h4>
                    {[
                      { value: 'dark', label: '🌙 Dark' },
                      { value: 'light', label: '☀️ Light' },
                      { value: 'auto', label: '🔄 Auto' },
                    ].map(option => (
                      <label key={option.value} className="flex items-center gap-3 p-3 bg-zinc-700/30 rounded-lg border border-zinc-600/50 hover:border-zinc-600 transition-colors cursor-pointer">
                        <input
                          type="radio"
                          name="theme"
                          value={option.value}
                          checked={appearance.theme === option.value}
                          onChange={(e) => handleAppearanceChange('theme', e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-white font-medium">{option.label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white mb-4">Language</h4>
                    {[
                      { value: 'de', label: '🇩🇪 Deutsch' },
                      { value: 'en', label: '🇬🇧 English' },
                      { value: 'es', label: '🇪🇸 Español' },
                    ].map(option => (
                      <label key={option.value} className="flex items-center gap-3 p-3 bg-zinc-700/30 rounded-lg border border-zinc-600/50 hover:border-zinc-600 transition-colors cursor-pointer">
                        <input
                          type="radio"
                          name="language"
                          value={option.value}
                          checked={appearance.language === option.value}
                          onChange={(e) => handleAppearanceChange('language', e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-white font-medium">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-lg border border-zinc-700/50 p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                  Security Settings
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Login Alerts', key: 'loginAlerts', desc: 'Get notified of new sign-ins to your account', type: 'toggle' },
                  ].map(setting => (
                    <div key={setting.key} className="flex items-center justify-between p-4 bg-zinc-700/30 rounded-lg border border-zinc-600/50 hover:border-zinc-600 transition-colors">
                      <div>
                        <p className="font-semibold text-white">{setting.label}</p>
                        <p className="text-sm text-gray-400 mt-1">{setting.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securitySettings[setting.key as keyof typeof securitySettings] as boolean}
                          onChange={(e) => handleSecurityChange(setting.key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-zinc-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  ))}

                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-lg border border-red-600/50 p-6">
                <h3 className="text-lg font-bold text-red-400 mb-4">Danger Zone</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">Delete Account</p>
                    <p className="text-sm text-gray-400 mt-1">Permanently delete your account and all associated data</p>
                  </div>
                  <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-all">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}