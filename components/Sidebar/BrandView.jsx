import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function BrandView() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<SidebarMenuButton
						size="lg"
						className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						<div className="flex aspect-square size-8 items-center justify-center rounded-lg">
							<img src="logo.png" alt="logo" className="rounded-full" />
						</div>
						<h1 className="grid flex-1 text-left text-[16px] font-bold">
							Vivid AI
						</h1>
					</SidebarMenuButton>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
