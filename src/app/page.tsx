import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-1 items-center sm:items-start w-full">
        <Tabs defaultValue="degree-management" className="w-full max-w-[800px]">
          <TabsList className="grid w-full grid-cols-2 gap-4 sm:gap-8">
            <TabsTrigger value="degree-management">
              Quản lý bằng cấp
            </TabsTrigger>
            <TabsTrigger value="analytics">Thống kê</TabsTrigger>
          </TabsList>
          <TabsContent value="degree-management">
            <Card>
              <CardHeader>
                <CardTitle>Quản lý bằng cấp</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* Nội dung của Quản lý bằng cấp */}
              </CardContent>
              <CardFooter>{/* Footer nếu cần */}</CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Thống kê</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* Nội dung của Thống kê */}
              </CardContent>
              <CardFooter>{/* Footer nếu cần */}</CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
