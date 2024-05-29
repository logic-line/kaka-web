import store from "@/store";
import router from '@/router';
import {CommonError} from '@/types/common';

const ErrorMessage:{[key:string]:string}={
    'processing failed': "Please wait for a moment and try the operation again later. Temporary issues may be resolved with time",
    'something went wrong': "We apologize, but it seems like something went wrong while processing your request",
    'access denied': "sorry, your request could not be processed",
    'network connection issue': "We encountered a problem with your network connection. Please check your internet connection and try again",
    'insufficient balance': "Your request cannot be completed due to insufficient funds in your account. Please ensure your account has enough balance sending request",
}

 
// sohan

export const FetchData =async function (url: string, method: string, isPrivate: boolean, isList : boolean, reqBody?: any): Promise<{ data: any | null; error: Error | null }> {
    const requestOptions: RequestInit = {
        method: method,
    };

    const myHeaders = new Headers({
        "Authorization": store.getters["auth/accessToken"],
        "Content-Type": "application/json",
    });
    

    if (isPrivate) {
        requestOptions.headers = myHeaders;
    }
    if (method == "POST" && reqBody) {
        requestOptions.body = JSON.stringify(reqBody);
    }

    try {
        const response = await fetch(url, requestOptions);

        if (response.ok) {
            const data = await response.json();
            return { data: data, error: null };
        } else {
            const errorResponse = await response.json(); 
            
            if(method == "GET"){
                if(isList){
                    if(errorResponse.code == 16){
                        router.push({ path: "/501"});
                    }
                    else{
                       return { data: null, error: null };
                    }
                }
                else{
                    if(errorResponse.code == 13 || errorResponse.code == 15){
                        router.push({ path: "/500"});
                    }
                    else if(errorResponse.code == 16){
                        router.push({ path: "/501"});
                    }
                    else{
                        router.push({ path: "/404"});
                    }
                }
            }
            else {
                var error:CommonError = {
                    title:'something went wrong',
                    message:ErrorMessage['something went wrong']
                }
                if(errorResponse.code == 3){
                    return { data: null, error: errorResponse};
                } else if(errorResponse.code == 7){
                     error = {
                        title: "access denied",
                        message: ErrorMessage['access denied']
                    }
                }else if(errorResponse.code == 13){
                     error = {
                        title: errorResponse.message,
                        message: ErrorMessage[errorResponse.message]?ErrorMessage[errorResponse.message]:ErrorMessage['something went wrong']
                    }
                }
                store.dispatch('setUniqueErrorStatus', true);
                store.dispatch('setError', error);
                return { data: null, error: null}
            }
            return { data: null, error: null};
        }
    } catch (error) {
        // var error:CommonError = {
        //     title:'network connection issue',
        //     message:ErrorMessage['network connection issue']
        // }
        // store.dispatch('setUniqueErrorStatus', true);
        // store.dispatch('setError', error);
        return { data: null, error: null };
    }
}
export default {
    FetchData
  };
