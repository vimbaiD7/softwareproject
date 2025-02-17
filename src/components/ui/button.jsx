import * as React from "react";


function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Button = React.forwardRef(({ className, variant, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        "bg-orange-400 text-white hover:bg-orange-500",
        className
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
