"use client";
import { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { contractABI } from "./contractABI";

export default function Degree() {
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  const [providerAddress, setProviderAddress] = useState<string>("");
  const [id, setID] = useState<string>("");
  const [degreeRecords, setDegreeRecords] = useState<any[]>([]);
  const [studentName, setStudentName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("0");
  const [degreeName, setDegreeName] = useState<string>("");
  const [ifpsHash, setIfpsHash] = useState<string>("");
  const [ifpsUrl, setIfpsUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const contractAddress = "0xd28d7c26e03e539b63570b1f17c21634883d62ae";

  useEffect(() => {
    const connectWallet = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        setProvider(provider);
        setSigner(signer);

        const accountAddress = await signer.getAddress();
        setAccount(accountAddress);

        const contractInstance = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setContract(contractInstance);

        const ownerAddress = await contractInstance.getOwner();
        setIsOwner(accountAddress.toLowerCase() === ownerAddress.toLowerCase());
      } catch (error) {
        console.error("Error connecting to wallet: ", error);
      }
    };

    connectWallet();
  }, []);

  const fetchDegreeRecords = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!contract) {
      console.error("Hợp đồng chưa được khởi tạo");
      return;
    }

    try {
      const records = await contract.getDegreeRecords(id);
      console.log("records", records);
      setDegreeRecords(records);
    } catch (error) {
      console.error("Không thể lấy thông tin bằng cấp", error);
    }
  };

  const addRecord = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!contract) {
      console.error("Hợp đồng chưa được khởi tạo");
      return;
    }

    try {
      const tx = await contract.addRecord(
        id,
        studentName,
        email,
        phone,
        degreeName,
        ifpsHash,
        ifpsUrl
      );
      await tx.wait();
      fetchDegreeRecords(event);
      alert("Đã thêm bằng cấp thành công");
    } catch (error) {
      console.error("Không thể thêm bằng cấp", error);
    }
  };

  const authorizeProvider = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!contract) {
      console.error("Hợp đồng chưa được khởi tạo");
      return;
    }

    if (isOwner) {
      try {
        const tx = await contract.authorizeProvider(providerAddress);
        await tx.wait();
        alert(`Đã ủy quyền nhà cung cấp: ${providerAddress} thành công`);
      } catch (error) {
        console.error(
          "Chỉ có người sở hữu hợp đồng mới được uỷ quyền nhà cung cấp khác",
          error
        );
      }
    } else {
      alert("Chỉ có người sở hữu hợp đồng mới được uỷ quyền nhà cung cấp khác");
    }
  };

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
      const response = await uploadRequest.json();
      const signedUrl = response.url;
      const cid = response.cid;
      setIfpsHash(cid);
      setIfpsUrl(`https://gateway.pinata.cloud/ipfs/${cid}`);
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

  const handleSearch = async () => {
    try {
      const res = await fetch(
        `https://67b5d18b07ba6e59083e9c88.mockapi.io/api/v1/student?name=${searchQuery}`
      );
      const students = await res.json();
      if (students.length > 0) {
        const student = students[0];
        setStudentName(student.name);
        setEmail(student.gmail);
      } else {
        alert("Không tìm thấy sinh viên");
      }
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sinh viên", error);
    }
  };

  return (
    <div>
      <p>Tài khoản kết nối: {account}</p>
      {isOwner && <p>Bạn là người sở hữu hợp đồng này.</p>}

      <form onSubmit={fetchDegreeRecords}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="id">ID</Label>
          <Input
            type="text"
            placeholder="Nhập ID"
            value={id}
            onChange={(e) => setID(e.target.value)}
          />
          <Button className="bg-white text-black p-2 rounded-md" type="submit">
            Lấy thông tin bằng cấp
          </Button>
        </div>
      </form>

      <form onSubmit={addRecord}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="search">Tìm kiếm sinh viên</Label>
          <Input
            id="search"
            type="text"
            placeholder="Nhập tên sinh viên"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            className="bg-white text-black p-2 rounded-md"
            type="button"
            onClick={handleSearch}
          >
            Tìm kiếm
          </Button>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="id">Họ và tên</Label>
          <Input
            type="text"
            placeholder="Họ và tên"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="id">Email</Label>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="id">Tên bằng cấp</Label>
          <Input
            type="text"
            placeholder="Tên bằng cấp"
            value={degreeName}
            onChange={(e) => setDegreeName(e.target.value)}
          />
        </div>
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
          {url && (
            <div>
              <p>CID: {ifpsHash}</p>
              <a href={ifpsUrl} className="underline" target="_blank" rel="noopener noreferrer">
                {ifpsUrl}
              </a>
            </div>
          )}
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="id">IFPS Hash</Label>
          <Input
            type="text"
            placeholder="IFPS Hash"
            value={ifpsHash}
            onChange={(e) => setIfpsHash(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="id">IFPS URL</Label>
          <Input
            type="text"
            placeholder="IFPS URL"
            value={ifpsUrl}
            onChange={(e) => setIfpsUrl(e.target.value)}
          />
        </div>
        <Button className="bg-white text-black p-2 rounded-md" type="submit">
          Thêm bằng cấp
        </Button>
      </form>

      <form onSubmit={authorizeProvider}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="id">Ủy quyền nhà cung cấp</Label>
          <Input
            type="text"
            placeholder="Địa chỉ nhà cung cấp"
            value={providerAddress}
            onChange={(e) => setProviderAddress(e.target.value)}
          />
          <Button className="bg-white text-black p-2 rounded-md" type="submit">
            Ủy quyền nhà cung cấp
          </Button>
        </div>
      </form>

      <div>
        <h2>Thông tin bằng cấp</h2>
        <ul>
          {degreeRecords.map((record: any, index: number) => (
            <li key={index}>
              <p>ID: {record.id.toString()}</p>
              <p>Họ và tên: {record.studentName}</p>
              <p>Email: {record.email}</p>
              <p>Số điện thoại: {record.phone.toString()}</p>
              <p>Tên bằng cấp: {record.degreeName}</p>
              <p>IFPS Hash: {record.ifpsHash}</p>
              <p>IFPS URL: {record.ifpsUrl}</p>
              <p>Thời gian: {record.timestamp.toString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}