import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {}

export default function PageTitle({ children, className, ...rest }: Props) {
  return (
    <h1
      className={cn(
        "flex items-center gap-6 text-5xl font-bold capitalize text-primary-dark",
      )}
      {...rest}
    >
      {children}
    </h1>
  );
}
