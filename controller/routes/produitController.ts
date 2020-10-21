import routeController from '../../app/routeController.ts';
import {params} from "../../app/interfaces.ts";
export default class produitController extends routeController {
    index(){

        this.json({
            uri : this.urlParams,
            get : this.getParams
        });
    }
}