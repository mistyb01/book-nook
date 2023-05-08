import { createTheme } from "@mui/material/styles";


const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#cb4e6c',
        },
        secondary: {
          main: '#411e73',
        },
        background: {
          default: '#ffe5e7',
          paper: '#fff'
        },
        info: {
          main: '#36d4c4',
        },
        success: {
          main: '#a2cb5f',
        },
        divider: 'rgba(197,0,0,0.12)',
        text: {
          primary: 'rgba(70,0,19,0.87)',
          secondary: 'rgba(37,10,96,0.6)',
        },
      },
    typography: {
        body1: {
            fontFamily: ['Varela Round', 'sans-serif'].join(','),
        },
        h4: {
            fontFamily: ['Varela Round', 'sans-serif'].join(','),
        },
        emphasis: {
            color: 'hotpink',
            fontWeight: '600'
        },
        logo: {
            fontFamily: ['Darumadrop One', 'cursive'].join(','),
            fontSize: '3rem',
            color: '#cb4e6c'
        },
        entryHeader: {
            fontFamily: ['Varela Round', 'sans-serif'].join(','),
            fontSize: '1.5rem',
            fontWeight: '800'
        }
        
    },
    components: {
      // Name of the component
      MuiButtonBase: {
        defaultProps: {
          // The props to change the default for.
          disableRipple: true, // No more ripple, on the whole application 💣!
        },
      },
      MuiCard: {
        styleOverrides: {
            root: {
                backgroundColor: "rgba(255,255,255,0.5)",
                padding: "0.75rem 1rem"
            }
        }
      },
      MuiPaper: {
        styleOverrides: {
            root: {
                // padding: "1rem"
            }
        }
      }
    },
  });

declare module '@mui/material/styles' {
    interface TypographyVariants {
        emphasis: React.CSSProperties;
        logo: React.CSSProperties;
        entryHeader: React.CSSProperties;

    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        emphasis?: React.CSSProperties;
        logo?: React.CSSProperties;
        entryHeader?: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        emphasis: true;
        logo: true;
        entryHeader: true;
    }
}

export default theme;