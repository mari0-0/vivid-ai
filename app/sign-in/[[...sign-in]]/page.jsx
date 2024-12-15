import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="flex justify-center items-center w-full h-screen bg-neutral-800">
			<SignIn appearance="dark"/>
		</div>
	);
}
