"use client";

import Link from "next/link";
import { Check, Zap, Crown, Play } from "lucide-react";

export default function PricingPage() {
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
          Go to Dashboard
        </Link>
      </nav>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem" }}>
          Simple, Transparent Pricing
        </h1>
        <p style={{ color: "#aaa", fontSize: "1.1rem" }}>
          Start free. Upgrade when you need more power.
        </p>
      </div>

      {/* Plans */}
      <div style={{
        display: "flex",
        gap: "1.5rem",
        maxWidth: "1000px",
        margin: "0 auto",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>

        {/* Free Plan */}
        <div style={{
          background: "#12121e",
          border: "1px solid #2a2a3e",
          borderRadius: "16px",
          padding: "2rem",
          width: "280px",
          flex: "1 1 250px"
        }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ color: "#aaa", marginBottom: "0.5rem" }}>Free</p>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 800 }}>₹0</h2>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>Forever free</p>
          </div>

          <Link href="/register" style={{
            display: "block",
            textAlign: "center",
            padding: "0.75rem",
            background: "transparent",
            border: "1px solid #7c3aed",
            color: "#7c3aed",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600,
            marginBottom: "1.5rem"
          }}>
            Get Started Free
          </Link>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              "15 seconds max",
              "1080p output",
              "MP4, MOV, AVI",
              "Ads before download",
              "2 videos per day"
            ].map((feature) => (
              <div key={feature} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Check size={16} color="#7c3aed" />
                <span style={{ color: "#ccc", fontSize: "0.9rem" }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Monthly */}
        <div style={{
          background: "#12121e",
          border: "2px solid #7c3aed",
          borderRadius: "16px",
          padding: "2rem",
          width: "280px",
          flex: "1 1 250px",
          position: "relative"
        }}>
          <div style={{
            position: "absolute",
            top: "-12px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#7c3aed",
            color: "white",
            padding: "0.25rem 1rem",
            borderRadius: "20px",
            fontSize: "0.8rem",
            fontWeight: 600
          }}>
            Most Popular
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <Zap size={18} color="#7c3aed" />
              <p style={{ color: "#aaa" }}>Pro Monthly</p>
            </div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 800 }}>₹99</h2>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>per month</p>
          </div>

          <Link href="/register" style={{
            display: "block",
            textAlign: "center",
            padding: "0.75rem",
            background: "#7c3aed",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600,
            marginBottom: "1.5rem"
          }}>
            Start Pro Monthly
          </Link>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              "2 minutes max",
              "1080p + 2K output",
              "No ads",
              "Faster processing",
              "Unlimited videos",
              "Priority support"
            ].map((feature) => (
              <div key={feature} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Check size={16} color="#7c3aed" />
                <span style={{ color: "#ccc", fontSize: "0.9rem" }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Yearly */}
        <div style={{
          background: "#12121e",
          border: "1px solid #2a2a3e",
          borderRadius: "16px",
          padding: "2rem",
          width: "280px",
          flex: "1 1 250px"
        }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <Crown size={18} color="#f59e0b" />
              <p style={{ color: "#aaa" }}>Pro Yearly</p>
            </div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 800 }}>₹799</h2>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>per year
              <span style={{
                marginLeft: "0.5rem",
                background: "#16a34a",
                color: "white",
                padding: "0.1rem 0.5rem",
                borderRadius: "10px",
                fontSize: "0.75rem"
              }}>Save 33%</span>
            </p>
          </div>

          <Link href="/register" style={{
            display: "block",
            textAlign: "center",
            padding: "0.75rem",
            background: "transparent",
            border: "1px solid #f59e0b",
            color: "#f59e0b",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600,
            marginBottom: "1.5rem"
          }}>
            Start Pro Yearly
          </Link>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              "5 minutes max",
              "1080p + 2K + 4K output",
              "No ads",
              "Priority GPU processing",
              "Unlimited videos",
              "24/7 Premium support",
              "Early access to features"
            ].map((feature) => (
              <div key={feature} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Check size={16} color="#f59e0b" />
                <span style={{ color: "#ccc", fontSize: "0.9rem" }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FAQ */}
      <div style={{ maxWidth: "600px", margin: "4rem auto 0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Questions?</h2>
        <p style={{ color: "#aaa" }}>
          Start with the free plan — no credit card required.
          Upgrade anytime when you need more.
        </p>
      </div>

    </div>
  );
}
