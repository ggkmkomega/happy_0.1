import { type User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "~/_components/ui/avatar";
interface SingleStayProps {
  User: Pick<User, "name" | "email" | "image">;
  amount: number;
}
export default function SingleStay({ User, amount }: SingleStayProps) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="hidden h-9 w-9 sm:flex">
        <AvatarImage src={User.image ?? "/avatars/01.png"} alt="Avatar" />
        <AvatarFallback>HS</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <p className="text-sm font-medium leading-none">{User.name}</p>
        <p className="text-sm text-muted-foreground">{User.email}</p>
      </div>
      <div className="ml-auto font-medium">+DZD {amount}</div>
    </div>
  );
}
