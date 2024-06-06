
export interface CabListRequest {
  perPage: number,
  page: number,
  status: string,
}
export interface PackageCreateRequest {
name: string,
source: string,
destination: string,
description: string,
duration: string,
days: string,
nights: string,
persons: string,
base_price: string,
discount_price: string,
price: string,
booking_amount: string,
offer_applicable: string,
icon: string,
banner: string,
thing_will_love: string,
}
export interface CabUpdateRequest {
status : string,  
bookingId: string,
}
export interface PackageBookingListRequest {
  perPage: number,
  page: number,
}
export interface BookingStatusUpdateRequest {
  status: string,
  bookingId: string,
}
