import React, { createContext, useContext, useState, useEffect } from "react";
import { Accommodation } from "@/lib/types";
import ErrorModal from "@/components/common/ErrorModal";
import SuccessModal from "@/components/common/SuccessModal";
import {
  fetchAccommodations,
  fetchAccommodationDetails,
} from "@/services/accommodationService";

interface AccommodationsContextProps {
  accommodations: Accommodation[];
  filteredAccommodations: Accommodation[];
  detailedAccommodations: Accommodation[];
  loading: boolean;
  error: string | null;
  filters: {
    location: string[];
    type: string[];
    athlos_stamp: boolean | null;
    category: number | null;
  };
  setFilters: (filters: Partial<AccommodationsContextProps["filters"]>) => void;
  search: string;
  setSearch: (search: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  totalAccommodations: number;
  paginate: (page: number) => void;
  currentPage: number;
  totalPages: number;
  showModal: (type: "loading" | "error" | "success", message: string) => void;
  hideModal: () => void;
}

const AccommodationsContext = createContext<
  AccommodationsContextProps | undefined
>(undefined);

export const AccommodationsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState<
    Accommodation[]
  >([]);

  const [detailedAccommodations, setDetailedAccommodations] = useState<
    Accommodation[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [modalState, setModalState] = useState<{
    type: "loading" | "error" | "success" | null;
    message: string;
  }>({ type: null, message: "" });

  const showModal = (
    type: "loading" | "error" | "success",
    message: string
  ) => {
    setModalState({ type, message });
  };

  const hideModal = () => {
    setModalState({ type: null, message: "" });
  };

  const [filters, setFiltersState] = useState<
    AccommodationsContextProps["filters"]
  >({
    location: [],
    type: [],
    athlos_stamp: null,
    category: null,
  });
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("recommended");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchAccommodations();
        setAccommodations(data);
        setFilteredAccommodations(data);
      } catch (err: unknown) {
        const error = err as Error;
        setError(error.message);
        showModal("error", "Failed to fetch accommodations.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDetailedAccommodations = async () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const currentView = filteredAccommodations.slice(
        startIndex,
        startIndex + itemsPerPage
      );

      const detailedData = await Promise.all(
        currentView.map(async (accommodation) => {
          try {
            const response = await fetchAccommodationDetails(accommodation.id);
            hideModal();
            return { ...accommodation, ...response };
          } catch (error) {
            console.error("Error fetching details:", error);
            return accommodation;
          }
        })
      );

      setDetailedAccommodations(detailedData);
    };

    fetchDetailedAccommodations();
  }, [currentPage, filteredAccommodations]);

  const totalPages = Math.ceil(filteredAccommodations.length / itemsPerPage);

  const paginate = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    let result = accommodations;

    if (search) {
      result = result.filter((a) =>
        a.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filters.location.length > 0) {
      result = result.filter((a) => filters.location.includes(a.location));
    }

    if (filters.type.length > 0) {
      result = result.filter((a) => filters.type.includes(a.type));
    }

    if (filters.athlos_stamp !== null) {
      result = result.filter((a) => a.athlos_stamp === filters.athlos_stamp);
    }

    if (filters.category !== null) {
      result = result.filter((a) => a.category! >= filters.category!);
    }

    if (sortBy === "recommended") {
      result = result.sort(
        (a, b) => Number(b.is_prioritary) - Number(a.is_prioritary)
      );
    } else if (sortBy === "category_high_low") {
      result = result.sort((a, b) => b.category - a.category);
    }

    setFilteredAccommodations(result);
  }, [filters, search, sortBy, accommodations]);

  const setFilters = (
    updatedFilters: Partial<AccommodationsContextProps["filters"]>
  ) => {
    setFiltersState((prev) => ({ ...prev, ...updatedFilters }));
    setCurrentPage(1);
  };

  const contextValue: AccommodationsContextProps = {
    accommodations,
    filteredAccommodations,
    detailedAccommodations,
    loading,
    error,
    filters,
    setFilters,
    search,
    setSearch,
    sortBy,
    setSortBy,
    totalAccommodations: accommodations.length,
    paginate,
    currentPage,
    totalPages,
    showModal,
    hideModal,
  };

  return (
    <AccommodationsContext.Provider value={contextValue}>
      {children}
      {modalState.type === "error" && (
        <ErrorModal isOpen onClose={hideModal} message={modalState.message} />
      )}
      {modalState.type === "success" && (
        <SuccessModal isOpen onClose={hideModal} message={modalState.message} />
      )}
    </AccommodationsContext.Provider>
  );
};

export const useAccommodations = () => {
  const context = useContext(AccommodationsContext);
  if (!context) {
    throw new Error(
      "useAccommodations must be used within an AccommodationsProvider"
    );
  }
  return context;
};
