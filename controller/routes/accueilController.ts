import routeController from '../../app/routeController.ts';
export default class accueilController extends routeController {
    index(){
        this.json(this.params);
    }
}