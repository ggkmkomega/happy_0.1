"use client";

import { Listing } from "@prisma/client";
import Link from "next/link";
import { useCallback, useState } from "react";

// shadcn stuff
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Loader2, MapPinIcon, ParkingCircle, PinIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "~/_components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/_components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/_components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/_components/ui/dialog";
import { Calendar } from "~/_components/ui/calendar";
import { Form, FormField, FormItem } from "~/_components/ui/form";
import { useForm } from "react-hook-form";
import AttendanceSelector from "./AttendanceSelector";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "~/trpc/react";
import { useToast } from "~/_components/ui/use-toast";


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
});



const ListingHeader = ({ title, location }: { title: string, location: string }) => {
  return (
    <>
      <div className="md:flex hidden cursor-pointer ">
        <Link href={"#name"} className="hover:bg-slate-100 py-3 px-24 border-b-2 border-blue-500">Overview</Link>
        <Link href={"#info"} className="hover:bg-slate-100 py-3 px-24">Info & Prices</Link>
        <Link href={"#ratings"} className="hover:bg-slate-100 py-3 px-24">Guest Reviews</Link>
        <Link href={"#"} className="hover:bg-slate-100 py-3 px-24">FAQ</Link>
      </div>

      {/* title & rating */}
      <div className="py-4">
        <h1 className="uppercase text-2xl font-bold py-2">{title}</h1>
        <div className="flex gap-x-3 items-center"> <MapPinIcon /> {location}  <Button>show map</Button></div>
      </div>
    </>
  )
}

const ListingImages = ({ images }: { images: any }) => {

  return (
    <div className="md:flex justify-around gap-x-4 py-3">
      <div className="md:w-[69vw]">
        <Carousel className="">
          <CarouselContent>
            {images.map((image: any) => {
              return (
                <CarouselItem key={image.id} className="h-[80vh] w-[60vw]" >
                  <Image key={image.id} className="object-cover h-full w-full" width={1000} height={900} alt="" src={image.url}
                  />
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className=" rounded-full -left-2" />
          <CarouselNext className=" rounded-full -right-2 " />
        </Carousel>
      </div>
      <div className="w-[25vw] gap-y-4 hidden  md:flex flex-col justify-start items-center">
        <Carousel className="px-4 max-w-full">
          <CarouselContent className="">
            <CarouselItem className="">
              <RatingCard />
            </CarouselItem>
            <CarouselItem className="">
              <RatingCard />
            </CarouselItem>
            <CarouselItem className="">
              <RatingCard />
            </CarouselItem>
            <CarouselItem className="">
              <RatingCard />
            </CarouselItem>
            <CarouselItem className="">
              <RatingCard />
            </CarouselItem>
            <CarouselItem className="">
              <RatingCard />
            </CarouselItem>
          </CarouselContent>


          <CarouselPrevious className="absolute  h-10 w-10 rounded-full -left-2 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute h-10 w-10 rounded-full -right-2 top-1/2 -translate-y-1/2 " />
        </Carousel>

        <Map />
      </div>
    </div>
  )
}

const ReserveCard = ({ listingId }: { listingId: string }) => {
  // dialogue state
  const [open, setOpen] = useState(false)

  const { toast } = useToast()

  const { mutate: createReservation, isLoading, isSuccess } = api.reservation.createReservation.useMutation()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      locationSelect: { label: "", value: "" },
      attendanceSelector: { adults: 1, children: 0, rooms: 1 },
      datePicker: {
        from: new Date(),
        to: undefined,
      },
    },
  });

  form.watch();

  return (
    <>
      <div className="py-4 px-5 space-y-4 bg-blue-100 rounded-sm">
        <h1 className="text-lg font-bold py-1">Property highlights</h1>
        <div className="flex items-center gap-x-1 text-sm"><PinIcon className="text-sm" /> Top location: Highly rated by recent guests (8.7)</div>
        <div className="flex items-center gap-x-1 text-sm"><ParkingCircle className="text-sm" /> Free private parking available at the hotel</div>
        <div className="space-y-3 py-3">
          <div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  className="w-full bg-pink-500 hover:bg-pink-600" size={"lg"}>Reserve</Button>
              </DialogTrigger>
              <DialogContent className="">
                <DialogHeader>
                  <DialogTitle className="py-4">Enter your trip details</DialogTitle>
                  <DialogDescription >
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
                                  disabled={(date) =>
                                    date < new Date() || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                  className="w-fit"
                                />
                              </div>
                            </FormItem>
                            <FormItem className="flex gap-y-3 h-full flex-col">
                              <div className="flex gap-x-2 items-center justify-between">
                                <div className="text-md font-bold">Adults</div>
                                <AttendanceSelector form={form} name="adults" />
                              </div>
                              <div className="flex gap-x-2 items-center justify-between">
                                <div className="text-md font-bold">Children</div>
                                <AttendanceSelector form={form} name="children" />
                              </div>
                              <div className="flex gap-x-2 items-center justify-between">
                                <div className="text-md font-bold">Rooms</div>
                                <AttendanceSelector form={form} name="rooms" />
                              </div>
                            </FormItem>
                          </div>
                        )}
                      />
                      <Button onClick={() => {
                        const { datePicker, attendanceSelector } = form.getValues();

                        createReservation({
                          startDate: datePicker.from,
                          endDate: datePicker.to,
                          adults: attendanceSelector.adults,
                          children: attendanceSelector.children,
                          rooms: attendanceSelector.rooms,
                          listingId: listingId
                        }, {
                          onSuccess: () => {
                            setOpen(false);
                            toast({
                              title: "Sucess",
                              description: "You have made a new reservation!",
                            })
                          }
                        })

                      }}
                        className="w-full bg-pink-500 hover:bg-pink-600" size={"lg"}>
                        {isLoading ?
                          <Loader2 className="text-xl animate-spin" />
                          :
                          "Reserve"
                        }
                      </Button>
                    </Form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div><Button className="w-full" variant={"outline"} size={"lg"}>Save The Property</Button></div>
        </div>
      </div>
    </>
  )
}

