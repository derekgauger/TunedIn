import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Menu,
  MenuItem,
  styled,
  Fab,
  useScrollTrigger,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Person as PersonIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import { useUser } from "../../Hooks/useUser";

interface StyledAppBarProps {
  trigger: boolean;
  isHome: boolean;
}

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "trigger" && prop !== "isHome",
})<StyledAppBarProps>(({ theme, trigger, isHome }) => ({
  backgroundColor: isHome
    ? trigger
      ? "rgba(0, 0, 0, 0.9)"
      : "transparent"
    : "rgba(0, 0, 0, 0.9)",
  transition: theme.transitions.create(["background-color"], {
    duration: theme.transitions.duration.standard,
  }),
  boxShadow: "none",
}));

const StyledToolbar = styled(Toolbar)({
  minHeight: "64px",
  padding: "0 16px",
});

const NavButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
  },
}));

const ActiveNavButton = styled(NavButton)(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  paddingBottom: "3px",
}));

const UserButton = styled(Button)(() => ({
  color: "#fff",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

type NavItem = {
  name: string;
  path: string;
};

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Gallery", path: "/gallery" },
  { name: "Shop", path: "/shop" },
  { name: "Contact", path: "/contact" },
];

const ScrollTop: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Box
      onClick={scrollToTop}
      role="presentation"
      sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}
    >
      {React.cloneElement(children, {
        style: {
          visibility: trigger ? "visible" : "hidden",
          opacity: trigger ? 1 : 0,
          transition: "opacity 0.3s",
        },
      })}
    </Box>
  );
};

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useUser();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const isHome = location.pathname === "/";
  const isSignIn = location.pathname === "/sign-in";

  const handleNavigation = (path: string) => {
    navigate(path);
    scrollToTop();
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    if (location.pathname === '/profile') {
      navigate('/');
    }
  }

  return (
    <>
      {isSignIn ? null : (
        <StyledAppBar position="fixed" trigger={trigger} isHome={isHome}>
          <Container maxWidth="xl">
            <StyledToolbar disableGutters>
              <Box
                sx={{ display: "flex", alignItems: "center", flexGrow: 1, cursor: "pointer" }}
                onClick={() => {
                  handleNavigation("/");
                }}
              >
                <img
                  src="/logo.png"
                  alt="TI Logo"
                  style={{ height: "40px", marginRight: "16px" }}
                />
                <Typography
                  variant="h5"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: "flex", color: "white" }}
                >
                  Tuned In Athlete Development
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                {navItems.map((item) =>
                  location.pathname === item.path ? (
                    <ActiveNavButton
                      key={item.name}
                      onClick={() => handleNavigation(item.path)}
                    >
                      {item.name}
                    </ActiveNavButton>
                  ) : (
                    <NavButton
                      key={item.name}
                      onClick={() => handleNavigation(item.path)}
                    >
                      {item.name}
                    </NavButton>
                  )
                )}

                {user ? (
                  <Box sx={{ ml: 1 }}>
                    <UserButton
                      onClick={handleMenu}
                      startIcon={<PersonIcon />}
                      endIcon={<ExpandMoreIcon />}
                    >
                      {user?.username}
                    </UserButton>
                    <Menu
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      disableScrollLock
                    >
                      <MenuItem onClick={() => handleNavigation("/profile")}>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <NavButton onClick={() => handleNavigation("/sign-in")}>
                    Sign In
                  </NavButton>
                )}
              </Box>
            </StyledToolbar>
          </Container>
        </StyledAppBar>
      )}
      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default Navbar;
