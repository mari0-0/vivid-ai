"use server";

import User from "@/modals/user.modal";
import { connect } from "@/db";

export async function CreateUser(user) {
	try {
		await connect();
		const newUser = await User.create(user);
		return JSON.parse(JSON.stringify(newUser));
	} catch (err) {
		console.error(err);
	}
}

export async function DeleteUser(clerkId) {
  try {
    await connect();
    const user = await User.findOneAndDelete({ clerkId });
    return JSON.parse(JSON.stringify(user));
  } catch (err) {
    console.error(err);
  }
}
