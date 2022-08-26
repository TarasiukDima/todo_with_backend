import React, { FC, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
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
import {
  AuthorizationMessages,
  MAX_LENGTH_LOGIN,
  MAX_LENGTH_PASSWORD,
  MAX_LENGTH_USERNAME,
  MIN_LENGTH_LOGIN,
  MIN_LENGTH_PASSWORD,
  MIN_LENGTH_USERNAME,
  RegistrationMessages,
  RoutesSettings,
  UserFormMessages,
} from "../../settings";
import { IUserRegistration } from "../../types";
import css from "./Authorization.module.scss";
import PageContent from "../../components/PageContent";

export enum VariantAuthPage {
  Registration = "Registration",
  LogIn = "LogIn",
}

interface IAuthorizationProps {
  variantPage: VariantAuthPage;
}

const Authorization: FC<IAuthorizationProps> = ({ variantPage }) => {
  const navigate = useNavigate();
  const isRegistrationPage = variantPage === VariantAuthPage.Registration;
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<IUserRegistration>();

  const onSubmit: SubmitHandler<IUserRegistration> = (data) => {
    console.log(data);
    reset();
  };

  const anotherFormPageLink = (): string => {
    return isRegistrationPage ? RoutesSettings.signin : RoutesSettings.signup;
  };

  const classNameSubmit = classNames(css.form__submit, {
    [css.disabled]: isSubmitting,
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
                [css.error]: !!errors?.name?.message,
              })}
              {...register("name", {
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

            {errors?.name?.message && (
              <Typography
                variant="inherit"
                component="p"
                className={css.form__error}
              >
                {errors?.name?.message}
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

        <InputBase
          className={classNameSubmit}
          type="submit"
          disableInjectingGlobalStyles={true}
          disabled={isSubmitting}
          value="Submit"
        />
      </Box>
    </PageContent>
  );
};

export default Authorization;
