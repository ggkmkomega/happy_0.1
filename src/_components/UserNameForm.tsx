"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { type User } from "@prisma/client";
import { useForm } from "react-hook-form";
import type * as z from "zod";

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
import { useToast } from "~/_components/ui/use-toast";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { userInput } from "~/types";

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "name" | "phone" | "email">;
}

export default function UserNameForm({ user, className }: UserNameFormProps) {
  const { toast } = useToast();
  type TuserInput = z.infer<typeof userInput>;
  const form = useForm<TuserInput>({
    resolver: zodResolver(userInput),
    defaultValues: {
      name: user.name ?? "",
      phone: user.phone ?? "",
      email: user.email ?? "",
    },
  });

  const onSubmit = async ({ email, phone, name }: TuserInput) => {
    setIsSaving(true);
    updateUser.mutate({ email, phone, name });
  };
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const updateUser = api.user.update.useMutation({
    onError: (error) => {
      setIsSaving(false);
      return toast({
        title: "Something went wrong.",
        description: error.message,
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

  return (
    <Form {...form}>
      <form className={cn(className)} onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Your Name</CardTitle>
            <CardDescription>
              Please enter your full name or a display name you are comfortable
              with.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input id="name" className="w-full" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Phone</FormLabel>
                  <FormControl>
                    <Input id="name" className="w-full" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your phone number Won&apos;t be shared with anyone.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Email</FormLabel>
                  <FormControl>
                    <Input id="name" className="w-full" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your Email Won&apos;t be shared with anyone.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
    </Form>
  );
}
