import { ServerRequest } from "https://deno.land/std@0.67.0/http/server.ts";
import { normalizedUrl, params } from './interfaces.ts';

export default class controller{
    request: ServerRequest;
    params: params;

    constructor(request: ServerRequest, url: normalizedUrl){
        this.request = request;
        this.params = url.params;
        this.index();
    }

    index(){
        this.send('La route fonctionne mais nécessite la methode index() pour renvoyer une donnée')
    }

    render(data: string){
        this.request.respond({ body: data, status: 200, headers: new Headers({ "content-type": 'text/html;charset=utf-8' })});
    }

    send(data: string){
        this.request.respond({ body: data, status: 200, headers: new Headers({ "content-type": 'text/plain;charset=utf-8' })});
    }

    json(data: any){
        this.request.respond({ body: JSON.stringify(data), status: 200, headers: new Headers({ "content-type": 'application/json;charset=utf-8' })});
    }

    custom(data: string, type: string, charset: string, status: number){
        this.request.respond({ body: data, status: status, headers: new Headers({ "content-type": `${type};charset=${charset}` })});
    }

}
