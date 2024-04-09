"use client";
//UI
import Image from "next/image";
import { CalendarIcon, ChevronLeft, Upload, XIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useState,
} from "react";
import { type DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { cn } from "~/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Calendar } from "~/components/ui/calendar";
//images
import { ReactSortable } from "react-sortablejs";
//Map
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
//
import { listingInput, type ListingEditRequired } from "~/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Badge } from "~/components/ui/badge";

interface ListingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  existingListing: ListingEditRequired;
}

export function EditListing({ existingListing }: ListingFormProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [selectedImage, setSelectedImage] = useState<string[]>([]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("images", selectedImage);
    const files = Array.from(e.target.files ?? []);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImage((prevImages) => [...(prevImages ?? []), ...imageUrls]);
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBl6iwyHZvDVMDunaF6Toa9uA3T6oOIgQg",
  });
  const [map, setMap] = useState();
  const center = {
    lat: -3.745,
    lng: -38.523,
  };
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  type TlistingInput = z.infer<typeof listingInput>;

  const form = useForm<TlistingInput>({
    resolver: zodResolver(listingInput),
    defaultValues: existingListing,
  });

  const updateListing = api.listing.update.useMutation();
  //const createImage = api.images.create.useMutation();

  const onSubmit = async (data: TlistingInput) => {
    updateListing.mutate({ id: existingListing.id, data });
    router.push("/dashboard");
  };

  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className=" mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-4 flex items-center gap-4">
                  <Button variant="outline" size="icon" className="h-7 w-7">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                  </Button>
                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Edit Listing
                  </h1>
                  <Badge variant="destructive">Not Visible</Badge>
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button variant="outline" size="sm">
                      Discard
                    </Button>
                    <Button size="sm">Save Changes</Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Listing Details</CardTitle>
                        <CardDescription>
                          This information will be displayed publicly so be
                          careful what you share.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="name">Username</FormLabel>
                                  <FormControl>
                                    <Input
                                      id="name"
                                      className="w-full"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    This is your Listing&apos;s public display
                                    name.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid  gap-3">
                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="description">
                                    Description
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea
                                      id="description"
                                      className="resize-none"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Describe the listing&apos;s surroundings and
                                    features.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                      <CardHeader>
                        <CardTitle>Product Images</CardTitle>
                        <CardDescription>Listing images </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <div>
                            {selectedImage === undefined ? (
                              <UploadImage
                                handleImageChange={handleImageChange}
                              />
                            ) : selectedImage.length === 4 ? (
                              <ImagesDisplay
                                selectedImage={selectedImage}
                                setSelectedImage={setSelectedImage}
                              />
                            ) : (
                              <>
                                <ImagesDisplay
                                  selectedImage={selectedImage}
                                  setSelectedImage={setSelectedImage}
                                />
                                <UploadImage
                                  handleImageChange={handleImageChange}
                                />
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Listing Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <Label htmlFor="status">Status</Label>
                            <Select>
                              <SelectTrigger
                                id="status"
                                aria-label="Select status"
                              >
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="InActive">
                                  InActive
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Listing Type</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="type"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="category">
                                    Category:
                                  </FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger
                                        id="category"
                                        aria-label="Select category"
                                      >
                                        <SelectValue placeholder="Select category" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="Apartement">
                                        Apartement
                                      </SelectItem>
                                      <SelectItem value="House">
                                        House
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormDescription>
                                    Select the type of Listing you are adding.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Availability Date</CardTitle>
                        <CardDescription>
                          Let the users Know when is your Listing available.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className={cn("grid gap-2")}>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                  "w-[300px] justify-start text-left font-normal",
                                  !date && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date?.from ? (
                                  date.to ? (
                                    <>
                                      {format(date.from, "LLL dd, y")} -{" "}
                                      {format(date.to, "LLL dd, y")}
                                    </>
                                  ) : (
                                    format(date.from, "LLL dd, y")
                                  )
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Listing Address</CardTitle>
                        <CardDescription>
                          Let the users Know where is your Listing at.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="City">city</FormLabel>
                                  <FormControl>
                                    <Input id="City" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    Listing&apos;s City
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="province"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="Provinance">
                                    Provinance
                                  </FormLabel>
                                  <FormControl>
                                    <Input id="Provinance" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    Listing&apos;s Provinance
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="street"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="street">Street</FormLabel>
                                  <FormControl>
                                    <Input id="street" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    Listing&apos;s Street
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Place on Map</CardTitle>
                        <CardDescription>
                          Put a marker for your users.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {isLoaded ? (
                          <GoogleMap
                            mapContainerStyle={{
                              width: "400px",
                              height: "400px",
                            }}
                            center={center}
                            zoom={10}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                          ></GoogleMap>
                        ) : (
                          <p>Map</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 md:hidden">
                  <Button
                    onClick={() => {
                      console.log("Discard");
                      router.push("/dashboard");
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Discard
                  </Button>
                  <Button type="submit" size="sm">
                    Save Product
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default EditListing;

const UploadImage = ({
  handleImageChange,
}: {
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <label htmlFor="uploadImage">
        <div className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed hover:cursor-pointer hover:bg-pink-200 ">
          <Upload className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Upload</span>
        </div>
      </label>
      <input
        multiple
        className="hidden"
        id="uploadImage"
        type="file"
        onChange={(e) => {
          handleImageChange(e);
        }}
      />
    </>
  );
};

const ImagesDisplay = ({
  selectedImage,
  setSelectedImage,
}: {
  selectedImage: string[];
  setSelectedImage: Dispatch<SetStateAction<string[]>>;
}) => {
  //possible performance issue => <Recalculate images every rerender>
  const images = selectedImage.map((image) => ({ id: image, link: image }));
  return (
    <>
      <ReactSortable
        className="grid grid-cols-3 gap-2"
        list={images}
        setList={(images) => {
          setSelectedImage(images.map((image) => image.link));
        }}
      >
        {selectedImage?.map((image) => (
          <div key={image}>
            <XIcon
              className="absolute m-2 rounded-sm bg-white p-1 text-red-700 shadow-md hover:cursor-pointer hover:bg-red-400 hover:text-white"
              onClick={() => {
                setSelectedImage((prevImages) =>
                  prevImages?.filter((img) => img !== image),
                );
              }}
            />
            <Image
              alt="Product image"
              className="aspect-square w-full rounded-md object-cover"
              height="84"
              src={image}
              width="84"
            />
          </div>
        ))}
      </ReactSortable>
    </>
  );
};
