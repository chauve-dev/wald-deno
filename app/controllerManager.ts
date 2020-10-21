import { ServerRequest } from "https://deno.land/std@0.67.0/http/server.ts";
import { normalizedUrl } from './interfaces.ts';
import routes from '../routes.ts';
import routeController from "./routeController.ts";

export default class controllerManager {
    controllerList : Map<string,string>;

    constructor() {
        this.controllerList = new Map<string, string>();
        for (const index in routes) {
                this.controllerList.set(index, routes[index].controller)
        }
    }
    
    public async runController(url: string, routeURL : string, req: ServerRequest){
        console.log(this.controllerList.get(routeURL))
        try{
            await import("../controller/routes/" + this.controllerList.get(routeURL)+".ts").then((ctrl) => {
                new ctrl.default(req, url,routeURL);
            });
        }catch(e){
            console.error(e);
            req.respond({body: "Erreur", status: 404, headers: new Headers({ "content-type": "text/plain;charset=utf-8"})});
        }
    }

    public getKeyURI(URI : String){
        let routeURI=null
        const requestURIArr = URI.split("?")[0].split("/");
        for (const key of this.controllerList.keys()) {
            const routeURIArr = key.split("/")
            if (requestURIArr.length == routeURIArr.length){
                routeURI = key
                for (let i = 0; i < requestURIArr.length; i++) {
                    if (!(routeURIArr[i].startsWith(":"))){
                        if (routeURIArr[i]!==requestURIArr[i]){
                            routeURI = null;
                            break;
                        }
                    }
                }
            }
            if (routeURI!==null) return routeURI;
        }
        return routeURI
    }

    public getRouteController(routeURI:any){
        return this.controllerList.get(routeURI);
    }
}