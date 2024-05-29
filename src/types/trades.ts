export enum FeeTypeMap {
    UNKNOWN= 0,
    FIXED= 1,
    PERCENTAGE= 2,
}

export enum TypeMap {
    TYPE_UNKNOWN= 0,
    TYPE_BUY= 1,
    TYPE_SELL= 2,
}

export enum CursorTypeMap {
    CURSOR_TYPE_UNKNOWN= 0,
    NEXT= 1,
    PREVIOUS= 2,
}

export interface CreateTrade {
    tradepairid: string,
    buyerid: string,
    sellerid: string,
    makerid: string,
    takerid: string,
    buyorderid: string,
    sellorderid: string,
    buyordertype: TypeMap,
    sellordertype: TypeMap,
    basecurrency: string,
    quotecurrency: string,
    quantity: string,
    price: string,
    total: string,
    takerfee: string,
    takerfeetype: FeeTypeMap,
    makerfee: string,
    makerfeetype: FeeTypeMap,
    referalmakerquantity: string,
    referaltakerquantity: string,
}

export interface ListDataType{
    sortby: string,
    sortbycolumn: string,
    searchterm: string,
    startdate: string,
    enddate: string,
    takerfeetype: string,
    makerfeetype: string,
    cursor: string,
    limit: number,
    cursortype: CursorTypeMap,
}
export interface ListUserTradesFilter{
    sortby: string,
    sortbycolumn: string,
    searchterm: string,
    startdate: string,
    enddate: string,
    takerfeetype: string,
    makerfeetype: string,
    cursor: string,
    limit: number,
    cursortype: string,
    userid: string,
}
export interface GetTradeDataForChart{
    timebucket: string,
    interval: string,
    tradepairid: string,
}
