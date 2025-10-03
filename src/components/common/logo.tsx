import { HeartHandshake } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Button size="icon">
        <HeartHandshake className="size-6 " />
      </Button>
    </Link>
  );
};
