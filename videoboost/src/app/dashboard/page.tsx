"use client";

import { useState, useRef } from "react";
import { UploadCloud, Film, PlayCircle, HardDrive, Wand2, Sparkles, MonitorUp } from "lucide-react";
import styles from "./page.module.css";

export default function DashboardPage() {
  const [resolution, setResolution] = useState<"1080p" | "2K" | "4K">("1080p");
  const [file, setFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const url = URL.createObjectURL(selectedFile);
    setVideoURL(url);
  }
};

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
  e.preventDefault();
  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    const selectedFile = e.dataTransfer.files[0];
    setFile(selectedFile);

    const url = URL.createObjectURL(selectedFile);
    setVideoURL(url);
  }
};

  const browseFiles = () => {
    fileInputRef.current?.click();
  };

  const startProcessing = () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);

    // Mock processing simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            alert("Processing complete! Redirecting to download...");
          }, 500);
          return 100;
        }
        // Random increment between 2 and 8
        return prev + Math.floor(Math.random() * 7) + 2;
      });
    }, 400);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Welcome to VideoBoost 🚀</h2> 

        <h1 className={styles.title}>Enhance Video</h1>
        <p className={styles.subtitle}>Upload your low-resolution video and let our AI transform it.</p>
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
            : "Maximum 15 seconds free. MP4, MOV, AVI up to 500MB."}
        </p>
        <button className={styles.buttonPrimary} onClick={(e) => {
          e.stopPropagation();
          browseFiles();
        }}>
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
      {videoURL && (
       <div style={{ marginTop: "20px", textAlign: "center" }}>
       <h3>Preview 🎬</h3>
       <video
      src={videoURL}
      controls
      style={{
        width: "100%",
        maxWidth: "500px",
        borderRadius: "10px"
      }}
    />
  </div>
)}

      {/* Target Resolution Settings */}
      <div className={styles.settingsCard}>
        <h3 className={styles.settingsTitle}>Output Resolution</h3>
        <div className={styles.settingsGrid}>
          
          <div 
            className={`${styles.resolutionOption} ${resolution === "1080p" ? styles.resolutionActive : ""}`} 
            onClick={() => setResolution("1080p")}
          >
            <MonitorUp size={24} color={resolution === "1080p" ? "var(--primary)" : "var(--text-muted)"} style={{margin:"0 auto 0.5rem auto"}}/>
            <div className={styles.resTitle}>1080p</div>
            <div className={styles.resDesc}>Standard HD</div>
            <div className={styles.resDesc} style={{color: "var(--primary)", marginTop: "0.5rem", fontSize: "0.75rem"}}>Free Tier</div>
          </div>

          <div 
            className={`${styles.resolutionOption} ${resolution === "2K" ? styles.resolutionActive : ""}`} 
            onClick={() => setResolution("2K")}
          >
            <Wand2 size={24} color={resolution === "2K" ? "var(--primary)" : "var(--text-muted)"} style={{margin:"0 auto 0.5rem auto"}}/>
            <div className={styles.resTitle}>2K</div>
            <div className={styles.resDesc}>QHD Print Quality</div>
            <div className={styles.resDesc} style={{color: "var(--text-muted)", marginTop: "0.5rem", fontSize: "0.75rem"}}>Pro Required</div>
          </div>

          <div 
            className={`${styles.resolutionOption} ${resolution === "4K" ? styles.resolutionActive : ""}`} 
            onClick={() => setResolution("4K")}
          >
            <Sparkles size={24} color={resolution === "4K" ? "var(--primary)" : "var(--text-muted)"} style={{margin:"0 auto 0.5rem auto"}}/>
            <div className={styles.resTitle}>4K</div>
            <div className={styles.resDesc}>Ultra HD</div>
            <div className={styles.resDesc} style={{color: "var(--text-muted)", marginTop: "0.5rem", fontSize: "0.75rem"}}>Pro Required</div>
          </div>

        </div>
      </div>

      {/* Enhance Button */}
      <div style={{ textAlign: "right" }}>
        <button 
          className={styles.buttonPrimary} 
          style={{ padding: "1rem 3rem", fontSize: "1.1rem" }}
          disabled={!file}
          onClick={startProcessing}
        >
          <Wand2 size={20} />
          Enhance Now
        </button>
      </div>

      {/* Processing Overlay Simulation */}
      {isProcessing && (
        <div className={styles.processingOverlay}>
          <div className={styles.processingCard}>
            <Wand2 size={48} className={styles.processingIcon} />
            <h2 className={styles.title} style={{ fontSize: "1.5rem" }}>AI Magic in Progress</h2>
            <p className={styles.subtitle}>Allocating GPUs and upscaling frames...</p>
            
            <div className={styles.progressBarBg}>
              <div className={styles.progressBarFill} style={{ width: `${progress}%` }}></div>
            </div>
            
            <div style={{ fontWeight: 600, color: "var(--foreground)" }}>
              {Math.min(progress, 100)}% Complete
            </div>
            <p className={styles.subtitle} style={{ fontSize: "0.8rem", marginTop: "1rem" }}>
              Please do not close this window.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
