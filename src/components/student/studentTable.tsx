import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  type Students = {
    id : number;
    name: string;
    gender: string;
    gmail: string;
    gpa : number;
    phone : string;
    avatar: string;
  }
  
  export async function StudentTable() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = await fetch("https://67b5d18b07ba6e59083e9c88.mockapi.io/api/v1/student");
    const students = await res.json();
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]">Id</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Gmail</TableHead>
            {/* <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((students:Students) => (
            <TableRow key={students.id}>
              <TableCell className="font-medium">{students.id}</TableCell>
              <TableCell>{students.name}</TableCell>
              <TableCell>{students.gmail}</TableCell>
              {/* <TableCell className="text-right">{students.phone}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  