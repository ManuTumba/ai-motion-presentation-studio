export async function GET() {
  return Response.json({
    status: "ok",
    service: "motion-ai-studio",
    timestamp: new Date().toISOString()
  });
}
