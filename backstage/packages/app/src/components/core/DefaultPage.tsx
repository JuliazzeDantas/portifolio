import './core-styles/core-page.css';
import { Grid } from '@material-ui/core';

import { Header } from './Header';

type Props = {
  children?: React.ReactNode;
  titleHeader?: string;
};

export const DefaultPage: React.FC<Props> = ({children, titleHeader}) => {
  return (
    <Grid container direction="column" className="container">
      <div className='margin'>
        <Header title={titleHeader} />
        {children}
      </div>
    </Grid>
  );
}