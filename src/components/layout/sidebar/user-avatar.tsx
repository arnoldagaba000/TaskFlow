import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/lib/auth";

const UserAvatar = ({ user }: { user: User }) => (
    <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage alt={user.name} src={user.image ?? undefined} />
        <AvatarFallback className="rounded-lg">
            {user.name.charAt(0).toUpperCase()}
        </AvatarFallback>
    </Avatar>
);

export default UserAvatar;
