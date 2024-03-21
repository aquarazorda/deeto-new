import { Card, CardContent } from "../ui/card";

export default function EmailLogin() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-yellow-red px-12">
      <Card className="w-[700px] rounded-tl-none">
        <CardContent>
          <h1 className="font-inter text-4xl font-medium text-primary-purple">
            What's your email?
          </h1>
        </CardContent>
      </Card>
    </div>
  );
}
