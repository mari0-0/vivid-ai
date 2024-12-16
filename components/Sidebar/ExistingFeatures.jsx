"use client";

import { useEffect, useState } from "react";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible";
import {
	BotMessageSquare,
	ChevronRight,
	Ellipsis,
	EllipsisVertical,
	MessagesSquare,
	Mic,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { GetUserChats } from "@/actions/chat.action";
import { GetUserChatRooms } from "@/actions/chatRoom.action";
import { GetUserVoiceHalls } from "@/actions/voiceHall.action";
import { GetUser } from "@/actions/user.action";
import { Button } from "../ui/button";

export default function ExistingFeatures() {
	const { isLoaded, user } = useUser();
	const [chats, setChats] = useState([]);
	const [chatRooms, setChatRooms] = useState([]);
	const [voiceHalls, setVoiceHalls] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (isLoaded && user) {
			fetchData();
		}
	}, [isLoaded, user]);

	async function fetchData() {
		try {
			setIsLoading(true);
			// Get the user from database using clerkId
			const dbUser = await GetUser(user.id);
			if (!dbUser) {
				console.error("User not found in database");
				return;
			}

			const [fetchedChats, fetchedChatRooms, fetchedVoiceHalls] =
				await Promise.all([
					GetUserChats(dbUser._id),
					GetUserChatRooms(dbUser._id),
					GetUserVoiceHalls(dbUser._id),
				]);
			console.log(
				"Fetched data:",
				fetchedChats,
				fetchedChatRooms,
				fetchedVoiceHalls
			);
			setChats(fetchedChats);
			setChatRooms(fetchedChatRooms);
			setVoiceHalls(fetchedVoiceHalls);
		} catch (err) {
			console.error("Error fetching data:", err);
		} finally {
			setIsLoading(false);
		}
	}

	const items = [
		{
			title: "Your Chats",
			icon: BotMessageSquare, // Replace with an appropriate icon
			isActive: true,
			items: chats.map((chat) => ({
				title: chat.title || "Untitled Chat",
				url: `/chats/${chat._id}`, // Adjust URL as needed
			})),
		},
		{
			title: "Voice Halls",
			icon: Mic, // Replace with an appropriate icon
			isActive: false,
			items: voiceHalls.map((hall) => ({
				title: hall.name,
				url: `/voice-halls/${hall.slug}`,
			})),
		},
		{
			title: "Chat Rooms",
			icon: MessagesSquare, // Replace with an appropriate icon
			isActive: false,
			items: chatRooms.map((room) => ({
				title: room.name,
				url: `/chat-rooms/${room.slug}`,
			})),
		},
	];

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Heal Your Minds</SidebarGroupLabel>
			<SidebarMenu>
				{isLoading ? (
					<SidebarMenuItem>
						<SidebarMenuButton>Loading...</SidebarMenuButton>
					</SidebarMenuItem>
				) : (
					items.map((item) => (
						<Collapsible
							key={item.title}
							asChild
							defaultOpen={item.isActive}
							className="group/collapsible"
						>
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<SidebarMenuButton tooltip={item.title}>
										{item.icon && <item.icon />}
										<span>{item.title}</span>
										<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
									</SidebarMenuButton>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<SidebarMenuSub>
										{item.items?.map((subItem) => (
											<SidebarMenuSubItem key={subItem.title}>
												<SidebarMenuSubButton asChild>
													<div
														// href={subItem.url}
														className="flex items-center justify-between w-full cursor-pointer"
													>
														<span>{subItem.title}</span>
														<Button variant="ghost" size="icon">
															<EllipsisVertical />
														</Button>
													</div>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
					))
				)}
			</SidebarMenu>
		</SidebarGroup>
	);
}
