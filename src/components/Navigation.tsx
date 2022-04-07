import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useAuth } from '../hooks/useAuth';
import { userAtom } from '../state';
import '../styles/Navigation.css';
import logo from '../Images/Logo.png';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React from 'react';
import { Divider, Menu, MenuItem, useMediaQuery } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

const listLinks = [
  { link: '/', title: 'Главная' },
  { link: '/posts', title: 'Курс' },
  { link: '/rating', title: 'Оценки' },
];

export const Navigation = () => {
  const { auth, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const matches = useMediaQuery('(max-width:600px)');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAndLogout = () => {
    logout();
    handleClose();
  };

  const handleCloseAndGo = (link: any) => {
    handleClose();
    navigate(link);
  };

  const username = useRecoilValue(userAtom);

  return (
    <>
      <div className="navigation">
        <div className="navigation__content">
          <div className="navigation__logo">
            <img src={logo} className="img" /> АТЛАС КЛЕТОЧНОГО МИРА
          </div>
          <nav className="navigation__nav">
            <Link to="">Главная</Link>

            <Link to="posts">Курс</Link>
            <Link to="rating">Оценки</Link>

            {username === 'admin' && <Link to="createPost">CreatePost</Link>}
          </nav>
          <div className="navigaton__login">
            {!auth ? (
              <Link to="login">
                <ExitToAppIcon />
              </Link>
            ) : (
              <>
                <AccountCircleIcon fontSize="large" />
                <span onClick={handleClick}>{username}</span>
                <ArrowDropDownIcon />
              </>
            )}
          </div>
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 2.5,
            width: '200px',
            backgroundColor: '#EFF6FF',
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleCloseAndGo('/settings')} disableRipple>
          <SettingsIcon />
          Настройки
        </MenuItem>
        {matches &&
          listLinks.map((link) => (
            <MenuItem onClick={() => handleCloseAndGo(link.link)} disableRipple>
              {link.title}
            </MenuItem>
          ))}
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleCloseAndLogout} disableRipple>
          <LogoutIcon />
          Выйти
        </MenuItem>
      </Menu>
    </>
  );
};
