import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { Link, Outlet } from "react-router-dom";
import Logo from "/Frame 1Logo (1).png";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
const drawerWidth = 300;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const menuItems = [
    { text: "Dashboard", link: "", icon: <DashboardIcon /> },
    { text: "All Users", link: "/dashboard/users", icon: <GroupIcon /> },
    {
      text: "Manage Bookings",
      link: "/dashboard/manage-bookings",
      icon: <AppRegistrationRoundedIcon />,
    },
    {
      text: "Add menu",
      link: "/dashboard/add-menu",
      icon: <AddCircleOutlineRoundedIcon />,
    },
    { text: "Manage Items", link: "/dashboard/manage-items", icon: <ModeEditRoundedIcon /> },
    { text: "Home", link: "/", icon: <HomeIcon /> },

  ];

  const menuItems1 = [
    // { text: "Home", link: "/", icon: <HomeIcon /> },
    // { text: "Menu", link: "/dashboard/users", icon: <RestaurantMenuIcon /> },
    // {
    //   text: "Orders Tracking",
    //   link: "/send-email",
    //   icon: <ShareLocationIcon />,
    // },
    // {
    //   text: "Customer Support",
    //   link: "/drafts",
    //   icon: <ContactSupportIcon />,
    // },
  ];

  const drawer = (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.1)", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          pt: 2,
          //   bgcolor:"rgba(0, 0, 0, 0.1)"
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <span
          className="badge badge-primary text-sm font-bold"
          style={{
            maxWidth: "100%",
            height: "auto",
            marginBottom: "15px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          admin
        </span>
      </Box>
      {/* <Toolbar /> */}

      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.link}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)", // Change the background color on hover
                  color: "blue", // Change the text color on hover (optional)
                  transform: "scale(1.01)", // Slightly scale up the button
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add a shadow effect
                  transition: "all 0.3s ease", // Smooth transition effect
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {menuItems1.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.link}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)", // Change the background color on hover
                  color: "blue", // Change the text color on hover (optional)
                  transform: "scale(1.02)", // Slightly scale up the button
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add a shadow effect
                  transition: "all 0.3s ease", // Smooth transition effect
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const {loading}=useAuth();
  const [isAdmin,isAdminLoading] = useAdmin();
  

  return (
    <>
      {isAdmin ? (
        <Box sx={{ display: "flex" }}>
          {/* <CssBaseline /> */}

          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              display: "flex",
              justifyContent: "flex-start", // Align items to the left
              backgroundColor: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center", // Align items vertically in the center
                px: 2, // Add padding to the left and right
                justifyContent: "space-between",
                //   my:1
              }}
            >
              <IconButton
                color="black"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <button className="btn my-1 bg-green px-6 font-semibold text-white rounded-full sm:hidden">
                Logout
              </button>
            </Box>
          </AppBar>

          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onTransitionEnd={handleDrawerTransitionEnd}
              onClose={handleDrawerClose}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            {/* <Toolbar /> */}
            <div className="mt-10 md:mt-2 mx-4">
              <Outlet />
            </div>
          </Box>
        </Box>
      ) : (
      
        <div className="flex items-center justify-center h-screen">
        <div>
          <Link to="/menu" className="btn bg-green px-8 py-3 font-semibold text-white rounded-lg">
            Back to Menu
          </Link>
        </div>
      </div>
      
      
      )}
    </>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
