export interface routesInterface {
    [index: string]: routeDetails
 }

interface routeDetails {
    method: Array<string>,
    controller: string
}

export interface params {
    [index: string]: string
}

export interface normalizedUrl {
    route: string,
    params: params
    urlParams: string;
}