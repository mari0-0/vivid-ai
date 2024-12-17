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
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

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
				url: `/chat/${chat._id}`, // Adjust URL as needed
			})),
		},
		{
			title: "Voice Halls",
			icon: Mic, // Replace with an appropriate icon
			isActive: false,
			items: voiceHalls.map((hall) => ({
				title: hall.name,
				url: `/voice-hall/${hall.slug}`,
			})),
		},
		{
			title: "Chat Rooms",
			icon: MessagesSquare, // Replace with an appropriate icon
			isActive: false,
			items: chatRooms.map((room) => ({
				title: room.name,
				url: `/chat-room/${room.slug}`,
			})),
		},
	];

	return (
		<>
			{user ? (
				<SidebarGroup>
					<SidebarGroupLabel>
						{isLoading ? (
							<Skeleton className="w-1/2 h-5" />
						) : (
							<span>Heal Your Minds</span>
						)}
					</SidebarGroupLabel>
					<SidebarMenu>
						{isLoading ? (
							<SidebarMenuItem>
								<div className="flex flex-col gap-2">
									<Skeleton className="w-full h-5" />
									<Skeleton className="w-full h-5" />
									<Skeleton className="w-full h-5" />
								</div>
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
														<Link href={subItem.url}>
															<SidebarMenuSubButton asChild>
																<div
																	// href={subItem.url}
																	className="flex items-center justify-between w-full cursor-pointer"
																>
																	<span>{subItem.title}</span>
																	<MenuItems />
																</div>
															</SidebarMenuSubButton>
														</Link>
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
			) : (
				""
			)}
		</>
	);
}

const MenuItems = () => {
	return (
		<Button variant="ghost" size="icon">
			<EllipsisVertical />
		</Button>
	);
};
