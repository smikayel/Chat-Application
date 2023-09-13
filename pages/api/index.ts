import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    res.status(200).json({ message: "Hello from Next.js APIs!" });
  } catch (error) {
    console.error("Error:", error); // Log any errors
    res.status(500).json({ message: "Internal Server Error" });
  }
}
