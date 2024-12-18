import SignInButton from "@/components/Chatbot/SignInButton";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import ToggleThemeBtn from "@/components/helpers/toggleTheme";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const ChatLayout = ({ children }) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="w-full dark:bg-neutral-800 dark:text-white">
				<div className="w-full h-[6vh] p-2 flex justify-between">
					<SidebarTrigger />
					<div className="flex items-center gap-4">
						<ToggleThemeBtn />
						<SignInButton />
					</div>
				</div>
				<div className="w-full h-[94vh] flex justify-center items-center">
					{children}
				</div>
			</main>
		</SidebarProvider>
	);
};

export default ChatLayout;
