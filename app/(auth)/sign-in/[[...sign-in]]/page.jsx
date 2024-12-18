"use client"

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function Page() {
	const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl") || "/";

	return (
		<div className="flex justify-center items-center w-full h-screen bg-neutral-800">
			<SignIn appearance="dark" fallbackRedirectUrl={redirectUrl}/>
		</div>
	);
}
