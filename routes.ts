import { routesInterface } from './app/interfaces.ts';

const routes: routesInterface = {
    "/": { method: ['GET'], controller: 'indexController' },
    "/accueil": { method: ['GET'], controller: 'accueilController' },
    "/produit/:val/waza": { method: ['GET'], controller: 'produitController' },
}

export default routes;