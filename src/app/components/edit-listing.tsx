"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { api } from "~/trpc/react";

import { listingInput, type ListingEditRequired } from "~/types";
import { UploadDropzone } from "~/utils/uploadthing";

interface ListingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  existingListing: ListingEditRequired;
}

export default function EditListing({ existingListing }: ListingFormProps) {
  type TlistingInput = z.infer<typeof listingInput>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TlistingInput>({ resolver: zodResolver(listingInput) });

  const updateListing = api.listing.update.useMutation();
  const createImage = api.images.create.useMutation();

  const onSubmit = async (data: TlistingInput) => {
    updateListing.mutate({ id: existingListing.id, data });
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
            if (res) {
              res.map((image) => {
                createImage.mutate({
                  data: { id: image?.key, url: image?.url },
                  listingId: existingListing.id,
                });
              });
            }
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
      <div>
        {existingListing.images.length
          ? existingListing.images.map((image) => {
              return (
                <Image
                  width={500}
                  height={500}
                  key={image.id}
                  src={image.url}
                  alt="listing image"
                />
              );
            })
          : "Create the first Listing"}
      </div>
    </>
  );
}
