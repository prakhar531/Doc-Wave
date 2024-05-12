export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Upload Document",
    route: "/events/create",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

export const adminHeaderLinks = [
  {
    label: "All orders",
    route: "/admin/orders",
  },
];

export const eventDefaultValues = {
  category: "",
  color: "",
  pageType: "",
  sides: "",
  orientation: "",
  binding: "",
  copies: "",
  dateAndTime: new Date(),
  userTimeSlot: "",
};
