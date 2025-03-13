"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UploadFileProps {
  setIfpsHash: (hash: string) => void;
  setIfpsUrl: (url: string) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ setIfpsHash, setIfpsUrl }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputFile = useRef<HTMLInputElement | null>(null);

  const uploadFile = async () => {
    try {
      setUploading(true);
      const data = new FormData();
      if (file) {
        data.set("file", file);
      }
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const signedUrl = await uploadRequest.json();
      setIfpsHash(signedUrl);
      setIfpsUrl(`https://ipfs.io/ipfs/${signedUrl}`);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleClear = () => {
    setFile(null);
    if (inputFile.current) {
      inputFile.current.value = "";
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Choose file</Label>
      <Input
        id="picture"
        type="file"
        accept=".png, .jpg, .pdf"
        ref={inputFile}
        onChange={handleChange}
      />
      <div className="flex space-x-2">
        <Button
          className="bg-blue-500 text-white p-2 rounded-md mt-2"
          disabled={uploading}
          onClick={uploadFile}
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
        <Button
          className="bg-gray-500 text-white p-2 rounded-md mt-2"
          type="button"
          onClick={handleClear}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default UploadFile;