"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Play, Film, Clock, Download, Trash2 } from "lucide-react";

type ExportItem = {
  id: string;
  file_name: string;
  resolution: string;
  file_size: string;
  created_at: string;
};

export default function HistoryPage() {
  const [history, setHistory] = useState<ExportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        router.push("/login");
        return;
      }
      fetchHistory(userData.user.id);
    };
    init();
  }, []);

  const fetchHistory = async (userId: string) => {
    const { data, error } = await supabase
      .from("export_history")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setHistory(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("export_history").delete().eq("id", id);
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "white",
      fontFamily: "sans-serif",
      padding: "2rem 1rem"
    }}>

      {/* Navbar */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1100px",
        margin: "0 auto 3rem auto"
      }}>
        <Link href="/" style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          color: "white", textDecoration: "none", fontWeight: 700, fontSize: "1.2rem"
        }}>
          <Play size={22} color="#7c3aed" />
          VideoBoost AI
        </Link>
        <Link href="/dashboard" style={{
          padding: "0.5rem 1.5rem",
          background: "#7c3aed",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: 600
        }}>
          Back to Dashboard
        </Link>
      </nav>

      {/* Header */}
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
          <Clock size={28} color="#7c3aed" />
          <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>Export History</h1>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", color: "#aaa", padding: "3rem" }}>
            Loading...
          </div>
        )}

        {/* Empty */}
        {!loading && history.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "4rem",
            background: "#12121e",
            borderRadius: "16px",
            border: "1px solid #2a2a3e"
          }}>
            <Film size={48} color="#333" style={{ margin: "0 auto 1rem auto", display: "block" }} />
            <h3 style={{ color: "#aaa", marginBottom: "0.5rem" }}>No exports yet</h3>
            <p style={{ color: "#555", marginBottom: "1.5rem" }}>
              Enhance a video to see your history here.
            </p>
            <Link href="/dashboard" style={{
              padding: "0.75rem 2rem",
              background: "#7c3aed",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 600
            }}>
              Enhance a Video
            </Link>
          </div>
        )}

        {/* History List */}
        {!loading && history.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {history.map((item) => (
              <div key={item.id} style={{
                background: "#12121e",
                border: "1px solid #2a2a3e",
                borderRadius: "12px",
                padding: "1.25rem 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{
                    width: "48px", height: "48px",
                    background: "#1e1e3e",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <Film size={22} color="#7c3aed" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: "0.25rem" }}>
                      {item.file_name}
                    </p>
                    <p style={{ color: "#666", fontSize: "0.85rem" }}>
                      {formatDate(item.created_at)}
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <span style={{
                    background: "#1e1e3e",
                    color: "#7c3aed",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: 600
                  }}>
                    {item.resolution}
                  </span>

                  <span style={{ color: "#666", fontSize: "0.85rem" }}>
                    {item.file_size}
                  </span>

                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#666",
                      cursor: "pointer",
                      padding: "0.25rem"
                    }}
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {!loading && history.length > 0 && (
          <div style={{
            marginTop: "2rem",
            padding: "1rem 1.5rem",
            background: "#12121e",
            borderRadius: "12px",
            border: "1px solid #2a2a3e",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span style={{ color: "#aaa" }}>
              Total exports: <strong style={{ color: "white" }}>{history.length}</strong>
            </span>
            <Link href="/dashboard" style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              color: "#7c3aed", textDecoration: "none", fontWeight: 600
            }}>
              <Download size={16} />
              Enhance More
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
