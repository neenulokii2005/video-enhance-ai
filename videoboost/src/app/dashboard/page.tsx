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
    // -2 means FFmpeg auto-calculates to keep aspect ratio
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

      // Fix 1: Keep original aspect ratio with -2
      // Fix 2: ultrafast for speed
      // Fix 3: limit to 15 sec
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

      // Save to history
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

  return (
    <div className={styles.container}>

      {/* Header + Logout */}
      <div className={styles.header} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2>Welcome to VideoBoost 🚀</h2>
          <h1 className={styles.title}>Enhance Video</h1>
          <p className={styles.subtitle}>Upload your video and let AI transform it.</p>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <a href="/dashboard/history" style={{
            padding: "0.5rem 1.5rem",
            background: "transparent",
            border: "1px solid #7c3aed",
            color: "#7c3aed",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "0.9rem"
          }}>
            History
          </a>
          <button onClick={handleLogout} style={{
            padding: "0.5rem 1.5rem",
            background: "transparent",
            border: "1px solid #555",
            color: "#aaa",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 600
          }}>
            Logout
          </button>
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
      <div className={styles.uploadSection} onDragOver={handleDragOver} onDrop={handleDrop} onClick={browseFiles}>
        <UploadCloud className={styles.uploadIcon} />
        <h3 className={styles.uploadTitle}>
          {file ? `Selected: ${file.name}` : "Click or drag & drop to upload"}
        </h3>
        <p className={styles.uploadDesc}>
          {file
            ? `Size: ${(file.size / (1024 * 1024)).toFixed(2)} MB`
            : "Maximum 15 seconds free. MP4, MOV, AVI up to 100MB."}
        </p>
        <button className={styles.buttonPrimary} onClick={(e) => { e.stopPropagation(); browseFiles(); }}>
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

      {/* Original Preview - NO controls to prevent free download */}
      {videoURL && !processedURL && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3>Original Preview 🎬</h3>
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
      <div className={styles.settingsCard}>
        <h3 className={styles.settingsTitle}>Output Resolution</h3>
        <div className={styles.settingsGrid}>

          <div className={`${styles.resolutionOption} ${resolution === "1080p" ? styles.resolutionActive : ""}`} onClick={() => setResolution("1080p")}>
            <MonitorUp size={24} color={resolution === "1080p" ? "var(--primary)" : "var(--text-muted)"} style={{ margin: "0 auto 0.5rem auto" }} />
            <div className={styles.resTitle}>1080p</div>
            <div className={styles.resDesc}>Standard HD</div>
            <div className={styles.resDesc} style={{ color: "var(--primary)", marginTop: "0.5rem", fontSize: "0.75rem" }}>Free Tier</div>
          </div>

          <div className={`${styles.resolutionOption} ${resolution === "2K" ? styles.resolutionActive : ""}`} onClick={() => setResolution("2K")}>
            <Wand2 size={24} color={resolution === "2K" ? "var(--primary)" : "var(--text-muted)"} style={{ margin: "0 auto 0.5rem auto" }} />
            <div className={styles.resTitle}>2K</div>
            <div className={styles.resDesc}>QHD Quality</div>
            <div className={styles.resDesc} style={{ color: "var(--text-muted)", marginTop: "0.5rem", fontSize: "0.75rem" }}>Pro Required</div>
          </div>

          <div className={`${styles.resolutionOption} ${resolution === "4K" ? styles.resolutionActive : ""}`} onClick={() => setResolution("4K")}>
            <Sparkles size={24} color={resolution === "4K" ? "var(--primary)" : "var(--text-muted)"} style={{ margin: "0 auto 0.5rem auto" }} />
            <div className={styles.resTitle}>4K</div>
            <div className={styles.resDesc}>Ultra HD</div>
            <div className={styles.resDesc} style={{ color: "var(--text-muted)", marginTop: "0.5rem", fontSize: "0.75rem" }}>Pro Required</div>
          </div>

        </div>
      </div>

      {/* Enhance Button */}
      {!processedURL && (
        <div style={{ textAlign: "right" }}>
          <button
            className={styles.buttonPrimary}
            style={{ padding: "1rem 3rem", fontSize: "1.1rem" }}
            disabled={!file || isProcessing}
            onClick={startProcessing}
          >
            <Wand2 size={20} />
            {isProcessing ? "Processing..." : "Enhance Now"}
          </button>
        </div>
      )}

      {/* Processing Status */}
      {isProcessing && (
        <div className={styles.processingOverlay}>
          <div className={styles.processingCard}>
            <Wand2 size={48} className={styles.processingIcon} />
            <h2 className={styles.title} style={{ fontSize: "1.5rem" }}>AI Magic in Progress</h2>
            <p className={styles.subtitle}>{statusMsg}</p>
            <div className={styles.progressBarBg}>
              <div className={styles.progressBarFill} style={{ width: `${progress}%` }}></div>
            </div>
            <div style={{ fontWeight: 600, color: "var(--foreground)" }}>{progress}% Complete</div>
            <p className={styles.subtitle} style={{ fontSize: "0.8rem", marginTop: "1rem" }}>
              Please do not close this window.
            </p>
          </div>
        </div>
      )}

      {/* Enhanced Video - NO controls, only download button */}
      {processedURL && !isProcessing && (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <h3 style={{ color: "#4ade80", marginBottom: "1rem" }}>✨ Enhanced Video ({resolution})</h3>

          {/* No controls - prevent free download */}
          <video
            src={processedURL}
            autoPlay
            muted
            loop
            controlsList="nodownload nofullscreen"
            onContextMenu={(e) => e.preventDefault()}
            style={{ width: "100%", maxWidth: "500px", borderRadius: "10px", marginBottom: "1.5rem" }}
          />

          <p style={{ color: "#aaa", fontSize: "0.85rem", marginBottom: "1rem" }}>
            Watch an ad to download your enhanced video
          </p>

          <button
            className={styles.buttonPrimary}
            style={{ padding: "1rem 3rem", fontSize: "1.1rem", background: "#16a34a" }}
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
              fontWeight: 600
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
          background: "rgba(0,0,0,0.8)",
          display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 1000
        }}>
          <div style={{
            background: "#1a1a2e", padding: "2rem",
            borderRadius: "16px", textAlign: "center",
            maxWidth: "400px", width: "90%",
            border: "1px solid #7c3aed"
          }}>
            <h2 style={{ color: "white", marginBottom: "1rem" }}>📢 Watch Ad to Download</h2>

            {!adDone ? (
              <>
                <div style={{
                  width: "80px", height: "80px", borderRadius: "50%",
                  background: "#7c3aed", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  margin: "1rem auto", fontSize: "2rem", fontWeight: "bold", color: "white"
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
                  cursor: "pointer", fontSize: "1rem", fontWeight: 600
                }}>
                  Download Now 🎬
                </button>
              </>
            )}

            <button onClick={() => setShowAdModal(false)} style={{
              marginTop: "1rem", background: "transparent",
              border: "none", color: "#666", cursor: "pointer",
              display: "block", margin: "1rem auto 0"
            }}>
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
