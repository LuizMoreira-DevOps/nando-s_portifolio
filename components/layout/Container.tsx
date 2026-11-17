import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div">;

export default function Container({ className, ...props }: ContainerProps) {
    return <div {...props} className={["container", className].filter(Boolean).join(" ")} />;
}
