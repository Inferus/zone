import { NextResponse, NextRequest } from "next/server";

import { writeFile } from "fs/promises";

export async function POST(req: NextRequest) {
  const file = (await req.formData()).get("file") as File;
  if (!file) {
    return NextResponse.json("No file found", { status: 400 });
  }
  const fileArrayBuffer = await file.arrayBuffer();

  const buf = Buffer.from(fileArrayBuffer);

  await writeFile(`public/files/${file.name}`, buf);

  return NextResponse.redirect("http://192.168.178.25:3000/");
}
