import React from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav
      aria-label="breadcrumb"
      className="flex items-center space-x-2 text-sm"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span className="text-gray-500">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <FaChevronRight className="text-gray-400" />
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
