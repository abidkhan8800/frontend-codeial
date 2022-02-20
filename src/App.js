import { Home, Login, Signup, Page404 } from './pages';
import { TopAppBar, Loader }from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks';


import Container from '@mui/material/Container'

function App() {
  const auth = useAuth();
  console.log("fom app",auth)

  if(auth.loading){
    return <Loader />
  }
  return (
  <BrowserRouter>
    <TopAppBar />
    <Container sx={{marginTop: "5%"}}>
      <Routes>
        <Route exact path="/" element={  <Home /> }></Route>
        <Route exact path="/login" element={  <Login /> }></Route>
        <Route exact path="/signup" element={  <Signup /> }></Route>
        <Route path="*" element={  <Page404 /> }></Route>
      </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
