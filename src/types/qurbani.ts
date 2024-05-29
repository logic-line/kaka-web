
export interface CreateQurbani {
name : string,
description : string,
enabled : string,
icon : string,
banner : string,
}
export interface UpdateQurbani {
  id:string,
  name : string,
  description : string,
  enabled : string,
  icon : string,
  banner : string,
}
export interface QurbaniListRequest {
    perPage: number,
    page: number,
  }
  export interface CreateQurbaniImage {
    qurbaniid : string,
    url : string,
    title : string,
    description : string,
    enabled : string,
    }
  export interface DeleteQurbaniImage {
    qurbaniid : string,
    imageId : string,
    }
  export interface DeleteQurbaniAnimalType {
    qurbaniid : string,
    typeId : string,
    }
  
export interface CreateQurbaniAnimalType {
  qurbaniId : string,
  type : string,
  base_price : string,
  price : string,
}
  
export interface UpdateQurbaniAnimalType {
  qurbaniId : string,
  typeID : string,
  type : string,
  base_price : string,
  price : string,
}
export interface QurbaniBookingListRequest {
  perPage: number,
  page: number,
}
export interface BookingStatusUpdateRequest {
  status: string,
  bookingId: string,
}
