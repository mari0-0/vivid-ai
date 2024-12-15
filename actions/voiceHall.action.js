"use server";

import VoiceHall from "@/modals/voiceHall.modal"; // Adjust the import path if necessary
import { connect } from "@/db";
import User from "@/modals/user.modal";

// Create a new voice hall
export async function CreateVoiceHall(voiceHall) {
  try {
    await connect();
    const newVoiceHall = await VoiceHall.create(voiceHall);
    return JSON.parse(JSON.stringify(newVoiceHall));
  } catch (err) {
    console.error("Error creating VoiceHall:", err);
    throw err;
  }
}

// Get a voice hall by its ID
export async function GetVoiceHall(voiceHallId) {
  try {
    await connect();
    const voiceHall = await VoiceHall.findById(voiceHallId);
    if (!voiceHall) {
      throw new Error("VoiceHall not found");
    }
    return JSON.parse(JSON.stringify(voiceHall));
  } catch (err) {
    console.error("Error retrieving VoiceHall:", err);
    throw err;
  }
}

export async function GetUserVoiceHalls(userId) {
  try {
    await connect();
    const user = await User.findById(userId)
    const voiceHalls = await VoiceHall.find({ createdBy: user._id });
    return JSON.parse(JSON.stringify(voiceHalls));
  } catch (err) {
    console.error("Error retrieving VoiceHalls:", err);
    throw err;
  }
}

// Delete a voice hall by its ID
export async function DeleteVoiceHall(voiceHallId) {
  try {
    await connect();
    const voiceHall = await VoiceHall.findOneAndDelete({ _id: voiceHallId });
    if (!voiceHall) {
      throw new Error("VoiceHall not found");
    }
    return JSON.parse(JSON.stringify(voiceHall));
  } catch (err) {
    console.error("Error deleting VoiceHall:", err);
    throw err;
  }
}

// Update a voice hall's data by its ID
export async function UpdateVoiceHall(voiceHallId, updates) {
  try {
    await connect();
    const updatedVoiceHall = await VoiceHall.findByIdAndUpdate(
      voiceHallId,
      updates,
      { new: true, runValidators: true }
    );
    if (!updatedVoiceHall) {
      throw new Error("VoiceHall not found");
    }
    return JSON.parse(JSON.stringify(updatedVoiceHall));
  } catch (err) {
    console.error("Error updating VoiceHall:", err);
    throw err;
  }
}

export async function IsSlugExists(slug) {
  try {
    await connect();
    const voiceHall = await VoiceHall.findOne({ slug });
    return !!voiceHall; // Returns true if found, false otherwise
  } catch (err) {
    console.error("Error checking slug existence:", err);
    throw err;
  }
}