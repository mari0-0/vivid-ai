"use server";

import User from "@/modals/user.modal";
import { connect } from "@/db";
import Chat from "@/modals/chat.modal";
import Message from "@/modals/message.modal";
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

    const userChats = await Chat.find({ userId: user._id });
    const chatIds = userChats.map((chat) => chat._id);

    await ChatRoom.deleteMany({createdBy: user._id});
    await Chat.deleteMany({ userId: user._id });

    await Message.deleteMany({ chatId: { $in: chatIds } });

    return JSON.parse(JSON.stringify(user));
  } catch (err) {
    console.error("Error deleting user, chats, and messages:", err);
    throw err;
  }
}
