import { middlewareInterface } from './app/interfaces.ts';

const middleware: middlewareInterface = {
    "*": { type: "strict", method: ['GET'], controller: 'accueilController' },
    "/accueil": { type: "strict", method: ['GET'], controller: 'accueilController' },
    "/produit": { type: "global", method: ['GET'], controller: 'produitController' },
    "/produit/*/waza/*": { type: "strict", method: ['GET'], controller: 'produitController' }
}

export default middleware;