import ChatUI from "@/components/Chatbot/ChatUI";
import InitialCard from "@/components/Chatbot/InitialCard";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import ToggleThemeBtn from "@/components/helpers/toggleTheme";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const App = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full dark:bg-neutral-800 dark:text-white">
        <div className="w-full h-[6vh] p-2 flex justify-between">
          <SidebarTrigger />
          <ToggleThemeBtn />
        </div>
        <div className="w-full h-[94vh] flex justify-center items-center">
          {/* <InitialCard /> */}
          <ChatUI />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default App;
