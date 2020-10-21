import { serve, ServerRequest } from "https://deno.land/std@0.67.0/http/server.ts";
import staticHandler from './static.ts';
import controllerManager from '../app/controllerManager.ts';

export default class waldServer{
  private port: number;
  private ctrlManager : any;

  constructor(port: number){
    this.port = port;
  }

  public async start(){
      this.ctrlManager = new controllerManager();
      const s = serve({ port: this.port });
      for await (const req of s) {
        console.log(`Request on ${req.url} via method ${req.method}`)
        this.handler(req);
      }
  }


  private async handler(req: ServerRequest ){
    const url = req.url;
    const routeURI = this.ctrlManager.getKeyURI(url)
    if (routeURI!==null){
      await this.ctrlManager.runController(url, routeURI, req)
    }else{
      var resp = await this.staticCase(req)
      if(resp){
        req.respond(resp);
      }else{
        req.respond({body: "Erreur 404", status: 404, headers: new Headers({ "content-type": "text/plain;charset=utf-8"})});
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