const Description = ({ listing }: { listing: Listing }) => {
  return (
    <div id="info" className="md:flex justify-between gap-x-4">
      <div className="md:w-[70%]">
        <div className="whitespace-pre-wrap py-4 ">
          {listing.description}
        </div>
      </div>
      <div className="md:w-[30%]">
        <ReserveCard listingId={listing.id} />
      </div>
    </div>
  )
}

const RatingCard = () => {
  return (
    <Card>
      <CardHeader className="p-3">
        <div className="flex items-center gap-x-1">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Yamina</CardTitle>
            <CardDescription>United Kingdom</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p>“The room is clean & modernly built.
          The breakfast is excellent, with all sorts of freshly made cake & fruits, with lots of choice.
          The staff is very friendly & although I was a single woman I was very well received, not like other hotels I have...”</p>
      </CardContent>
    </Card>
  )
}

const Ratings = () => {
  return (
    <section id="ratings" className="py-8 md:py-0">
      <h1 className="text-lg font-bold py-2">See what guests loved the most:</h1>
      <div className="max-w-screen">
        <Carousel className="md:px-4">
          <CarouselContent className="">
            <CarouselItem className="md:basis-1/3">
              <RatingCard />
            </CarouselItem>
            <CarouselItem className="md:basis-1/3">
              <RatingCard />
            </CarouselItem>
            <CarouselItem className="md:basis-1/3">
              <RatingCard />
            </CarouselItem>
            <CarouselItem className="md:basis-1/3">
              <RatingCard />
            </CarouselItem>
            <CarouselItem className="md:basis-1/3">
              <RatingCard />
            </CarouselItem>
            <CarouselItem className="md:basis-1/3">
              <RatingCard />
            </CarouselItem>
          </CarouselContent>


          <CarouselPrevious className="absolute  h-10 w-10 rounded-full -left-2 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute h-10 w-10 rounded-full -right-2 top-1/2 -translate-y-1/2 " />
        </Carousel>

      </div>

    </section>
  )
}


const Map = () => {

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBl6iwyHZvDVMDunaF6Toa9uA3T6oOIgQg",
  });

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
  }
    , []);

  const onUnmount = useCallback(function callback() {
    // setMap(null);
  }, []);

  return (
    <div className="rounded-lg overflow-clip">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            width: "290px",
            height: "200px",
          }}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        ></GoogleMap>
      ) : (
        <p>Map</p>
      )}
    </div>
  )
}
function ViewListing({ listing }: { listing: Listing }) {

  const locationString = listing.city + " " + listing.province + " " + listing.street;
  console.log(locationString);

  return (
    <section className="md:px-3">
      <ListingHeader title={listing.name} location={locationString} />
      <ListingImages images={listing.images} />
      <Description listing={listing} />
      <Ratings />
    </section>
  );
}

export default ViewListing;
