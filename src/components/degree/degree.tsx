"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { contractABI } from "./contractABI";
import DegreeForm from "./DegreeForm";

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
  const [issuer, setIssuer] = useState<string>("");
  const [degreeName, setDegreeName] = useState<string>("");
  const [ifpsHash, setIfpsHash] = useState<string>("");
  const [ifpsUrl, setIfpsUrl] = useState<string>("");

  const contractAddress = "0x4cdb2754121f112b4a7598fa2959410e0291c3ba";

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

    console.log("id:", id);
    console.log("studentName:", studentName);
    console.log("email:", email);
    console.log("issuer:", issuer);
    console.log("degreeName:", degreeName);
    console.log("ifpsHash:", ifpsHash);
    console.log("ifpsUrl:", ifpsUrl);

    try {
      const tx = await contract.addRecord(
        id,
        studentName,
        email,
        issuer,
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

      <DegreeForm
        id={id}
        setID={setID}
        studentName={studentName}
        setStudentName={setStudentName}
        email={email}
        setEmail={setEmail}
        issuer={issuer}
        setIssuer={setIssuer}
        degreeName={degreeName}
        setDegreeName={setDegreeName}
        ifpsHash={ifpsHash}
        setIfpsHash={setIfpsHash}
        ifpsUrl={ifpsUrl}
        setIfpsUrl={setIfpsUrl}
        addRecord={addRecord}
      />

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
              <p>Nơi cấp: {record.issuer}</p>
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