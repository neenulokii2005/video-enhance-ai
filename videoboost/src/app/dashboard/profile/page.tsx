"use client";
// @ts-nocheck

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Play, User, Mail, Crown, Film, LogOut, ArrowLeft } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [totalVideos, setTotalVideos] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
        return;
      }
      setUser(data.user);

      const { count } = await supabase
        .from("export_history")
        .select("*", { count: "exact", head: true })
        .eq("user_id", data.user.id);

      setTotalVideos(count || 0);
      setLoading(false);
    };
    init();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white"
      }}>
        Loading...
      </div>
    );
  }

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
        maxWidth: "800px",
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
          display: "flex", alignItems: "center", gap: "0.5rem",
          padding: "0.5rem 1.5rem",
          background: "transparent",
          border: "1px solid #7c3aed",
          color: "#7c3aed",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: 600
        }}>
          <ArrowLeft size={16} />
          Dashboard
        </Link>
      </nav>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        {/* Profile Header */}
        <div style={{
          background: "#12121e",
          border: "1px solid #2a2a3e",
          borderRadius: "16px",
          padding: "2rem",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          flexWrap: "wrap"
        }}>
          <div style={{
            width: "80px", height: "80px",
            borderRadius: "50%",
            background: "#7c3aed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            flexShrink: 0
          }}>
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>
              {user?.email?.split("@")[0]}
            </h1>
            <p style={{ color: "#aaa", fontSize: "0.9rem" }}>{user?.email}</p>
            <span style={{
              marginTop: "0.5rem",
              display: "inline-block",
              background: "#1e1e3e",
              color: "#7c3aed",
              padding: "0.25rem 0.75rem",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: 600
            }}>
              Free Plan
            </span>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem"
        }}>
          <div style={{
            background: "#12121e",
            border: "1px solid #2a2a3e",
            borderRadius: "12px",
            padding: "1.5rem",
            textAlign: "center"
          }}>
            <Film size={28} color="#7c3aed" style={{ margin: "0 auto 0.5rem auto", display: "block" }} />
            <h2 style={{ fontSize: "2rem", fontWeight: 800 }}>{totalVideos}</h2>
            <p style={{ color: "#aaa", fontSize: "0.9rem" }}>Videos Enhanced</p>
          </div>

          <div style={{
            background: "#12121e",
            border: "1px solid #2a2a3e",
            borderRadius: "12px",
            padding: "1.5rem",
            textAlign: "center"
          }}>
            <Crown size={28} color="#f59e0b" style={{ margin: "0 auto 0.5rem auto", display: "block" }} />
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Free</h2>
            <p style={{ color: "#aaa", fontSize: "0.9rem" }}>Current Plan</p>
          </div>
        </div>

        {/* Account Info */}
        <div style={{
          background: "#12121e",
          border: "1px solid #2a2a3e",
          borderRadius: "16px",
          padding: "2rem",
          marginBottom: "1.5rem"
        }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.5rem" }}>
            Account Information
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "1rem",
              padding: "1rem",
              background: "#0a0a0f",
              borderRadius: "10px"
            }}>
              <Mail size={20} color="#7c3aed" />
              <div>
                <p style={{ color: "#666", fontSize: "0.8rem" }}>Email</p>
                <p style={{ fontWeight: 600 }}>{user?.email}</p>
              </div>
            </div>

            <div style={{
              display: "flex", alignItems: "center", gap: "1rem",
              padding: "1rem",
              background: "#0a0a0f",
              borderRadius: "10px"
            }}>
              <User size={20} color="#7c3aed" />
              <div>
                <p style={{ color: "#666", fontSize: "0.8rem" }}>Member Since</p>
                <p style={{ fontWeight: 600 }}>
                  {new Date(user?.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Upgrade Banner */}
        <div style={{
          background: "linear-gradient(135deg, #1e1e3e, #2d1b69)",
          border: "1px solid #7c3aed",
          borderRadius: "16px",
          padding: "2rem",
          marginBottom: "1.5rem",
          textAlign: "center"
        }}>
          <Crown size={32} color="#f59e0b" style={{ margin: "0 auto 1rem auto", display: "block" }} />
          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            Upgrade to Pro
          </h2>
          <p style={{ color: "#aaa", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
            Get 4K exports, no ads, and unlimited videos for just ₹99/month
          </p>
          <Link href="/pricing" style={{
            padding: "0.75rem 2rem",
            background: "#7c3aed",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600
          }}>
            View Plans 🚀
          </Link>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "1rem",
            background: "transparent",
            border: "1px solid #333",
            color: "#aaa",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            fontSize: "1rem"
          }}
        >
          <LogOut size={18} />
          Sign Out
        </button>

      </div>
    </div>
  );
}
