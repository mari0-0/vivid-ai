"use server";

import Chat from "@/modals/chat.modal";
import { connect } from "@/db";
import User from "@/modals/user.modal";

export async function CreateChat(chat) {
	try {
		await connect();
    console.log(chat);
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

export async function AddMessageToChat(chatId, message) {
  try {
    // Find the chat by its unique ID
    const chat = await Chat.findOne({ _id: chatId });

    if (!chat) {
      throw new Error("Chat not found");
    }

    // Add the new message to the chat's messages array
    chat.messages.push(message);
    await chat.save(); // Save the updated chat with the new message
    console.log("Message added to chat:", message);

  } catch (err) {
    console.error("Error adding message to chat:", err);
    throw new Error("Failed to add message.");
  }
}

export const GetChatHistory = async (chatId) => {
  try {
    const chat = await Chat.findOne({ _id: chatId }).lean();  // Use .lean() to return plain objects
    if (!chat) {
      throw new Error("Chat not found");
    }

    // Convert _id and other fields to plain objects
    const messages = chat.messages.map((msg) => ({
      _id: msg._id.toString(),  // Convert _id to string
      role: msg.role,
      content: msg.content,
      createdAt: msg.createdAt,
    }));
    console.log(messages)
    return messages;
  } catch (error) {
    console.error("Error retrieving chat history:", error);
    throw new Error("Failed to fetch chat history.");
  }
};



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
