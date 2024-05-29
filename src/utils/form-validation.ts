export const validateNumer = (data: string) => {
  let regex = /^\d*\.?\d+$/;
  let len = data.length;
  if (!regex.test(data)) {
      if (typeof data === 'string' && len > 0) { // Add a check for string type
          if (data[len - 1] != '.') {
              data = data.slice(0, -1);
          } else {
              let testString = data + '0';
              if (!regex.test(testString)) {
                  data = data.slice(0, -1);
              }
          }
      }
  }
  return data;
};


export const alphaSpacePattern = (value:string)=>{
    return value.match(/^[a-zA-Z ]*$/) !== null
}
export const UidValidation = (value:string)=>{
    return value.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i) !== null
}
export const validatePhoneNumber = (value:string) =>{
  const phoneNumberPattern = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/;
  return value.match(phoneNumberPattern) !== null
}

export const countryCodeValidation = (value:string)=>{
    return value.match(/^[A-Z]{2}$/i) !== null
}

export const alphaSpaceNumericPattern = (value:string)=>{
  return value.match(/^[a-zA-Z0-9 ]*$/) !== null;
}
export const zeroCheck = (value:any)=>{
  if(value == "0" || value <= 0) return false;
  return true;
}

export const age18Check = (value:string)=>{
  const currentDate = new Date();
      const inputDate = new Date(value);
      const age = currentDate.getFullYear() - inputDate.getFullYear();
      if(age < 18){
        return false
      }else{
        return true
      }  
}
  