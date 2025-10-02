import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/(auth)/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }

  return children;
}
