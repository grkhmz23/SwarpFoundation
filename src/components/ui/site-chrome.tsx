"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/ui/footer";
import { Header3D } from "@/components/ui/header-3d";

const DATAROOM_HOST = "dataroom.swarpfoundation.com";

export function SiteChrome({
  children,
  host,
}: {
  children: React.ReactNode;
  host: string;
}) {
  const pathname = usePathname();
  const normalizedHost = host.split(":")[0].toLowerCase();
  const hideChrome = pathname.startsWith("/dataroom") || normalizedHost === DATAROOM_HOST;

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Header3D />
      {children}
      <Footer />
    </>
  );
}
