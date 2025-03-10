import { Card, CardContent } from "@/components/ui/card";
import StudentTable from "./studentTable";

export default function StudentHolderContent() {
  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        <StudentTable />
      </CardContent>
    </Card>
  );
}
