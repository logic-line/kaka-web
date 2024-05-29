import moment from 'moment';


export const formatDate = (value:string, format = 'YYYY-MM-DD HH:mm:ss') => {
   if (!value) return '';
   return moment(value).format(format)
};

export const combineAmountWithSymbol = (amount:any, symbol:string) => {
   if (!amount || !symbol) return '';
   return amount +' '+'<span class="text-xs">' +symbol+ '</span>';
};