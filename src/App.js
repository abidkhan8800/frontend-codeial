import { Home, Login, Signup, Page404, Settings, UserProfile } from './pages';
import { TopAppBar, Loader }from './components';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks';


import Container from '@mui/material/Container'

function App() {
  const auth = useAuth();
  console.log("fom app",auth)

  if(auth.loading){
    return <Loader />
  }

  function PrivateRoute({ children }) {
    return auth.user ? children : <Navigate to="/login" />;
  }

  return (
  <BrowserRouter>
    <TopAppBar />
    <Container sx={{marginTop: "10%"}}>
      <Routes>
        <Route exact path="/" element={  <Home /> }></Route>
        <Route exact path="/login" element={  <Login /> }></Route>
        <Route exact path="/signup" element={  <Signup /> }></Route>
        <Route exact path="/settings" element={  <PrivateRoute><Settings /></PrivateRoute> }></Route>
        <Route exact path="/user/:id" element={  <PrivateRoute><UserProfile /></PrivateRoute> }></Route>
        <Route path="*" element={  <Page404 /> }></Route>
      </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
