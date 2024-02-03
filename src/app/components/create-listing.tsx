"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { api } from "~/trpc/react";

import { listingInput } from "~/types";
import { UploadButton } from "~/utils/uploadthing";

export default function CreateListing() {
  type TlistingInput = z.infer<typeof listingInput>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TlistingInput>({ resolver: zodResolver(listingInput) });

  const createListing = api.listing.create.useMutation();

  const onSubmit = async (data: TlistingInput) => {
    createListing.mutate(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <div>
        <label>name</label>
        <input
          {...register("name")}
          type="text"
          placeholder="Title"
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
          placeholder="description"
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
          placeholder="address"
          className="w-full rounded-full px-4 py-2 text-black"
        />
        {errors.address && (
          <p className="text-red-500">{`${errors.address.message}`}</p>
        )}
      </div>
      {/*<UploadButton
        endpoint="listingImageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />*/}
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
