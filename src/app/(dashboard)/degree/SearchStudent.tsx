import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface SearchStudentProps {
  setStudentName: (name: string) => void;
  setEmail: (email: string) => void;
}

const SearchStudent: React.FC<SearchStudentProps> = ({ setStudentName, setEmail }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = async () => {
    try {
      const res = await fetch(
        `https://67b5d18b07ba6e59083e9c88.mockapi.io/api/v1/student?studentID=${searchQuery}`
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
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="search">Tìm kiếm sinh viên</Label>
      <Input
        id="search"
        type="text"
        placeholder="Nhập mã sinh viên"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button
        className="bg-blue-500 text-white p-2 rounded-md mt-2"
        type="button"
        onClick={handleSearch}
      >
        Tìm kiếm
      </Button>
    </div>
  );
};

export default SearchStudent;