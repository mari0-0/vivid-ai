"use client";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import { CreateChat } from "@/actions/chat.action";
import { useUser } from "@clerk/nextjs";
import { Switch } from "../ui/switch";

export default function DialogCreateButton({ variant, children }) {
	const [chatInput, setChatInput] = useState("");
	const [chatRoomInput, setChatRoomInput] = useState({
		name: '',
		slug: '',
		isPrivate: false,
	});
	const [voiceHallInput, setVoiceHallInput] = useState({});

	const { isLoaded, user } = useUser();

	const handleCreateChat = async () => {
		console.log("clicked");
		const userId = user.publicMetadata.userId
		const chat = await CreateChat({ userId, title: chatInput });
		console.log(chat)
	};

	const handleChatRoomChange = (e) => {
		console.log(e.target.checked)
		if (e.target.id === "isPrivate") {
			setChatRoomInput((prevState) => ({
				...prevState,
				isPrivate: e.target.checked,
			}));
			console.log(chatRoomInput);
			return;
		}
		const { id, value, type, checked } = e.target;
		setChatRoomInput((prevState) => ({
			...prevState,
			[id]: type === "checkbox" ? checked : value,
		}));
		console.log(chatRoomInput);
	};


	if (variant === "chat") {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<div>{children}</div>
				</DialogTrigger>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>New Chat</DialogTitle>
						<DialogDescription>
							Create a new chat to talk afresh to the bot.
						</DialogDescription>
					</DialogHeader>
					<div className="mt-2 grid flex-1 gap-2">
						<Label>Name</Label>
						<Input id="link" onChange={(e) => setChatInput(e.target.value)} />
					</div>
					<DialogFooter className="sm:justify-start">
						<DialogClose asChild>
							<Button
								type="button"
								variant="secondary"
								disabled={!isLoaded}
								onClick={handleCreateChat}
							>
								Chat
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	} else if (variant === "chatRoom") {
		return <Dialog>
			<DialogTrigger asChild>
				<div>{children}</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>New Chat Room</DialogTitle>
					<DialogDescription>
						Create a new chat room to dump your emotions to others.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-2">
					<div className="w-full">
						<Label>Name</Label>
						<Input
							id="name"
							value={chatRoomInput.name}
							onChange={handleChatRoomChange}
						/>
					</div>
					<div className="mt-2 w-full">
						<Label>Slug</Label>
						<Input
							id="slug"
							value={chatRoomInput.slug}
							onChange={handleChatRoomChange}
						/>
					</div>
					<div className="mt-4 w-full flex items-center gap-2 ">
						<Label>Private room</Label>
						<Switch
							id="isPrivate"
							checked={chatRoomInput.isPrivate} // Set the value of the switch from the state
							onClick={handleChatRoomChange} // This will update the state when toggled
						/>
					</div>
				</div>
				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button
							type="button"
							variant="secondary"
							disabled={!isLoaded}
							onClick={handleCreateChat}
						>
							Chat
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	} else if (variant === "voiceHall") {
		return <></>
	}
}
