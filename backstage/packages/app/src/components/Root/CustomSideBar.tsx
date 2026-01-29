import {
  createUnifiedTheme,
  palettes,
  UnifiedTheme,
} from '@backstage/theme';

export const CustomSideBar: UnifiedTheme = createUnifiedTheme({
  palette: {
    ...palettes.dark,
    navigation: {
      background: 'rgba(100, 62, 8, 0.2)', // fundo com opacidade 0.2
      indicator: '#eb0e0e', //selecionador
      color: '#b3f5b4', //letra
      selectedColor: '#eae717', // Letra slecionada
      navItem: {
        hoverBackground: 'rgba(29, 26, 196, 0.2)', // Fundo ao passar o mouse com opacidade 0.2
      },
    },
    primary: {
      main: '#8B5A3C',
    },
    background: {
      default: '#1a1a1a',
      paper: '#2a2a2a',
    },
  },
  defaultPageTheme: 'home',
  fontFamily: 'Arial, sans-serif',
});
