export default class staticHandler{

    static headerBuilder(str: string){
        var build: string = "";
        var data = str.split('/')[1];
        data = data.split(".")[1];
        switch(data){
          case "json":
            build = "application/json"
            break;
          default:
            build = "text/plain"
            break;
        }
        return { "content-type": build+';charset=utf-8' };
      }
      
      static async staticFile(str: string){
        var data = str.split('/')[1]
        try{
          const file = await Deno.open('static/'+data);
          const decoder = new TextDecoder('utf-8');
          return decoder.decode(await Deno.readAll(file));
        }catch(e){
          return undefined;
        }
      }
}