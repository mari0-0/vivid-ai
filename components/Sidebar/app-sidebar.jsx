import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  MessageCircle,
  MicVocal,
  PieChart,
  Podcast,
} from "lucide-react";

import { NavMain } from "@/components/Sidebar/nav-main";
import { NavUser } from "@/components/Sidebar/nav-user";
import { TeamSwitcher } from "@/components/Sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import NavProjects from "./nav-projects";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Your Chats",
      url: "#",
      icon: MessageCircle,
      isActive: true,
      items: [
        {
          title: "Chat 1",
          url: "#",
        },
        {
          title: "Chat 2",
          url: "#",
        },
        {
          title: "Chat 3",
          url: "#",
        },
      ],
    },
    {
      title: "Chat Rooms",
      url: "#",
      icon: Podcast,
      isActive: true,
      items: [
        {
          title: "Chat room 1",
          url: "#",
        },
        {
          title: "Chat room 2",
          url: "#",
        },
        {
          title: "Chat room 3",
          url: "#",
        },
      ],
    },
    {
      title: "Voice Halls",
      url: "#",
      icon: MicVocal,
      items: [
        {
          title: "Voice Hall 1",
          url: "#",
        },
        {
          title: "Voice Hall 2",
          url: "#",
        },
        {
          title: "Voice Hall 3",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props} className="border-l-0 border-black">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects}/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
