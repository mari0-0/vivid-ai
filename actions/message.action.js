"use server";

import Message from "@/modals/message.modal";
import { connect } from "@/db";

export async function CreateMessage(message) {
  try {
    await connect();
    const newMessage = await Message.create(message);
    return JSON.parse(JSON.stringify(newMessage));
  } catch (err) {
    console.error(err);
  }
}

export async function DeleteMessage(messageId) {
  try {
    await connect();
    const message = await Message.findOneAndDelete({ messageId });
    return JSON.parse(JSON.stringify(message));
  }
  catch (err) {
    console.error(err);
  }
}

export const GetChatHistory = async (chatId) => {
  try {
    const messages = await Message.find({ chatId })
      .sort({ createdAt: 1 })
      .exec();
    return messages;
  } catch (error) {
    console.error("Error retrieving chat history:", error);
    throw error;
  }
};