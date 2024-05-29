
export enum BooleanTypeMap {
    FALSE= 0,
    TRUE=1
  }  


export interface GetPreferenceType {
    id: string,
}
export interface UpdatePreferenceType {
    id: string,
    displaylanguage: string,
    defaulttradepair: string,
}
export interface ChangePasswordType {
    currentpassword: string,
    newpassword: string,
    confirmpassword: string,
}
export interface ResetPasswordType {
    email: string,
}
export interface GetReferraType {
    id: string,
}
export interface GetGoogle2FAType {
    email: string,
    password: string,
    code: string,
    istwofa: BooleanTypeMap
}
export interface UpdateProfileType {
    firstname: string,
    lastname: string,
    phoneno: string,
    country: string,
    streetaddress: string,
    dateofbirth: string,
    profileimage: string,
}
export interface ResetPasswordType {
    email: string,
}
export interface ResetPasswordLinkType {
    resettoken: string,
}
export interface ResetPasswordUpdateType {
    resettoken: string,
    email: string,
    newpassword: string,
    confirmpassword: string,
}
export interface Google2FARequest {
    email: string,
    password: string,
}
export interface changePassWithCodeType {
    EventID: string,
    Code: string,
}