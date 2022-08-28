import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../settings";
import { RootState } from "../store/store";
import { ITokenAnswer, IUserLogIn, IUserRegistration } from "../types";

enum QueryPoints {
  signup = "signup",
  signin = "signin",
  refresh = "refresh",
}

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/user/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).app.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
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

    refresh: build.query<ITokenAnswer, string>({
      query: (refreshToken) => ({
        url: QueryPoints.refresh,
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useRefreshQuery } =
  userApi;
