import middleware from '../middleware.ts';

export default class middlewareManager {
    private registerGlobalMiddleware(toRun: Array<any>): void{
        //on ajoute les middleware global
    }

    private isMiddlewareRegistered(url: string): Boolean{
        var middlewareExists: Boolean = false;
        for(const key in middleware){
            //on regarde si un middleware Existe
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
}