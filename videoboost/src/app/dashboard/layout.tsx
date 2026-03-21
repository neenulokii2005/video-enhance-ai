"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Play, Upload, History, User, Settings, CreditCard, Menu, X } from "lucide-react";
import { useState } from "react";
import styles from "./layout.module.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navItems = (
    <>
      <div className={styles.navGroup}>
        <div className={styles.navGroupTitle}>Main</div>
        <Link href="/dashboard" onClick={() => setMenuOpen(false)} className={`${styles.navItem} ${isActive('/dashboard') ? styles.navItemActive : ''}`}>
          <Upload size={18} /> Enhance Video
        </Link>
        <Link href="/dashboard/history" onClick={() => setMenuOpen(false)} className={`${styles.navItem} ${isActive('/dashboard/history') ? styles.navItemActive : ''}`}>
          <History size={18} /> Export History
        </Link>
      </div>

      <div className={styles.navGroup}>
        <div className={styles.navGroupTitle}>Account</div>
        <Link href="/dashboard/profile" onClick={() => setMenuOpen(false)} className={`${styles.navItem} ${isActive('/dashboard/profile') ? styles.navItemActive : ''}`}>
          <User size={18} /> Profile
        </Link>
        <Link href="/pricing" onClick={() => setMenuOpen(false)} className={styles.navItem}>
          <CreditCard size={18} /> Billing / Upgrade
        </Link>
        <Link href="/dashboard/settings" onClick={() => setMenuOpen(false)} className={`${styles.navItem} ${isActive('/dashboard/settings') ? styles.navItemActive : ''}`}>
          <Settings size={18} /> Settings
        </Link>
      </div>
    </>
  );

  return (
    <div className={styles.layout}>

      {/* MOBILE TOP NAV */}
      <div className={styles.mobileNav}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.4rem", textDecoration: "none", color: "white", fontWeight: 700, fontSize: "1rem" }}>
          <Play size={18} color="#7c3aed" />
          VideoBoost AI
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "transparent", border: "none", color: "white", cursor: "pointer", padding: "0.25rem" }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navItems}
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.logo}>
          <Play size={20} color="#7c3aed" />
          VideoBoost AI
        </Link>

        {navItems}

        <div className={styles.userWidget}>
          <div className={styles.userName}>Alex Developer</div>
          <div className={styles.userPlan}>Free Plan</div>
          <div className={styles.creditsLabel}>
            <span>Credits (Free)</span>
            <span>15s / 15s</span>
          </div>
          <div className={styles.creditsBarBg}>
            <div className={styles.creditsBarFill} style={{ width: "100%" }}></div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={styles.mainContent}>
        <div className={styles.contentArea}>
          {children}
        </div>
      </main>

    </div>
  );
}
