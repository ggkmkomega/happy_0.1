"use client";

import {
  CalendarDays,
  MoveRightIcon,
  UserRound
} from "lucide-react";
import { useState } from "react";
import { Button } from "~/_components/ui/button";

// calender
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Calendar } from "~/_components/ui/calendar";

import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "~/_components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/_components/ui/popover";
import { cn } from "~/lib/utils";
import AttendanceSelector from "./AttendanceSelector";
import LocationSelect from "./LocationSelect";

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

const SearchBar = () => {

  const router = useRouter()

  const searchParams = useSearchParams()
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      locationSelect: { label: "", value: "" },
      attendanceSelector: { adults: 1, children: 0, rooms: 1 },
      datePicker: {
        from: undefined,
        to: undefined,
      },
    },
  });

  form.watch();

  return (
    <>
      <div className="flex h-full w-full flex-col gap-1 py-5 md:flex-row">
        <div className="grid w-full grid-cols-3 gap-x-1 gap-y-1 ">
          {/* Location selection */}
          <div className="relative col-span-3 rounded-sm bg-white text-sm font-medium md:col-span-1">
            <LocationSelect form={form} />
          </div>

          {/* date picker */}
          <div className="relative col-span-3 flex rounded-sm bg-white text-sm font-medium md:col-span-1">
            <Form {...form}>
              <form className="w-full">
                <FormField
                  name="datePicker"
                  render={({ field }) => (
                    <FormItem className="flex h-full flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl className="h-full py-3">
                            <Button
                              variant={"outline"}
                              className={cn(
                                "flex w-full justify-start pl-1 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarDays className="w-[2rem] px-1 text-gray-600" />
                              {field.value.from && field.value.to ? (
                                format(field.value.from, "PPP") +
                                "-" +
                                format(field.value.to, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Calendar
                            mode="range"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>

          {/* How many people? popover */}
          <div className="col-span-3 flex items-center rounded-sm bg-white text-sm font-medium md:col-span-1">
            <Popover>
              <PopoverTrigger className="flex h-full w-full items-center px-1 py-3 text-gray-600">
                <UserRound className="w-[2rem]" />
                {form.watch("attendanceSelector.adults")} adults -{" "}
                {form.watch("attendanceSelector.children")} children -{" "}
                {form.watch("attendanceSelector.rooms")} room
              </PopoverTrigger>
              <PopoverContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="text-md font-bold">Adults</div>
                  <AttendanceSelector form={form} name="adults" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-md font-bold">Children</div>
                  <AttendanceSelector form={form} name="children" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-md font-bold">Rooms</div>
                  <AttendanceSelector form={form} name="rooms" />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex items-center">
          <Button
            onClick={() => {
              const formValues = form.getValues();
 
              const searchObject = {
                rooms: formValues.attendanceSelector.rooms,
                adults: formValues.attendanceSelector.adults,
                children: formValues.attendanceSelector.children,
                location: formValues.locationSelect.label,
                start: formValues.datePicker.from,
                end: formValues.datePicker.to,
              }

              // @ts-ignore
              const url = new URLSearchParams(searchObject).toString();

              router.push(`/listings?${url}`)
            }}
            variant={"default"}
            className="h-full w-full  bg-pink-500 text-lg font-bold hover:bg-pink-600"
          >
            <div className="flex items-center px-2">
              Search
              <MoveRightIcon className="ms-2" />
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
