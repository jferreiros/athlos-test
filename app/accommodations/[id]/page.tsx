'use client'
import AccommodationDetail from "@/components/accommodations/AccommodationDetail";
import { useParams } from "next/navigation";

const AccommodationDetailsPage = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id || "";
  return <AccommodationDetail id={id} />;
};

export default AccommodationDetailsPage;
