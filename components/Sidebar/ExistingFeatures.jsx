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
	MessagesSquare,
	Mic,
	Trash,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { DeleteChat, GetUserChats } from "@/actions/chat.action";
import { DeleteChatRoom, GetUserChatRooms } from "@/actions/chatRoom.action";
import { DeleteVoiceHall, GetUserVoiceHalls } from "@/actions/voiceHall.action";
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
			type: "chat",
			items: chats.map((chat) => ({
				title: chat.title || "Untitled Chat",
				url: `/chat/${chat._id}`, // Adjust URL as needed
				_id: chat._id,
			})),
		},
		{
			title: "Voice Halls",
			icon: Mic, // Replace with an appropriate icon
			isActive: false,
			type: "voiceHall",
			items: voiceHalls.map((hall) => ({
				title: hall.name,
				url: `/voice-hall/${hall.slug}`,
				_id: hall._id,
			})),
		},
		{
			title: "Chat Rooms",
			icon: MessagesSquare, // Replace with an appropriate icon
			isActive: false,
			type: "chatRoom",
			items: chatRooms.map((room) => ({
				title: room.name,
				url: `/chat-room/${room.slug}`,
				_id: room._id,
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
							items.map((item, i) => (
								<Collapsible
									key={i}
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
											<SidebarMenuSub >
												{item.items?.map((subItem, i) => (
													<SidebarMenuSubItem key={i} className="flex items-center ">
														<Link href={subItem.url} className="w-full">
															<SidebarMenuSubButton asChild>
																<div className=" flex items-center justify-between w-full cursor-pointer">
																	<span>{subItem.title}</span>
																</div>
															</SidebarMenuSubButton>
														</Link>
														<MenuItems type={item.type} _id={subItem._id} fetchData={fetchData}/>
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

const MenuItems = ({ type, _id, fetchData }) => {
	const handleChatDelete = async () => {
		console.log(_id);
		const chat = await DeleteChat(_id);
		console.log("chat deleted:", chat);
		fetchData();
	};

	const handleChatRoomDelete = async () => {
		console.log(_id);
		const chat = await DeleteChatRoom(_id);
		console.log("chat room deleted:", chat);
		fetchData();
	};

	const handleVoiceHallDelete = async () => {
		console.log(_id);
		const chat = await DeleteVoiceHall(_id);
		console.log("voice hall deleted:", chat);
		fetchData();
	};

	const handleFunction = type === "chat" ? handleChatDelete : type === "chatRoom" ? handleChatRoomDelete : handleVoiceHallDelete;
	return (
		<Button variant="ghost" size="icon" onClick={handleFunction}>
			<span className="text-neutral-600">
				<Trash />
			</span>
		</Button>
	);
};
