"use client";

import { CalendarDays, MapPin, Minus, MoveRight, MoveRightIcon, Plus, SearchIcon, UserRound } from "lucide-react";
import { Children, useState } from "react";
import Select, { ValueContainerProps, components } from 'react-select';
import { Button } from "~/components/ui/button";

// calender
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Calendar } from "~/components/ui/calendar";
import type { DateRange } from "react-day-picker"

import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "~/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import LocationSelect from "./LocationSelect";
import AttendanceSelector from "./AttendanceSelector";

const FormSchema = z.object({
    datePicker:
        z.object({
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
    })
});

const SearchBar = () => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            locationSelect: { label: "", value: "" },
            attendanceSelector: { adults: 1, children: 0, rooms: 1 },
            datePicker: {
                from: undefined,
                to: undefined,
            }
        }
    })

    form.watch()

    return (
        <>
            <div className="flex flex-col md:flex-row h-full gap-1 py-5 w-full">
                <div className="grid grid-cols-3 gap-x-1 gap-y-1 w-full ">

                    {/* Location selection */}
                    <div className="col-span-3 md:col-span-1 text-sm font-medium bg-white rounded-sm relative">
                        <LocationSelect form={form} />
                    </div>

                    {/* date picker */}
                    <div className="col-span-3 md:col-span-1 flex relative text-sm font-medium bg-white rounded-sm">
                        <Form {...form}>
                            <form className="w-full">
                                <FormField
                                    name="datePicker"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col h-full">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl className="h-full py-3">
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-1 flex justify-start text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarDays className="w-[2rem] px-1 text-gray-600" />
                                                            {field.value.from && field.value.to ? (
                                                                format(field.value.from, "PPP") + "-" + format(field.value.to, "PPP")
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
                    <div className="col-span-3 md:col-span-1 flex items-center text-sm font-medium bg-white rounded-sm">
                        <Popover>
                            <PopoverTrigger className="flex items-center py-3 text-gray-600 px-1 w-full h-full">
                                <UserRound className="w-[2rem]" />
                                {form.watch("attendanceSelector.adults")} adults - {form.watch("attendanceSelector.children")} children - {form.watch("attendanceSelector.rooms")} room
                            </PopoverTrigger>
                            <PopoverContent className="grid gap-4">
                                <div className="flex justify-between items-center">
                                    <div className="font-bold text-md">Adults</div>
                                    <AttendanceSelector form={form} name="adults" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="font-bold text-md">Children</div>
                                    <AttendanceSelector form={form} name="children" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="font-bold text-md">Rooms</div>
                                    <AttendanceSelector form={form} name="rooms" />
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="flex items-center">
                    <Button onClick={() => {
                        console.log(form.watch());
                        // console.log(form.getValues());
                    }} variant={"default"} className="h-full w-full  font-bold text-lg bg-pink-500 hover:bg-pink-600">
                        <div className="flex items-center px-2">
                            Search
                            <MoveRightIcon className="ms-2" />
                        </div>
                    </Button>
                </div>
            </div>
        </>
    );
}


export default SearchBar;