import { createFileRoute, Outlet } from "@tanstack/react-router";
import { authCheck } from "@/middleware/auth";

export const Route = createFileRoute("/_auth")({
    component: RouteComponent,
    server: {
        middleware: [authCheck],
    },
});

function RouteComponent() {
    return (
        <div className="min-h-dvh bg-background">
            <Outlet />
        </div>
    );
}
