'use client'
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Students = {
  id: number;
  studentID: string;
  name: string;
  gender: string;
  gmail: string;
  gpa: number;
  phone: string;
  avatar: string;
};

export function StudentTable() {
  const [students, setStudents] = useState<Students[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch("https://67b5d18b07ba6e59083e9c88.mockapi.io/api/v1/student");
      const data = await res.json();
      setStudents(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full bg-white shadow-md rounded-lg">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[150px] p-4">Mã sinh viên</TableHead>
            <TableHead className="p-4">Tên</TableHead>
            <TableHead className="p-4">Gmail</TableHead>
            <TableHead className="p-4">Số điện thoại</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student: Students) => (
            <TableRow key={student.id} className="hover:bg-gray-50">
              <TableCell className="p-4 font-medium">{student.studentID}</TableCell>
              <TableCell className="p-4">{student.name}</TableCell>
              <TableCell className="p-4">{student.gmail}</TableCell>
              <TableCell className="p-4">{student.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}