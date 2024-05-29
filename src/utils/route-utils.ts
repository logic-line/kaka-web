import router from '../router/index';

export const routeGroupCheck = () => {
    let fromRoute ='' 
    let toRoute='' 
    router.beforeEach((to, from, next) => {
        fromRoute = (from.meta.name as string) || '';
        toRoute = (to.meta.name as string) || '';
        localStorage.setItem('fromRouteGroup', fromRoute);
        localStorage.setItem('toRoute', toRoute);
        if(fromRoute !== toRoute){
            localStorage.setItem('resetVal', "TRUE");
        } else {
            localStorage.setItem('resetVal', 'FALSE');
        }
        next();
    });
    let routeData ={
        reset :localStorage.getItem('resetVal'),
        fromRoute:localStorage.getItem('fromRouteGroup'),
        toRoute:localStorage.getItem('toRoute')
    }
    
    
    return routeData;
};