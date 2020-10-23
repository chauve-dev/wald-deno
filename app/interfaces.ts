import middleware from "../middleware.ts";

export interface routesInterface {
    [index: string]: routeDetails
 }

 export interface middlewareInterface {
     [index: string]: middlewareDetails
 }

interface routeDetails {
    method: Array<string>,
    controller: string
}

interface middlewareDetails {
    type: string,
    method: Array<string>,
    controller: string
}

export interface params {
    [index: string]: string
}

export interface normalizedUrl {
    route: string,
    getParams: params,
    urlParams: params;
}
