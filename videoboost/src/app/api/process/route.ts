import { NextResponse } from "next/server";

// Mock in-memory store for dev purposes
const jobs = new Map<string, { status: string; progress: number; resolution: string }>();

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const resolution = data.get("resolution") as string || "1080p";
    // const file = data.get("video"); // Actual file would be processed here

    // Generate a mock Job ID
    const jobId = Math.random().toString(36).substring(2, 15);
    
    // Create new job
    jobs.set(jobId, { status: "PROCESSING", progress: 0, resolution });

    // Simulate background worker progress
    const duration = resolution === "4K" ? 15000 : resolution === "2K" ? 10000 : 5000;
    const intervalTime = duration / 10;
    
    let count = 0;
    const interval = setInterval(() => {
      count++;
      const currentJob = jobs.get(jobId);
      if (currentJob) {
        currentJob.progress = count * 10;
        if (count >= 10) {
          currentJob.status = "COMPLETED";
          clearInterval(interval);
        }
      } else {
        clearInterval(interval);
      }
    }, intervalTime);

    return NextResponse.json({ jobId, message: "Video queued for processing successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to queue video" }, { status: 500 });
  }
}
