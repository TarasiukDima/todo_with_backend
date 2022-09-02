import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTodoDispatch, useTodoSelector } from "../../store/store";
import { setRefreshToken, setToken } from "../../store/appSlice";
import {
  AppBar,
  Button,
  Typography,
  Container,
  Box,
  ListItem,
  List,
} from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { RoutesSettings } from "../../settings";
import { clearLocalStorageTokens } from "../../utils";
import css from "./Header.module.scss";

const Header: FC = () => {
  const { token } = useTodoSelector((state) => state.app);
  const dispatch = useTodoDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(setToken(null));
    dispatch(setRefreshToken(null));
    clearLocalStorageTokens();
    navigate(RoutesSettings.home, { replace: true });
  };

  return (
    <StyledEngineProvider injectFirst>
      <AppBar position="sticky" className={css.header}>
        <Container className={css.header__wrapper}>
          <Typography
            component="h1"
            variant="inherit"
            align="center"
            className={css.header__logo}
          >
            <Button href={RoutesSettings.home} color="inherit" variant="text">
              ToDo
            </Button>
          </Typography>

          <Box component="nav" className={css.header__nav}>
            <List className={css.header__nav_list}>
              <ListItem className={css.header__nav_listItem}>
                <Button href={RoutesSettings.home} color="inherit">
                  Home
                </Button>
              </ListItem>

              {token ? (
                <>
                  <ListItem className={css.header__nav_listItem}>
                    <Button href={RoutesSettings.todo} color="inherit">
                      Todo
                    </Button>
                  </ListItem>

                  <ListItem className={css.header__nav_listItem}>
                    <Button
                      onClick={handleLogOut}
                      href={RoutesSettings.home}
                      color="inherit"
                    >
                      Logout
                    </Button>
                  </ListItem>
                </>
              ) : (
                <ListItem className={css.header__nav_listItem}>
                  <Button href={RoutesSettings.signin} color="inherit">
                    Login
                  </Button>
                </ListItem>
              )}
            </List>
          </Box>
        </Container>
      </AppBar>
    </StyledEngineProvider>
  );
};

export default Header;
