import routeController from '../../app/routeController.ts';
export default class accueilController extends routeController {
    index(){
        this.redirect("accueil", 301)
    }
}