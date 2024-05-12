import { SearchParamProps } from "@/types";
import React from "react";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import { getOrderById } from "@/lib/actions/order.actions";
import Order from "@/lib/mongodb/database/models/order.model";
import { FileText } from "lucide-react";

const EventDetails = async ({ params: { id } }: SearchParamProps) => {
  const order = await getOrderById(id);

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="">
          <div className="flex w-full flex-col item-center gap-8">
            <div className="flex flex-center flex-col">
              <h2 className="h2-bold mt-6 flex item-center">Order Details</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center mt-3">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    {order.category.name}
                  </p>
                  <p className="p-bold-20 rounded-full bg-grey-500/10 px-5 py-2 text-grey-500">
                    {order.status}
                  </p>
                </div>

                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  by{" "}
                  <span className="text-primary-500">
                    {order.buyer.firstName} {order.buyer.lastName}
                  </span>
                </p>
              </div>
              <div className="flex gap-3 mt-4 bg-green-500/10">
                <p className="p-bold-20 rounded-full px-5 py-2 text-grey-700 bg-blue-500/10">
                  OTP :
                  <span className="p-bold-24 rounded-full px-2 py-2 text-[#1e3262] ">
                    {order.otp}
                  </span>
                </p>
              </div>
            </div>

            {/* //Pdfs */}
            <div className="grid grid-cols-2 mt-6 justify-center">
              <div className="flex gap-4 justify-center">
                <Image
                  src="/assets/icons/pdf-svgrepo-com.svg"
                  alt="location"
                  width={32}
                  height={32}
                />
                <p className="p-bold-20 text-grey-600 mr-10">Preview Doc</p>
              </div>

              {order.url && (
                <a
                  className="flex space-x-3 justify-center text-[#1e3262]"
                  target="_blank"
                  href={order.url}
                >
                  <FileText />
                  <span className="text-lg">View Pdf</span>
                </a>
              )}
            </div>

            {/* Color */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex gap-4 justify-center">
                <Image
                  src="/assets/icons/color-theory-svgrepo-com.svg"
                  alt="location"
                  width={32}
                  height={32}
                />
                <p className="p-bold-20 text-grey-600 mr-10">Paper Color</p>
              </div>

              <p className="p-medium-16 lg:p-regular-20 flex gap-4 justify-center">
                {order.color == "black" ? "Black And White" : "Colorful "}
              </p>
            </div>

            {/* Sides */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex gap-4 justify-center">
                <Image
                  src="/assets/icons/arrow-with-two-points-pointing-opposite-directions-at-both-sides-svgrepo-com (1).svg"
                  alt="location"
                  width={32}
                  height={32}
                />
                <p className="p-bold-20 text-grey-600 mr-10">Page Sides</p>
              </div>

              <p className="p-medium-16 lg:p-regular-20 flex gap-4 justify-center">
                {order.sides == "single"
                  ? "Single Side Print"
                  : "Both Side Print"}
              </p>
            </div>

            {/* Orientation */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex gap-4 justify-center">
                <Image
                  src="/assets/icons/compass-svgrepo-com.svg"
                  alt="campass"
                  width={32}
                  height={32}
                />
                <p className="p-bold-20 text-grey-600 mr-10">Orientation</p>
              </div>

              <p className="p-medium-16 lg:p-regular-20 flex gap-4 justify-center">
                {order.orientation == "portrait" ? "Portrait" : "LandScape"}
              </p>
            </div>

            {/* Binding type*/}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex gap-4 justify-center">
                <Image
                  src="/assets/icons/rope-svgrepo-com.svg"
                  alt="campass"
                  width={32}
                  height={32}
                />
                <p className="p-bold-20 text-grey-600 mr-10">Binding Type</p>
              </div>

              <p className="p-medium-16 lg:p-regular-20 flex gap-4 justify-center">
                {order.binding == "soft"
                  ? "Soft Binding"
                  : order.binding == "spiral"
                  ? "Spiral Binding"
                  : "Loose Leaf"}
              </p>
            </div>

            {/* copies */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex gap-4 justify-center">
                <Image
                  src="/assets/icons/copies-svgrepo-com.svg"
                  alt="campass"
                  width={32}
                  height={32}
                />
                <p className="p-bold-20 text-grey-600 mr-10">No. of copies</p>
              </div>

              <p className="p-medium-16 lg:p-regular-20 flex gap-4 justify-center">
                {order.copies}
              </p>
            </div>

            {/* Page Type */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex gap-4 justify-center">
                <Image
                  src="/assets/icons/document-svgrepo-com.svg"
                  alt="doc"
                  width={32}
                  height={32}
                />
                <p className="p-bold-20 text-grey-600 mr-10 ">Page Type</p>
              </div>

              <p className="p-medium-16 lg:p-regular-20 flex gap-4 justify-center">
                {order.pageType == "normal" ? "Normal Paper" : "Bond Paper"}
              </p>
            </div>

            {/* Page Count */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex gap-4 justify-center">
                <Image
                  src="/assets/icons/text-word-count-svgrepo-com.svg"
                  alt="doc"
                  width={32}
                  height={32}
                />
                <p className="p-bold-20 text-grey-600 mr-10 ">Paper Count</p>
              </div>

              <p className="p-medium-16 lg:p-regular-20 flex gap-4 justify-center">
                {order.pageCount}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex gap-4 justify-center">
                <Image
                  src="/assets/icons/rupee-circle-svgrepo-com.svg"
                  alt="location"
                  width={32}
                  height={32}
                />
                <p className="p-bold-20 text-grey-600 mr-10">Final Price</p>
              </div>

              <p className="p-medium-16 lg:p-regular-20 flex gap-4 justify-center">
                {order.price}
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
                    <p className="p-bold-20 text-grey-600">
                      Selected Date&Time:
                    </p>
                    <p className="ml-6">
                      {formatDateTime(order.dateAndTime).dateOnly} -{" "}
                      {formatDateTime(order.dateAndTime).timeOnly}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="p-bold-20 text-grey-600">
                      Expected Time Slots:
                    </p>
                    <p className="ml-7">{order.deliveryDateAndTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventDetails;
