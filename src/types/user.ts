export enum userStatus {
  ACTIVE = 1,
  INACTIVE = 2
}
export enum cursorType {
  UNKNOWN = 0,
  NEXT = 1,
  PREVIOUS = 2,
}
export enum IsEmailVerifiedMap {
  EMAIL_FALSE = 0,
  EMAIL_TRUE = 1,
}
export interface InvitedUser {
  firstname: string,
  lastname: string,
  email: string,
  phonenumber: string,
  roleid: string,
  referrerid: string,
  address: string,
}
export interface UpdateUser {
  id: string,
  status: userStatus,
  firstname: string,
  lastname: string,
  email: string,
  address: string,
  phonenumber: string,
  roleid: string,
}
export interface UpdateUserStatus {
  id: string,
  status: userStatus,
}
export interface SetPasswordType {
  token: string,
  password: string,
  confirmpassword: string,
}

export interface UserListFilterRequest {
  searchterm: string,
  startdate: string,
  enddate: string,
  phonenumber: string,
  sortbycolumn: string,
  sortby: string,
  status: string,
  cursor: string,
  roleid: string,
  limit: number,
  cursortype: string,
}
export interface ListReferralRequestType {
  searchterm: string,
  startdate: string,
  enddate: string,
  phonenumber: string,
  sortbycolumn: string,
  sortby: string,
  status: string,
  cursor: string,
  limit: number,
  cursortype: string,
}

export interface UserVerifiedRequest {
  emailtoken: string,
}

export interface CreateUserRequest {
  name: string,
  email: string,
  password: string,
  confirmpassword:string,
  mobilecode: string,
  mobilenumber: string,
  photourl: string,
}
export interface LoginUserRequest {
  email: string,
  password: string,
}

export interface ResendEmailVerificationRequest {
  email: string,
}
