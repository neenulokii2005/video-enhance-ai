import { NextResponse } from "next/server";

// This should ideally access the same DB or Redis store as the process queue.
// For this mock, we will just return a simulated random progress if job ID exists.
// Since it's a separate file, the JS memory map from route.ts isn't strictly shared in dev mode HMR sometimes, but for demonstration it works.

export async function GET(req: Request, { params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  
  if (!jobId) {
    return NextResponse.json({ error: "Missing Job ID" }, { status: 400 });
  }

  // Generate a totally dummy progress since we don't have Redis hooked up.
  // In a real app we'd fetch `progress` from DB by jobId.
  
  return NextResponse.json({
    jobId,
    status: "PROCESSING",
    progress: Math.floor(Math.random() * 80) + 10, // Mock: 10% to 90%
    message: "Allocating GPU resources..."
  });
}
