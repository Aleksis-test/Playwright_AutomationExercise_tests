export type Country =
  | "India"
  | "United States"
  | "Canada"
  | "Australia"
  | "Israel"
  | "New Zealand"
  | "Singapore";

export type User = {
  password: string;
  day: string;
  month: string;
  year: string;

  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: Country;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

export type SignupUser = {
  name: string;
  email: string;
};