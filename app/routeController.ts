import { ServerRequest } from "https://deno.land/std@0.67.0/http/server.ts";
import { normalizedUrl, params } from './interfaces.ts';
import ejsHandler from './ejsHandler.ts';

export default class controller{
    request: ServerRequest;
    getParams: Map<string,string>;
    urlParams: Map<string,string>;

    constructor(request: ServerRequest, url:string,routeURI:string){
        this.request = request;
        this.getParams = controller.buildGetMap(url);
        this.urlParams = controller.buildUriMap(url,routeURI)
        this.index();
    }

    index(){
        this.send('La route fonctionne mais nécessite la methode index() pour renvoyer une donnée')
    }

    async render(data: string, params: params){
        var page = await ejsHandler.render(data, params)
        if(page){
            this.request.respond({ body: page, status: 200, headers: new Headers({ "content-type": 'text/html;charset=utf-8' })});
        }else{
            this.request.respond({body: "Erreur", status: 500, headers: new Headers({ "content-type": "text/plain;charset=utf-8"})});
        }
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

    public static buildGetMap(requestURI : string){
        let GetMap = new Map<string, string>()
        if (requestURI.split("?").length==2){
            const getParam = requestURI.split("?")[1].split("&");
            for (const param of getParam) {
                const keyValues = param.split("=")
                if (keyValues.length==2){
                    GetMap.set(keyValues[0],keyValues[1])
                }
            }
        }
        return GetMap;
    }

    public static buildUriMap(requestURI : string, routeURI : string){
        let UriMap = new Map<string, string>()

        const requestUriArr = requestURI.split("?")[0].split("/");
        const routeUriArr = routeURI.split("/");

        if (requestUriArr.length===routeUriArr.length){
            for (let i = 0; i < requestUriArr.length; i++) {
                if (routeUriArr[i].startsWith(":")){
                    UriMap.set(routeUriArr[i].replace(":",""),requestUriArr[i])
                }
            }
        }
        return UriMap;

    }

}
