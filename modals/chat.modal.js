import { Schema, model, models } from "mongoose";

// Define the Chat Schema
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
  tone: {
    type: String,
    default: "Calm",
  },
  messages: [ // Store messages in an array
    {
      role: { type: String, enum: ["user", "model"], required: true },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


// Create or fetch the Chat model
const Chat = models.Chat || model("Chat", ChatSchema);

export default Chat;
