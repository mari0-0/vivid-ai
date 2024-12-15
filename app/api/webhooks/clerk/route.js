import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { CreateUser, DeleteUser } from "@/actions/user.action";
import { NextResponse } from "next/server";

export async function POST(req) {
	const SIGNING_SECRET = process.env.SIGNING_SECRET;

	if (!SIGNING_SECRET) {
		throw new Error(
			"Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
		);
	}

	// Create new Svix instance with secret
	const wh = new Webhook(SIGNING_SECRET);

	// Get headers
	const headerPayload = await headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Error: Missing Svix headers", {
			status: 400,
		});
	}

	// Get body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	let evt;

	// Verify payload with headers
	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		});
	} catch (err) {
		console.error("Error: Could not verify webhook:", err);
		return new Response("Error: Verification error", {
			status: 400,
		});
	}

	// Do something with payload
	// For this guide, log payload to console
	const { id } = evt.data;
	const eventType = evt.type;

	if (eventType === "user.created") {
		const { id, email_addresses, image_url, first_name, last_name } = evt.data;

		const user = {
			clerkId: id,
			email: email_addresses[0].email_address,
			photo: image_url,
			firstName: first_name,
			lastName: last_name,
		};
		// console.log(user);
		const newUser = await CreateUser(user);

		if (newUser) {
			const client = await clerkClient();

			await client.users.updateUserMetadata(id, {
				publicMetadata: {
					userId: newUser._id,
				},
			});
		}

		return NextResponse.json(
			{ message: "User created", user: newUser },
			{ status: 200 }
		);
	}

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    const user = await DeleteUser(id);
    if (user) {
      return NextResponse.json(
        { message: "User deleted", user },
        { status: 200 }
      );
    }
  }

	console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
	console.log("Webhook payload:", body);

	return new Response("Webhook received", { status: 200 });
}
