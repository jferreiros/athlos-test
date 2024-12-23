"use client";

import { usePathname } from "next/navigation";
import Breadcrumb from "@/components/common/BreadCrumb";

export default function AccommodationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
      {children}
    </div>
  );
}

function generateBreadcrumbs(pathname: string) {
  const pathSegments = pathname.split("/").filter(Boolean);

  return [
    { label: "Home", href: "/" },
    { label: "Accommodations", href: "/accommodations" },
    ...pathSegments.slice(1).map((segment, index) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: `/${pathSegments.slice(0, index + 2).join("/")}`,
    })),
  ];
}
