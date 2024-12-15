"use client";

import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const SignInButton = () => {
	const { isSignedIn, isLoaded } = useUser();
	const [isButtonClicked, setIsButtonClicked] = useState(false);

	return (
		<>
			{!isLoaded ? (
				<Skeleton className=" h-8 w-8" />
			) : !isSignedIn ? (
				<Link href="/sign-in">
					<Button
						variant="outline"
						className="py-2 px-4 bg-neutral-900 hover:bg-neutral-800 text-white shadow-lg hover:text-neutral-100 dark:bg-white  dark:text-neutral-950 dark:hover:bg-neutral-200 dark:hover:text-neutral-800"
						onClick={() => setIsButtonClicked(true)}
						disabled={isButtonClicked}
					>
						{isButtonClicked ? <Loader2 className="animate-spin" /> : ""}
						Sign In
					</Button>
				</Link>
			) : (
				""
			)}
		</>
	);
};

export default SignInButton;
