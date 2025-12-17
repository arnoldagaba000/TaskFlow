import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

const LogoutSection = () => {
    const navigate = useNavigate();

    async function logout() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Logged out successfully");
                    navigate({ to: "/login", replace: true });
                },
            },
        });
    }

    async function logoutAll() {
        try {
            await authClient.revokeSessions({
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Logged out of all sessions");
                        navigate({ to: "/login", replace: true });
                    },
                },
            });
        } catch {
            toast.error("Failed to log out of all sessions");
        }
    }

    return (
        <div className="space-y-2">
            <p className="font-medium text-sm">Sign out</p>

            <div className="flex gap-2">
                <Button onClick={logout} size="sm" variant="outline">
                    Sign out
                </Button>

                <Button onClick={logoutAll} size="sm" variant="outline">
                    Sign out everywhere
                </Button>
            </div>
        </div>
    );
};

export default LogoutSection;
