export interface ListFilterRequest{
    "SortBy": string,
    "SortByColumn": string,
    "Status": string,
    "SearchTerm": string,
    "StartDate": string,
    "EndDate": string,
    "IsRead": string,
  }
  export interface UpdateNotification{
    ID: string,
    IsRead:string,
  }