"use server";

import Chat from "@/modals/chat.modal";
import { connect } from "@/db";
import User from "@/modals/user.modal";

export async function CreateChat(chat) {
	try {
		await connect();
		const newChat = await Chat.create(chat);
		return JSON.parse(JSON.stringify(newChat));
	} catch (err) {
		console.error(err);
	}
}

export async function GetChat(chatId) {
  try {
    await connect();
    const chat = await Chat.findById(chatId);
    return JSON.parse(JSON.stringify(chat));
  } catch (err) {
    console.error(err);
  }
}

export async function GetUserChats(userId) {
  try {
    await connect();
    const user = await User.findById(userId)
    const chats = await Chat.find({ userId: user._id });
    return JSON.parse(JSON.stringify(chats));
  } catch (err) {
    console.error("Error retrieving VoiceHalls:", err);
    throw err;
  }
}

export async function DeleteChat(chatId) {
  try {
    await connect();

    // Delete the chat document
    const chat = await Chat.findOneAndDelete({ _id: chatId });
    if (!chat) {
      throw new Error("Chat not found");
    }

    // Delete all messages associated with the chat
    await Message.deleteMany({ chatId });

    return JSON.parse(JSON.stringify(chat));
  } catch (err) {
    console.error("Error deleting chat and its messages:", err);
    throw err;
  }
}
