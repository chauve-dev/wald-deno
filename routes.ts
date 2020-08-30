import { routesInterface } from './app/interfaces.ts';

const routes: routesInterface = {
    "/accueil": { method: ['GET'], controller: 'accueilController' },
    "/produit": { method: ['GET'], controller: 'produitController' }
}

export default routes;