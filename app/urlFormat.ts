import {normalizedUrl, params} from './interfaces.ts'
import routes from "../routes.ts";

export default class urlFormat {

    public static getKeyURI(URI : string){
        let routeURI=null
        const requestURIArr = URI.split("?")[0].split("/");
        for (const key in routes) {
            const routeURIArr = key.split("/")
            if (requestURIArr.length == routeURIArr.length){
                routeURI = key
                for (let i = 0; i < requestURIArr.length; i++) {
                    if (!(routeURIArr[i].startsWith(":"))){
                        if (routeURIArr[i]!==requestURIArr[i]){
                            routeURI = null;
                            break;
                        }
                    }
                }
            }
            if (routeURI!==null) return routeURI;
        }
        return routeURI
    }

    public static build(url :string, routeURL:string){

        const normalisedURL : normalizedUrl = {
            route: routes[routeURL].controller,
            getParams: this.buildGetMap(url),
            urlParams: this.buildUriMap(url,routeURL)
        };
        return normalisedURL;
    }

    private static buildGetMap(requestURI: string) {
        let GetMap : params = {};
        if (requestURI.split("?").length == 2) {
            const getParam = requestURI.split("?")[1].split("&");
            for (const param of getParam) {
                const keyValues = param.split("=")
                if (keyValues.length == 2) {
                    GetMap[keyValues[0]]=keyValues[1]
                }
            }
        }
        return GetMap;
    }

    private static buildUriMap(requestURI: string, routeURI: string) {
        let UriMap : params = {};

        const requestUriArr = requestURI.split("?")[0].split("/");
        const routeUriArr = routeURI.split("/");

        if (requestUriArr.length === routeUriArr.length) {
            for (let i = 0; i < requestUriArr.length; i++) {
                if (routeUriArr[i].startsWith(":")) {
                    UriMap[routeUriArr[i].replace(":", "")] = requestUriArr[i];
                }
            }
        }
        return UriMap;

    }
}