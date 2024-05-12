"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PDFDocument } from "pdf-lib";

import Image from "next/image";
import { Input } from "@/components/ui/input";

import { eventFormSchema, updateFormSchema } from "@/lib/validator";
import { eventDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { UploadButton, UploadDropzone, Uploader } from "@/lib/uploadthing";
import { FileText, Pencil, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { createCategory } from "@/lib/actions/category.actions";

import sha256 from "crypto-js/sha256";
import { redirect } from "next/navigation";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { createOrder, updateOrders } from "@/lib/actions/order.actions";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";

const UpdateForm = ({ order, orderId }: any) => {
  const initialValues = order && {
    status: order.status,
    deliveryDateAndTime: order.deliveryDateAndTime,
    adminDate: new Date(),
  };
  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: initialValues,
  });
  const router = useRouter();

  async function onSubmit(values: any) {
    console.log("On submit working");
    console.log(values);

    try {
      const updatedEvent = await updateOrders({
        order: { ...values, _id: orderId },
        path: `/orders/${orderId}`,
      });

      if (updatedEvent) {
        form.reset();
        router.push(`/admin/orders`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="flex flex-col item-center gap-4">
          <div className="flex flex-center flex-col">
            <h4 className="h3-bold flex item-center">Current Details</h4>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                  {order.category.name}
                </p>
              </div>

              <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                by{" "}
                <span className="text-primary-500">
                  {order.buyer.firstName} {order.buyer.lastName}
                </span>
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-4 justify-center">
              <Image
                src="/assets/icons/copies-svgrepo-com.svg"
                alt="campass"
                width={32}
                height={32}
              />
              <p className="p-bold-20 text-grey-600 mr-10">Status</p>
            </div>

            <p className="p-medium-16 lg:p-regular-20 flex gap-4 justify-center">
              {order.status}
            </p>
          </div>

          {/* Time slots */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-4 justify-center">
              <Image
                src="/assets/icons/document-svgrepo-com.svg"
                alt="doc"
                width={32}
                height={32}
              />
              <p className="p-bold-20 text-grey-600 mr-10 ">Slot Assigned</p>
            </div>

            <p className="p-medium-16 lg:p-regular-20 flex gap-4 justify-center">
              {order.deliveryDateAndTime}
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex gap-2 md:gap-3">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={32}
                height={32}
              />
              <div className="p-medium-16 lg:p-regular-20 flex flex-col flex-wrap ">
                <div className="flex gap-2">
                  <p className="p-bold-20 text-grey-600">Selected Date:</p>
                  <p className="ml-24">
                    {formatDateTime(order.dateAndTime).dateOnly}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="p-bold-20 text-grey-600">
                    Selected Time Slots:
                  </p>
                  <p className="ml-10">{order.userTimeSlot}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex gap-2 md:gap-3">
              <Image
                src="/assets/icons/event-date-and-time-symbol-svgrepo-com.svg"
                alt="calendar"
                width={32}
                height={32}
              />
              <div className="p-medium-16 lg:p-regular-20 flex flex-col flex-wrap ">
                <div className="flex gap-2">
                  <p className="p-bold-20 text-grey-600">Assigned Date:</p>
                  <p className="ml-24">
                    {formatDateTime(order.adminDate).dateOnly}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="p-bold-20 text-grey-600">
                    Assigned Time Slots:
                  </p>
                  <p className="ml-10">{order.deliveryDateAndTime}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-center mt-6">
            <Link href={`/orders/${order._id}`} className="flex gap-2">
              <p className="text-primary-500">View Complete Order Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          </div>

          <div className="flex flex-center flex-col mt-14 my-10">
            <h4 className="h3-bold flex item-center">Update Details</h4>
          </div>
        </div>
      </section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-5 mt-6 md:flex-row">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Update Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a paper type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value="Processing"
                        className="hover:p-bold-16"
                      >
                        Processing
                      </SelectItem>
                      <SelectItem value="Completed" className="hover:p-bold-16">
                        Completed
                      </SelectItem>
                      <SelectItem value="Delivered" className="hover:p-bold-16">
                        Delivered
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deliveryDateAndTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Select Time slots</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select delivery Time slots" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value="8:30Am - 9:30Am"
                        className="hover:p-bold-16"
                      >
                        Slot-1: 08:30Am - 09:30Am
                      </SelectItem>
                      <SelectItem
                        value="11:00Am - 12:00Pm"
                        className="hover:p-bold-16"
                      >
                        Slot-2: 11:00Am - 12:00Pm
                      </SelectItem>
                      <SelectItem
                        value="03:00Pm - 04:00Pm"
                        className="hover:p-bold-16"
                      >
                        Slot-3: 03:00Pm - 04:00Pm
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <div className="flex">
            <FormField
              control={form.control}
              name="adminDate"
              render={({ field }) => (
                <FormItem className="w-full basis-1/2">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2 mt-5">
                      <Image
                        src="/assets/icons/calendar.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                        className="filter-grey"
                      />
                      <p className="ml-3 whitespace-nowrap text-grey-600">
                        Date
                      </p>
                      <DatePicker
                        selected={field.value}
                        onChange={(date: Date) => field.onChange(date)}
                        dateFormat="MM/dd/yyyy"
                        wrapperClassName="datePicker"
                        minDate={new Date()}
                        className="p-bold-16"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="button col-span-2 w-full bg-[#1e3262] hover:bg-[#6385a3]"
          >
            {form.formState.isSubmitting ? "Updating...." : "Update Status"}
          </Button>
        </form>
      </Form>
    </>
  );
};
export default UpdateForm;
