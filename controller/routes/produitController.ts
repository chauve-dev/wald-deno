import routeController from '../../app/routeController.ts';
import {params} from "../../app/interfaces.ts";
export default class produitController extends routeController {
    index(){
        let uri:params = {};
        this.urlParams.forEach((value:string, key:string) => {
            uri[key] = value
        });

        let get:params = {};
        this.getParams.forEach((value:string, key:string) => {
            get[key] = value
        });

        this.json({
            uri : uri,
            get : get
        });
    }
}