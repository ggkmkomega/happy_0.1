"use client";

import { type Image as ImageDbType } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

// shadcn stuff
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import {
  CigaretteOff,
  Coffee,
  Heater,
  Loader2,
  MapPinIcon,
  ParkingCircle,
  PinIcon,
  Snowflake,
  Users,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarImage } from "~/_components/ui/avatar";
import { Button } from "~/_components/ui/button";
import { Calendar } from "~/_components/ui/calendar";
import { Card, CardHeader, CardTitle } from "~/_components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/_components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/_components/ui/dialog";
import { Form, FormField, FormItem } from "~/_components/ui/form";
import { useToast } from "~/_components/ui/use-toast";
import { api } from "~/trpc/react";
import AttendanceSelector from "./AttendanceSelector";
import { type SingleListing } from "~/types";
type datesDB = {
  startDate: Date;
  endDate: Date;
};

const FormSchema = z.object({
  datePicker: z.object({
    from: z.date({
      required_error: "A start date is required.",
    }),
    to: z.date({
      required_error: "An end date is required.",
    }),
  }),
  locationSelect: z.object({
    value: z.string(),
    label: z.string(),
  }),
  attendanceSelector: z.object({
    adults: z.number(),
    children: z.number(),
    rooms: z.number(),
  }),
  price: z.number(),
});

const ListingHeader = ({
  title,
  location,
}: {
  title: string;
  location: string;
}) => {
  return (
    <>
      <div className="hidden cursor-pointer md:flex ">
        <Link
          href={"#name"}
          className="border-b-2 border-blue-500 px-24 py-3 hover:bg-slate-100"
        >
          Overview
        </Link>
        <Link href={"#info"} className="px-24 py-3 hover:bg-slate-100">
          Info & Prices
        </Link>
      </div>

      {/* title & rating */}
      <div className="py-4">
        <h1 className="py-2 text-2xl font-bold uppercase">{title}</h1>
        <div className="flex items-center gap-x-3">
          {" "}
          <MapPinIcon /> {location} <Button>show map</Button>
        </div>
      </div>
    </>
  );
};

