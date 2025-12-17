import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import UserAvatar from "@/components/layout/sidebar/user-avatar";
import AvatarSection from "@/components/profile/avatar-section";
import ChangePasswordSection from "@/components/profile/change-password-section";
import DeleteAccountSection from "@/components/profile/delete-account-section";
import LogoutSection from "@/components/profile/logout-section";
import SessionsSection from "@/components/profile/sessions-section";
import VerifyEmailButton from "@/components/profile/verify-email-button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/_protected/profile")({
    component: RouteComponent,
    // ssr: false,
});

function RouteComponent() {
    const { session } = useRouteContext({ from: "/_protected" });

    const user = session.data?.user;
    if (!user) {
        return null;
    }

    return (
        <div className="flex max-w-3xl flex-col space-y-6 p-3">
            {/* Page Header */}
            <div className="leading-tight">
                <h1 className="font-semibold text-lg">Profile</h1>
                <p className="text-muted-foreground text-sm">
                    View and manage your account information
                </p>
            </div>

            {/* Profile Summary */}
            <Card>
                <CardContent className="flex items-center gap-5">
                    <UserAvatar size="lg" user={user} />

                    <div className="flex flex-1 flex-col gap-3">
                        <div className="leading-tight">
                            <h3 className="font-semibold text-lg">
                                {user.name}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                {user.email}
                            </p>
                        </div>

                        {user.emailVerified ? (
                            <Badge className="w-fit bg-green-500">
                                Email Verified
                            </Badge>
                        ) : (
                            <Badge className="w-fit bg-red-500">
                                Email Not Verified
                            </Badge>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Profile Details */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Profile Details</CardTitle>
                </CardHeader>

                <CardContent className="flex w-full justify-between gap-5">
                    <AvatarSection user={user} />

                    <div className="flex-1 space-y-4">
                        <DetailRow label="Full Name" value={user.name} />
                        <DetailRow label="Email Address" value={user.email} />
                        <DetailRow label="Account ID" mono value={user.id} />
                    </div>
                </CardContent>
            </Card>

            {/* Security */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Security</CardTitle>
                </CardHeader>

                <CardContent className="space-y-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-sm">
                                Email verification
                            </p>
                            <p className="text-muted-foreground text-xs">
                                {user.emailVerified
                                    ? "Your email address is verified."
                                    : "Your email address is not verified."}
                            </p>
                        </div>

                        {!user.emailVerified && <VerifyEmailButton />}
                    </div>

                    <Separator />

                    <ChangePasswordSection />

                    <Separator />

                    <SessionsSection />

                    <Separator />

                    <LogoutSection />
                </CardContent>
            </Card>

            {/* Danger zone */}
            <Card className="border-destructive/50">
                <CardHeader>
                    <CardTitle className="text-destructive text-lg">
                        Danger zone
                    </CardTitle>

                    <CardDescription>
                        Once you delete your account, there is no going back.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <DeleteAccountSection />
                </CardContent>
            </Card>
        </div>
    );
}

function DetailRow({
    label,
    value,
    mono,
}: {
    label: string;
    value?: string | null;
    mono?: boolean;
}) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-xs">{label}</span>
            <span className={`text-sm ${mono ? "font-mono" : ""}`}>
                {value ?? "—"}
            </span>
        </div>
    );
}
