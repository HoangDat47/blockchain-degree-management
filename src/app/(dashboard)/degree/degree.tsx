"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contractABI } from "./contractABI";
import DegreeForm from "./DegreeForm";
import { DegreeRecord } from "@/types";
import Popup from "@/components/Popup";
import { validateRequired } from "@/lib/validate";

export default function Degree() {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  const [providerAddress, setProviderAddress] = useState<string>("");
  const [id, setID] = useState<string>("");
  const [degreeRecords, setDegreeRecords] = useState<DegreeRecord[]>([]);
  const [studentName, setStudentName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [issuer, setIssuer] = useState<string>("");
  const [degreeName, setDegreeName] = useState<string>("");
  const [ifpsHash, setIfpsHash] = useState<string>("");
  const [ifpsUrl, setIfpsUrl] = useState<string>("");
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const contractAddress = "0x4cdb2754121f112b4a7598fa2959410e0291c3ba";

  useEffect(() => {
    const connectWallet = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

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
      } catch {
        setPopupMessage("Cannot connect to MetaMask wallet");
      }
    };

    connectWallet();
  }, []);

  const fetchDegreeRecords = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!contract) {
      setPopupMessage("Contract is not initialized");
      return;
    }

    if (!validateRequired(id)) {
      setPopupMessage("Degree ID is required");
      return;
    }

    try {
      const records = await contract.getDegreeRecords(id);
      setDegreeRecords(records);
    } catch {
      setPopupMessage("Cannot get degree information");
    }
  };

  const addRecord = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!contract) {
      setPopupMessage("Contract is not initialized");
      return;
    }

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
      setPopupMessage("Added degree successfully");
    } catch {
      setPopupMessage("Cannot add degree");
    }
  };

  const authorizeProvider = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!contract) {
      setPopupMessage("Contract is not initialized");
      return;
    }

    if (!validateRequired(providerAddress)) {
      setPopupMessage("Provider address is required");
      return;
    }

    if (!ethers.utils.isAddress(providerAddress)) {
      setPopupMessage("Provider address is invalid");
      return;
    }

    if (isOwner) {
      try {
        const tx = await contract.authorizeProvider(providerAddress);
        await tx.wait();
        setPopupMessage(`Authorized provider ${providerAddress} successfully`);
      } catch {
        setPopupMessage("Only contract owner can authorize provider");
      }
    } else {
      setPopupMessage("Only contract owner can authorize provider");
    }
  };

  const handleClearProvider = () => {
    setProviderAddress("");
  };

  const handleClearDegreeInfo = () => {
    setID("");
    setDegreeRecords([]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {popupMessage && <Popup message={popupMessage} onClose={() => setPopupMessage(null)} />}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Connect account</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Account: {account}</p>
          {isOwner && <p>You own this contract.</p>}
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Authorize provider</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={authorizeProvider}>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="providerAddress">Authorize provider</Label>
              <Input
                id="providerAddress"
                type="text"
                placeholder="Provider address"
                value={providerAddress}
                onChange={(e) => setProviderAddress(e.target.value)}
              />
              <div className="flex space-x-2">
                <Button className="bg-blue-500 text-white p-2 rounded-md mt-2" type="submit">
                  Authorize provider
                </Button>
                <Button className="bg-gray-500 text-white p-2 rounded-md mt-2" type="button" onClick={handleClearProvider}>
                  Clear
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Add degree</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Search and degree information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={fetchDegreeRecords}>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="degreeId">Search by degree ID</Label>
              <Input
                id="degreeId"
                type="text"
                placeholder="Enter degree ID"
                value={id}
                onChange={(e) => setID(e.target.value)}
              />
              <div className="flex space-x-2">
                <Button className="bg-blue-500 text-white p-2 rounded-md mt-2" type="submit">
                  Get degree information
                </Button>
                <Button className="bg-gray-500 text-white p-2 rounded-md mt-2" type="button" onClick={handleClearDegreeInfo}>
                  Clear
                </Button>
              </div>
            </div>
          </form>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Degree information</h2>
            <ul className="list-disc pl-5">
              {degreeRecords.map((record: DegreeRecord, index: number) => (
                <li key={index} className="mt-2 border p-2 rounded-md">
                  {record.ifpsUrl ? (
                    <a href={record.ifpsUrl} target="_blank" rel="noopener noreferrer">
                      <iframe
                        src={record.ifpsUrl}
                        className="w-full h-64 mb-2"
                      />
                    </a>
                  ) : (
                    <p>Cannot load degree</p>
                  )}
                  <div className="border p-2 rounded-md">
                    <p className="font-semibold">Name: {record.studentName}</p>
                    <p>Email: {record.email}</p>
                    <p>Degree name: {record.degreeName}</p>
                    <p>Issuer: {record.issuer}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}