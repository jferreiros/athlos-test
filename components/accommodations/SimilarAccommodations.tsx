"use client";

import React from "react";
import AccommodationCard from "@/components/accommodations/AccommodationCard";
import { useAccommodations } from "@/context/AccommodationsContext";

interface SimilarAccommodationsProps {
  currentId?: string;
}

const SimilarAccommodations: React.FC<SimilarAccommodationsProps> = ({
  currentId,
}) => {
  const { detailedAccommodations } = useAccommodations();

  const similarPlaces = React.useMemo(() => {
    if (!detailedAccommodations) return [];
    const filteredPlaces = detailedAccommodations.filter(
      (place) => place.id !== currentId
    );
    return filteredPlaces.sort(() => 0.5 - Math.random()).slice(0, 4);
  }, [detailedAccommodations, currentId]);

  return (
    <div className="flex flex-col gap-4 mt-4">
      <h3 className="text-lg font-bold mb-4">Similar Places</h3>
      {similarPlaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {similarPlaces.map((place) => (
            <AccommodationCard key={place.id} {...place} />
          ))}
        </div>
      ) : (
        <p>No similar places available.</p>
      )}
    </div>
  );
};

export default SimilarAccommodations;
