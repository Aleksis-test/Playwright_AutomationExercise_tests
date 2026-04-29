import { User, SignupUser } from "../types/user.types";

export function createRandomUser():SignupUser{
    const id = Date.now()
    return{
        name:`User_${id}`,
        email:`User_${id}@test.com`
    }
}
export function createRandomFullUser(): User {
  const id = Date.now();

  return {
    password: "Test123!",

    day: "25",
    month: "May",
    year: "2000",

    firstName: "User",
    lastName: `Test_${id}`,
    company: "TestCompany",

    address1: "Street 123",
    address2: "Apartment 1",

    country: "India",

    state: "TestState",
    city: "TestCity",

    zipcode: "12345",
    mobileNumber: "1234567890",
  }
}
