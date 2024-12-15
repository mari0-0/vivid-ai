import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema({
  chatId: {
    type: Schema.Types.ObjectId, // Reference to the Chat model
    ref: "Chat",
    required: true,
  },
  role: {
    type: String, // 'user' or 'model'
    enum: ["user", "model"],
    required: true,
  },
  text: {
    type: String, // The actual message content
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = models.Message || model("Message", MessageSchema);

export default Message;
