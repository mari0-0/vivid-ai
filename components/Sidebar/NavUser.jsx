"use client";

import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	DotIcon,
	LogOut,
	Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserButton, useUser } from "@clerk/nextjs";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useRef } from "react";

export default function NavUser() {
	const { isLoaded, user } = useUser();
	const userButtonWrapperRef = useRef(null);

	const handleClick = () => {
		// Simulate a click on the UserButton's wrapper div
		const wrapper = userButtonWrapperRef.current;
		if (wrapper) {
			wrapper.querySelector("button")?.click();
		}
	};


	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					disabled={!isLoaded}
					onClick={handleClick}
				>
					<div ref={userButtonWrapperRef}>
						{isLoaded ? (
							user.imageUrl ? (
								<div>
									<UserButton />
								</div>
							) : (
								<AvatarFallback className="rounded-lg">U</AvatarFallback>
							)
						) : (
							<Skeleton className="aspect-square h-8 w-8 rounded-full" />
						)}
					</div>
					<div className="flex flex-col gap-1 flex-1 text-left text-sm leading-tight">
						{isLoaded ? (
							<span className="truncate font-semibold">
								{user.fullName
									.split(" ")
									.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
									.join(" ")}
							</span>
						) : (
							<Skeleton className="h-2 w-full" />
						)}
						{isLoaded ? (
							<span className="truncate text-xs">
								{user.emailAddresses[0].emailAddress}
							</span>
						) : (
							<Skeleton className="h-2 w-full" />
						)}
					</div>
					<ChevronsUpDown className="ml-auto size-4" />
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
