import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import UserAvatar from "@/components/layout/sidebar/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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
        <div className="flex flex-col space-y-5 p-3">
            <div className="leading-tight">
                <h1 className="font-semibold text-lg">Profile</h1>
                <p className="text-muted-foreground text-sm">
                    View and manage your profile
                </p>
            </div>

            <div>
                <Card>
                    <CardContent className="items-center-safe flex gap-5">
                        <UserAvatar size="lg" user={user} />

                        <div className="flex flex-1 flex-col gap-3">
                            <div className="leading-snug">
                                <h3 className="font-semibold text-lg">
                                    {user.name}
                                </h3>

                                <p className="text-muted-foreground text-sm">
                                    {user.email}
                                </p>
                            </div>

                            {user.emailVerified === true ? (
                                <Badge className="bg-green-500">Verified</Badge>
                            ) : (
                                <Badge className="bg-red-500">Unverified</Badge>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
