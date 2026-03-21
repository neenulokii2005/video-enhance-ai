"use client";
// @ts-nocheck

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { UploadCloud, Film, PlayCircle, HardDrive, Wand2, Sparkles, MonitorUp } from "lucide-react";
import styles from "./page.module.css";

export default function DashboardPage() {
  const [resolution, setResolution] = useState("1080p");
  const [file, setFile] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedURL, setProcessedURL] = useState(null);
  const [showAdModal, setShowAdModal] = useState(false);
  const [adTimer, setAdTimer] = useState(5);
  const [adDone, setAdDone] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const fileInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
      }
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setProcessedURL(null);
      setProgress(0);
      const url = URL.createObjectURL(selectedFile);
      setVideoURL(url);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      setProcessedURL(null);
      setProgress(0);
      const url = URL.createObjectURL(selectedFile);
      setVideoURL(url);
    }
  };

  const browseFiles = () => fileInputRef.current?.click();

  const getResolutionScale = () => {
    if (resolution === "2K") return "2560:-2";
    if (resolution === "4K") return "3840:-2";
    return "1920:-2";
  };

  const startProcessing = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(10);
    setProcessedURL(null);
    setStatusMsg("Loading FFmpeg...");

    try {
      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const { fetchFile, toBlobURL } = await import("@ffmpeg/util");

      const ffmpeg = new FFmpeg();

      setStatusMsg("Loading FFmpeg core...");
      setProgress(20);

      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
      });

      setStatusMsg("Reading video...");
      setProgress(40);

      await ffmpeg.writeFile("input.mp4", await fetchFile(file));

      setStatusMsg("Enhancing video...");
      setProgress(60);

      const scale = getResolutionScale();

      await ffmpeg.exec([
        "-i", "input.mp4",
        "-vf", `scale=${scale}`,
        "-c:v", "libx264",
        "-crf", "30",
        "-preset", "ultrafast",
        "-tune", "fastdecode",
        "-c:a", "copy",
        "-t", "15",
        "-movflags", "+faststart",
        "output.mp4"
      ]);

      setStatusMsg("Preparing...");
      setProgress(90);

      const data = await ffmpeg.readFile("output.mp4");
      const uint8Array = new Uint8Array(data as unknown as ArrayBuffer);
      const blob = new Blob([uint8Array], { type: "video/mp4" });
      const outputUrl = URL.createObjectURL(blob);

      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        await supabase.from("export_history").insert({
          user_id: userData.user.id,
          file_name: file.name,
          resolution: resolution,
          file_size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        });
      }

      setProgress(100);
      setStatusMsg("✅ Enhancement complete!");
      setProcessedURL(outputUrl);
      setIsProcessing(false);

    } catch (err) {
      console.error(err);
      setStatusMsg("❌ Processing failed. Try a smaller video.");
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    setShowAdModal(true);
    setAdTimer(5);
    setAdDone(false);

    const countdown = setInterval(() => {
      setAdTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setAdDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAdDownload = () => {
    setShowAdModal(false);
    if (processedURL) {
      const a = document.createElement("a");
      a.href = processedURL;
      a.download = `enhanced_${resolution}.mp4`;
      a.click();
    }
  };

  // Mobile check
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  return (
    <div className={styles.container} style={{ padding: "1rem", maxWidth: "100%", overflowX: "hidden" }}>

      {/* Header */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        marginBottom: "1.5rem"
      }}>
        {/* Top row: title + buttons */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem"
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "clamp(1rem, 4vw, 1.3rem)", color: "white" }}>Welcome to VideoBoost 🚀</h2>
            <h1 className={styles.title} style={{ fontSize: "clamp(1.2rem, 5vw, 2rem)", margin: "0.25rem 0" }}>Enhance Video</h1>
            <p className={styles.subtitle} style={{ fontSize: "clamp(0.8rem, 3vw, 1rem)", margin: 0 }}>
              Upload your video and let AI transform it.
            </p>
          </div>

          {/* Buttons — wrap on mobile */}
          <div style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            alignItems: "center"
          }}>
            <a href="/dashboard/history" style={{
              padding: "0.4rem 1rem",
              background: "transparent",
              border: "1px solid #7c3aed",
              color: "#7c3aed",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "clamp(0.75rem, 3vw, 0.9rem)",
              whiteSpace: "nowrap"
            }}>
              History
            </a>
            <a href="/dashboard/profile" style={{
              padding: "0.4rem 1rem",
              background: "transparent",
              border: "1px solid #555",
              color: "#aaa",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "clamp(0.75rem, 3vw, 0.9rem)",
              whiteSpace: "nowrap"
            }}>
              Profile
            </a>
            <button onClick={handleLogout} style={{
              padding: "0.4rem 1rem",
              background: "transparent",
              border: "1px solid #555",
              color: "#aaa",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "clamp(0.75rem, 3vw, 0.9rem)",
              whiteSpace: "nowrap"
            }}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/mp4,video/x-m4v,video/quicktime,video/x-msvideo"
        style={{ display: "none" }}
      />

      {/* Upload Zone */}
      <div
        className={styles.uploadSection}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={browseFiles}
        style={{ padding: "1.5rem 1rem", cursor: "pointer" }}
      >
        <UploadCloud className={styles.uploadIcon} />
        <h3 className={styles.uploadTitle} style={{ fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)" }}>
          {file ? `Selected: ${file.name}` : "Click or drag & drop to upload"}
        </h3>
        <p className={styles.uploadDesc} style={{ fontSize: "clamp(0.75rem, 3vw, 0.9rem)" }}>
          {file
            ? `Size: ${(file.size / (1024 * 1024)).toFixed(2)} MB`
            : "Maximum 15 seconds free. MP4, MOV, AVI up to 100MB."}
        </p>
        <button
          className={styles.buttonPrimary}
          onClick={(e) => { e.stopPropagation(); browseFiles(); }}
          style={{ fontSize: "clamp(0.8rem, 3vw, 1rem)", padding: "0.6rem 1.5rem" }}
        >
          Choose File
        </button>
        {!file && (
          <div className={styles.formats}>
            <div className={styles.formatItem}><Film size={14} /> MP4</div>
            <div className={styles.formatItem}><PlayCircle size={14} /> MOV</div>
            <div className={styles.formatItem}><HardDrive size={14} /> AVI</div>
          </div>
        )}
      </div>

      {/* Original Preview */}
      {videoURL && !processedURL && (
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <h3 style={{ fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)" }}>Original Preview 🎬</h3>
          <video
            src={videoURL}
            controls
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
            style={{ width: "100%", maxWidth: "500px", borderRadius: "10px" }}
          />
        </div>
      )}

      {/* Resolution Settings */}
      <div className={styles.settingsCard} style={{ padding: "1rem" }}>
        <h3 className={styles.settingsTitle} style={{ fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)" }}>
          Output Resolution
        </h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0.5rem"
        }}>
          {[
            { label: "1080p", sub: "Standard HD", note: "Free Tier", icon: <MonitorUp size={20} /> },
            { label: "2K", sub: "QHD Quality", note: "Pro Required", icon: <Wand2 size={20} /> },
            { label: "4K", sub: "Ultra HD", note: "Pro Required", icon: <Sparkles size={20} /> },
          ].map((r) => (
            <div
              key={r.label}
              className={`${styles.resolutionOption} ${resolution === r.label ? styles.resolutionActive : ""}`}
              onClick={() => setResolution(r.label)}
              style={{ padding: "0.75rem 0.5rem", textAlign: "center", cursor: "pointer" }}
            >
              <div style={{ margin: "0 auto 0.4rem" }}>{r.icon}</div>
              <div className={styles.resTitle} style={{ fontSize: "clamp(0.8rem, 3vw, 1rem)" }}>{r.label}</div>
              <div className={styles.resDesc} style={{ fontSize: "clamp(0.65rem, 2.5vw, 0.8rem)" }}>{r.sub}</div>
              <div style={{
                color: r.label === "1080p" ? "var(--primary)" : "var(--text-muted)",
                marginTop: "0.25rem",
                fontSize: "clamp(0.6rem, 2vw, 0.75rem)"
              }}>{r.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhance Button */}
      {!processedURL && (
        <div style={{ textAlign: "right", marginTop: "1rem" }}>
          <button
            className={styles.buttonPrimary}
            style={{
              padding: "0.75rem 2rem",
              fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
            disabled={!file || isProcessing}
            onClick={startProcessing}
          >
            <Wand2 size={18} />
            {isProcessing ? "Processing..." : "Enhance Now"}
          </button>
        </div>
      )}

      {/* Processing Status */}
      {isProcessing && (
        <div className={styles.processingOverlay}>
          <div className={styles.processingCard} style={{ padding: "1.5rem", maxWidth: "90vw" }}>
            <Wand2 size={40} className={styles.processingIcon} />
            <h2 style={{ fontSize: "clamp(1rem, 4vw, 1.5rem)" }}>AI Magic in Progress</h2>
            <p className={styles.subtitle}>{statusMsg}</p>
            <div className={styles.progressBarBg}>
              <div className={styles.progressBarFill} style={{ width: `${progress}%` }}></div>
            </div>
            <div style={{ fontWeight: 600, color: "var(--foreground)" }}>{progress}% Complete</div>
            <p className={styles.subtitle} style={{ fontSize: "0.8rem", marginTop: "0.75rem" }}>
              Please do not close this window.
            </p>
          </div>
        </div>
      )}

      {/* Enhanced Video */}
      {processedURL && !isProcessing && (
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <h3 style={{ color: "#4ade80", marginBottom: "1rem", fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)" }}>
            ✨ Enhanced Video ({resolution})
          </h3>
          <video
            src={processedURL}
            autoPlay
            muted
            loop
            controlsList="nodownload nofullscreen"
            onContextMenu={(e) => e.preventDefault()}
            style={{ width: "100%", maxWidth: "500px", borderRadius: "10px", marginBottom: "1rem" }}
          />
          <p style={{ color: "#aaa", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
            Watch an ad to download your enhanced video
          </p>
          <button
            className={styles.buttonPrimary}
            style={{
              padding: "0.75rem 2rem",
              fontSize: "clamp(0.9rem, 3.5vw, 1rem)",
              background: "#16a34a",
              width: "100%",
              maxWidth: "320px"
            }}
            onClick={handleDownload}
          >
            📢 Watch Ad & Download 🎬
          </button>
          <br />
          <button
            onClick={() => { setProcessedURL(null); setFile(null); setVideoURL(null); setProgress(0); }}
            style={{
              marginTop: "1rem",
              background: "transparent",
              border: "none",
              color: "#7c3aed",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.9rem"
            }}
          >
            Enhance Another Video
          </button>
        </div>
      )}

      {/* Ad Modal */}
      {showAdModal && (
        <div style={{
          position: "fixed", top: 0, left: 0,
          width: "100%", height: "100%",
          background: "rgba(0,0,0,0.85)",
          display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 1000,
          padding: "1rem"
        }}>
          <div style={{
            background: "#1a1a2e", padding: "1.5rem",
            borderRadius: "16px", textAlign: "center",
            maxWidth: "380px", width: "100%",
            border: "1px solid #7c3aed"
          }}>
            <h2 style={{ color: "white", marginBottom: "1rem", fontSize: "clamp(1rem, 4vw, 1.3rem)" }}>
              📢 Watch Ad to Download
            </h2>
            {!adDone ? (
              <>
                <div style={{
                  width: "70px", height: "70px", borderRadius: "50%",
                  background: "#7c3aed", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  margin: "1rem auto", fontSize: "1.8rem", fontWeight: "bold", color: "white"
                }}>
                  {adTimer}
                </div>
                <p style={{ color: "#aaa" }}>Please wait {adTimer} seconds...</p>
                <div style={{ width: "100%", height: "8px", background: "#333", borderRadius: "4px", marginTop: "1rem" }}>
                  <div style={{
                    width: `${((5 - adTimer) / 5) * 100}%`,
                    height: "100%", background: "#7c3aed",
                    borderRadius: "4px", transition: "width 1s"
                  }}></div>
                </div>
              </>
            ) : (
              <>
                <p style={{ color: "#4ade80", fontSize: "1.2rem", margin: "1rem 0" }}>✅ Ad complete!</p>
                <button onClick={handleAdDownload} style={{
                  padding: "0.75rem 2rem", background: "#7c3aed",
                  color: "white", border: "none", borderRadius: "8px",
                  cursor: "pointer", fontSize: "1rem", fontWeight: 600,
                  width: "100%"
                }}>
                  Download Now 🎬
                </button>
              </>
            )}
            <button onClick={() => setShowAdModal(false)} style={{
              marginTop: "1rem", background: "transparent",
              border: "none", color: "#666", cursor: "pointer",
              display: "block", margin: "1rem auto 0", fontSize: "0.9rem"
            }}>
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
