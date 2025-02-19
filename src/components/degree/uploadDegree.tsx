"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

export default function UploadDegree() {
    const [file, setFile] = useState("");
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const inputFile = useRef(null);

  const uploadFile = async () => {
    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const signedUrl = await uploadRequest.json();
      setUrl(signedUrl);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Chọn tệp</Label>
      <Input id="picture" type="file" accept=".png, .jpg, .pdf" ref={inputFile} onChange={handleChange} />
      <Button className="bg-white text-black p-2 rounded-md" disabled={uploading} onClick={uploadFile}>
      {uploading ? "Uploading..." : "Upload"}</Button>
      {url && <a href={url} className="underline" target="_blank">{url}</a>}
    </div>
  );
}
