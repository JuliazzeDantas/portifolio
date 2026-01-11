import { useApi, identityApiRef } from '@backstage/core-plugin-api';
import { SignInPage } from '@backstage/core-components';


type SignInPageProps = ComponentProps<typeof SignInPage>;

export const CustomLoginButton = (props: SignInPageProps) => {
  const identityApi = useApi(identityApiRef);
  
  const handleLogin = async () => {
    await identityApi.signIn({ provider: 'guest' });
  };

  return (
    <Button onClick={handleLogin}>
      Entrar como Visitante
    </Button>
  );
};