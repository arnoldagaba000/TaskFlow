import ThemeToggler from "../theme-toggler";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

const Header = () => (
    <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
        <div className="items-center-safe flex gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
                className="mr-2 data-[orientation=vertical]:h-4"
                orientation="vertical"
            />
        </div>

        <div className="items-center-safe flex gap-2">
            <ThemeToggler />
        </div>
    </header>
);

export default Header;
