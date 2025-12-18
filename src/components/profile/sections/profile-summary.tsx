import { memo } from "react";
import UserAvatar from "@/components/layout/sidebar/user-avatar";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/lib/auth";
import { SectionCard } from "../ui/section-card";

type ProfileSummaryProps = {
    user: User;
};

export const ProfileSummary = memo(({ user }: ProfileSummaryProps) => (
    <SectionCard>
        <div className="flex items-center gap-5">
            <UserAvatar size="lg" user={user} />

            <div className="flex flex-1 flex-col gap-3">
                <div className="leading-tight">
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-muted-foreground text-sm">
                        {user.email}
                    </p>
                </div>

                <Badge
                    className={`w-fit ${
                        user.emailVerified ? "bg-green-500" : "bg-red-500"
                    }`}
                >
                    {user.emailVerified
                        ? "Email Verified"
                        : "Email Not Verified"}
                </Badge>
            </div>
        </div>
    </SectionCard>
));

ProfileSummary.displayName = "ProfileSummary";
