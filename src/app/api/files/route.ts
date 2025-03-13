import { pinata } from "@/lib/config";
import { NextResponse, NextRequest } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    console.log("Received data:", data);

    const file: File | null = data.get("file") as unknown as File;
    console.log("File received:", file);

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const cid = await pinata.upload.file(file);
    console.log("Uploaded CID:", cid);

    const cidString = cid.IpfsHash;
    return NextResponse.json({ cid: cidString }, { status: 200 });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

