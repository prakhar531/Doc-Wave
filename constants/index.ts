export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Upload Document",
    route: "/events/create",
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
};
