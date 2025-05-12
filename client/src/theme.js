export const tokensDark = {
  grey: {
    0: "#ffffff",
    10: "#f6f6f6",
    50: "#f0f0f0",
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000",
  },
  primary: {
    // Adjusted olive-green (lighter for better contrast)
    100: "#e2e6d8",
    200: "#c5cdb1",
    300: "#a8b48a",
    400: "#8b9b63",
    500: "#556b3d",  // Main olive (lightened from #3d5033)
    600: "#445631",
    700: "#334025",
    800: "#222b18",
    900: "#11150c",
  },
  secondary: {
    // Darker sage green for better visibility
    50: "#e8f0e7",
    100: "#c5d9c3",
    200: "#8bb387",
    300: "#518d4b",
    400: "#3a6d3a",  // Darker sage (was #4a7c59)
    500: "#2e5c2e",
    600: "#254a25",
    700: "#1c381c",
    800: "#132613",
    900: "#0a140a",
  },
  accent: {
    // Warm terracotta remains
    100: "#f5d6c9",
    200: "#ebad93",
    300: "#e1845d",
    400: "#d75b27",
    500: "#c44515",
    600: "#9d3711",
    700: "#76290d",
    800: "#4e1b08",
    900: "#270d04",
  },
  text: {
    dark: "#e8e8e8",  // Warm off-white for dark mode
    light: "#333333"  // Dark gray for light mode
  }
};

// function that reverses the color palette (keep this unchanged)
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings (updated palette references)
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // DARK MODE - High contrast
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[500],  // Lightened olive
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[400],  // Darker sage
            },
            accent: {
              ...tokensDark.accent,
              main: tokensDark.accent[500],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[300],  // Light gray for text
            },
            background: {
              default: tokensDark.primary[800],  // Darkest olive
              alt: tokensDark.primary[700],
            },
            text: {
              primary: tokensDark.text.dark,  // Warm off-white
              secondary: tokensDark.grey[0],
            }
          }
        : {
            // LIGHT MODE - Natural tones
            primary: {
              ...tokensLight.primary,
              main: tokensDark.grey[50],
              light: tokensDark.grey[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[400],  // Muted sage
              light: tokensDark.secondary[300],
            },
            accent: {
              ...tokensLight.accent,
              main: tokensDark.accent[400],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[600],
            },
            background: {
              default: "#fafaf8",  // Warm white
              alt: tokensDark.grey[50],
            },
            text: {
              primary: tokensDark.text.light,
              secondary: tokensDark.grey[700],
            }
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};