const ListingImages = ({ listing }: { listing: SingleListing }) => {
  if (!listing) {
    return null;
  }
  const images = listing.images;

  return (
    <div className="justify-around gap-x-4 py-3 md:flex">
      <div className="md:w-[69vw]">
        <Carousel className="">
          <CarouselContent>
            {images.map((image: ImageDbType) => {
              return (
                <CarouselItem key={image.id} className="h-[80vh] w-[60vw]">
                  <Image
                    key={image.id}
                    className="h-full w-full object-cover"
                    width={1000}
                    height={900}
                    alt=""
                    src={image.url}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className=" -left-2 rounded-full" />
          <CarouselNext className=" -right-2 rounded-full " />
        </Carousel>
      </div>
      <div className="hidden w-[25vw] flex-col  items-center justify-start gap-y-4 md:flex">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={listing.createdBy.image ?? ""} />
              </Avatar>
              {listing.createdBy.name}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div>Price : DZD {listing.price}.00</div>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

const ReserveCard = ({
  listing,
  dates,
}: {
  listing: SingleListing;
  dates: datesDB[];
}) => {
  // dialogue state
  const [open, setOpen] = useState(false);

  const newdates = dates.map((onedate) => ({
    from: new Date(onedate.startDate),
    to: new Date(onedate.endDate),
  }));

  const { toast } = useToast();

  const { mutate: createReservation, isLoading } =
    api.reservation.createReservation.useMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      locationSelect: { label: "", value: "" },
      attendanceSelector: { adults: 1, children: 0, rooms: 1 },
      datePicker: {
        from: new Date(),
        to: undefined,
      },
      price: 0,
    },
  });
  if (!listing) return null;

  form.watch();

  const calculatePrice = (from: Date, to: Date, price: number) => {
    const fromDayJs = dayjs(from);
    const toDayJs = dayjs(to);

    const numberOfDays = toDayJs.diff(fromDayJs, "days");

    return price * numberOfDays;
  };

  return (
    <>
      <div className="space-y-4 rounded-sm bg-blue-100 px-5 py-4">
        <h1 className="py-1 text-lg font-bold">Property highlights</h1>
        <div className="flex items-center gap-x-1 text-sm">
          <PinIcon className="text-sm" /> Top location: Highly rated by recent
          guests (8.7)
        </div>
        <div className="flex items-center gap-x-1 text-sm">
          <ParkingCircle className="text-sm" />
          Free private parking available at the hotel
        </div>
        <div className="space-y-3 py-3">
          <div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  className="w-full bg-pink-500 hover:bg-pink-600"
                  size={"lg"}
                >
                  Reserve
                </Button>
              </DialogTrigger>
              <DialogContent className="">
                <DialogHeader>
                  <DialogTitle className="py-4">
                    Enter your trip details
                  </DialogTitle>
                  <DialogDescription>
                    <Form {...form}>
                      <FormField
                        name="datePicker"
                        render={({ field }) => (
                          <div className="flex gap-x-4">
                            <FormItem className="flex h-full flex-col">
                              <div className="w-[50%]">
                                <Calendar
                                  mode="range"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  fromDate={new Date()}
                                  disabled={newdates}
                                  initialFocus
                                  className="w-fit"
                                />
                              </div>
                            </FormItem>
                            <FormItem className="flex h-full flex-col gap-y-3">
                              <div className="flex items-center justify-between gap-x-2">
                                <div className="text-md font-bold">Adults</div>
                                <AttendanceSelector form={form} name="adults" />
                              </div>
                              <div className="flex items-center justify-between gap-x-2">
                                <div className="text-md font-bold">
                                  Children
                                </div>
                                <AttendanceSelector
                                  form={form}
                                  name="children"
                                />
                              </div>
                              <div className="flex items-center justify-between gap-x-2">
                                <div className="text-md font-bold">Rooms</div>
                                <AttendanceSelector form={form} name="rooms" />
                              </div>
                            </FormItem>
                          </div>
                        )}
                      />
                      <Button
                        onClick={() => {
                          const { datePicker, attendanceSelector } =
                            form.getValues();

                          const price = calculatePrice(
                            datePicker.from,
                            datePicker.to,
                            listing.price,
                          );

                          createReservation(
                            {
                              startDate: datePicker.from,
                              endDate: datePicker.to,
                              adults: attendanceSelector.adults,
                              children: attendanceSelector.children,
                              rooms: attendanceSelector.rooms,
                              listingId: listing.id,
                              hostId: listing.createdById,
                              price: price,
                            },
                            {
                              onSuccess: () => {
                                setOpen(false);
                                toast({
                                  title: "Sucess",
                                  description:
                                    "You have made a new reservation!",
                                });
                              },
                            },
                          );
                        }}
                        className="w-full bg-pink-500 hover:bg-pink-600"
                        size={"lg"}
                      >
                        {isLoading ? (
                          <Loader2 className="animate-spin text-xl" />
                        ) : (
                          "Reserve"
                        )}
                      </Button>
                    </Form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <Button className="w-full" variant={"outline"} size={"lg"}>
              Save The Property
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const Description = ({
  listing,
  dates,
}: {
  listing: SingleListing;
  dates: datesDB[];
}) => {
  if (!listing) return null;
  return (
    <div id="info" className="justify-between gap-x-4 md:flex">
      <div className="md:w-[70%]">
        <div className="whitespace-pre-wrap py-4 ">{listing.description}</div>
        <h3 className="pb-3 text-lg font-bold">Most popular facilities</h3>
        <div className="flex w-5/6 flex-wrap gap-4">
          <div className="flex gap-1">
            <CigaretteOff className="text-green-600" />
            Non-smoking rooms
          </div>
          <div className="flex gap-1">
            <Users className="text-green-600" />
            Family rooms
          </div>
          <div className="flex gap-1">
            <Wifi className="text-green-600" />
            Free Wifi
          </div>
          <div className="flex gap-1">
            <Heater className="text-green-600" />
            Heating
          </div>
          <div className="flex gap-1">
            <Snowflake className="text-green-600" />
            Air conditioning
          </div>
          <div className="flex gap-1">
            <Coffee className="text-green-600" />
            Tea/coffee maker in all rooms
          </div>
        </div>
      </div>
      <div className="pr-4 md:w-[30%]">
        <ReserveCard listing={listing} dates={dates} />
      </div>
    </div>
  );
};

function ViewListing({
  listing,
  dates,
}: {
  listing: SingleListing;
  dates: datesDB[];
}) {
  if (!listing) return null;
  const locationString =
    listing.city + " " + listing.province + " " + listing.street;
  return (
    <section className="md:px-3">
      <ListingHeader title={listing.name} location={locationString} />
      <ListingImages listing={listing} />
      <Description listing={listing} dates={dates} />
      {/* <Ratings /> */}
    </section>
  );
}

export default ViewListing;
