import { Home } from './pages';
import { TopAppBar }from './components'

import Container from '@mui/material/Container'

function App() {

  return (
    <>
      <TopAppBar />
      <Container >
        <Home />
      </Container>
    </>
  );
}

export default App;
