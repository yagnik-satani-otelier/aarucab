import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.website) {
      return NextResponse.json(
        { ok: false, error: "Submission rejected." },
        { status: 400 }
      );
    }

    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Invalid form data";
      return NextResponse.json(
        { ok: false, error: firstError },
        { status: 400 }
      );
    }

    const endpoint = process.env.SHEETS_ENDPOINT;

    if (!endpoint) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Booking service is not configured. Please call us directly.",
        },
        { status: 503 }
      );
    }

    const payload = {
      ...parsed.data,
      timestamp: new Date().toISOString(),
      source: "Aaru Cab Website",
    };

    const sheetsRes = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const text = await sheetsRes.text();
    let result: { ok?: boolean; error?: string } = {};

    try {
      result = JSON.parse(text);
    } catch {
      if (!sheetsRes.ok) {
        throw new Error("Failed to save booking inquiry.");
      }
      result = { ok: true };
    }

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error || "Failed to save inquiry." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to submit your inquiry. Please try again or call us.",
      },
      { status: 500 }
    );
  }
}
