"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Play, LayoutDashboard, Users, CreditCard, HardDrive, Megaphone, Settings, LogOut } from "lucide-react";
import styles from "./layout.module.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.logo}>
          <Play size={20} color="#ef4444" />
          VideoBoost AI
          <span className={styles.adminBadge}>Admin</span>
        </Link>

        <div className={styles.navGroup}>
          <div className={styles.navGroupTitle}>Overview</div>
          <Link href="/admin/dashboard" className={`${styles.navItem} ${isActive('/admin/dashboard') ? styles.navItemActive : ''}`}>
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link href="/admin/revenue" className={`${styles.navItem} ${isActive('/admin/revenue') ? styles.navItemActive : ''}`}>
            <CreditCard size={18} />
            Revenue
          </Link>
        </div>

        <div className={styles.navGroup}>
          <div className={styles.navGroupTitle}>Management</div>
          <Link href="/admin/users" className={`${styles.navItem} ${isActive('/admin/users') ? styles.navItemActive : ''}`}>
            <Users size={18} />
            Users & Plans
          </Link>
          <Link href="/admin/infrastructure" className={`${styles.navItem} ${isActive('/admin/infrastructure') ? styles.navItemActive : ''}`}>
            <HardDrive size={18} />
            Infra & Storage
          </Link>
          <Link href="/admin/ads" className={`${styles.navItem} ${isActive('/admin/ads') ? styles.navItemActive : ''}`}>
            <Megaphone size={18} />
            Ad Settings
          </Link>
        </div>

        <button className={styles.navItem} style={{ marginTop: 'auto', width: '100%', background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <LogOut size={18} />
          Exit Admin
        </button>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>System Administrator</div>
        </header>
        <div className={styles.contentArea}>
          {children}
        </div>
      </main>
    </div>
  );
}
