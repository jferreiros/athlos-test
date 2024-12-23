import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Image from "next/image";
import "react-photo-view/dist/react-photo-view.css";

const AccommodationGallery = ({ photos }: { photos: string[] }) => {
  if (!photos || photos.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 bg-gray-200 text-gray-500 rounded">
        No Photos Available
      </div>
    );
  }

  return (
    <PhotoProvider>
      <div className="grid grid-cols-3 gap-2 rounded overflow-hidden mt-4">
        {photos.length >= 3 ? (
          <>
            <PhotoView src={photos[0]}>
              <div className="relative col-span-2 cursor-pointer h-80 w-full">
                <Image
                  src={photos[0]}
                  alt="Main"
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
            </PhotoView>
            <div className="flex flex-col gap-2">
              {photos.slice(1, 3).map((photo, index) => (
                <PhotoView key={index} src={photo}>
                  <div className="relative cursor-pointer h-40 w-full">
                    <Image
                      src={photo}
                      alt={`Photo ${index + 2}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                </PhotoView>
              ))}
            </div>
          </>
        ) : (
          <PhotoView src={photos[0]}>
            <div className="relative col-span-3 cursor-pointer h-80 w-full">
              <Image
                src={photos[0]}
                alt="Main"
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
          </PhotoView>
        )}
      </div>
    </PhotoProvider>
  );
};

export default AccommodationGallery;
