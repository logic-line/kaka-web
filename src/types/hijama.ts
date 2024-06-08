
export interface HijamaListRequest {
  perPage: number,
  page: number,
}
export interface HijamaCreateRequest {
  title:string,
  description: string,
  icon: string,
  banner: string,
  base_price: string,
  price: string,
  stock: string,
  offer_message: string,
  offer_applicable: string,
}
export interface HijamaUpdateRequest {
  id : string,  
  title:string,
  description: string,
  icon: string,
  banner: string,
  base_price: string,
  price: string,
  stock: string,
  offer_message: string,
  offer_applicable: string,
}
export interface DeleteHijamaImage {
  hijamaId : string,
  imageId:string,
}
export interface CreateHijamaImage {
  url : string,
  title:string,
  description:string,
  enabled:string,
}