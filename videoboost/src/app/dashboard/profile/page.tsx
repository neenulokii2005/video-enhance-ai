"use client";

import { UserCircle, Shield, CreditCard } from "lucide-react";
import styles from "./page.module.css";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Account Profile</h1>
        <p className={styles.subtitle}>Manage your account settings and preferences.</p>
      </div>

      <div className={styles.grid}>
        {/* Personal Info */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <UserCircle size={20} className="text-muted" />
            Personal Information
          </h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name</label>
              <input type="text" className={styles.input} defaultValue="Alex Developer" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <input type="email" className={styles.input} defaultValue="alex@example.com" disabled />
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                Email cannot be changed directly. Contact support if needed.
              </p>
            </div>
            <button className={styles.buttonPrimary}>Save Changes</button>
          </form>
        </div>

        {/* Security & Plan */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          {/* Plan Info */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <CreditCard size={20} className="text-muted" />
              Subscription Plan
            </h2>
            <div className={styles.planBadge}>Current: Free Tier</div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.5" }}>
              You are currently on the ad-supported free plan restricted to 15-second 1080p exports.
            </p>
            
            <div className={styles.statsGrid}>
              <div className={styles.statBox}>
                <div className={styles.statValue}>15s</div>
                <div className={styles.statLabel}>Processing Left</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statValue}>3</div>
                <div className={styles.statLabel}>Videos Exported</div>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <Link href="/pricing" className={styles.buttonPrimary} style={{ width: "100%", textAlign: "center" }}>
                Upgrade Plan
              </Link>
            </div>
          </div>

          {/* Security */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <Shield size={20} className="text-muted" />
              Security
            </h2>
            <div className={styles.formGroup}>
              <label className={styles.label}>New Password</label>
              <input type="password" className={styles.input} placeholder="••••••••" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Confirm Password</label>
              <input type="password" className={styles.input} placeholder="••••••••" />
            </div>
            <button className={styles.buttonPrimary}>Update Password</button>
          </div>

        </div>
      </div>
    </div>
  );
}
