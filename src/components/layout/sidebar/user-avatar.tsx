import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/lib/auth";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
    user: User;
    size?: "lg" | "sm";
};

const UserAvatar = ({ user, size = "sm" }: UserAvatarProps) => (
    <Avatar
        className={cn(
            size === "sm" ? "h-8 w-8 rounded-lg" : "h-20 w-20 rounded-full"
        )}
    >
        <AvatarImage alt={user.name} src={user.image ?? undefined} />
        <AvatarFallback className="rounded-lg">
            {user.name.charAt(0).toUpperCase()}
        </AvatarFallback>
    </Avatar>
);

export default UserAvatar;
