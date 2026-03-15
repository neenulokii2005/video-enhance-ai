import Link from "next/link";
import { Play, Sparkles, MonitorPlay, Zap, ShieldCheck } from "lucide-react";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.glowBackground}></div>
      
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Play size={24} color="#7c3aed" />
          VideoBoost AI
        </div>
        <div className={styles.navLinks}>
          <Link href="/pricing" className={styles.navLink}>
            Pricing
          </Link>
          <Link href="/login" className={styles.navLink}>
            Login
          </Link>
          <Link href="/register" className={styles.buttonPrimary}>
            Start Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className={styles.hero}>
        <div className={styles.badge}>
          <Sparkles size={16} />
          Now supporting 4K Ultra HD Upscaling
        </div>
        <h1 className={styles.title}>
          Transform your videos into stunning cinematic quality.
        </h1>
        <p className={styles.subtitle}>
          Enhance low-resolution footage to stunning 1080p, 2K, and 4K with our state-of-the-art AI upscaling engine. Fast, secure, and professional.
        </p>
        <div className={styles.heroButtons}>
          <Link href="/dashboard" className={`${styles.buttonPrimary} ${styles.buttonLarge}`}>
            Try Now for Free
          </Link>
          <Link href="#features" className={`${styles.buttonOutline} ${styles.buttonLarge}`}>
            Learn More
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.featuresGrid}>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <MonitorPlay size={24} />
            </div>
            <h3 className={styles.featureTitle}>Up to 4K Resolution</h3>
            <p className={styles.featureDesc}>
              Breathe life into old footage. Our AI models reconstruct missing details for crisp, sharp 1080p, 2K, and 4K outputs.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Zap size={24} />
            </div>
            <h3 className={styles.featureTitle}>Lightning Fast</h3>
            <p className={styles.featureDesc}>
              Powered by highly optimized GPU architectures. Get your enhanced videos in a fraction of the time compared to traditional software.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <ShieldCheck size={24} />
            </div>
            <h3 className={styles.featureTitle}>Secure & Private</h3>
            <p className={styles.featureDesc}>
              Your videos are completely private and automatically deleted after 24 hours. We never use your content to train our models.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
