import { ThemeProvider } from "@/components/helpers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export const metadata = {
	title: "Healify AI | Sign In",
	description:
		"Discover a supportive, empathetic, and insightful AI Therapist to help you navigate life's challenges. Gain clarity, encouragement, and practical advice tailored to your emotions and needs. Start your journey to self-discovery today!",
};

export default function AuthLayout({ children }) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: [dark],
			}}
		>
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				disableTransitionOnChange
			>
				{children}
			</ThemeProvider>
		</ClerkProvider>
	);
}
