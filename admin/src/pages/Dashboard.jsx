import React from "react";

const summaryCards = [
  { label: "Contact Submissions", value: "24", icon: "📩", change: "+3 today", color: "bg-blue-50 text-blue-700" },
  { label: "Team Members", value: "9", icon: "👥", change: "Active", color: "bg-purple-50 text-purple-700" },
  { label: "Active Programs", value: "6", icon: "📋", change: "2 new", color: "bg-green-50 text-green-700" },
  { label: "Total Donations", value: "₹4.2L", icon: "💰", change: "+12% this month", color: "bg-amber-50 text-amber-700" },
];

const recentSubmissions = [
  { id: 1, name: "Rahul Verma", email: "rahul@example.com", subject: "Volunteer Registration", date: "May 3, 2026", status: "unread" },
  { id: 2, name: "Priya Sharma", email: "priya@example.com", subject: "CSR Partnership", date: "May 2, 2026", status: "read" },
  { id: 3, name: "Amit Singh", email: "amit@example.com", subject: "Donation Query", date: "May 1, 2026", status: "resolved" },
  { id: 4, name: "Sneha Patel", email: "sneha@example.com", subject: "General Inquiry", date: "Apr 30, 2026", status: "unread" },
];

const quickActions = [
  { label: "Add Hero Slide", icon: "🖼️", href: "/hero-slides" },
  { label: "New Announcement", icon: "📢", href: "/announcements" },
  { label: "Add Team Member", icon: "👥", href: "/team" },
  { label: "Update Stats", icon: "📈", href: "/stats" },
];

const statusColors = {
  unread: "bg-blue-100 text-blue-700",
  read: "bg-gray-100 text-gray-600",
  resolved: "bg-green-100 text-green-700",
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-[var(--admin-border)] p-5 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-[var(--admin-muted)] font-medium">{card.label}</p>
                <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
                <p className="text-[11px] text-[var(--admin-muted)] mt-1">{card.change}</p>
              </div>
              <span className={`text-2xl w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                {card.icon}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Submissions */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[var(--admin-border)]">
          <div className="px-5 py-4 border-b border-[var(--admin-border)] flex items-center justify-between">
            <h3 className="text-sm font-bold">Recent Contact Submissions</h3>
            <a href="/contact-submissions" className="text-xs text-[var(--admin-accent-dark)] font-semibold hover:underline">
              View All →
            </a>
          </div>
          <div className="divide-y divide-[var(--admin-border)]">
            {recentSubmissions.map((item) => (
              <div key={item.id} className="px-5 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-[var(--admin-maroon)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {item.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-[var(--admin-muted)] truncate">{item.subject}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${statusColors[item.status]}`}>
                    {item.status}
                  </span>
                  <p className="text-[11px] text-[var(--admin-muted)] mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-[var(--admin-border)]">
          <div className="px-5 py-4 border-b border-[var(--admin-border)]">
            <h3 className="text-sm font-bold">Quick Actions</h3>
          </div>
          <div className="p-4 space-y-2">
            {quickActions.map((action, i) => (
              <a
                key={i}
                href={action.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--admin-border)] hover:bg-[var(--admin-accent-light)] hover:border-[var(--admin-accent)] transition-all duration-150"
              >
                <span className="text-lg">{action.icon}</span>
                <span className="text-sm font-medium">{action.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
