import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { validateRequired } from "@/lib/validate";

interface Student {
  studentID: string;
  name: string;
  gmail: string;
}

interface SearchStudentProps {
  setStudentName: (name: string) => void;
  setEmail: (email: string) => void;
}

const SearchStudent: React.FC<SearchStudentProps> = ({ setStudentName, setEmail }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!validateRequired(searchQuery)) {
      setError("Student ID is required");
      return;
    }

    try {
      const res = await fetch(
        `https://67b5d18b07ba6e59083e9c88.mockapi.io/api/v1/student?studentID=${searchQuery}`
      );
      const students: Student[] = await res.json();
      if (Array.isArray(students)) {
        const student = students.find((s: Student) => s.studentID === searchQuery);
        if (student) {
          setStudentName(student.name);
          setEmail(student.gmail);
          setError(null);
          setSearchQuery(""); // Clear search input after successful search
        } else {
          setError("Student not found");
        }
      } else {
        setError("Invalid response data");
      }
    } catch (error) {
      console.error("Error searching for student", error);
      setError("An error occurred while searching for the student");
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setError(null);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="search">Search Student</Label>
      <Input
        id="search"
        type="text"
        placeholder="Enter student ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex space-x-2">
        <Button
          className="bg-blue-500 text-white p-2 rounded-md mt-2"
          type="button"
          onClick={handleSearch}
        >
          Search
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

export default SearchStudent;