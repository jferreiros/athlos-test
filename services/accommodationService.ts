import { Accommodation, AccommodationDetails } from "@/lib/types";

const BASE_URL = "https://python-engine-staging.athlostravel.com";

export const fetchAccommodations = async (): Promise<Accommodation[]> => {
  const response = await fetch(`${BASE_URL}/accommodations`);
  if (!response.ok) throw new Error("Failed to fetch accommodations");
  const result = await response.json();
  return result.accommodations || [];
};

export const fetchAccommodationDetails = async (
  id: string
): Promise<AccommodationDetails> => {
  const response = await fetch(`${BASE_URL}/accommodations/${id}`);

  if (!response.ok) {
    console.error(`Failed to fetch details for accommodation ${id}`);
    throw new Error("Failed to fetch accommodation details");
  }

  const data = await response.json();
  // Handle photos field
  data.photos =
    typeof data.photos === "string"
      ? data.photos.split(",")
      : Array.isArray(data.photos)
      ? data.photos
      : [];

  return data;
};
