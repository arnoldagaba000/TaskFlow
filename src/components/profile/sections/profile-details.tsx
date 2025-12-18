import { memo } from "react";
import type { User } from "@/lib/auth";
import AvatarSection from "../avatar-section";
import { DetailRow } from "../ui/detail-row";
import { SectionCard } from "../ui/section-card";

type ProfileDetailsProps = { user: User };

export const ProfileDetails = memo(({ user }: ProfileDetailsProps) => (
    <SectionCard title="Profile Details">
        <div className="flex w-full justify-between gap-5">
            <AvatarSection user={user} />

            <div className="flex-1 space-y-4">
                <DetailRow label="Full Name" value={user.name} />
                <DetailRow label="Email Address" value={user.email} />
                <DetailRow label="Account ID" mono value={user.id} />
            </div>
        </div>
    </SectionCard>
));

ProfileDetails.displayName = "ProfileDetails";
