import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function Avatar({ className, children, ...rest }: Props) {
  return (
    <div
      className={cn(
        `flex size-20 items-center justify-center rounded-[12.5rem] rounded-tl-none
        bg-primary-yellow text-3xl font-medium uppercase text-primary`,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
