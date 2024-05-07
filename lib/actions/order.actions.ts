"use server";

import {
  CheckoutOrderParams,
  CreateOrderParams,
  GetOrdersByEventParams,
  GetOrdersByUserParams,
} from "@/types";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { handleError } from "../utils";
import { connectToDatabase } from "../mongodb/database";
import Order from "../mongodb/database/models/order.model";
import User from "../mongodb/database/models/user.model";
import { ObjectId } from "mongodb";

// export const checkoutOrder = async (order: CheckoutOrderParams) => {
//   try {
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

//     const price = order.isFree ? 0 : Number(order.price) * 100;
//     // Create Checkout Sessions from body params.
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price_data: {
//             currency: "inr",
//             unit_amount: price,
//             product_data: {
//               name: order.eventTitle,
//             },
//           },
//           quantity: 1,
//         },
//       ],
//       metadata: {
//         eventId: order.eventId,
//         buyerId: order.buyerId,
//       },
//       mode: "payment",
//       success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
//       cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
//     });

//     redirect(session.url!);
//   } catch (error) {
//     throw error;
//   }
// };

//create new instance of order in database
export const createOrder = async (order: any) => {
  try {
    await connectToDatabase();

    const newOrder = await Order.create({
      ...order,
      event: order.eventId,
      buyer: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};


// GET ORDERS BY USER
//tickets when a specific user has bought
// export async function getOrdersByUser({
//   userId,
//   limit = 3,
//   page,
// }: GetOrdersByUserParams) {
//   try {
//     await connectToDatabase();

//     const skipAmount = (Number(page) - 1) * limit;
//     const conditions = { buyer: userId };

//     const orders = await Order.distinct("event._id")
//       .find(conditions)
//       .sort({ createdAt: "desc" })
//       .skip(skipAmount)
//       .limit(limit)
//       .populate({
//         path: "event",
//         model: Event,
//         populate: {
//           path: "organizer",
//           model: User,
//           select: "_id firstName lastName",
//         },
//       });

//     const ordersCount = await Order.distinct("event._id").countDocuments(
//       conditions
//     );

//     return {
//       data: JSON.parse(JSON.stringify(orders)),
//       totalPages: Math.ceil(ordersCount / limit),
//     };
//   } catch (error) {
//     handleError(error);
//   }
// }
