import { Home, Login, Signup } from './pages';
import { TopAppBar }from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Container from '@mui/material/Container'

function App() {

  return (
  <BrowserRouter>
    <TopAppBar />
    <Container sx={{marginTop: "5%"}}>
      <Routes>
        <Route exact path="/" element={  <Home /> }></Route>
        <Route exact path="/login" element={  <Login /> }></Route>
        <Route exact path="/signup" element={  <Signup /> }></Route>
      </Routes>
    </Container>
    </BrowserRouter>
  );
}

export default App;
