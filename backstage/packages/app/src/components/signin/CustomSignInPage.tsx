import { SignInPage } from '@backstage/core-components';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box } from '@material-ui/core';
import { ComponentProps } from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '100vh', //Garante que a tela de login ocupe a página inteira
    display: 'flex', // Permite organizar os filhos de forma flexível
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Cores em degradê num ângulo de 135º
    position: 'relative',
    overflow: 'hidden', // Corta tudo que fica fora do container.
  },
  leftPanel: {
    display: 'flex',
    flexDirection: 'column', // organização em coluna (na vertical, um filho em cima do outro)
    justifyContent: 'center', // centraliza os filhos verticalmente
    alignItems: 'center', // centraliza os filhos horizontalmente
    padding: theme.spacing(4), // Espaçamento interno. 4 x 8px = 32px
    color: '#fff', // Cor do texto branca
    position: 'relative', // Permite o usar o zindex para controlar camadas
    zIndex: 1, //Define camada. Maior = mais para frente
  },
  rightPanel: {
    display: 'flex', //
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '20px 0 0 20px', // Bordas arredondadas apenas no canto superior esquerdo e inferior esquerdo
    padding: theme.spacing(4), // Espaçamento interno
    [theme.breakpoints.down('sm')]: { // Responsividade para telas pequenas
      borderRadius: 0, // Remove bordas arredondadas em telas pequenas
    },
  },
  logo: {
    width: 120, // Largura do logo
    height: 120, // Altura do logo
    marginBottom: theme.spacing(3), // Espaçamento abaixo do logo. Separa ele dos textos abaixo 
    animation: '$float 3s ease-in-out infinite', // Animação de flutuar
  },
  title: {
    fontSize: '2.5rem', // Tamanho relativo da fonte (relativo ao root) 
    fontWeight: 700, // Negrito
    marginBottom: theme.spacing(2), // Espaçamento abaixo do título
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)', // Sombra para destacar o texto
  },
  subtitle: {
    fontSize: '1.2rem',
    opacity: 0.9, // Deixa o texto um pouco transparente
    textAlign: 'center',
    maxWidth: 400,
    lineHeight: 1.6, // Espaçamento entre linhas
  },
  signInWrapper: {
    width: '100%',
    maxWidth: 400,
  },
  // Animações CSS
  '@keyframes float': { // Animação de flutuar
    '0%, 100%': {
      transform: 'translateY(0)', // Volta à posição final e inical. Ele terminará onde começou
    },
    '50%': {
      transform: 'translateY(-10px)', // Move 10px para cima no meio da animação
    }, // começa em um lugar, sobe 10px e volta para o lugar de antes
  },
  '@keyframes pulse': {
    '0%, 100%': {
      opacity: 1, // Opacidade total no início e no fim da animação
    },
    '50%': {
      opacity: 0.4, // Opacidade reduzida no meio da animação
    },
  }, // comea visível e opaco, fica um pouco translucido e depois volta a ficar opaco
  // Círculos decorativos animados
  circle1: {
    position: 'absolute', 
    width: 300,
    height: 300,
    borderRadius: '50%', //círculo perfeito
    background: 'rgba(255,255,255,0.1)',
    top: -100,
    left: -100,
    animation: '$pulse 4s ease-in-out infinite',
  },
  circle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.1)',
    bottom: -50,
    right: '40%',
    animation: '$pulse 5s ease-in-out infinite',
  },
  circle3: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.05)',
    top: '30%',
    left: '20%',
    animation: '$float 6s ease-in-out infinite',
  },
  featureList: {
    marginTop: theme.spacing(4),
    textAlign: 'left',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    opacity: 0.9,
    '& span': {
      marginRight: theme.spacing(1),
      fontSize: '1.2rem',
    },
  },
}));

type SignInPageProps = ComponentProps<typeof SignInPage>;

export const CustomSignInPage = (props: SignInPageProps) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {/* Elementos decorativos animados */}
      <div className={classes.circle1} />
      <div className={classes.circle2} />
      <div className={classes.circle3} />

      <Grid container style={{ minHeight: '100vh' }}>
        {/* Painel esquerdo - Branding e informações */}
        <Grid item xs={12} md={6} className={classes.leftPanel}>
          {/* Logo - substitua pela sua imagem */}
          <img
            src="https://backstage.io/logo_assets/svg/Icon_Teal.svg"
            alt="Logo"
            className={classes.logo}
          />

          <Typography className={classes.title}>
            Bem-vindo ao Portal
          </Typography>

          <Typography className={classes.subtitle}>
            Sua plataforma centralizada para desenvolvedores. 
            Gerencie serviços, documentação e muito mais em um só lugar.
          </Typography>

          {/* Lista de features */}
          <Box className={classes.featureList}>
            <div className={classes.featureItem}>
              <span>📦</span>
              <Typography>Catálogo de Serviços</Typography>
            </div>
            <div className={classes.featureItem}>
              <span>📚</span>
              <Typography>Documentação Técnica</Typography>
            </div>
            <div className={classes.featureItem}>
              <span>🚀</span>
              <Typography>Templates de Projetos</Typography>
            </div>
            <div className={classes.featureItem}>
              <span>🔧</span>
              <Typography>Ferramentas Integradas</Typography>
            </div>
          </Box>
        </Grid>

        {/* Painel direito - Formulário de login */}
        <Grid item xs={12} md={6} className={classes.rightPanel}>
          <div className={classes.signInWrapper}>
            {/* Componente de SignIn padrão do Backstage */}
            <SignInPage {...props} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
