import { useRouteContext } from "@tanstack/react-router";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import NavUser from "./nav-user";

const AppSidebar = () => {
    const { session } = useRouteContext({ from: "/_protected" });

    const user = session.data?.user;
    if (!user) {
        return null;
    }

    return (
        <Sidebar collapsible="offcanvas" variant="inset">
            <SidebarHeader>{/* Logo goes here */}</SidebarHeader>

            <SidebarContent>
                <SidebarGroup>{/* Navigation goes here */}</SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};

export default AppSidebar;
