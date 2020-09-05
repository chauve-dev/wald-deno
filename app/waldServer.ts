import { serve, ServerRequest } from "https://deno.land/std@0.67.0/http/server.ts";
import staticHandler from './static.ts';
import routes from '../routes.ts';
import controllerManager from '../app/controllerManager.ts';
import urlFormat from './urlFormat.ts';
import { normalizedUrl } from './interfaces.ts';

export default class waldServer{
  private port: number;
  private specialRoute: any;

  constructor(port: number){
    this.port = port;
  }

  public async start(){
      this.specialRoute = this.initSpecialRoutes();
      const s = serve({ port: this.port });
      for await (const req of s) {
        console.log(`Request on ${req.url} via method ${req.method}`)
        this.handler(req);
      }
  }

  initSpecialRoutes(){
    var specialRoutes: Array<any> = [];
    var regex =  new RegExp("(:)\\w+", "g")
    for (var index in routes){
      if(index.includes(':')){
        var controller: string = routes[index].controller;
        if(!index.endsWith("/")){
          index = index+"/"
        }
        var value: any = index.match(new RegExp(":(.*?)/"))
        value = value[1]
        var url = index.split(':'+value);
        var sw = url[0];
        var ew = url[1];
        if(ew.endsWith("/")) ew = ew.slice(0,-1);
        specialRoutes.push({sw: sw, ew: ew, controller: controller})
      }
    }
    return specialRoutes;
  }

  isSpecialRoute(url: string){
    for(var element of this.specialRoute){
      if(url.startsWith(element.sw) && url.endsWith(element.ew)) return element;
    }
    return false;
  }


  private async handler(req: ServerRequest ){
    var url: normalizedUrl = urlFormat.normalize(req.url);
    if(url.route == "") url.route="/";
    if(routes[url.route]){
      if(routes[url.route].method.includes(req.method)){
        controllerManager.runController(routes[url.route].controller, url, req);
      }else{
        req.respond({body: "Erreur", status: 404, headers: new Headers({ "content-type": "text/plain;charset=utf-8"})});
      }
    }else if(this.isSpecialRoute(url.route)){
      var info = this.isSpecialRoute(url.route);
      url.urlParams = url.route.replace(info.sw, "").replace(info.ew, "");
      if(!url.urlParams.includes('/')){
        controllerManager.runController(info.controller, url, req)
      }else{
        req.respond({body: "Erreur", status: 404, headers: new Headers({ "content-type": "text/plain;charset=utf-8"})});
      }
    }else{
      var resp = await this.staticCase(req)
      if(resp){
        req.respond(resp);
      }else{
        req.respond({body: "Erreur", status: 404, headers: new Headers({ "content-type": "text/plain;charset=utf-8"})});
      }
    }
  }
  
  private async staticCase(req: ServerRequest){
    const data: string | undefined = await staticHandler.staticFile(req.url);
    const header: Headers = new Headers(staticHandler.headerBuilder(req.url));
    if(data){
      return { body: data, status: 200, headers: header};
    }else{
      return undefined;
    }
  }
}