import { SignInPage } from '@backstage/core-components';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import { ComponentProps, useEffect, useMemo, useRef, useState } from 'react';

import adventureLoginPanel from './images/adventureLogin.png';
import scrollPanel from './images/scrollPanel.png';
import backstageLogo from './images/backstageLogo.png';

// Importando CSS externo
import './styles/particle.css';

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '100vh', // Garante que a tela de login ocupe a página inteira
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
    backgroundImage: `url(${scrollPanel})`, // Imagem de fundo
    backgroundSize: 'cover', // Cobre todo o painel
    backgroundPosition: 'center', // Centraliza a imagem
    backgroundRepeat: 'no-repeat', // Não repete a imabasegem
    // borderRadius: '0 20px 20px 0', // Bordas arredondadas apenas no canto superior direito e inferior direito
    padding: theme.spacing(4), // Espaçamento interno. 4 x 8px = 32px
    color: '#fff', // Cor do texto branca
    position: 'relative', // Permite o usar o zindex para controlar camadas
    zIndex: 1, // Define camada. Maior = mais para frente
  },
  rightPanel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${adventureLoginPanel})`, // Imagem de fundo
    backgroundSize: 'cover', // Cobre todo o painel
    backgroundPosition: 'center', // Centraliza a imagem
    backgroundRepeat: 'no-repeat', // Não repete a imabasegem
    // borderRadius: '20px 0 0 20px', // Bordas arredondadas apenas no canto superior esquerdo e inferior esquerdo
    padding: theme.spacing(4), // Espaçamento interno
    position: 'relative', // Para posicionar overlay se necessário
    [theme.breakpoints.down('sm')]: { // Responsividade para telas pequenas
      borderRadius: 0, // Remove bordas arredondadas em telas pequenas
    },
  },
  logo: {
    width: 90, // Largura do logo
    height: 90, // Altura do logo
    marginBottom: theme.spacing(1.5), // Espaçamento abaixo do logo. Separa ele dos textos abaixo 
    // animation: '$float 3s ease-in-out infinite', // Animação de flutuar
  },
  title: {
    fontSize: '2rem', // Tamanho relativo da fonte (relativo ao root) 
    fontWeight: 700, // Negrito
    marginBottom: theme.spacing(2), // Espaçamento abaixo do título
    // textShadow: '2px 2px 4px rgba(0,0,0,0.2)', // Sombra para destacar o texto
    color: '#242322ff', 
  },
  subtitle: {
    fontSize: '1.2rem',
    textAlign: 'left', // Justifica o texto
    maxWidth: 300,
    fontWeight: 80,
    lineHeight: 1.2, // Espaçamento entre linhas
    color: '#050505ff', 
  },
  signInWrapper: {
    width: '100%',
    maxWidth: 400,
  },
  // Esconde o SignInPage original mas mantém funcional
  hiddenSignIn: {
    position: 'absolute',  // Remove do fluxo normal
    opacity: 0,            // Invisível
    pointerEvents: 'none', // Não clicável pelo mouse
    height: 0,             // Sem altura
    overflow: 'hidden',    // Esconde qualquer conteúdo que vaze
  },
  // Botão customizado de login
  loginButton: {
    background: 'radial-gradient(ellipse, #021461 0%, #bff5f8 100%)',
    color: '#fff',
    padding: '16px 48px',
    fontSize: '1.2rem',
    fontWeight: 600,
    borderRadius: 80,
    textTransform: 'none' as const,
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    
  },
  loginButtonWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 16,
    opacity: 0.9,
    marginRight: 10,
    marginTop: 150, // Empurra o botão para baixo (ajuste o valor conforme necessário)
    zIndex: 2,
    position: 'relative',
    // background: '#666',
  },

  loginSubtext: {
    color: '#666',
    fontSize: '0.9rem',
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
  }, // começa visível e opaco, fica um pouco translucido e depois volta a ficar opaco 
  textBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Alinha textos à esquerda
    maxWidth: 300,
    gap: theme.spacing(1),
  },
}));

type SignInPageProps = ComponentProps<typeof SignInPage>;

export const CustomSignInPage = (props: SignInPageProps) => {
  const classes = useStyles();
  const signInRef = useRef<HTMLDivElement>(null);
  const loginTimeoutRef = useRef<number | null>(null);
  const [isPortalBoosting, setIsPortalBoosting] = useState(false);

  // Função que clica no botão do SignInPage original
  const handleLogin = () => {
    if (isPortalBoosting) {
      return;
    }

    setIsPortalBoosting(true);

    // Acelera e intensifica as partículas por 1.3s antes de acionar o login real
    loginTimeoutRef.current = window.setTimeout(() => {
      setIsPortalBoosting(false);

      const button = signInRef.current?.querySelector('button');
      if (button) {
        button.click();
      }
    }, 1300);

    return;
  };

  // Configuração das partículas: raio e delay
  // Gera partículas com raio, delay e velocidade dentro de intervalos definidos
  const minVelocity = 0.7;
  const particlesConfig = useMemo(() => [
    ...Array.from({ length: 80 }, () => ({
      radius: Math.floor(Math.random() * 9) + 12,
      delay: -Math.abs(+(Math.random() * 15).toFixed(2)),
      velocity: +((Math.random() + minVelocity)* 6).toFixed(2),
    })),
  ], []);

  useEffect(() => {
    return () => {
      if (loginTimeoutRef.current) {
        window.clearTimeout(loginTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={classes.container}>

      <Grid container style={{ minHeight: '100vh' }}>
        {/* Painel esquerdo - Branding e informações */}
        <Grid item xs={12} md={4} className={classes.leftPanel}>
          {/* Logo - substitua pela sua imagem */}
          <img
            src={backstageLogo}
            alt="Backstage Logo"
            className={classes.logo}
          />

          <Typography className={classes.title}>
            Welcome to my Portal
          </Typography>
          
          <div className={classes.textBlock}>
            <Typography className={classes.subtitle}>
              Hello adventurer!                           
            </Typography>

            <Typography className={classes.subtitle}>
              This portal was developed using Backstage and will be the central hub for my portfolios. I invite you to enter this portal and follow my journey.
            </Typography>
          </div>

        </Grid>

        {/* Painel direito - Botão de login customizado */}
        <Grid item xs={12} md={8} className={classes.rightPanel}>
          {/* <div className="portal" /> */}
          {/* Partículas brilhantes animadas */}
          {particlesConfig.map((p, i) => (
            <div
              key={i}
              className={`particle ${isPortalBoosting ? 'particle--boost' : ''}`}
              style={{
                ['--particle-velocity' as any]: `${p.velocity}s`,
                animationDelay: `${p.delay}s`,
                ['--particle-radius' as any]: `${p.radius}vmin`,
              }}
            />
          ))}
          <div className={classes.loginButtonWrapper}>
            <Button 
              className={classes.loginButton}
              onClick={handleLogin}
              variant="contained"
              disabled={isPortalBoosting}
              style={{ padding: '6px 15px', fontSize: "1rem" }}
            >
              Enter the portal
            </Button>
            <Typography className={classes.loginSubtext} />
          </div>

          {/* SignInPage escondido - mantém a funcionalidade */}
          <div ref={signInRef} className={classes.hiddenSignIn}>   {/* usa o ref para conectar ele com o botão atraves do handler */}
            <SignInPage {...props} auto={false} /> {/* Sempre que o botão for clicado, ele disparará o handler para que o SignInPage seja acionado */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
