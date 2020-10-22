import { serve, ServerRequest } from "https://deno.land/std@0.67.0/http/server.ts";
import staticHandler from './static.ts';
import controllerManager from '../app/controllerManager.ts';
import urlFormat from './urlFormat.ts';
import { BufReader} from "https://deno.land/std@0.67.0/io/mod.ts";

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
    const routeURI = urlFormat.getKeyURI(url)
    switch (req.method) {
      case "GET" || "HEAD":
        if (routeURI !== null)
        {
          await this.ctrlManager.runController(req, urlFormat.build(url, routeURI))
        }
        else
        {
          const resp = await this.staticCase(req)
          if (resp) {
            req.respond(resp);
          } else {
            //@todo replacer req par un controller d'erreur
            req.respond({
              body: "Erreur 404",
              status: 404,
              headers: new Headers({"content-type": "text/plain;charset=utf-8"})
            });
          }
        }
        break;
      case "POST":
        const decoder = new TextDecoder('utf-8');
        const body = await decoder.decode(await Deno.readAll(req.body))
        console.log(req.headers.get("content-type"));
        console.log(body);
        break;
      default:
        //@todo replacer req par un controller d'erreur
        req.respond({
          body: "Not implemented",
          status: 501,
          headers: new Headers({"content-type": "text/plain;charset=utf-8"})
        });
    }
  }
  
  private async staticCase(req: ServerRequest){
    const data: Uint8Array | undefined = await staticHandler.staticFile(req.url);
    const header: Headers = new Headers(staticHandler.headerBuilder(req.url));
    if(data){
      return { body: data, status: 200, headers: header};
    }else{
      return undefined;
    }
  }
}