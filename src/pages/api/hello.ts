import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const fnUrl = "https://helloworld-…run.app"; // your function URL
  const fnRes = await fetch(fnUrl);
  const payload = await fnRes.json();

  // optionally copy over headers / status code
  res.status(fnRes.status).json(payload);
}

