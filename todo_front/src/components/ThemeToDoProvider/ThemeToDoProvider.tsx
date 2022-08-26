import React, { FC, Ref } from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import { CssBaseline, LinkProps } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IChildren } from "../../types";

const ThemeToDoProvider: FC<IChildren> = ({ children }) => {
  const LinkBehavior = React.forwardRef((props, ref) => {
    const { href, ...other } = props as Omit<RouterLinkProps, "to"> & {
      href: RouterLinkProps["to"];
    };
    return <RouterLink ref={ref as Ref<HTMLAnchorElement> | undefined} to={href} {...other} />;
  });

  const darkTheme = createTheme({
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
    palette: {
      mode: "dark",
      background: {
        default: "#362E2D",
      },
    },
    components: {
      MuiLink: {
        defaultProps: {
          component: LinkBehavior,
        } as Partial<LinkProps<"a", Record<string, unknown>>>,
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior,
        },
      },
    },
  });

  darkTheme.typography.h1 = {
    fontSize: '2.2rem',
    [darkTheme.breakpoints.up('sm')]: {
      fontSize: '3rem',
    },
    [darkTheme.breakpoints.up('md')]: {
      fontSize: '4rem',
    },
    [darkTheme.breakpoints.up('lg')]: {
      fontSize: '5rem',
    },
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme={true} />
      {children}
    </ThemeProvider>
  );
};

export default ThemeToDoProvider;
