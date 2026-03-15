"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Play, Upload, History, User, Settings, LogOut, CreditCard } from "lucide-react";
import styles from "./layout.module.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.logo}>
          <Play size={20} color="#7c3aed" />
          VideoBoost AI
        </Link>

        <div className={styles.navGroup}>
          <div className={styles.navGroupTitle}>Main</div>
          <Link href="/dashboard" className={`${styles.navItem} ${isActive('/dashboard') ? styles.navItemActive : ''}`}>
            <Upload size={18} />
            Enhance Video
          </Link>
          <Link href="/dashboard/history" className={`${styles.navItem} ${isActive('/dashboard/history') ? styles.navItemActive : ''}`}>
            <History size={18} />
            Export History
          </Link>
        </div>

        <div className={styles.navGroup}>
          <div className={styles.navGroupTitle}>Account</div>
          <Link href="/dashboard/profile" className={`${styles.navItem} ${isActive('/dashboard/profile') ? styles.navItemActive : ''}`}>
            <User size={18} />
            Profile
          </Link>
          <Link href="/pricing" className={styles.navItem}>
            <CreditCard size={18} />
            Billing / Upgrade
          </Link>
          <Link href="/dashboard/settings" className={`${styles.navItem} ${isActive('/dashboard/settings') ? styles.navItemActive : ''}`}>
            <Settings size={18} />
            Settings
          </Link>
        </div>

        {/* User Info Widget (Mocked for now) */}
        <div className={styles.userWidget}>
          <div className={styles.userName}>Alex Developer</div>
          <div className={styles.userPlan}>Free Plan</div>
          
          <div className={styles.creditsLabel}>
            <span>Credits (Free)</span>
            <span>15s / 15s</span>
          </div>
          <div className={styles.creditsBarBg}>
            <div className={styles.creditsBarFill} style={{ width: '100%' }}></div>
          </div>
        </div>

        <button className={`${styles.navItem} ${styles.logoutBtn}`} style={{ marginTop: '1rem', width: '100%' }}>
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>Dashboard</div>
          {/* add top right stuff like notifications or avatar here if needed */}
        </header>

        <div className={styles.contentArea}>
          {children}
        </div>
      </main>
    </div>
  );
}
