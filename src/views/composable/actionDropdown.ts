import { ref,nextTick } from 'vue';

export default function actionDropdown() {
    const actionModalID = ref("");
    const actionButton = ref("");

    async function scrollHandle(val:string,e:any){
    await nextTick()
    let editDrop:any = document.getElementById(`${val}`)
    if(editDrop != null && e.target.closest('button') != null){
        editDrop.style.left = (e.target.closest('button').getBoundingClientRect().x - editDrop.offsetWidth+12) + 'px'
        editDrop.style.top = e.target.closest('button').getBoundingClientRect().y + 36 + 'px'
        if(e.target.closest('button').getBoundingClientRect().y+ editDrop.offsetHeight + 36+56>= window.innerHeight){
            editDrop.style.transform = `translateY(-${editDrop.offsetHeight+46}px)`
        }else{
            editDrop.style.transform = null
        }
    }
}

function positionEditDrop(){
     window.addEventListener('click',(e:any)=>{
        if(!e.target.closest('button') && !e.target.closest('.edit-drop')){
            actionModalID.value = ''
        }
    })

    window.addEventListener('resize',()=>{
        if(actionModalID.value != ''){
            scrollHandle(actionModalID.value,actionButton.value)
        }
    })

    let tableDiv:any = document.querySelector('#tableContainer')
    tableDiv.addEventListener('scroll',()=>{
        if(actionModalID.value != ''){
            scrollHandle(actionModalID.value,actionButton.value)
        }
    })

    let mainContent:any = document.querySelector('#main-content')
    mainContent.addEventListener('scroll',(e:any)=>{
        if(actionModalID.value != ''){
            scrollHandle(actionModalID.value,actionButton.value)
        }
    })
}
  
const toggleActionDropdown=(val:string,e:any)=>{
    if(!actionModalID.value || actionModalID.value != val){
        actionModalID.value = val
        actionButton.value = e
        scrollHandle(val,e)
    }
    else{
        actionModalID.value=""
        actionButton.value = ''
    }
}

  return {
    actionModalID,
    actionButton,
    positionEditDrop,
    toggleActionDropdown,
  };
}