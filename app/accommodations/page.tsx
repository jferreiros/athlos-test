"use client";

import Image from "next/image";
import AccommodationCard from "@/components/accommodations/AccommodationCard";
import FilterBar from "@/components/accommodations/FilterBar";
import { useAccommodations } from "@/context/AccommodationsContext";
import { Button } from "@/components/ui/button";
import Loader from "@/components/common/Loader";
import { Accommodation } from "@/lib/types";

const AccommodationsPage = () => {
  const {
    detailedAccommodations,
    loading,
    error,
    paginate,
    currentPage,
    totalPages,
  } = useAccommodations();

  if (loading) return <Loader />;

  return (
    <div>
      <FilterBar />

      {error ? (
        <ErrorState />
      ) : detailedAccommodations.length === 0 ? (
        <EmptyState />
      ) : (
        <ContentState
          accommodations={detailedAccommodations}
          paginate={paginate}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

const ErrorState = () => (
  <div className="flex flex-col items-center justify-center py-8">
    <Image
      src="/images/not_found.png"
      alt="Error"
      width={256}
      height={256}
      className="mb-4"
    />{" "}
    <p className="text-lg text-gray-600">
      Oops! Something went wrong. Please try again later.
    </p>
    <Button variant="default" onClick={() => window.location.reload()}>
      Retry
    </Button>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-start py-8 h-screen">
    <Image
      src="/images/not_found.png"
      alt="No Accommodations"
      width={256}
      height={256}
      className="opacity-30"
    />
    <p className="text-lg text-gray-600">
      No accommodations found. Please adjust your filters and try again.
    </p>
  </div>
);

const ContentState = ({
  accommodations,
  paginate,
  currentPage,
  totalPages,
}: {
  accommodations: Accommodation[];
  paginate: (page: number) => void;
  currentPage: number;
  totalPages: number;
}) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {accommodations.map((accommodation) => (
        <AccommodationCard key={accommodation.id} {...accommodation} />
      ))}
    </div>

    {totalPages > 1 && (
      <div className="flex justify-center items-center gap-2 mt-6">
        <Button
          variant="outline"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            variant={index + 1 === currentPage ? "default" : "outline"}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    )}
  </>
);

export default AccommodationsPage;
