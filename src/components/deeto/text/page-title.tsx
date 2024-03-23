import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {}

export default function PageTitle({ children, className, ...rest }: Props) {
  return (
    <h1
      className={cn("text-5xl font-bold text-primary-dark capitalize")}
      {...rest}
    >
      {children}
    </h1>
  );
}
