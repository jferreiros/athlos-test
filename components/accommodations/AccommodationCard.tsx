import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FaStar,
  FaBed,
  FaMapMarkerAlt,
  FaArrowRight,
  FaHeart,
} from "react-icons/fa";
import Link from "next/link";
import { addFavorite, removeFavorite, isFavorite } from "@/utils/localStorage";
import { useState } from "react";
import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";

interface AccommodationCardProps {
  id: string;
  name: string;
  location: string;
  category: number;
  photos: string[];
  athlos_stamp: boolean;
  type: string;
  num_of_rooms: number;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({
  id,
  name,
  location,
  category,
  photos,
  athlos_stamp,
  type,
  num_of_rooms,
}) => {
  const formatLocation = (loc: string) =>
    loc.charAt(0).toUpperCase() + loc.slice(1).toLowerCase();

  const [favorite, setFavorite] = useState(isFavorite(id));

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
    setFavorite(!favorite);
  };
  const renderStars = (category: number) => {
    const filledStars = Array.from({ length: category }, (_, i) => (
      <FaStar key={`filled-${i}`} className="text-yellow-500" />
    ));
    const greyStars = Array.from({ length: 5 - category }, (_, i) => (
      <FaStar key={`grey-${i}`} className="text-gray-300" />
    ));
    return [...filledStars, ...greyStars];
  };

  return (
    <Card className="max-w-md shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="relative p-0">
        <Image
          src={photos[0]}
          alt={name}
          width={100}
          height={100}
          className="rounded-t-md h-40 w-full object-cover"
        />
        <button
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md"
          onClick={toggleFavorite}
        >
          <FaHeart className={favorite ? "text-rose-400" : "text-gray-300"} />
        </button>
        {athlos_stamp && (
          <button className="absolute flex gap-2 top-2 left-0 bg-green-600 items-center px-2 text-white shadow-md">
            Verified
            <FaCircleCheck className="text-white " />
          </button>
        )}
      </CardHeader>

      <CardContent className="p-4 h-48">
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-700 font-medium flex items-center gap-2">
            {type}
          </p>
          <p className="text-gray-700 font-medium flex items-center gap-2">
            <FaBed className="" />
            {num_of_rooms}
          </p>
        </div>

        <CardTitle className="text-lg font-bold text-gray-800 mb-1 flex items-center justify-between">
          {name}
        </CardTitle>

        <div className="flex items-center gap-1 mb-2">
          {renderStars(category)}
        </div>

        <p className="text-gray-600 flex items-center gap-2">
          <FaMapMarkerAlt className="" />
          {formatLocation(location)}
        </p>
      </CardContent>

      <div className="px-4 py-4">
        <Link href={`/accommodations/${id}`} passHref>
          <Button
            variant="default"
            className="w-full bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            View Details
            <FaArrowRight className="ml-2" />
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default AccommodationCard;
