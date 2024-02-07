"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Listing } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { api } from "~/trpc/react";

import { listingInput } from "~/types";
import { UploadButton, UploadDropzone } from "~/utils/uploadthing";

interface ListingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  listing: Listing;
}

export default function CreateListing({
  listing: existingListing,
}: ListingFormProps) {
  type TlistingInput = z.infer<typeof listingInput>;

  const [images, setImages] = useState([""]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TlistingInput>({ resolver: zodResolver(listingInput) });

  const updateListing = api.listing.update.useMutation();

  const onSubmit = async (data: TlistingInput) => {
    //updateListing.mutate(data);
    //reset();

    const updatedData: TlistingInput & { images: string[] } = {
      ...data,
      images,
    };

    updateListing.mutate({ data: updatedData, id: existingListing.id });

    reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
        encType="multipart/form-data"
      >
        <div>
          <label>name</label>
          <input
            {...register("name")}
            type="text"
            defaultValue={`${existingListing.name}`}
            className="w-full rounded-full px-4 py-2 text-black"
          />
          {errors.name && (
            <p className="text-red-500">{`${errors.name.message}`}</p>
          )}
        </div>

        <div>
          <label>description</label>
          <input
            {...register("description")}
            type="text"
            defaultValue={`${existingListing.description}`}
            className="w-full rounded-full px-4 py-2 text-black"
          />
          {errors.description && (
            <p className="text-red-500">{`${errors.description.message}`}</p>
          )}
        </div>

        <div>
          <label>adress</label>
          <input
            {...register("address")}
            type="text"
            defaultValue={`${existingListing.address}`}
            className="w-full rounded-full px-4 py-2 text-black"
          />
          {errors.address && (
            <p className="text-red-500">{`${errors.address.message}`}</p>
          )}
        </div>

        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      <div className="w-16">
        <UploadDropzone
          endpoint="listingImageUploader"
          onClientUploadComplete={(res) => {
            res.map((image) => {
              setImages((prevImages) => [...prevImages, image.url]);
            });
            console.log("image: ", images);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
    </>
  );
}
