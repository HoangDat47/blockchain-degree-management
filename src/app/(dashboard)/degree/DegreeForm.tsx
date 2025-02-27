import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UploadFile from "./UploadFile";
import SearchStudent from "./SearchStudent";
import { Label } from "@/components/ui/label";

interface DegreeFormProps {
  id: string;
  setID: (id: string) => void;
  studentName: string;
  setStudentName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  degreeName: string;
  setDegreeName: (name: string) => void;
  issuer: string;
  setIssuer: (issuer: string) => void;
  ifpsHash: string;
  setIfpsHash: (hash: string) => void;
  ifpsUrl: string;
  setIfpsUrl: (url: string) => void;
  addRecord: (event: React.FormEvent) => void;
}

const DegreeForm: React.FC<DegreeFormProps> = ({
  id,
  setID,
  studentName,
  setStudentName,
  email,
  setEmail,
  issuer,
  setIssuer,
  degreeName,
  setDegreeName,
  ifpsHash,
  setIfpsHash,
  ifpsUrl,
  setIfpsUrl,
  addRecord,
}) => {
  return (
    <form onSubmit={addRecord}>
      <SearchStudent setStudentName={setStudentName} setEmail={setEmail} />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="id">Họ và tên</Label>
        <Input
          type="text"
          placeholder="Họ và tên"
          value={studentName || ""}
          onChange={(e) => setStudentName(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="id">Email</Label>
        <Input
          type="text"
          placeholder="Email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="id">Mã bằng cấp</Label>
        <Input
          type="text"
          placeholder="Mã bằng cấp"
          value={id || ""}
          onChange={(e) => setID(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="id">Tên bằng cấp</Label>
        <Input
          type="text"
          placeholder="Tên bằng cấp"
          value={degreeName || ""}
          onChange={(e) => setDegreeName(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="id">Nơi cấp</Label>
        <Input
          type="text"
          placeholder="Nơi cấp"
          value={issuer || ""}
          onChange={(e) => setIssuer(e.target.value)}
        />
      </div>
      <UploadFile setIfpsHash={setIfpsHash} setIfpsUrl={setIfpsUrl} />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="id">IFPS Hash</Label>
        <Input
          type="text"
          placeholder="IFPS Hash"
          value={ifpsHash || ""}
          onChange={(e) => setIfpsHash(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="id">IFPS URL</Label>
        <Input
          type="text"
          placeholder="IFPS URL"
          value={ifpsUrl || ""}
          onChange={(e) => setIfpsUrl(e.target.value)}
        />
      </div>
      <Button className="bg-white text-black p-2 rounded-md" type="submit">
        Thêm bằng cấp
      </Button>
    </form>
  );
};

export default DegreeForm;
