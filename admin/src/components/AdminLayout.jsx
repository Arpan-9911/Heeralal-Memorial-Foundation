import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

/* ──────── SIDEBAR NAV ITEMS ──────── */

const navItems = [
  { path: "/", label: "Dashboard", icon: "📊" },
  { path: "/contact-submissions", label: "Contact Submissions", icon: "📩" },
  { path: "/hero-slides", label: "Hero Slides", icon: "🖼️" },
  { path: "/announcements", label: "Announcements", icon: "📢" },
  { path: "/team", label: "Team Management", icon: "👥" },
  { path: "/programs", label: "Programs", icon: "📋" },
  { path: "/achievements", label: "Achievements", icon: "🏆" },
  { path: "/media", label: "Media Gallery", icon: "📸" },
  { path: "/news", label: "News / Press", icon: "📰" },
  { path: "/donations", label: "Donations", icon: "💰" },
  { path: "/stats", label: "Impact Stats", icon: "📈" },
  { path: "/settings", label: "Site Settings", icon: "⚙️" },
];

/* ──────── SIDEBAR ──────── */

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300 ${
        collapsed ? "w-[68px]" : "w-60"
      }`}
      style={{ background: "var(--admin-sidebar)" }}
    >
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
        <div className="min-w-9 h-9 w-9 rounded-full bg-[var(--admin-accent)] flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
          H
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-white text-sm font-bold tracking-wide truncate">
              HLMF Admin
            </h1>
            <p className="text-gray-500 text-[10px] truncate">Content Manager</p>
          </div>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : ""}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors duration-150 ${
                active
                  ? "bg-[var(--admin-sidebar-active)] text-[var(--admin-accent)]"
                  : "text-gray-400 hover:bg-[var(--admin-sidebar-hover)] hover:text-white"
              }`}
            >
              <span className="text-base flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-gray-500 hover:text-white hover:bg-[var(--admin-sidebar-hover)] transition-colors text-xs"
        >
          {collapsed ? "→" : "← Collapse"}
        </button>
      </div>
    </aside>
  );
};

/* ──────── TOP BAR ──────── */

const TopBar = ({ title }) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[var(--admin-border)] px-6 py-3 flex items-center justify-between">
      <h2 className="text-base font-bold text-[var(--admin-text)]">{title}</h2>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[var(--admin-maroon)] flex items-center justify-center text-white text-xs font-bold">
          A
        </div>
      </div>
    </header>
  );
};

/* ──────── LAYOUT WRAPPER ──────── */

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Get current page title from nav items
  const currentNav = navItems.find((item) => item.path === location.pathname);
  const pageTitle = currentNav ? currentNav.label : "Admin Panel";

  return (
    <div className="min-h-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div
        className={`transition-all duration-300 ${
          collapsed ? "ml-[68px]" : "ml-60"
        }`}
      >
        <TopBar title={pageTitle} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
