export const fetchAccommodations = async () => {
  const response = await fetch(
    "https://python-engine-staging.athlostravel.com/accommodations"
  );
  if (!response.ok) throw new Error("Failed to fetch accommodations");
  const result = await response.json();

  // Ensure the return value is an array
  return result.accommodations || [];
};

export const fetchAccommodationDetails = async (id: string) => {
  const response = await fetch(
    `https://python-engine-staging.athlostravel.com/accommodations/${id}`
  );
  if (!response.ok) throw new Error("Failed to fetch accommodation details");
  return response.json();
};
