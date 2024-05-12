import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Search from "@/components/shared/Search";
import { SearchParamProps } from "@/types";
import CategoryFilter from "@/components/shared/CategoryFilter";
import { getAllOrders } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/mongodb/database/models/order.model";
import { formatDateTime } from "@/lib/utils";

export default async function Home({ searchParams }: SearchParamProps) {
  const searchText = "";
  const category = (searchParams?.category as string) || "";
  console.log(searchText);
  console.log(category);

  const orders = await getAllOrders({
    query: searchText,
    category: category,
    limit: 6,
  });
  const orderArray = orders?.data.map((order: IOrder) => order) || [];
  // console.log(orders);
  // console.log(orderArray);

  return (
    <>
      <section className=" bg-primary-50 bg-dotted-pattern bg-cover bg-center py-3 md:py-3">
        <h3 className="wrapper h3-bold text-center sm:text-left ">
          {category == "" ? "All" : category} Orders
        </h3>
      </section>
      <section className="wrapper flex justify-center bg-primary-50 bg-dotted-pattern bg-contain py-2 md:py-2">
        <div className="flex flex-col gap-5 md:flex-row">
          <span className="flex flex-col justify-center min-w-[300px] text-left p-bold-20 rounded-full px-2 py-2 text-[#1e3262] bg-blue-500/10">
            Filter by department Name
          </span>
          <CategoryFilter />
        </div>
      </section>

      <section className="wrapper overflow-x-auto">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[100px] py-3 text-left">OTP</th>
              <th className="min-w-[150px] py-3 text-left">Name</th>
              <th className="min-w-[150px] flex-1 py-3 pr-4 text-left">
                Status
              </th>
              <th className="min-w-[150px] py-3 text-left">Selected Date</th>
              <th className="min-w-[150px] py-3 text-left">Selected Slots</th>
              <th className="min-w-[150px] py-3 flex justify-end"> </th>
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
                  orderArray.map(
                    (row: any) =>
                      row.status != "Delivered" && (
                        <tr
                          key={row._id}
                          className="p-regular-14 lg:p-regular-16 border-b"
                          style={{ boxSizing: "border-box" }}
                        >
                          <td className="min-w-[150px] py-4 p-bold-24 text-[#1e3262]">
                            {row.otp}
                          </td>
                          <td className="min-w-[150px] py-4 text-[#1e3262] p-bold-16">
                            {row.buyer.firstName} {row.buyer.lastName}
                          </td>
                          <td className="min-w-[150px] flex-1 py-4 pr-4">
                            {row.status}
                          </td>
                          <td className="min-w-[150px] py-4">
                            {formatDateTime(row.dateAndTime).dateOnly}
                          </td>
                          <td className="min-w-[100px] py-4">
                            {row.userTimeSlot}
                          </td>
                          <td className="min-w-[150px] py-4 text-right">
                            <Link
                              href={`/orders/${row._id}`}
                              className="flex gap-2"
                            >
                              <p className="text-primary-500 text-right">
                                View
                              </p>
                              <Image
                                src="/assets/icons/arrow.svg"
                                alt="search"
                                width={10}
                                height={10}
                              />
                            </Link>
                            <Link
                              href={`/admin/orders/${row._id}/update`}
                              className="flex gap-2"
                            >
                              <p className="text-primary-500 text-right">
                                Update
                              </p>
                              <Image
                                src="/assets/icons/arrow.svg"
                                alt="search"
                                width={10}
                                height={10}
                              />
                            </Link>
                          </td>
                        </tr>
                      )
                  )}
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}
