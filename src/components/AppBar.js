import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import Login from '@mui/icons-material/Login';
import MoreIcon from '@mui/icons-material/MoreVert';
import {Link} from 'react-router-dom';
import {useAuth} from '../hooks';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { searchUsers} from '../api';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const auth = useAuth();
  const [results, setResults] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  React.useEffect(()=>{
    const fetchUsers = async () => {
      const response = await searchUsers(searchText);
      if(response.success){
        setResults(response.data.users);
      }
    }
    if(searchText.length > 2){
      fetchUsers();
    }else{
      setResults([]);
    }
  }, [searchText])

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = ( auth.user ?
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
        <MenuItem>
        <AccountCircle/>
        <Link to={'/settings'} style={{textDecoration: 'none',color: "inherit"}} onClick={()=>{handleMobileMenuClose()}}>
        <Typography
            variant="body2"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block'},marginLeft:1 }}
        >
          {auth.user.name}
        </Typography>
        </Link>
      </MenuItem>
      <MenuItem>
        <Logout/>
       <Link to={'/login'} onClick={()=>{auth.logout(); handleMobileMenuClose()}} style={{textDecoration: 'none',color: "inherit"}}>
       <Typography
               variant="body2"
               noWrap
               component="div"
               sx={{ display: { xs: 'none', sm: 'block'},marginLeft:1 }}
            >
              Logout
          </Typography>
       </Link>
      </MenuItem>
    </Menu> :

  <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Login/>
        <Link style={{textDecoration: 'none',color: "inherit"}} to={"/login"} onClick={()=>{handleMobileMenuClose()}}>
        <Typography
            variant="body2"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block'},marginLeft:1 }}
        >
          Login
        </Typography>
        </Link>
      </MenuItem>
      <MenuItem>
        <AppRegistrationIcon/>
        <Link style={{textDecoration: 'none',color: "inherit"}} to={"/signup"} onClick={()=>{handleMobileMenuClose()}}>
        <Typography
               variant="body2"
               noWrap
               component="div"
               sx={{ display: { xs: 'none', sm: 'block'},marginLeft:1 }}
            >
              Register
          </Typography>
        </Link>
      </MenuItem>
    </Menu>
  )

  const searchedOptions = (
    
     <Box sx={{position: 'absolute',top: 55,left: 116,width: 236, zIndex: 10}} >
       <Paper elevation={3}>
         <Box sx={{maxHeight:300, overflow: 'scroll'}}>
          {results && results.map((user)=>(
          <Link to={`/user/${user._id}`}key={`searched-results-${user._id}`}  style={{textDecoration: 'none',color: "inherit"}} onClick={()=>{setSearchText(''); setResults([])}}>
            <Box sx={{display: 'flex', alignItems: 'center', padding:'0px 4px', margin:1}}> 
            <AccountCircle/>
            <Typography variant="subtitle2" component="span" ml={2}>
            {user.name}
        </Typography>
       </Box>
          </Link>
     ))}
         </Box>
      </Paper>
     </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Link style={{textDecoration: 'none',color: "inherit"}} to={"/"}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
               Codeial
            </Typography>
            </Link>
          <Search> 
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }} 
              onChange={(e)=>setSearchText(e.target.value)} value={searchText}
            />
          </Search>
          {searchedOptions}
          <Box sx={{ flexGrow: 2 }} />
          {auth.user ? <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <AccountCircle fontSize="large"/>
            <Link style={{textDecoration: 'none',color: "inherit"}} to={"/settings"}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block'},marginLeft:2 }}
              >{auth.user.name}</Typography>
              </Link>
              <Link style={{textDecoration: 'none',color: "inherit"}} to={"/login"} onClick={auth.logout}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: 'none', sm: 'block' },marginLeft:2  }}
                >Logout</Typography>
              </Link>
          </Box>: 
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Link style={{textDecoration: 'none',color: "inherit"}} to={"/login"}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block'},marginLeft:2 }}
              >Login</Typography>
              </Link>
              <Link style={{textDecoration: 'none',color: "inherit"}} to={"/signup"}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: 'none', sm: 'block' },marginLeft:2  }}
                >Register</Typography>
              </Link>
          </Box>}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
