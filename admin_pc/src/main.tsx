import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import { client } from './utils/apollo';
import Router from '@/routes/index';

import '@/styles/reset.less';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </ApolloProvider>,
);
