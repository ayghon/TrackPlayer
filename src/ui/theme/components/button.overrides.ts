export const buttonOverrides = {
  defaultProps: {
    variant: 'primary'
  },
  variants: {
    borderless: {
      _text: { color: 'text.primary', variant: 'button' },
      backgroundColor: 'transparent'
    },
    primary: {
      _text: { color: 'text.secondary', variant: 'button' },
      backgroundColor: 'secondary.normal',
      borderRadius: 'full'
    },
    secondary: {
      _text: { color: 'text.primary', variant: 'button' },
      backgroundColor: 'primary.light',
      borderRadius: 'full'
    }
  }
};
