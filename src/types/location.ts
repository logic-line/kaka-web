
export interface CreateLocation {
name : string,
reference : string,
latitude : string,
longitude : string,
enabled : string,
icon : string,
banner : string,
}
export interface UpdateLocation {
id : string,
name : string,
reference : string,
latitude : string,
longitude : string,
enabled : string,
icon : string,
banner : string,
}
export interface LocationListRequest {
    perPage: number,
    page: number,
  }
  

