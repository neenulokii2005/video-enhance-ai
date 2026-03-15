import { Download, Film, Trash2, Clock } from "lucide-react";
import styles from "./page.module.css";

// Mock Data
const MOCK_HISTORY = [
  {
    id: "1",
    name: "vacation_clip_original.mp4",
    date: "Oct 24, 2026",
    resolution: "4K",
    duration: "0:12",
    status: "COMPLETED",
  },
  {
    id: "2",
    name: "wedding_speech.mov",
    date: "Oct 23, 2026",
    resolution: "1080p",
    duration: "2:45",
    status: "PROCESSING",
  },
  {
    id: "3",
    name: "old_home_video.avi",
    date: "Oct 20, 2026",
    resolution: "2K",
    duration: "1:30",
    status: "COMPLETED",
  }
];

export default function HistoryPage() {
  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Export History</h1>
          <p className={styles.subtitle}>View and download your recently processed videos.</p>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Video</th>
              <th className={styles.th}>Resolution</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Date</th>
              <th className={styles.th} style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_HISTORY.map((video) => (
              <tr key={video.id} className={styles.tr}>
                <td className={styles.td}>
                  <div className={styles.videoInfo}>
                    <div className={styles.videoThumb}>
                      <Film size={24} />
                    </div>
                    <div>
                      <div className={styles.videoName}>{video.name}</div>
                      <div className={styles.videoMeta}>{video.duration} • Original uploaded</div>
                    </div>
                  </div>
                </td>
                <td className={styles.td}>
                  <span className={`${styles.badge} ${styles.badgeResolution}`}>
                    {video.resolution}
                  </span>
                </td>
                <td className={styles.td}>
                  {video.status === "COMPLETED" ? (
                    <span className={`${styles.badge} ${styles.badgeSuccess}`}>Ready</span>
                  ) : (
                    <span className={`${styles.badge} ${styles.badgeProcessing}`}>
                      <Clock size={12} style={{ display: "inline", marginRight: "4px" }}/>
                      Processing
                    </span>
                  )}
                </td>
                <td className={styles.td} style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  {video.date}
                </td>
                <td className={styles.td}>
                  <div className={styles.actions}>
                    {video.status === "COMPLETED" && (
                      <button className={styles.actionButton}>
                        <Download size={16} />
                        Download
                      </button>
                    )}
                    <button className={styles.secondaryButton} aria-label="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
