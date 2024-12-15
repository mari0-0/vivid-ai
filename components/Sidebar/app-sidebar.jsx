import NavUser from "@/components/Sidebar/NavUser";
import BrandView from "@/components/Sidebar/BrandView";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import CreateButtons from "./CreateButtons";
import ExistingFeatures from "./ExistingFeatures";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";


export function AppSidebar({ ...props }) {
	return (
		<Sidebar collapsible="icon" {...props} className="border-l-0 border-black">
			<SidebarHeader>
				<BrandView />
			</SidebarHeader>
			<SidebarContent>
				<ScrollArea>
					<div className="w-full h-full">
						<CreateButtons />
						<ExistingFeatures  />
					</div>
					<ScrollBar />
				</ScrollArea>
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
