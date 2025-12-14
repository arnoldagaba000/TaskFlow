import { createFileRoute } from "@tanstack/react-router";
import Register from "@/components/auth/register";

export const Route = createFileRoute("/_auth/register")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="items-center-safe justify-center-safe flex min-h-dvh flex-col">
            <Register />
        </div>
    );
}
