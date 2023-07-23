import { PropsWithChildren } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LeftSidebar from "@/components/left-sidebar";
import RightSidebar from "@/components/right-sidebar";
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
            <div className="flex grow">
              {/* Main content */}
              <main className="grow px-6 py-20 text-sm text-neutral-700 lg:px-20">
                {children}
              </main>

              <RightSidebar />
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </LeftSidebarStateProvider>
  );
}
