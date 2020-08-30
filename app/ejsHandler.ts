import { engineFactory } from "https://deno.land/x/view_engine@v1.3.0/mod.ts";
import { params } from './interfaces.ts';

export default class ejsHandler {
    static async render(view: string, params: params){
        const ejsEngine = engineFactory.getEjsEngine()
        try{
            const file = await Deno.open(`views/${view}.ejs`);
            const decoder = new TextDecoder('utf-8');
            const data =  decoder.decode(await Deno.readAll(file));
            const rendered = ejsEngine(data, params);
            return rendered;
        }catch(e){
            console.error(e);
            return undefined;
        }
    }
}