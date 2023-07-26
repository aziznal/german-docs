import { PropsWithChildren } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LeftSidebar from "@/components/left-sidebar";
import LeftSidebarStateProvider from "@/providers/left-sidebar-provider";
import LeftSidebarLinks from "@/components/left-sidebar-links";

export default function DocsLayout({ children }: PropsWithChildren) {
  return (
    <LeftSidebarStateProvider>
      <div className="flex min-h-full flex-col">
        <Header />

        <div className="flex grow">
          <LeftSidebar>
            <LeftSidebarLinks />
          </LeftSidebar>

          <div className="flex grow flex-col">
            <main className="flex grow">{children}</main>

            <Footer />
          </div>
        </div>
      </div>
    </LeftSidebarStateProvider>
  );
}
