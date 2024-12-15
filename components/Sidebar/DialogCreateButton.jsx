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

export default function DialogCreateButton({ variant, children }) {
	const [input, setInput] = useState("");
	const { isLoaded, user } = useUser();

	const handleCreateChat = async () => {
    console.log("clicked");
    const userId = user.publicMetadata.userId

		const chat = await CreateChat({userId, title: input});
    console.log(chat)
	};

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
					<Input id="link" onChange={(e) => setInput(e.target.value)} />
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
}
