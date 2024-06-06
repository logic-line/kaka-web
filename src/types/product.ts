
export interface ProductListRequest {
  perPage: number,
  page: number,
  category: number,
}
export interface ProductCreateRequest {
  product_category_id:string,
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
export interface ProductUpdateRequest {
  id : string,
  product_category_id:string,
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
export interface DeleteProductImage {
  productId : string,
  imageId:string,
}
export interface CreateProductImage {
  url : string,
  title:string,
  description:string,
  enabled:string,
}
