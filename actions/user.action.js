"use server";

import User from "@/modals/user.modal";
import { connect } from "@/db";
import Chat from "@/modals/chat.modal";
import ChatRoom from "@/modals/chatRoom.modal";

export async function CreateUser(user) {
	try {
		await connect();
		const newUser = await User.create(user);
		return JSON.parse(JSON.stringify(newUser));
	} catch (err) {
		console.error(err);
	}
}

export async function GetUser(clerkId) {
	try {
		await connect();
		const user = await User.findOne({ clerkId });
		return JSON.parse(JSON.stringify(user));
	} catch (err) {
		console.error(err);
	}
}

export async function DeleteUser(clerkId) {
	try {
		await connect();

		// Find and delete the user
		const user = await User.findOneAndDelete({ clerkId });
		if (!user) {
			throw new Error("User not found");
		}

		await ChatRoom.deleteMany({ createdBy: user._id });
		await Chat.deleteMany({ userId: user._id });

		return JSON.parse(JSON.stringify(user));
	} catch (err) {
		console.error("Error deleting user, chats, and messages:", err);
		throw err;
	}
}
