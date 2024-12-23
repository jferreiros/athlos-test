import { useAccommodations } from "@/context/AccommodationsContext";

const Loader = () => {
  const { loading } = useAccommodations();

  if (!loading) return null;

  return (
    <div className="bg-white h-[80vh] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
