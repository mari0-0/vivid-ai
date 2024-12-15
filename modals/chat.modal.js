import { Schema, model, models } from "mongoose";

const ChatSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, // Reference to the User model
    ref: "User",
    required: true,
  },
  title: {
    type: String, // Optional chat title
    default: "Untitled Chat",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chat = models.Chat || model("Chat", ChatSchema);

export default Chat;
