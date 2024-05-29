<template>
    <div>
        <div v-if="isLoading" class="h-[507px] pt-2 pr-3" >
           <Loader :isLoading="isLoading" />
         </div>
        <div class="custom-max-width pt-16">
            <h2 class="capitalize text-3xl font-semibold mb-4 text-black100">{{ $t('message.terms-and-conditions') }}</h2>
            <p class="text-black90">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <h3 class="text-xl text-black100 font-medium my-4">What are Terms and Conditions</h3>
            <ul class="text-black90">
                <li class="mt-2">
                    1.What to include in a Terms and Conditions
                </li>
                <li class="mt-2">
                    2.FAQ: Terms and Conditions
                </li>
                <li class="mt-2">
                    3.Examples of Terms and Conditions
                </li>
                <li class="mt-2">
                    4.Download Terms and Conditions Template
                </li>
            </ul>
            <p class="my-4 text-black90">There are many variations of passages of Lorem Ipsum available, butthe majority have suffered alteration in some form, by injectedhumour, or randomised words which don't look even slightly believable.If you are going to use a passage of Lorem Ipsum, you need to be surethere isn't anything embarrassing hidden in the middle of text.</p>
            <p class="text-black90">All the Lorem Ipsum generators on the Internet tend to repeatpredefined chunks as necessary, making this the first true generatoron the Internet. It uses a dictionary of over 200 Latin words,combined with a handful of model sentence structures, to generateLorem Ipsum which looks reasonable. The generated Lorem Ipsum istherefore always free from repetition, injected humour, ornon-characteristic words etc.</p>
            <h3 class="text-xl text-black100 font-medium my-4">Where does it come from?</h3>
            <p class="text-black90">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
            <p class="mt-4 text-black90">The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
        </div>
        <footerVue></footerVue>
    </div>
</template>

<script setup lang="ts">
    import footerVue from './component/footer.vue';
    import Loader from '../../components/comp/Loader.vue';
    import { onMounted, ref } from 'vue';
    const isLoading = ref(true)
    onMounted(()=>{
        setTimeout(() => {
            isLoading.value = false  
        }, 1000);
    })
</script>