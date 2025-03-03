import { BrainCog } from "lucide-react";
import React from "react";
import RightSideBanner from "./(ui)/_components/RightSideBanner/RightSideBanner";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      {/* left side of the layout */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <BrainCog className="size-4" />
              {/* <GalleryVerticalEnd className="size-4" /> */}
            </div>
            DeepDiet
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full">{children}</div>
        </div>
      </div>

      {/* right side of the layout */}
      <div className="relative hidden flex-col items-center justify-center bg-muted lg:flex">
        <RightSideBanner />
      </div>
    </main>
  );
}
