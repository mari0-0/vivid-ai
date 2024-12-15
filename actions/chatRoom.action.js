"use server"

import ChatRoom from "@/modals/chatRoom.modal";
import { connect } from "@/db";
import User from "@/modals/user.modal";

export async function CreateChatRoom(chatRoom) {
  try {
    await connect();
    const newChatRoom = await ChatRoom.create(chatRoom);
    return JSON.parse(JSON.stringify(newChatRoom));
  } catch (err) {
    console.error(err);
  }
}

export async function GetChatRoom(chatRoomId) {
  try {
    await connect();
    const chatRoom = await ChatRoom.findById(chatRoomId);
    return JSON.parse(JSON.stringify(chatRoom));
  } catch (err) {
    console.error(err);
  }
}

export async function GetUserChatRooms(userId) {
  try {
    await connect();
    const user = await User.findById(userId)
    const chatRooms = await ChatRoom.find({ createdBy: user._id });
    return JSON.parse(JSON.stringify(chatRooms));
  } catch (err) {
    console.error("Error retrieving VoiceHalls:", err);
    throw err;
  }
}

export async function DeleteChatRoom(chatRoomId) {
  try {
    await connect();
    const chatRoom = await ChatRoom.findOneAndDelete({_id: chatRoomId});
    if (!chatRoom) {
      throw new Error("ChatRoom not found");
    }

  } catch (err) {
    console.error("Error deleting chatRoom:", err);
    throw err;
  }
}

export async function IsSlugExists(slug) {
  try {
    await connect();
    const chatRoom = await ChatRoom.findOne({ slug });
    return !!chatRoom; // Returns true if found, false otherwise
  } catch (err) {
    console.error("Error checking slug existence:", err);
    throw err;
  }
}