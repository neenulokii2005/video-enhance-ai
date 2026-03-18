"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Play } from "lucide-react";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

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
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem" }}>
          Simple, Transparent Pricing
        </h1>
        <p style={{ color: "#aaa", fontSize: "1.1rem" }}>
          Start free. Upgrade when you need more power.
        </p>
      </div>

      {/* Toggle */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        marginBottom: "3rem"
      }}>
        <span style={{
          color: !isYearly ? "white" : "#666",
          fontWeight: !isYearly ? 700 : 400
        }}>Monthly</span>

        <div
          onClick={() => setIsYearly(!isYearly)}
          style={{
            width: "52px", height: "28px",
            background: isYearly ? "#7c3aed" : "#333",
            borderRadius: "20px",
            cursor: "pointer",
            position: "relative",
            transition: "background 0.3s"
          }}
        >
          <div style={{
            position: "absolute",
            top: "3px",
            left: isYearly ? "27px" : "3px",
            width: "22px", height: "22px",
            background: "white",
            borderRadius: "50%",
            transition: "left 0.3s"
          }} />
        </div>

        <span style={{
          color: isYearly ? "white" : "#666",
          fontWeight: isYearly ? 700 : 400
        }}>
          Yearly
          <span style={{
            marginLeft: "0.5rem",
            background: "#16a34a",
            color: "white",
            padding: "0.1rem 0.5rem",
            borderRadius: "10px",
            fontSize: "0.75rem"
          }}>Save 20%</span>
        </span>
      </div>

      {/* Plans */}
      <div style={{
        display: "flex",
        gap: "1.5rem",
        maxWidth: "800px",
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
          width: "340px",
          flex: "1 1 300px"
        }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <p style={{ color: "#aaa", marginBottom: "0.5rem" }}>Free Plan</p>
            <h2 style={{ fontSize: "2.8rem", fontWeight: 800 }}>₹0</h2>
            <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1rem" }}>
              Perfect to experience AI upscaling before committing.
            </p>
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
              "Up to 15 seconds per video",
              "1080p maximum export",
              "Standard processing speed",
              "Ads shown before download"
            ].map((feature) => (
              <div key={feature} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Check size={16} color="#7c3aed" />
                <span style={{ color: "#ccc", fontSize: "0.9rem" }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Plan */}
        <div style={{
          background: "#12121e",
          border: "2px solid #7c3aed",
          borderRadius: "16px",
          padding: "2rem",
          width: "340px",
          flex: "1 1 300px",
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
            fontWeight: 600,
            whiteSpace: "nowrap"
          }}>
            Most Popular
          </div>

          <div style={{ marginBottom: "0.5rem" }}>
            <p style={{ color: "#aaa", marginBottom: "0.5rem" }}>Pro Plan</p>
            <h2 style={{ fontSize: "2.8rem", fontWeight: 800 }}>
              {isYearly ? "₹799" : "₹99"}
              <span style={{ fontSize: "1rem", color: "#aaa", fontWeight: 400 }}>
                {isYearly ? "/yr" : "/mo"}
              </span>
            </h2>
            <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1rem" }}>
              For serious creators who need the best quality without limits.
            </p>
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
            Upgrade to Pro
          </Link>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              "Up to 5 minutes per video",
              "1080p, 2K, and 4K Ultra HD",
              "No advertisements",
              "Priority GPU processing",
              "Unlimited videos",
              "Priority support"
            ].map((feature) => (
              <div key={feature} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Check size={16} color="#7c3aed" />
                <span style={{ color: "#ccc", fontSize: "0.9rem" }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom note */}
      <div style={{ maxWidth: "600px", margin: "4rem auto 0 auto", textAlign: "center" }}>
        <p style={{ color: "#aaa" }}>
          Start with the free plan — no credit card required.
          Upgrade anytime when you need more.
        </p>
      </div>

    </div>
  );
}
