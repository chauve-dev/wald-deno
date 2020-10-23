import middleware from '../middleware.ts';

export default class middlewareManager {
    private registerGlobalMiddleware(toRun: Array<any>): void{
        for(const key in middleware){
            if(this.removeWhiteSpace(key.split("/")).toString() == "*"){
                toRun.push(middleware[key].controller);
            }
        }
    }

    private isMiddlewareRegistered(url: string): Boolean{
        var middlewareExists: Boolean = false;
        for(const key in middleware){
            //on regarde si un middleware Existe
            switch(middleware[key].type){
                case "global":
                    break;
                case "strict":
                    break;
            }
            console.log(this.removeWhiteSpace(key.split("/")));
        }
        return middlewareExists;
    }

    private getMiddlewareController(toRun: Array<any>){

    }

    public run(url: string): Array<any>{
        var controllerToRun: Array<any> = []
        this.registerGlobalMiddleware(controllerToRun);
        if(this.isMiddlewareRegistered(url)){
            this.getMiddlewareController(controllerToRun);
        }
        return controllerToRun;
    }

    private removeWhiteSpace(array: Array<string>): Array<string>{
        return array.filter(x => x !== "")
    }
}


var test = new middlewareManager()
console.log(test.run("/test/"));
console.log("\n\n\n\n\n\n\n\n\n\n")
console.log(test.run("/produit/"));
console.log("\n\n\n\n\n\n\n\n\n\n")
console.log(test.run("/produit/none/waza/wow"));
console.log("\n\n\n\n\n\n\n\n\n\n")
console.log(test.run("/"));