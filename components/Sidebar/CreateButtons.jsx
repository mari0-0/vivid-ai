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
					<DialogCreateButton variant="chat">
						<SidebarMenuButton tooltip="New Chat">
							<SquarePen />
							New Chat
						</SidebarMenuButton>
					</DialogCreateButton>
					<DialogCreateButton variant="chatRoom">
						<SidebarMenuButton tooltip="New Voice Hall">
							<Mic />
							New Voice Hall
						</SidebarMenuButton>
					</DialogCreateButton>
					<DialogCreateButton variant="voiceHall">
						<SidebarMenuButton tooltip="New Chat Room">
							<MessagesSquare />
							New Chat Room
						</SidebarMenuButton>
					</DialogCreateButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	);
}
