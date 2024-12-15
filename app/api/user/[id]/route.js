import { GetUserChats } from "@/actions/chat.action";
import { GetUserChatRooms } from "@/actions/chatRoom.action";
import { GetUser } from "@/actions/user.action";
import { GetUserVoiceHalls } from "@/actions/voiceHall.action";
import { connect } from "@/db"; // Ensure you're importing the connect function

export async function handler(req, res) {
  const { userId } = req.query; // Get the user ID from the URL params

  try {
    await connect(); // Ensure you establish a database connection

    const user = await GetUser(userId); // Fetch the user data
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const [chats, chatRooms, voiceHalls] = await Promise.all([
      GetUserChats(user._id),
      GetUserChatRooms(user._id),
      GetUserVoiceHalls(user._id),
    ]);

    // Respond with the fetched data
    return res.status(200).json({
      chats,
      chatRooms,
      voiceHalls,
    });
  } catch (err) {
    console.error("Error fetching user features:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
