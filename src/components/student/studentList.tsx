import { StudentForm } from "./studentForm";
import { StudentTable } from "./studentTable";

export default function StudentList() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <StudentForm />
        </div>
      </div>
      <StudentTable />
    </div>
  );
}