import { Users, DollarSign, Video, HardDrive, TrendingUp } from "lucide-react";
import styles from "./page.module.css";

// Mock admin data
const RECENT_USERS = [
  { id: "1", name: "Alex Developer", email: "alex@example.com", plan: "FREE", joined: "Today" },
  { id: "2", name: "Sarah Studio", email: "sarah@studio.com", plan: "PRO_YEARLY", joined: "Yesterday" },
  { id: "3", name: "Mike Creator", email: "mike.c@gmail.com", plan: "FREE", joined: "Oct 22, 2026" },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Overview Dashboard</h1>
        <p className={styles.subtitle}>System metrics and recent activity overview.</p>
      </div>

      <div className={styles.grid}>
        {/* Total Users */}
        <div className={styles.metricCard}>
          <div className={`${styles.metricIcon} ${styles.iconUsers}`}>
            <Users size={24} />
          </div>
          <div className={styles.metricInfo}>
            <div className={styles.metricLabel}>Total Users</div>
            <div className={styles.metricValue}>1,248</div>
            <div className={`${styles.metricTrend} ${styles.trendUp}`}>
              <TrendingUp size={14} /> +12% this week
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className={styles.metricCard}>
          <div className={`${styles.metricIcon} ${styles.iconRevenue}`}>
            <DollarSign size={24} />
          </div>
          <div className={styles.metricInfo}>
            <div className={styles.metricLabel}>MRR (Revenue)</div>
            <div className={styles.metricValue}>$4,350</div>
            <div className={`${styles.metricTrend} ${styles.trendUp}`}>
              <TrendingUp size={14} /> +8.5% this month
            </div>
          </div>
        </div>

        {/* Videos Processed */}
        <div className={styles.metricCard}>
          <div className={`${styles.metricIcon} ${styles.iconVideo}`}>
            <Video size={24} />
          </div>
          <div className={styles.metricInfo}>
            <div className={styles.metricLabel}>Videos Processed (24h)</div>
            <div className={styles.metricValue}>842</div>
            <div className={`${styles.metricTrend} ${styles.trendUp}`}>
              <TrendingUp size={14} /> High AI Queue
            </div>
          </div>
        </div>

        {/* Storage */}
        <div className={styles.metricCard}>
          <div className={`${styles.metricIcon} ${styles.iconStorage}`}>
            <HardDrive size={24} />
          </div>
          <div className={styles.metricInfo}>
            <div className={styles.metricLabel}>Total Storage Used</div>
            <div className={styles.metricValue}>4.2 TB</div>
            <div className={`${styles.metricTrend}`} style={{ color: "var(--text-muted)" }}>
              Auto-deletion active (24h)
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Signups</h2>
          <button style={{ background: "transparent", color: "var(--primary)", border: "none", cursor: "pointer", fontWeight: 600 }}>
            View All Users
          </button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>User</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Plan</th>
              <th className={styles.th}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_USERS.map(user => (
              <tr key={user.id} className={styles.tr}>
                <td className={styles.td} style={{ fontWeight: 500, color: "var(--foreground)" }}>{user.name}</td>
                <td className={styles.td} style={{ color: "var(--text-muted)" }}>{user.email}</td>
                <td className={styles.td}>
                  <span className={`${styles.badge} ${user.plan === "FREE" ? styles.badgeFree : styles.badgeProYearly}`}>
                    {user.plan}
                  </span>
                </td>
                <td className={styles.td} style={{ color: "var(--text-muted)" }}>{user.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
