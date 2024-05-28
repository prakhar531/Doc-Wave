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
import { PDFDocument, values } from "pdf-lib";

import Image from "next/image";
import { Input } from "@/components/ui/input";

import { eventFormSchema } from "@/lib/validator";
import { eventDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { UploadButton, UploadDropzone, Uploader } from "@/lib/uploadthing";
import { FileText, Pencil, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { createOrder } from "@/lib/actions/order.actions";

type EventFormProps = {
  userId: any;
};

const EventForm = ({ userId }: EventFormProps) => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfFileData, setPdfFileData] = useState<any>("");
  const [pdfPrice, setPdfPrice] = useState("");
  const [formData, setFormData] = useState({});
  let finalPrice = 0;

  //create order

  async function createOrderFunction() {
    let optValue = Math.floor(1000 + Math.random() * 9000);

    let orderValue = {
      pageCount: +pdfFileData,
      url: pdfUrl,
      price: pdfPrice,
      status: "Processing",
      otp: +optValue,
      deliveryDateAndTime: "Updating",
    };
    let finalOrder = { ...orderValue, ...formData };

    console.log(finalOrder);

    try {
      const newOrder = await createOrder({
        orders: { ...finalOrder },
        userId,
        path: "/orders",
      });

      console.log("new order created");

      if (newOrder) {
        form.reset();
      }
      router.push(`/checkout/?amount=${+pdfPrice}`);
    } catch (error) {
      console.log(error);
    }
  }
  //main pricing logic

  const dataValues = {
    normal: 0,
    bond: 5,
    black: 1,
    colorful: 5,
    single: 1,
    both: 0.5,
    soft: 10,
    spiral: 30,
    staple: 1,
    loose: 0,
  };

  const initialValues = eventDefaultValues;

  const router = useRouter();

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: any) {
    setFormData({ ...values, adminDate: values.dateAndTime });

    let paperTypes =
      values.pageType == "normal" ? dataValues.normal : dataValues.bond;
    let colorValue =
      values.color == "black" ? dataValues.black : dataValues.colorful;
    let sideValue =
      values.sides == "single" ? dataValues.single : dataValues.both;
    let bindingValue =
      values.binding == "soft"
        ? dataValues.soft
        : values.binding == "spiral"
        ? dataValues.spiral
        : dataValues.loose;
    let numberOfCopy = +values.copies;
    let numberOfPages = +pdfFileData;

    finalPrice =
      (colorValue + paperTypes) * sideValue * numberOfCopy * numberOfPages +
      bindingValue * numberOfCopy;
    setPdfPrice(finalPrice.toString());
    // console.log(finalPrice);
    // console.log(formValue);
  }

  function readFileAsync(file: Blob) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  async function extractPdfPage(arrayBuff: any) {
    const pdfSrcDoc = await PDFDocument.load(arrayBuff);
    const totalPages = pdfSrcDoc.getPageCount();
    return totalPages;
  }

  // Execute when user select a file
  const onFileSelected = async (e: any) => {
    const fileList = e.target.files;
    if (fileList?.length > 0) {
      const pdfArrayBuffer = await readFileAsync(fileList[0]);
      const pageNo = await extractPdfPage(pdfArrayBuffer);
      setPdfFileData(pageNo);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="pageType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Paper Type</FormLabel>
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
                      value="normal"
                      className="text-[#182442] hover:p-bold-16"
                    >
                      Normal Paper
                    </SelectItem>
                    <SelectItem value="bond" className="hover:p-bold-16">
                      Bond Paper
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Specify Color</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select a paper color type"
                        className="text-[#182442] hover:p-bold-16"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      value="black"
                      className="text-[#182442] hover:p-bold-16"
                    >
                      Black And White Print
                    </SelectItem>
                    <SelectItem
                      value="colorful"
                      className="text-[#182442] hover:p-bold-16"
                    >
                      Colored Print
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sides"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Select Sides</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select paper printing sides"
                        className="text-[#182442] hover:p-bold-16"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      value="single"
                      className="text-[#182442] hover:p-bold-16"
                    >
                      Single side
                    </SelectItem>
                    <SelectItem
                      value="both"
                      className="text-[#182442] hover:p-bold-16"
                    >
                      Both Side
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="orientation"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Page Orientation</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select a paper orientation type"
                        className="text-[#182442] hover:p-bold-16"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      value="portrait"
                      className="text-[#182442] hover:p-bold-16"
                    >
                      Portrait Print
                    </SelectItem>
                    <SelectItem
                      value="landscape"
                      className="text-[#182442] hover:p-bold-16"
                    >
                      LandScape Print
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="binding"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Select Binding</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select paper binding type"
                        className="text-[#182442] hover:p-bold-16"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      value="soft"
                      className="text-[#182442] hover:p-bold-16"
                    >
                      Soft Binding
                    </SelectItem>
                    <SelectItem
                      value="spiral"
                      className="text-[#182442] hover:p-bold-16"
                    >
                      Spiral Binding
                    </SelectItem>
                    <SelectItem
                      value="loose"
                      className="text-[#182442] hover:p-bold-16"
                    >
                      Loose Leaf / Staple
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="copies"
            render={({ field }) => (
              <FormItem className="w-full basis-1/2">
                <FormLabel>Enter NO. copies</FormLabel>
                <FormControl>
                  <Input
                    placeholder="10"
                    {...field}
                    className="input-field text-[#182442] p-bold-16"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="basis-1/2 flex">
            <FormField
              control={form.control}
              name="userTimeSlot"
              render={({ field }) => (
                <FormItem className="basis-1/2">
                  <FormLabel>Select Date&Time slots</FormLabel>
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
                        className="text-[#182442] hover:p-bold-16"
                      >
                        Slot-1: 08:30Am - 09:30Am
                      </SelectItem>
                      <SelectItem
                        value="11:00Am - 12:00Pm"
                        className="text-[#182442] hover:p-bold-16"
                      >
                        Slot-2: 11:00Am - 12:00Pm
                      </SelectItem>
                      <SelectItem
                        value="03:00Pm - 04:00Pm"
                        className="text-[#182442] hover:p-bold-16"
                      >
                        Slot-3: 03:00Pm - 04:00Pm
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateAndTime"
              render={({ field }) => (
                <FormItem className="w-full basis-1/2 ml-4">
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
                        className="text-[#182442] p-bold-16"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50">
            <Image
              src="/assets/icons/link.svg"
              alt="link"
              width={24}
              height={24}
            />
            <p className="ml-3 whitespace-nowrap text-grey-600">Upload Pdf</p>
            <Input type="file" accept=".pdf" onChange={onFileSelected} />
          </div>

          <div className="flex align-left h-[54px] w-full overflow-hidden rounded-full bg-grey-50">
            <Image
              src="/assets/icons/link.svg"
              alt="link"
              width={24}
              height={24}
            />
            <p className="flex-col flex-center ml-3 whitespace-nowrap text-grey-600">
              Number of pages {pdfFileData}
            </p>
          </div>
        </div>

        <Button
          type="submit"
          className="button col-span-2 w-full bg-[#1e3262] hover:bg-[#6385a3]"
        >
          {form.formState.isSubmitting ? "Calculating..." : "Check Price"}
        </Button>

        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex align-left h-[54px] w-full overflow-hidden rounded-full bg-grey-50">
            <Image
              src="/assets/icons/rupee-square-svgrepo-com.svg"
              alt="link"
              width={36}
              height={36}
            />
            <p className="flex-col flex-center ml-3 whitespace-nowrap text-grey-600">
              Calculated Price
            </p>
            <div className="flex-col flex-center w-min rounded-full bg-green-200 px-6 py-2 text-green-60 ml-3 whitespace-nowrap font-black text-lg">
              {pdfPrice}
            </div>
          </div>
        </div>

        <div className="my-6 col-span-full">
          <div className="flex gap-2 items-center mb-4">
            <Image
              src="/assets/icons/pdf-svgrepo-com.svg"
              alt="location"
              width={32}
              height={32}
            />
            <label
              htmlFor="course-image"
              className="block text-lg font-medium leading-6 text-gray-800"
            >
              Upload PDF
            </label>
            {pdfUrl && (
              <button
                onClick={() => setPdfUrl("")}
                type="button"
                className="flex flex-center bg-[#1e3262] hover:bg-[#6385a3] rounded shadow text-slate-50  py-2 px-4"
              >
                <Pencil className="w-5 h-5 mr-2" />
                <span>Change PDF</span>
              </button>
            )}
          </div>
          {pdfUrl ? (
            <a
              className="flex space-x-3 items-center text-[#1e3262]"
              target="_blank"
              href={pdfUrl}
            >
              <FileText />
              <span className="text-lg">View PDF</span>
            </a>
          ) : (
            <UploadDropzone
              endpoint="pdfUploader"
              onClientUploadComplete={(res: any) => {
                setPdfUrl(res[0].url);
                console.log("Files: ", res);
              }}
              onUploadError={(error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          )}
        </div>

        <Button
          onClick={createOrderFunction}
          size="lg"
          // disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full bg-[#1e3262] hover:bg-[#6385a3] mb-24"
        >
          Place Order
          {/* {form.formState.isSubmitting ? "Submitting..." : "Get Print"} */}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
