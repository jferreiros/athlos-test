import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div
      className="relative bg-cover bg-center w-full h-[90vh]"
      style={{
        backgroundImage: "url('/images/bg_hotel.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="container relative mx-auto z-10 flex items-center justify-start px-8 h-[90vh]">
        <div className="bg-white rounded-lg shadow-lg p-8 text-left flex flex-col gap-8 max-w-lg">
          <h1 className="text-xl md:text-4xl font-bold text-gray-800 leading-tight">
            Your Stay for Every Sports Journey
          </h1>
          <p className="text-gray-600 text-md md:text-lg">
            Discover top stays designed for athletes and sports travelers.
          </p>
          <Link
            href="/accommodations"
            className="bg-primary text-white px-6 py-3 rounded-lg text-sm md:text-lg hover:bg-opacity-90 transition flex gap-4 font-medium items-center w-auto md:w-80"
          >
            Discover Accommodations
            <MoveRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
