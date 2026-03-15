"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Play } from "lucide-react";
import styles from "./page.module.css";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.glowBackground}></div>

      {/* Basic Navbar for Pricing */}
      <nav style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "1.5rem 2rem", display: "flex", justifyContent: "space-between", zIndex: 20 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: "1.25rem" }}>
          <Play size={20} color="#7c3aed" />
          VideoBoost AI
        </Link>
        <Link href="/dashboard" style={{ color: "#fff", textDecoration: "none", fontWeight: 600 }}>
          Dashboard
        </Link>
      </nav>

      <div className={styles.header}>
        <h1 className={styles.title}>Simple, Transparent Pricing</h1>
        <p className={styles.subtitle}>
          Choose the plan that fits your creative needs. Upgrade, downgrade, or cancel anytime.
        </p>
      </div>

      <div className={styles.toggleContainer}>
        <span 
          className={`${styles.toggleLabel} ${!isYearly ? styles.toggleLabelActive : ""}`} 
          onClick={() => setIsYearly(false)}
        >
          Monthly
        </span>
        <label className={styles.switch}>
          <input 
            type="checkbox" 
            checked={isYearly} 
            onChange={(e) => setIsYearly(e.target.checked)} 
          />
          <span className={styles.slider}></span>
        </label>
        <span 
          className={`${styles.toggleLabel} ${isYearly ? styles.toggleLabelActive : ""}`} 
          onClick={() => setIsYearly(true)}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          Yearly <span style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981", fontSize: "0.7rem", padding: "0.1rem 0.4rem", borderRadius: "10px" }}>Save 20%</span>
        </span>
      </div>

      <div className={styles.grid}>
        
        {/* Free Plan */}
        <div className={styles.card}>
          <h2 className={styles.cardName}>Free Plan</h2>
          <div className={styles.cardPrice}>$0</div>
          <p className={styles.cardDesc}>
            Perfect to experience the AI upscaling technology before committing.
          </p>
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <Check size={20} className={styles.featureIcon} />
              <span>Up to 15 seconds per video</span>
            </li>
            <li className={styles.featureItem}>
              <Check size={20} className={styles.featureIcon} />
              <span>1080p maximum export resolution</span>
            </li>
            <li className={styles.featureItem}>
              <Check size={20} className={styles.featureIcon} />
              <span>Standard processing speed</span>
            </li>
            <li className={styles.featureItem} style={{ color: "var(--text-muted)" }}>
              <Check size={20} className={styles.featureIcon} style={{ color: "var(--text-muted)" }} />
              <span>Ads shown before download</span>
            </li>
          </ul>
          <Link href="/register" className={styles.buttonOutline}>
            Get Started Free
          </Link>
        </div>

        {/* Pro Plan */}
        <div className={`${styles.card} ${styles.cardPro}`}>
          <div className={styles.badge}>Most Popular</div>
          <h2 className={styles.cardName}>Pro Plan</h2>
          <div className={styles.cardPrice}>
            ${isYearly ? "19.99" : "24.99"}
            <span className={styles.pricePeriod}>/mo</span>
          </div>
          <p className={styles.cardDesc}>
            For serious creators and professionals who need the absolute best quality without limits.
          </p>
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <Check size={20} className={styles.featureIconPro} />
              <span>Up to {isYearly ? "5 minutes" : "2 minutes"} per video</span>
            </li>
            <li className={styles.featureItem}>
              <Check size={20} className={styles.featureIconPro} />
              <span>{isYearly ? "1080p, 2K, and 4K Ultra HD exports" : "1080p and 2K exports"}</span>
            </li>
            <li className={styles.featureItem}>
              <Check size={20} className={styles.featureIconPro} />
              <span>No advertisements</span>
            </li>
            <li className={styles.featureItem}>
              <Check size={20} className={styles.featureIconPro} />
              <span>{isYearly ? "Priority GPU queue (Fastest)" : "Faster processing queue"}</span>
            </li>
          </ul>
          <Link href="/dashboard/billing/checkout" className={styles.buttonPrimary}>
            Upgrade to Pro
          </Link>
        </div>

      </div>
    </div>
  );
}
