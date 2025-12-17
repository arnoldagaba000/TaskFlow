import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

const SessionsSection = () => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["sessions"],
        queryFn: () => authClient.listSessions(),
    });

    const sessions = data?.data;

    const { data: currentSession } = useQuery({
        queryKey: ["current-session"],
        queryFn: () => authClient.getSession(),
    });

    async function revokeOthers() {
        try {
            await authClient.revokeOtherSessions();
            toast.success("Other sessions revoked");
            refetch();
        } catch {
            toast.error("Failed to revoke sessions");
        }
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-medium text-sm">Active sessions</p>
                    <p className="text-muted-foreground text-xs">
                        Devices currently signed into your account
                    </p>
                </div>

                <Button onClick={revokeOthers} size="sm" variant="outline">
                    Revoke others
                </Button>
            </div>

            {!isLoading && sessions && (
                <ul className="space-y-2 text-muted-foreground text-xs">
                    {sessions.map((session) => (
                        <li className="flex justify-between" key={session.id}>
                            <span>{session.userAgent ?? "Unknown device"}</span>
                            <span>
                                {session.id === currentSession?.data?.session.id
                                    ? "Current session"
                                    : "Active"}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SessionsSection;
