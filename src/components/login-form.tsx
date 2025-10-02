"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";
import { Separator } from "./ui/separator";
const formSchema = z.object({
  email: z.string().email({
    message: "電子郵件格式不正確",
  }),
  password: z.string().min(1, {
    message: "密碼為必填項目",
  }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("帳號或密碼錯誤");
        setIsLoading(false);
        return;
      }

      toast.success("登入成功");
      router.push("/dashboard");
    } catch (error) {
      toast.error("發生錯誤");
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* {isLoading && <Loading />} */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">登入</CardTitle>
          <CardDescription>
            請在下方輸入您的電子郵件以登入您的帳戶
          </CardDescription>
        </CardHeader>
        <CardContent>

          <Separator className="my-4" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>電子郵件</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>密碼</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading ? "登入中..." : "登入"}
              </Button>
            </form>
          </Form>
          <Link
            href="/register"
            className="block mt-2 underline underline-offset-4 text-center"
          >
            還沒有帳戶？立即註冊
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
