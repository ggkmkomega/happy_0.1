"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { type User } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useState } from "react";
import { Icons } from "~/_components/icons";
import { buttonVariants } from "~/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/_components/ui/card";
import { Input } from "~/_components/ui/input";
import { Label } from "~/_components/ui/label";
import { useToast } from "~/_components/ui/use-toast";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "name">;
}
export const userNameSchema = z.object({
  name: z.string().min(3).max(32).nullable(),
});

type FormData = z.infer<typeof userNameSchema>;

export default function UserNameForm({
  user,
  className,
  ...props
}: UserNameFormProps) {
  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user?.name ?? "",
    },
  });

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { mutate } = api.user.update.useMutation({
    onError: (error) => {
      console.error(`${error}`);

      setIsSaving(false);

      return toast({
        title: "Something went wrong.",
        description: "Your name was not updated. Please try again.",
        variant: "destructive",
      });
    },

    onSuccess: () => {
      setIsSaving(false);
      return toast({
        description: "Your name has been updated.",
      });
    },
  });

  async function onSubmit(data: FormData) {
    setIsSaving(true);
    mutate({ name: data.name || "" });
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Name</CardTitle>
          <CardDescription>
            Please enter your full name or a display name you are comfortable
            with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-[400px]"
              size={32}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants(), className)}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  );
}
