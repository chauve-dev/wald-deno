import { params } from './interfaces.ts'

export default class urlFormat {
    static normalize(data: string){
        var params: params = {};
        var route: string | undefined = undefined;
        if(data.indexOf('?') != -1){
            route=data.split('?')[0];
            var tempParams: string = data.split('?')[1];
            tempParams.split('&').forEach(element => {
                var tempElement: Array<string> = element.split('=');
                params[tempElement[0]] = tempElement[1]
            });
        }else{
            if(data.endsWith('/')){
                data = data.slice(0, data.length-1);
            }
            route=data;
        }

        return {
            route: route,
            params: params
        }
    }
}