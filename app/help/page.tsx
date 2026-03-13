export default function HelpPage() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-zinc-700 py-6 text-center">
        <h1 className="text-4xl font-bold text-blue-400">Help & Support</h1>
        <h2 className="text-xl text-gray-400 mt-2">Get assistance and find answers to your questions</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-dark">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="space-y-8 text-gray-300">
          {/* Getting Started */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d=""/>
              </svg>
              Getting Started
            </h2>
            <p className="mb-3">
              Welcome to our CRM Dashboard! Here are the basic steps to get started:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Create your account by clicking the Register button</li>
              <li>Log in with your credentials</li>
              <li>Navigate to the Dashboard to see your overview</li>
              <li>Start adding customers and managing events</li>
              <li>Use Quick Actions to log calls and send emails</li>
            </ol>
          </section>

          {/* Dashboard Features */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h2v8H3zm4-8h2v16H7zm4-2h2v18h-2zm4-1h2v19h-2zm4 4h2v15h-2zm4 2h2v13h-2z"/>
              </svg>
              Dashboard Features
            </h2>
            <div className="space-y-4">
              <div className="bg-zinc-800 rounded-lg p-4 border-l-4 border-blue-400">
                <h3 className="font-semibold text-white mb-1">Quick Actions</h3>
                <p className="text-sm">Manage your daily tasks: add new customers, log calls, send emails, and logout.</p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4 border-l-4 border-green-400">
                <h3 className="font-semibold text-white mb-1">All Events</h3>
                <p className="text-sm">View all upcoming events with their priorities. High, Medium, and Low priority events are color-coded.</p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4 border-l-4 border-yellow-400">
                <h3 className="font-semibold text-white mb-1">Activity Feed</h3>
                <p className="text-sm">Track all activities: new customers added, calls logged, and emails sent with timestamps.</p>
              </div>
            </div>
          </section>

          {/* Calendar Management */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
              </svg>
              Calendar Management
            </h2>
            <p className="mb-4">
              The Calendar page allows you to manage all your events in one place:
            </p>
            <ul className="space-y-2 ml-4">
              <li>📅 <strong>View Events:</strong> Click on any day to see or create events for that day</li>
              <li>🔴 <strong>Priority Levels:</strong> Color-coded priorities (High, Medium, Low) for quick identification</li>
              <li>📊 <strong>Quick Stats:</strong> See event statistics at a glance on the sidebar</li>
              <li>📋 <strong>Upcoming Events:</strong> Always visible list of your next events</li>
            </ul>
          </section>

          {/* Email Management */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Email Management
            </h2>
            <p className="mb-4">
              Send professional emails to your customers with pre-made templates:
            </p>
            <div className="space-y-2 ml-4">
              <p>✉️ <strong>Email Templates:</strong> Choose from Follow-up, Quote Request, Introduction, or Thank You emails</p>
              <p>👥 <strong>Customer Selection:</strong> Pick a customer from your list or enter a custom email address</p>
              <p>📝 <strong>Custom Compose:</strong> Write your own subject and message</p>
              <p>🚀 <strong>Send Button:</strong> One-click email sending</p>
            </div>
          </section>

          {/* User Management */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              User Management
            </h2>
            <p className="mb-4">
              Manage all your CRM users in one place:
            </p>
            <div className="space-y-2 ml-4">
              <p>➕ <strong>Add Users:</strong> Click Add User button to create new user accounts</p>
              <p>📋 <strong>User Table:</strong> View all users with their ID, name, and email address</p>
              <p>🗑️ <strong>Delete Users:</strong> Remove users from your system with confirmation</p>
              <p>📊 <strong>User Count:</strong> See total number of users in your system</p>
            </div>
          </section>

          {/* Tips & Tricks */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
              </svg>
              Tips & Tricks
            </h2>
            <ul className="space-y-2 ml-4">
              <li>💡 Set reminders by creating high-priority events</li>
              <li>💡 Use email templates for quick and professional communication</li>
              <li>💡 Check the Activity Feed to track all your CRM interactions</li>
              <li>💡 Use the Calendar view to plan your week ahead</li>
              <li>💡 Regularly update customer information to keep your database clean</li>
            </ul>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-zinc-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Q: How do I add a new customer?</h3>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Q: Can I edit events after creating them?</h3>
                <p className="text-sm">A: Yes, click on any event in the Calendar to view and modify its details.</p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Q: What do the priority levels mean?</h3>
                <p className="text-sm">A: High = Urgent action needed, Medium = Needs attention soon, Low = Can be scheduled later</p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Q: How do I export my data?</h3>
                <p className="text-sm">A: Data is currently stored in-memory. Please contact support for export options.</p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Q: Is my data secure?</h3>
                <p className="text-sm">A: Yes, we take data security seriously. Please read our Privacy Policy for details.</p>
              </div>
            </div>
          </section>

          {/* Contact Support */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Need More Help?</h2>
            <div className="bg-blue-900/20 rounded-lg border-2 border-blue-700 p-6">
              <div className="space-y-2">
                <p>📧 <strong>Email:</strong> support@crm.com</p>
                <p>💬 <strong>Live Chat:</strong> Available 24/7 on our website</p>
                <p>📱 <strong>Phone:</strong> +49 (0) 123 456789</p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-700 mb-8">
          <p className="text-xs text-gray-500">
            Last updated: March 13, 2026 | Version 1.0
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
