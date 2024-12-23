import Link from "next/link";
import Image from "next/image";
import routes from "@/lib/routes";

const Header = () => {
  return (
    <header className="bg-white shadow-md w-full">
      <div className="container mx-auto flex justify-between items-center px-4 py-4 md:px-6">
        <div className="flex items-center">
          <Image
            src="/athlos_logo.avif"
            alt="Athlos Logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </div>

        <nav>
          <ul className="flex gap-2 md:gap-6 text-gray-700 font-medium">
            <li>
              <Link href={routes.home} className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href={routes.accommodations} className="hover:text-primary">
                Accommodations
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
