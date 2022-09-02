import React, { FC, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { useTodoDispatch } from "../../store/store";
import { useSignInMutation, useSignUpMutation } from "../../store/userApi";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PageContent from "../../components/PageContent";
import Spinner from "../../components/Spinner";
import CloseButton from "../../components/CloseButton";
import { setRefreshToken, setToken } from "../../store/appSlice";
import { setLocalStorageTokens } from "../../utils";
import {
  AuthorizationMessages,
  MAX_LENGTH_LOGIN,
  MAX_LENGTH_PASSWORD,
  MAX_LENGTH_USERNAME,
  messageErrorOptions,
  MIN_LENGTH_LOGIN,
  MIN_LENGTH_PASSWORD,
  MIN_LENGTH_USERNAME,
  RegistrationMessages,
  RoutesSettings,
  UserFormMessages,
} from "../../settings";
import { IErrorAnswer, IUserLogIn, IUserRegistration } from "../../types";
import css from "./Authorization.module.scss";

export enum VariantAuthPage {
  Registration = "Registration",
  LogIn = "LogIn",
}

interface IAuthorizationProps {
  variantPage: VariantAuthPage;
}

const Authorization: FC<IAuthorizationProps> = ({ variantPage }) => {
  const dispatch = useTodoDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [signUp, { isLoading: isLoadingSignUp, error: errorSignUp }] =
    useSignUpMutation();
  const [signIn, { isLoading: isLoadingSignIn, error: errorSignIn }] =
    useSignInMutation();
  const isRegistrationPage = variantPage === VariantAuthPage.Registration;
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<IUserRegistration>();

  useEffect(() => {
    if (errorSignUp && "data" in errorSignUp) {
      const { message } = errorSignUp.data as IErrorAnswer;
      enqueueSnackbar(message, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorSignUp, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    if (errorSignIn && "data" in errorSignIn) {
      const { message } = errorSignIn.data as IErrorAnswer;

      enqueueSnackbar(message, {
        ...messageErrorOptions,
        action: (key) => <CloseButton closeCb={() => closeSnackbar(key)} />,
      });
    }
  }, [errorSignIn, enqueueSnackbar, closeSnackbar]);

  const onSubmit: SubmitHandler<IUserRegistration> = async (data) => {
    if (isRegistrationPage) {
      await signUp(data);
      await userLogIn({
        login: data.login,
        password: data.password,
      });
    } else {
      await userLogIn(data);
    }
    reset();
  };

  const userLogIn = async (user: IUserLogIn) => {
    try {
      const { accessToken, refreshToken } = await signIn(user).unwrap();
      dispatch(setToken(accessToken));
      dispatch(setRefreshToken(refreshToken));
      setLocalStorageTokens(accessToken, refreshToken);
    } catch (error) {}
  };

  const anotherFormPageLink = (): string => {
    return isRegistrationPage ? RoutesSettings.signin : RoutesSettings.signup;
  };

  const classNameSubmit = classNames(css.form__submit, {
    [css.disabled]: isSubmitting || isLoadingSignUp || isLoadingSignIn,
  });

  return (
    <PageContent sectionClass={css.authorization}>
      <Typography
        className={css.authPage__title}
        variant="h1"
        component="h2"
        fontWeight={400}
        align="center"
        mb={5}
      >
        {isRegistrationPage
          ? RegistrationMessages.title
          : AuthorizationMessages.title}
      </Typography>

      <Box
        component="form"
        className={css.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        {isRegistrationPage && (
          <>
            <TextField
              className={classNames(css.form__element, {
                [css.error]: !!errors?.username?.message,
              })}
              {...register("username", {
                required: RegistrationMessages.nameUserError,
                minLength: {
                  value: MIN_LENGTH_USERNAME,
                  message: RegistrationMessages.minUserError,
                },
                maxLength: {
                  value: MAX_LENGTH_USERNAME,
                  message: RegistrationMessages.maxUserError,
                },
              })}
              label={RegistrationMessages.placeHolder}
              placeholder={RegistrationMessages.placeHolder}
              fullWidth
              autoFocus={isRegistrationPage}
            />

            {errors?.username?.message && (
              <Typography
                variant="inherit"
                component="p"
                className={css.form__error}
              >
                {errors?.username?.message}
              </Typography>
            )}
          </>
        )}

        <TextField
          className={classNames(css.form__element, {
            [css.error]: !!errors?.login?.message,
          })}
          {...register("login", {
            required: UserFormMessages.loginError,
            minLength: {
              value: MIN_LENGTH_LOGIN,
              message: UserFormMessages.minLoginError,
            },
            maxLength: {
              value: MAX_LENGTH_LOGIN,
              message: UserFormMessages.maxLoginError,
            },
          })}
          label={UserFormMessages.placeHolderLogin}
          placeholder={UserFormMessages.placeHolderLogin}
          fullWidth
          autoFocus={!isRegistrationPage}
        />

        {errors?.login?.message && (
          <Typography
            variant="inherit"
            component="p"
            className={css.form__error}
          >
            {errors?.login?.message}
          </Typography>
        )}

        <FormControl
          className={classNames(css.form__element, {
            [css.error]: !!errors?.password?.message,
          })}
        >
          <InputLabel htmlFor="password">
            {UserFormMessages.placeHolderPassword}
          </InputLabel>

          <OutlinedInput
            id="password"
            type={isShowPassword ? "text" : "password"}
            {...register("password", {
              required: UserFormMessages.passwordError,
              minLength: {
                value: MIN_LENGTH_PASSWORD,
                message: UserFormMessages.minPasswordError,
              },
              maxLength: {
                value: MAX_LENGTH_PASSWORD,
                message: UserFormMessages.maxPasswordError,
              },
            })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Button for show visibility typing text"
                  onClick={() => setIsShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {isShowPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={UserFormMessages.placeHolderPassword}
          />
        </FormControl>

        {errors?.password?.message && (
          <Typography
            variant="inherit"
            component="p"
            className={css.form__error}
          >
            {errors?.password?.message}
          </Typography>
        )}

        <Typography component="p" variant="inherit" className={css.form__text}>
          <Box component="span">
            {isRegistrationPage
              ? RegistrationMessages.changePage
              : AuthorizationMessages.changePage}
          </Box>

          <Link
            className={css.form__text_linkToChangeSortOfAuth}
            to={anotherFormPageLink()}
          >
            {isRegistrationPage
              ? RegistrationMessages.anotherFormPageName
              : AuthorizationMessages.anotherFormPageName}
          </Link>
        </Typography>

        {(isLoadingSignUp || isLoadingSignIn) && (
          <Spinner className={css.authPage__loader} size={50} />
        )}

        <InputBase
          className={classNameSubmit}
          type="submit"
          disableInjectingGlobalStyles={true}
          disabled={isSubmitting || isLoadingSignUp || isLoadingSignIn}
          value="Submit"
        />
      </Box>
    </PageContent>
  );
};

export default Authorization;
