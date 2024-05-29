import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const toastrMsg = (param:any) => {
    toast.success(param);
    localStorage.removeItem('fromRoute');
};
export const toastrErrorMsg = (param:any) => {
    toast.error(param);
    localStorage.removeItem('fromRoute');
};