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
import { useEffect, useState } from "react";
import { CreateChat } from "@/actions/chat.action";
import { useUser } from "@clerk/nextjs";
import { Switch } from "../ui/switch";
import { CreateChatRoom } from "@/actions/chatRoom.action";
import { CreateVoiceHall } from "@/actions/voiceHall.action";

export default function DialogCreateButton({ variant, children }) {
	const [chatInput, setChatInput] = useState("");
	const [chatRoomInput, setChatRoomInput] = useState({
		name: "",
		slug: "",
		isPrivate: false,
	});
	const [voiceHallInput, setVoiceHallInput] = useState({
		name: "",
		slug: "",
		isPrivate: false,
		notAllowedUsers: [],
	});

	const { isLoaded, user } = useUser();

	const handleCreateChat = async () => {
		const userId = user.publicMetadata.userId;
		const chat = await CreateChat({ userId, title: chatInput });
		console.log(chat);
	};

	const handleCreateChatRoom = async () => {
		const userId = user.publicMetadata.userId;
		const chatRoom = await CreateChatRoom({
			...chatRoomInput,
			createdBy: userId,
		});
		console.log(chatRoom);
	};

	const handleCreateVoiceHall = async () => {
		const userId = user.publicMetadata.userId;
		const voiceHall = await CreateVoiceHall({
			...voiceHallInput,
			createdBy: userId,
		});
		console.log(voiceHall);
	};

	useEffect(() => {
		console.log(voiceHallInput);
	}, [voiceHallInput]);

	const handleChatRoomChange = (e) => {
		if (typeof e === "boolean") {
			setChatRoomInput((prevState) => ({
				...prevState,
				isPrivate: e,
			}));

			return;
		}
		const { id, value } = e.target;
		setChatRoomInput((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};

	const handleVoiceHallChange = (e) => {
		if (typeof e === "boolean") {
			setVoiceHallInput((prevState) => ({
				...prevState,
				isPrivate: e,
			}));

			return;
		}
		const { id, value } = e.target;
		setVoiceHallInput((prevState) => ({
			...prevState,
			[id]: value,
		}));
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
		return (
			<Dialog>
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
								onCheckedChange={handleChatRoomChange} // This will update the state when toggled
							/>
						</div>
					</div>
					<DialogFooter className="sm:justify-start">
						<DialogClose asChild>
							<Button
								type="button"
								variant="secondary"
								disabled={!isLoaded || !user}
								onClick={handleCreateChatRoom}
							>
								Chat
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	} else if (variant === "voiceHall") {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<div>{children}</div>
				</DialogTrigger>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>New Voice Hall</DialogTitle>
						<DialogDescription>
							Create a new voice hall to dump your emotions to others.
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-2">
						<div className="w-full">
							<Label>Name</Label>
							<Input
								id="name"
								value={voiceHallInput.name}
								onChange={handleVoiceHallChange}
							/>
						</div>
						<div className="mt-2 w-full">
							<Label>Slug</Label>
							<Input
								id="slug"
								value={voiceHallInput.slug}
								onChange={handleVoiceHallChange}
							/>
						</div>
						<div className="mt-4 w-full flex items-center gap-2 ">
							<Label>Private room</Label>
							<Switch
								onCheckedChange={handleVoiceHallChange} // This will update the state when toggled
							/>
						</div>
					</div>
					<DialogFooter className="sm:justify-start">
						<DialogClose asChild>
							<Button
								type="button"
								variant="secondary"
								disabled={!isLoaded || !user}
								onClick={handleCreateVoiceHall}
							>
								Chat
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	}
}
