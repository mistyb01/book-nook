import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        emphasis: {
            color: 'hotpink',
            fontWeight: '600'
        }
    },
    components: {
      // Name of the component
      MuiButtonBase: {
        defaultProps: {
          // The props to change the default for.
          disableRipple: true, // No more ripple, on the whole application 💣!
        },
      }
    },
  });

declare module '@mui/material/styles' {
    interface TypographyVariants {
        emphasis: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        emphasis?: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        emphasis: true;
    }
}

export default theme;