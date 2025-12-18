import { memo } from "react";
import { Separator } from "@/components/ui/separator";
import type { User } from "@/lib/auth";
import ChangePasswordSection from "../change-password-section";
import LogoutSection from "../logout-section";
import SessionsSection from "../sessions-section";
import { SectionCard } from "../ui/section-card";
import VerifyEmailButton from "../verify-email-button";

type SecurityProps = { user: User };

export const Security = memo(({ user }: SecurityProps) => (
    <SectionCard title="Security">
        <div className="space-y-5">
            {/* Email Verification */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-medium text-sm">Email verification</p>
                    <p className="text-muted-foreground text-xs">
                        {user.emailVerified
                            ? "Your email address is verified."
                            : "Your email address is not verified."}
                    </p>
                </div>

                {!user.emailVerified && <VerifyEmailButton />}
            </div>

            <Separator />

            {/* Password Change */}
            <ChangePasswordSection />

            <Separator />

            {/* Active Sessions */}
            <SessionsSection />

            <Separator />

            {/* Logout Options */}
            <LogoutSection />
        </div>
    </SectionCard>
));

Security.displayName = "Security";
