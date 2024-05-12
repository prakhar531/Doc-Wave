import * as z from "zod";

export const eventFormSchema = z.object({
  category: z.string(),
  color: z.string(),
  pageType: z.string(),
  sides: z.string(),
  orientation: z.string(),
  binding: z.string(),
  dateAndTime: z.date(),
  copies: z.string(),
  userTimeSlot: z.string(),
});

export const updateFormSchema = z.object({
  deliveryDateAndTime: z.string(),
  status: z.string(),
  adminDate: z.date(),
});
