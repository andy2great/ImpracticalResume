import { ImpracticalContent } from './components/impractical-component/impractical-component/impractical-content.component';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Roboto',
    ].join(','),
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Typography component={'span'} theme={theme}>
          <ImpracticalContent>
          </ImpracticalContent>
        </Typography>
      </ThemeProvider>
    </div>
  );
}

export default App;
