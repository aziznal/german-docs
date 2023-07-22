import { PropsWithChildren } from "react";

export default function DocsLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full flex-col">
      <header className="flex basis-20 bg-sky-500">Header</header>

      <div className="flex grow">
        {/* Left sidebar */}
        <div className="flex shrink-0 items-center justify-center basis-96 bg-blue-300">
          <span>left sidebar</span>
        </div>

        <div className="flex flex-col grow min-h-full">
          <main className="grow bg-yellow-400">{children}</main>

          <footer className="bg-red-400 h-[300px]">Footer</footer>
        </div>

        {/* Right sidebar */}
        <div className="shrink-0 basis-96 bg-green-300">right sidebar</div>
      </div>
    </div>
  );
}
