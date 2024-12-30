import { useEffect, useState } from "react";
import { AccommodationDetails } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  FaArrowLeft,
  FaStar,
  FaMapMarkerAlt,
  FaShareAlt,
  FaCalendar,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { DayPicker, DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";
import "react-day-picker/dist/style.css";
import { generateDescription } from "@/services/openaiService";
import SimilarPlaces from "@/components/accommodations/SimilarAccommodations";
import { useAccommodations } from "@/context/AccommodationsContext";
import AccommodationGallery from "@/components/accommodations/AccommodationGallery";
import Loader from "../common/Loader";
import Link from "next/link";
import { generateDefaultDescription } from "@/utils/generateDescription";

interface AccommodationDetailProps {
  id: string;
}

const AccommodationDetail: React.FC<AccommodationDetailProps> = ({ id }) => {
  const [data, setData] = useState<AccommodationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const [rooms, setRooms] = useState<number>(1);
  const [people, setPeople] = useState<number>(1);
  const [message, setMessage] = useState("");
  const { showModal } = useAccommodations();

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://python-engine-staging.athlostravel.com/accommodations/${id}`
        );

        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();

        if (!result.description) {
          result.description = generateDefaultDescription();
        }
        result.photos = result.photos?.split(",") || [];
        setData(result);
      } catch (err: unknown) {
        const error = err as Error;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = () => {
    setTimeout(() => {
      showModal("success", "Your request has been submitted successfully!");
      setRooms(1);
      setPeople(1);
      setMessage("");
      setDateRange(undefined);
    }, 1000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data?.name || "Accommodation Details",
        text: data?.description || "Check out this accommodation!",
        url: window.location.href,
      });
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto pb-8">
      <Button
        variant="default"
        className="mb-4 flex items-center bg-primary text-white hover:bg-primary/90 transition-colors"
        onClick={() => router.back()}
      >
        <FaArrowLeft className="mr-2" /> Back
      </Button>

      <Card className="shadow-md mx-auto w-full">
        <CardHeader className="p-4 md:p-8">
          <div className="flex justify-start gap-4 items-center">
            <h1 className="text-3xl font-bold text-gray-800">{data?.name}</h1>
            <div className="flex">
              {Array.from({ length: data?.category || 0 }, (_, i) => (
                <FaStar key={`filled-${i}`} className="text-yellow-500" />
              ))}
              {Array.from({ length: 5 - (data?.category || 0) }, (_, i) => (
                <FaStar key={`grey-${i}`} className="text-gray-300" />
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 gap-4">
            <div className="flex gap-4">
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2" />
                {data?.location}
              </div>
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex items-center"
              >
                <FaShareAlt className="mr-2" />
                Share
              </Button>
            </div>

            <div className="flex gap-4">
              {data?.contact_email && (
                <Button asChild variant="outline">
                  <Link href={`mailto:${data.contact_email}`}>
                    <FaEnvelope />
                    Email
                  </Link>
                </Button>
              )}
              {data?.contact_phone && (
                <Button asChild>
                  <Link href={`tel:${data.contact_phone}`}>
                    <FaPhoneAlt />
                    Call
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {data?.photos && <AccommodationGallery photos={data.photos} />}
        </CardHeader>

        <CardContent className="p-4 md:p-8 gap-4 flex flex-col">
          <div className="flex flex-col md:flex-row gap-8">
            <div className=" flex-grow">
              <h2 className="text-lg font-bold">Overview</h2>
              {data?.description ? (
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              ) : (
                <p>No description available.</p>
              )}
            </div>

            <div className="flex flex-col w-full md:w-80 justify-end border-[1px] shadow-lg rounded-xl p-6 gap-4">
              <h3 className="text-lg font-bold mb-2">Request Information</h3>
              <div className="flex gap-4 justify-between">
                <div className="flex flex-col gap-4 flex-grow">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-60 flex justify-center gap-8"
                      >
                        <FaCalendar className="" />
                        {dateRange?.from
                          ? new Intl.DateTimeFormat("en-GB", {
                            day: "numeric",
                            month: "short",
                          }).format(dateRange.from)
                          : "Check-in"}{" "}
                        -{" "}
                        {dateRange?.to
                          ? new Intl.DateTimeFormat("en-GB", {
                            day: "numeric",
                            month: "short",
                          }).format(dateRange.to)
                          : "Check-out"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-82 left-12">
                      <DayPicker
                        mode="range"
                        selected={dateRange}
                        className="w-auto"
                        onSelect={(range) => setDateRange(range)}
                      />
                    </PopoverContent>
                  </Popover>

                  <span className="text-sm font-semibold">Group size</span>
                  <div className="flex gap-4 items-center">
                    <span className="text-sm font-medium w-20">Adults</span>
                    <div className="flex gap-4 border-[1px] rounded-lg items-center">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          setPeople((prev) => Math.max(1, prev - 1))
                        }
                      >
                        -
                      </Button>
                      <span>{people}</span>
                      <Button
                        variant="secondary"
                        onClick={() => setPeople((prev) => prev + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="text-sm font-medium w-20">Rooms</span>
                    <div className="flex gap-4 border-[1px] rounded-lg items-center">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          setRooms((prev) => Math.max(1, prev - 1))
                        }
                      >
                        -
                      </Button>
                      <span>{rooms}</span>
                      <Button
                        variant="secondary"
                        onClick={() => setRooms((prev) => prev + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <span className="text-sm font-semibold">
                    Additional Notes
                  </span>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message"
                    className="w-full h-32"
                  />
                </div>
              </div>
              <Button className="w-32" onClick={handleSubmit}>
                Submit Request
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold mb-2">Location</h3>
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.146588298711!2d-0.1276258835530407!3d51.5073509796356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTEuNTA3MzUxLC0wLjEyNzYyNQ!5e0!3m2!1sen!2s!4v1632918404856!5m2!1sen!2s"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              className="w-full h-80 rounded-lg shadow-md"
            ></iframe>
          </div>
          <SimilarPlaces currentId={data?.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccommodationDetail;
