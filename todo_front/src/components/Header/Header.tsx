import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Button, Typography, Container, Box, ListItem, List } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { RoutesSettings } from "../../settings";
import css from "./Header.module.scss";

const Header: FC = () => {
  const [token, setToken] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleLogOut = () => {
    setToken(false);
    navigate(RoutesSettings.home, { replace: true });
  };

  return (
    <StyledEngineProvider injectFirst>
      <AppBar position="sticky" className={css.header}>
        <Container className={css.header__wrapper}>
          <Typography component="h1" variant="inherit" align="center" className={css.header__logo}>
            <Button href={RoutesSettings.home} color="inherit" variant="text">
              ToDo
            </Button>
          </Typography>

          <Box component="nav" className={css.header__nav}>
            <List className={css.header__nav_list}>
              <ListItem className={css.header__nav_listItem}>
                <Button href={RoutesSettings.home} color="inherit">Home</Button>
              </ListItem>

              {token ? (
                <>
                  <ListItem className={css.header__nav_listItem}>
                    <Button href={RoutesSettings.todo} color="inherit">Todo</Button>
                  </ListItem>

                  <ListItem className={css.header__nav_listItem}>
                    <Button onClick={handleLogOut} href={RoutesSettings.home} color="inherit">
                      Logout
                    </Button>
                  </ListItem>
                </>
              ) : (
                <ListItem className={css.header__nav_listItem}>
                  <Button href={RoutesSettings.signin} color="inherit">Login</Button>
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
