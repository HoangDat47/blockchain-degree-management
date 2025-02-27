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
    <form onSubmit={addRecord} className="space-y-4">
      <SearchStudent setStudentName={setStudentName} setEmail={setEmail} />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="studentName">Họ và tên</Label>
        <Input
          id="studentName"
          type="text"
          placeholder="Họ và tên"
          value={studentName || ""}
          onChange={(e) => setStudentName(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="degreeId">Mã bằng cấp</Label>
        <Input
          id="degreeId"
          type="text"
          placeholder="Mã bằng cấp"
          value={id || ""}
          onChange={(e) => setID(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="degreeName">Tên bằng cấp</Label>
        <Input
          id="degreeName"
          type="text"
          placeholder="Tên bằng cấp"
          value={degreeName || ""}
          onChange={(e) => setDegreeName(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="issuer">Nơi cấp</Label>
        <Input
          id="issuer"
          type="text"
          placeholder="Nơi cấp"
          value={issuer || ""}
          onChange={(e) => setIssuer(e.target.value)}
        />
      </div>
      <UploadFile setIfpsHash={setIfpsHash} setIfpsUrl={setIfpsUrl} />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="ifpsHash">IFPS Hash</Label>
        <Input
          id="ifpsHash"
          type="text"
          placeholder="IFPS Hash"
          value={ifpsHash || ""}
          onChange={(e) => setIfpsHash(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="ifpsUrl">IFPS URL</Label>
        <Input
          id="ifpsUrl"
          type="text"
          placeholder="IFPS URL"
          value={ifpsUrl || ""}
          onChange={(e) => setIfpsUrl(e.target.value)}
        />
      </div>
      <Button className="bg-blue-500 text-white p-2 rounded-md mt-2" type="submit">
        Thêm bằng cấp
      </Button>
    </form>
  );
};

export default DegreeForm;