import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";

export default function NavBar({ user }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogInMenu = () => {
    navigate("/login");
    handleCloseUserMenu();
  };

  const handleLogOutMenu = () => {
    localStorage.removeItem("token");
    window.location = "/login";
    handleCloseUserMenu();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/patients" className="nav-link">
                  Patients
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  Treatments
                </Link>
              </li>
            </ul>
          </div>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="" />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user && (
                <div>
                  <MenuItem>
                    <Typography textAlign="center">
                      {user.firstName} {user.lastName}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogOutMenu}>
                    <Typography textAlign="center" className="text-danger">
                      Log Out
                    </Typography>
                  </MenuItem>
                </div>
              )}
              {!user && (
                <MenuItem onClick={handleLogInMenu}>
                  <Typography textAlign="center" className="text-primary">
                    Log In
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </div>
      </nav>
    </>
  );
}
