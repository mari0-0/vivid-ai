import { MessagesSquare, Mic, SquarePen } from "lucide-react";

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import DialogCreateButton from "./DialogCreateButton";

export default function CreateButtons() {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Create New</SidebarGroupLabel>
			<SidebarMenu>
				<SidebarMenuItem>
					<DialogCreateButton>
						<SidebarMenuButton tooltip="New Chat">
							<SquarePen />
							New Chat
						</SidebarMenuButton>
					</DialogCreateButton>

					<SidebarMenuButton tooltip="New Voice Hall">
						<Mic />
						New Voice Hall
					</SidebarMenuButton>

					<SidebarMenuButton tooltip="New Chat Room">
						<MessagesSquare />
						New Chat Room
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	);
}
