import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  Menu,
  MenuItem,
  styled,
  Fab,
  useScrollTrigger,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Person as PersonIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useUser } from "../../../Hooks/useUser";
import { handleNavigation, scrollToTop } from "../../../Utils/functions";
import CustomTypography from "../../CustomUI/CustomTypography";

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "trigger" && prop !== "isHome",
})<{ trigger: boolean; isHome: boolean }>(({ theme, trigger }) => ({
  backgroundColor: trigger ? `${theme.palette.primary.dark}CC` : "primary.dark",
  backdropFilter: trigger ? "blur(10px)" : "none",
  boxShadow: trigger ? theme.shadows[4] : "none",
  transition: theme.transitions.create(["all"], {
    duration: theme.transitions.duration.standard,
  }),
  minHeight: "80px",
  padding: "0 16px",
  [theme.breakpoints.down("sm")]: {
    minHeight: "56px",
  },
}));

const StyledToolbar = styled(Toolbar)(() => ({
  padding: "0 16px",
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: "white",
  fontSize: "1rem",
  padding: "8px 16px",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: "0%",
    height: "2px",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "secondary.main",
    transition: "width 0.3s ease",
  },
  "&:hover": {
    backgroundColor: "transparent",
    color: theme.palette.secondary.main,
    "&:after": {
      width: "100%",
    },
  },
}));

const ActiveNavButton = styled(NavButton)(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.secondary.main}`,
  paddingBottom: "3px",
  color: theme.palette.secondary.main,
}));

const UserButton = styled(Button)(() => ({
  color: "#fff",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

const Logo = styled("img")(() => ({
  height: "40px",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
  marginRight: "16px",
}));

type NavItem = {
  name: string;
  path: string;
  permission?: boolean;
};

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navItems: NavItem[] = [
    { name: "Home", path: "/", permission: true },
    { name: "About", path: "/about", permission: true },
    { name: "Gallery", path: "/gallery", permission: true },
    { name: "Sevices", path: "/services", permission: true },
    { name: "Forms", path: "/forms", permission: true },
    { name: "Contact", path: "/contact", permission: true },
  ];

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const isHome = location.pathname === "/";
  const isSignIn = location.pathname === "/sign-in";

  const handleNavigationLocal = (path: string) => {
    setAnchorEl(null);
    setMobileOpen(false);
    handleNavigation(path);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250, bgcolor: "rgba(0, 0, 0, 0.9)", height: "100%" }}>
      <List>
        {navItems.map((item) => (
          <div>
            {item.permission && (
              <ListItem
                key={item.name}
                onClick={() => handleNavigationLocal(item.path)}
                sx={{
                  borderBottom:
                    location.pathname === item.path
                      ? `2px solid ${theme.palette.primary.dark}`
                      : "none",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <ListItemText primary={item.name} />
              </ListItem>
            )}
          </div>
        ))}
        {user ? (
          <>
            <ListItem onClick={() => handleNavigationLocal("/profile")}>
              <ListItemText primary="Profile" sx={{ color: "white" }} />
            </ListItem>
            {user.isAdmin && (
              <ListItem
                onClick={() => handleNavigationLocal("/manage-profiles")}
              >
                <ListItemText
                  primary="Manage Profiles"
                  sx={{ color: "white" }}
                />
              </ListItem>
            )}
            <ListItem onClick={handleLogout}>
              <ListItemText primary="Logout" sx={{ color: "white" }} />
            </ListItem>
          </>
        ) : (
          <ListItem onClick={() => handleNavigationLocal("/sign-in")}>
            <ListItemText primary="Sign In" sx={{ color: "white" }} />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      {isSignIn ? null : (
        <StyledAppBar position="fixed" trigger={trigger} isHome={isHome}>
          <Container maxWidth="xl" sx={{ margin: "auto" }}>
            <StyledToolbar disableGutters>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                  cursor: "pointer",
                }}
                onClick={() => handleNavigationLocal("/")}
              >
                <Logo src="/logo.png" alt="TI Logo" />
                <CustomTypography
                  size="lg"
                  bold
                  style={{ letterSpacing: "1px" }}
                >
                  Tuned In Athlete Development
                </CustomTypography>
              </Box>

              {isMobile ? (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ ml: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {navItems.map(
                    (item) =>
                      item.permission &&
                      (location.pathname === item.path ? (
                        <ActiveNavButton
                          key={item.name}
                          onClick={() => handleNavigationLocal(item.path)}
                        >
                          {item.name}
                        </ActiveNavButton>
                      ) : (
                        <NavButton
                          key={item.name}
                          onClick={() => handleNavigationLocal(item.path)}
                        >
                          {item.name}
                        </NavButton>
                      ))
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
                        PaperProps={{
                          sx: {
                            border: "1px solid gray",
                            bgcolor: "secondary.light",
                            color: "white",
                            "& .MuiMenuItem-root:hover": {
                              bgcolor: "secondary.dark",
                            },
                          },
                        }}
                      >
                        <MenuItem
                          onClick={() => handleNavigationLocal("/profile")}
                        >
                          Profile
                        </MenuItem>
                        {user.isAdmin && (
                          <MenuItem
                            onClick={() =>
                              handleNavigationLocal("/manage-profiles")
                            }
                          >
                            Manage Profiles
                          </MenuItem>
                        )}
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </Box>
                  ) : (
                    <NavButton
                      onClick={() => handleNavigationLocal("/sign-in")}
                    >
                      Sign In
                    </NavButton>
                  )}
                </Box>
              )}
            </StyledToolbar>
          </Container>
        </StyledAppBar>
      )}

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>

      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default Navbar;
