import { ServerRequest } from "https://deno.land/std@0.67.0/http/server.ts";
import { normalizedUrl } from './interfaces.ts';

export default class controllerManager {
    static async runController(controller: string, url: normalizedUrl, req: ServerRequest){
        try{
            await import("../controller/routes/" + controller+".ts").then((ctrl) => {
                new ctrl.default(req, url);
            });
        }catch(e){
            console.error(e);
            req.respond({body: "Erreur", status: 404, headers: new Headers({ "content-type": "text/plain;charset=utf-8"})});
        }
    }
}