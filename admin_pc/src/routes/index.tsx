import { useRoutes } from 'react-router-dom';
import routers from './config';

const rootRouter: any = [...routers];

const Router: React.FC = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;
