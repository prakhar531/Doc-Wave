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
import Category from "../mongodb/database/models/category.model";
import { revalidatePath } from "next/cache";

const populateEvent = (query: any) => {
  return query
    .populate({
      path: "buyer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

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
export const createOrder = async ({ userId, orders, path }: any) => {
  try {
    await connectToDatabase();
    let finalId = Object.values(userId)[0];

    const buyer = await User.findById(finalId);
    if (!buyer) throw new Error("Organizer not found");

    console.log(buyer);

    const newOrder = await Order.create({
      ...orders,
      buyer,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};

// Get order by Id
export async function getOrderById(orderId: string) {
  try {
    await connectToDatabase();

    const order = await populateEvent(Order.findById(orderId));

    if (!order) throw new Error("Order not found");

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    handleError(error);
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser({ userId, limit = 20 }: any) {
  try {
    await connectToDatabase();
    const conditions = { buyer: userId };

    const orders = await Order.distinct("order._id")
      .find(conditions)
      .sort({ dateAndTime: "desc" })
      .limit(limit)
      .populate({
        path: "buyer",
        model: User,
        select: "_id firstName lastName",
      });

    const ordersCount = await Order.distinct("order._id").countDocuments(
      conditions
    );

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

export async function getAllOrders({ query, limit = 20, category }: any) {
  try {
    await connectToDatabase();

    // it creates a regular expression with a case-insensitive match for the title
    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};

    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;

    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    const orderQuery = Order.find(conditions)
      .sort({ dateAndTime: "ascending" })
      .limit(limit);

    const orders = await populateEvent(orderQuery);
    const eventsCount = await Order.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function updateOrders({ order, path }: any) {
  try {
    await connectToDatabase();

    const orderToUpdate = await Order.findById(order._id);
    if (!orderToUpdate) {
      throw new Error("Unauthorized or event not found");
    }

    const updatedOrder = await Order.findByIdAndUpdate(order._id, {
      ...order,
      status: order.status,
      deliveryDateAndTime: order.deliveryDateAndTime,
      adminDate: order.adminDate,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedOrder));
  } catch (error) {
    handleError(error);
  }
}
