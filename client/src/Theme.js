import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#1f4a78',
        },
        secondary: {
            main: '#07777d',
        },
        warning: {
            main: '#F1C232'
        },
        error: {
            main: '#CC0000'
        },
        info: {
            main: '#00FFFF'
        },
        black: {
            main: '#000'
        },
        white: {
            main: '#FFF'
        }
    },
});

export default function Theme(props) {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}