"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

const counterSchema = z.number().min(0).max(20)

const AttendanceSelector = ({ form, name }: { form: any, name: string }) => {
    const { setValue, getValues } = form;
    const [counter, setCounter] = useState(getValues("attendanceSelector")[name]);

    function handleCounter(increase: boolean): void {
        if (increase && counterSchema.safeParse(counter + 1).success) {
            setCounter(counter + 1)
            setValue("attendanceSelector", { ...getValues("attendanceSelector"), [name]: counter + 1 });
        }
        else if (!increase && counterSchema.safeParse(counter - 1).success) {
            setCounter(counter - 1)
            setValue("attendanceSelector", { ...getValues("attendanceSelector"), [name]: counter - 1 });
        }
    }

    return (
        <div className="flex w-fit rounded-sm overflow-hidden border border-black">
            <button
                onClick={() => { handleCounter(true) }}
                className=" hover:bg-pink-100 bg-opacity-5 px-2 py-2 flex items-center">
                <Plus className="text-pink-600" />
            </button>
            <div className="py-2 min-w-[60px] flex items-center justify-center text-xl">
                {counter}
            </div>
            <button
                onClick={() => { handleCounter(false) }}
                className="hover:bg-pink-100 bg-opacity-5 px-2 py-2 flex items-center">
                <Minus className="text-xl text-pink-600" />
            </button>
        </div>
    );
}

export default AttendanceSelector;