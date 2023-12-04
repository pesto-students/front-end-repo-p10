import { MuiThemeProvider, createTheme } from '@material-ui/core';
import './App.css';
import Navbar from './components/common/Navbar';
import RouteContainer from './routes';

const theme = createTheme({
  typography: {
   "fontFamily": `Poppins`,
  }
});

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
      <Navbar/>
      <RouteContainer/>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
