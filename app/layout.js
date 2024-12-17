import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/helpers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import SignInButton from "@/components/Chatbot/SignInButton";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import ToggleThemeBtn from "@/components/helpers/toggleTheme";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Vivid AI | Home",
	description:
		"Discover a supportive, empathetic, and insightful AI Therapist to help you navigate life's challenges. Gain clarity, encouragement, and practical advice tailored to your emotions and needs. Start your journey to self-discovery today!",
};

export default function RootLayout({ children }) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: [dark],
			}}
		>
			<html lang="en" suppressHydrationWarning>
				<body className={`${geistSans.variable} ${geistMono.variable}`}>
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						disableTransitionOnChange
					>
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
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
