import { memo } from "react";
import type { User } from "@/lib/auth";
import AvatarSection from "../avatar-section";
import { DetailRow } from "../ui/detail-row";
import { SectionCard } from "../ui/section-card";

type ProfileDetailsProps = { user: User };

export const ProfileDetails = memo(({ user }: ProfileDetailsProps) => (
    <SectionCard title="Profile Details">
        <div className="items-center-safe w-full gap-5 md:flex md:justify-between">
            <AvatarSection user={user} />

            <div className="mt-5 space-y-4 md:mt-0 md:flex-1">
                <DetailRow label="Full Name" value={user.name} />
                <DetailRow label="Email Address" value={user.email} />
                <DetailRow label="Account ID" mono value={user.id} />
            </div>
        </div>
    </SectionCard>
));

ProfileDetails.displayName = "ProfileDetails";
