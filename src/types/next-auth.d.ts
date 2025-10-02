import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
    };
    accessToken?: string;
    expires: string;
  }

  interface User {
    email: string;
  }
}
