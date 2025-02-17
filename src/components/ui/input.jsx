import * as React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
