import './setup';

import { GlobalStyle } from './foundation/styles/GlobalStyle';
import { Router } from './routes';

export const ClientApp: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
};
