"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <div style={{ padding: "2rem", maxWidth: "600px" }}>
      <h1 style={{ color: "white", marginBottom: "0.5rem" }}>Settings</h1>
      <p style={{ color: "#aaa", marginBottom: "2rem" }}>Manage your preferences</p>

      <div style={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: "16px", padding: "1.5rem", marginBottom: "1rem" }}>
        <h3 style={{ color: "white", marginBottom: "1.5rem" }}>Notifications</h3>

        {[
          { label: "Email notifications", desc: "Get notified when video is ready", value: notifications, set: setNotifications },
          { label: "Marketing emails", desc: "Receive tips and offers", value: marketing, set: setMarketing },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <div>
              <div style={{ color: "white", fontWeight: 600 }}>{item.label}</div>
              <div style={{ color: "#aaa", fontSize: "0.85rem" }}>{item.desc}</div>
            </div>
            <div
              onClick={() => item.set(!item.value)}
              style={{
                width: "48px", height: "26px", borderRadius: "13px",
                background: item.value ? "#7c3aed" : "#333",
                cursor: "pointer", position: "relative", transition: "background 0.2s"
              }}
            >
              <div style={{
                position: "absolute", top: "3px",
                left: item.value ? "25px" : "3px",
                width: "20px", height: "20px",
                borderRadius: "50%", background: "white",
                transition: "left 0.2s"
              }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: "16px", padding: "1.5rem" }}>
        <h3 style={{ color: "white", marginBottom: "1rem" }}>Danger Zone</h3>
        <button style={{
          padding: "0.75rem 1.5rem", background: "transparent",
          border: "1px solid #ef4444", color: "#ef4444",
          borderRadius: "8px", cursor: "pointer", fontWeight: 600
        }}>
          Delete Account
        </button>
      </div>
    </div>
  );
}