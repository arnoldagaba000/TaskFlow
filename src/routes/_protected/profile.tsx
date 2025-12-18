import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { DangerZone } from "@/components/profile/sections/danger-zone";
import { ProfileDetails } from "@/components/profile/sections/profile-details";
import { ProfileSummary } from "@/components/profile/sections/profile-summary";
import { Security } from "@/components/profile/sections/security";

export const Route = createFileRoute("/_protected/profile")({
    component: RouteComponent,
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
            <header className="leading-tight">
                <h1 className="font-semibold text-lg">Profile</h1>
                <p className="text-muted-foreground text-sm">
                    View and manage your account information
                </p>
            </header>

            {/* Profile Summary */}
            <ProfileSummary user={user} />

            {/* Profile Details */}
            <ProfileDetails user={user} />

            {/* Security Settings */}
            <Security user={user} />

            {/* Danger Zone */}
            <DangerZone />
        </div>
    );
}
