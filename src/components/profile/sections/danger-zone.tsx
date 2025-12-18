import { memo } from "react";
import DeleteAccountSection from "../delete-account-section";
import { SectionCard } from "../ui/section-card";

export const DangerZone = memo(() => (
    <SectionCard
        description="Once you delete your account, there is no going back."
        title="Danger zone"
        variant="danger"
    >
        <DeleteAccountSection />
    </SectionCard>
));

DangerZone.displayName = "DangerZone";
