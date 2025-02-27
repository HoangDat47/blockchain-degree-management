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

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Chọn tệp</Label>
      <Input
        id="picture"
        type="file"
        accept=".png, .jpg, .pdf"
        ref={inputFile}
        onChange={handleChange}
      />
      <Button
        className="bg-white text-black p-2 rounded-md"
        disabled={uploading}
        onClick={uploadFile}
      >
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
};

export default UploadFile;