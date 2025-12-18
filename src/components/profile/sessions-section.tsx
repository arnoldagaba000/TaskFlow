import { useQuery } from "@tanstack/react-query";
import { memo, useCallback } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";

const SessionListSkeleton = () => (
    <div className="space-y-2">
        {[1, 2, 3].map((i) => (
            <div className="flex justify-between" key={i}>
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-24" />
            </div>
        ))}
    </div>
);

const SessionsSection = memo(() => {
    const {
        data: sessions,
        isLoading: isLoadingSessions,
        refetch: refetchSessions,
    } = useQuery({
        queryKey: ["sessions"],
        queryFn: () => authClient.listSessions(),
        select: (data) => data?.data,
    });

    const { data: currentSession } = useQuery({
        queryKey: ["current-session"],
        queryFn: () => authClient.getSession(),
        select: (data) => data?.data?.session,
    });

    const handleRevokeOthers = useCallback(async () => {
        try {
            await authClient.revokeOtherSessions();
            toast.success("Other sessions revoked");
            refetchSessions();
        } catch {
            toast.error("Failed to revoke sessions");
        }
    }, [refetchSessions]);

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-medium text-sm">Active sessions</p>
                    <p className="text-muted-foreground text-xs">
                        Devices currently signed into your account
                    </p>
                </div>

                <Button
                    disabled={isLoadingSessions}
                    onClick={handleRevokeOthers}
                    size="sm"
                    variant="outline"
                >
                    Revoke others
                </Button>
            </div>

            {isLoadingSessions ? (
                <SessionListSkeleton />
                // biome-ignore lint/style/noNestedTernary: For simplicity
            ) : sessions && sessions.length > 0 ? (
                <ul className="space-y-2 text-muted-foreground text-xs">
                    {sessions.map((session) => (
                        <li className="flex justify-between" key={session.id}>
                            <span>{session.userAgent ?? "Unknown device"}</span>
                            <span>
                                {session.id === currentSession?.id
                                    ? "Current session"
                                    : "Active"}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted-foreground text-sm">
                    No active sessions found
                </p>
            )}
        </div>
    );
});

SessionsSection.displayName = "SessionsSection";

export default SessionsSection;
