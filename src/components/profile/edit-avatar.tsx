import type { ComponentProps } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface EditAvatarProps extends ComponentProps<typeof Avatar> {
    name: string;
    image: string | null | undefined;
}

export function EditAvatar({
    name,
    image,
    className,
    ...props
}: EditAvatarProps) {
    const initials = name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("");

    return (
        <Avatar className={cn(className)} {...props}>
            <AvatarImage
                alt={name}
                className="aspect-square object-cover"
                src={image ?? undefined}
            />
            <AvatarFallback className="border">{initials}</AvatarFallback>
        </Avatar>
    );
}