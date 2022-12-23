export type Colors = {
  primary: {
    dark: string;
    light: string;
    normal: string;
    opaque: string;
  };
  secondary: {
    dark: string;
    light: string;
    normal: string;
  };
  text: {
    accent: string;
    primary: string;
    secondary: string;
    subtitle: {
      primary: string;
      secondary: string;
    };
  };
};

export const colors: Colors = {
  primary: {
    dark: '#000000',
    light: '#484848',
    normal: '#212121',
    opaque: '#00000099'
  },
  secondary: {
    dark: '#00b686',
    light: '#6effe8',
    normal: '#1DE9B6'
  },
  text: {
    accent: '#1DE9B6',
    primary: '#FFFFFF',
    secondary: '#000000',
    subtitle: {
      primary: '#D9D9D9',
      secondary: '#2D2D2D'
    }
  }
};
