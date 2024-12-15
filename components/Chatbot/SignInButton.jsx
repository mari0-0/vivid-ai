"use client";

import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const SignInButton = () => {
	const { isSignedIn, isLoaded } = useUser();

	return (
		<>
			{!isLoaded ? (
				<div className="w-5 h-5 bg-zinc-300 dark:bg-zinc-700 rounded-full animate-ping" />
			) : isSignedIn ? (
				<UserButton />
			) : (
				<Link href="/sign-in">
					<Button
						variant="outline"
						className="py-2 px-4 bg-neutral-900 hover:bg-neutral-800 text-white shadow-lg hover:text-neutral-100 dark:bg-white  dark:text-neutral-950 dark:hover:bg-neutral-200 dark:hover:text-neutral-800"
					>
						Sign In
					</Button>
				</Link>
			)}
		</>
	);
};

export default SignInButton;
