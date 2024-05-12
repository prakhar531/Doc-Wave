import { Button } from "@/components/ui/button";

import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/mongodb/database/models/order.model";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const ProfilePage = async () => {
  // Fetching user id for events

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const orders = await getOrdersByUser(userId);
  console.log(orders);
  const orderArray = orders?.data.map((order: IOrder) => order) || [];
  console.log(orderArray);

  return (
    <>
      <section className=" bg-primary-50 bg-dotted-pattern bg-cover bg-center mt-5">
        <h3 className="wrapper h3-bold text-center sm:text-left ">
          Recent Orders
        </h3>
      </section>

      <section className="wrapper overflow-x-auto">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[250px] py-3 text-left">OTP</th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">
                Status
              </th>
              <th className="min-w-[150px] py-3 text-left">Date&Time</th>
              <th className="min-w-[100px] py-3 text-left">Amount</th>
              <th className="min-w-[100px] py-3 text-right"> </th>
            </tr>
          </thead>
          <tbody>
            {orderArray && orderArray.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              <>
                {orderArray &&
                  orderArray.map((row: any) => (
                    <tr
                      key={row._id}
                      className="p-regular-14 lg:p-regular-16 border-b "
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[250px] py-4 text-primary-500">
                        {row.otp}
                      </td>
                      <td className="min-w-[200px] flex-1 py-4 pr-4">
                        {row.status}
                      </td>
                      <td className="min-w-[150px] py-4">
                        {formatDateTime(row.dateAndTime).dateTime}
                      </td>
                      <td className="min-w-[100px] py-4">{row.price}</td>
                      <td className="min-w-[100px] py-4 text-right">
                        <Link
                          href={`/orders/${row._id}`}
                          className="flex gap-2"
                        >
                          <p className="text-primary-500">Order Details</p>
                          <Image
                            src="/assets/icons/arrow.svg"
                            alt="search"
                            width={10}
                            height={10}
                          />
                        </Link>
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default ProfilePage;
