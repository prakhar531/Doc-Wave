import { Schema, model, models, Document } from "mongoose";

export interface IOrder extends Document {
  pageCount: string;
  color: string;
  pageType: string;
  sides: string;
  orientation: string;
  binding: string;
  copies: string;
  url: string;
  dateAndTime: Date;
  otp: string;
  deliveryDateAndTime: Date;
  price: string;
  status: string;
  category: { _id: string; name: string };
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

export type IOrderItem = {
  _id: string;
  pageCount: string;
  color: string;
  pageType: string;
  sides: string;
  orientation: string;
  binding: string;
  copies: string;
  url: string;
  dateAndTime: Date;
  otp: string;
  deliveryDateAndTime: Date;
  price: string;
  status: string;
  tempFile: any;
  category: string;
  buyer: string;
};

const OrderSchema = new Schema({
  pageCount: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  pageType: { type: String, required: true },
  sides: {
    type: String,
    required: true,
  },
  orientation: {
    type: String,
    required: true,
  },
  binding: {
    type: String,
    required: true,
  },
  copies: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  url: { type: String },
  dateAndTime: {
    type: Date,
    required: true,
  },
  deliveryDateAndTime: {
    type: Date,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  status: { type: String, required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
