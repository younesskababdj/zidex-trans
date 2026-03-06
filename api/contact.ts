import type { IncomingMessage, ServerResponse } from "node:http";
import { sendContactEmail } from "../server/contactEmail";

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  services: string[];
}

function isValidPayload(payload: any): payload is ContactPayload {
  return (
    payload &&
    typeof payload.name === "string" &&
    typeof payload.email === "string" &&
    typeof payload.phone === "string" &&
    typeof payload.message === "string" &&
    Array.isArray(payload.services) &&
    payload.services.length > 0
  );
}

async function readJsonBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

export default async function handler(req: IncomingMessage & { method?: string }, res: ServerResponse) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: false, error: "Method not allowed" }));
    return;
  }

  try {
    const payload = await readJsonBody(req);
    if (!isValidPayload(payload)) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ success: false, error: "Invalid form payload" }));
      return;
    }

    await sendContactEmail(payload);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: true }));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Failed to send email",
      }),
    );
  }
}
