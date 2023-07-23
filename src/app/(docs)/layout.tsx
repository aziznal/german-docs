"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LeftSidebar from "@/components/left-sidebar";
import RightSidebar from "@/components/right-sidebar";

export default function DocsLayout({ children }: PropsWithChildren) {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);

  // check screen size on first load to determine whether to keep sidebar open
  useEffect(() => {
    setIsLeftSidebarOpen(window.innerWidth > 1024);
  }, []);

  // close self when screen size is less that lg
  useEffect(() => {
    function changeToggleState() {
      setIsLeftSidebarOpen(window.innerWidth > 1024);
    }

    window.addEventListener("resize", (_event) => changeToggleState());

    return () =>
      window.removeEventListener("resize", (_event) => changeToggleState());
  });

  return (
    <div className="flex min-h-full flex-col">
      <Header
        isLeftSidebarOpen={isLeftSidebarOpen}
        toggleSidebar={() => setIsLeftSidebarOpen((val) => !val)}
      />

      <div className="flex grow">
        <LeftSidebar isOpen={isLeftSidebarOpen} />

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
  );
}
