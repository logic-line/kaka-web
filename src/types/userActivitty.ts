export enum cursorType {
    CURSOR_TYPE_UNKNOWN = 0,
    NEXT= 1,
    PREVIOUS= 2,
  }

export interface UserActivityListFilterRequest{
    sortby: string,
    sortbycolumn: string,
    searchterm: string,
    startdate: string,
    enddate: string,
    cursor: string,
    limit: number,
    cursortype: string,
  }

  export interface CreateUserActivitiesRequest {
    activity: string,
  }

  