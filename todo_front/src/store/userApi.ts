import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../settings";
import { ITokenAnswer, IUserLogIn, IUserRegistration } from "../types";

enum QueryPoints {
  signup = "signup",
  signin = "signin",
}

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/user/`,
  }),

  tagTypes: ["User"],
  endpoints: (build) => ({
    signUp: build.mutation<{ id: string }, IUserRegistration>({
      query: (body: IUserRegistration) => ({
        url: QueryPoints.signup,
        method: "POST",
        body,
      }),
    }),

    signIn: build.mutation<ITokenAnswer, IUserLogIn>({
      query: (body: IUserLogIn) => ({
        url: QueryPoints.signin,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = userApi;
