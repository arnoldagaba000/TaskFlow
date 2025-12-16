import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "@/components/layout/header";
import AppSidebar from "@/components/layout/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { authMiddleware } from "@/middleware/auth";

export const Route = createFileRoute("/_protected")({
    beforeLoad: async () => {
        const session = await authClient.getSession();
        return { session };
    },
    component: RouteComponent,
    server: {
        middleware: [authMiddleware],
    },
    ssr: false,
});

function RouteComponent() {
    return (
        <SidebarProvider>
            {/* App Sidebar goes here */}
            <AppSidebar />

            <SidebarInset>
                {/* Header goes here */}
                <Header />

                <div className="p-4">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
