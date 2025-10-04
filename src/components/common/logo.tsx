import { HeartHandshake } from "lucide-react";

// Logo is a non-interactive visual component (icon only).
// Keep it non-interactive so parent components can wrap it with a Link
// without creating nested <a> or interactive elements.
export const Logo: React.FC = () => {
  return (
    <span className="inline-flex items-center" aria-hidden>
      <HeartHandshake className="h-6 w-6" />
    </span>
  );
};
