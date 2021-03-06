import { Home, Login, Signup, Page404, Settings, UserProfile } from './pages';
import { TopAppBar, Loader }from './components';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks';
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';



import Container from '@mui/material/Container'

function App() {
  const auth = useAuth();
  if(auth.loading){
    return <Loader />
  }

  function PrivateRoute({ children }) {
    return auth.user ? children : <Navigate to="/login" />;
  }

  return (
  <BrowserRouter>
    <TopAppBar />
    <Container>
      <Routes>
        <Route exact path="/" element={  <Home /> }></Route>
        <Route exact path="/login" element={  <Login /> }></Route>
        <Route exact path="/signup" element={  <Signup /> }></Route>
        <Route exact path="/settings" element={  <PrivateRoute><Settings /></PrivateRoute> }></Route>
        <Route exact path="/user/:userId" element={  <PrivateRoute><UserProfile /></PrivateRoute> }></Route>
        <Route path="*" element={  <Page404 /> }></Route>
      </Routes>
      </Container>
      <Box sx={{display: "flex", justifyContent: "flex-end", paddingRight: "200px",paddingBottom: "20px"}}>
        <IconButton color="secondary" aria-label="up-arrow" onClick={()=>{ window.scrollTo({top:0,behavior: "smooth"})}}>
          <ArrowCircleUpIcon fontSize="large"/>
        </IconButton>
      </Box>
    </BrowserRouter>
  );
}

export default App;
