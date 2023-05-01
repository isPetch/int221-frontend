<script setup>
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { ref,onMounted } from 'vue'
import { getAnnouncementById } from '../composable/getAnnouncement'

const router = useRouter()
const { params } = useRoute()
const data = ref({})

const backListAnnouce =() => {
    router.push({ name : 'ListAllAnnouncement'})
}

onMounted(async () => {
    data.value = await getAnnouncementById(parseInt(params.id))
})

const Timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const localTime = (date) => {
    if(date === null) {
        return '-'
    }
    else {
        const datetimeString = date
        const datetimeUTC = new Date(datetimeString)
        const datetimelocal = datetimeUTC.toLocaleString('en-GB' , { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false,timeZone: Timezone})
        return datetimelocal
    }
}

</script>
 
<template>
    <div  class="flex w-full h-screen bg-gray-200 justify-center">
        <div v-if="data === undefined" class="flex w-full h-4/6  justify-center items-center">
               <div class=" font-bold text-4xl ">No Announcement</div>
        </div> 
        <div v-else class="flex flex-col w-5/6 h-full">
            <div class="flex w-full h-20 justify-start items-center">
                <p class="text-3xl font-bold">Announcement Detail:</p>
            </div>
            <div  class="ann-item w-full rounded-xl border  bg-white">
                <div class="flex flex-row">
                    <p class="flex items-center w-40 h-16 pl-6  text-lg font-semibold">Title</p>
                    <p class="ann-title flex items-center w-full h-16 pl-6  text-lg" >{{ data.announcementTitle }}</p>
                </div>
                <div class="flex flex-row">
                    <p class="flex items-center w-40 h-16 pl-6  text-lg font-semibold">Category</p>
                    <p class="ann-category flex items-center w-full h-16 pl-6  text-lg" >{{ data.announcementCategory }}</p>
                </div>    
                <div class="flex flex-row">
                    <p class="flex items-center w-40 h-16 pl-6  text-lg font-semibold">Description</p>
                    <p class="ann-description flex items-center w-full h-16 pl-6  text-lg" >{{ data.announcementDescription }}</p>
                </div>
                <div class="flex flex-row">
                    <p class="flex items-center w-40 h-16 pl-6  text-lg font-semibold">Publish Date</p>
                    <p class="ann-publish-date flex items-center w-full h-16 pl-6  text-lg" >{{ localTime(data.publishDate)}}</p>
                </div>
                <div class="flex flex-row">
                    <p class="flex items-center w-40 h-16 pl-6  text-lg font-semibold">Close Date</p>
                    <p class="ann-close-date flex items-center w-full h-16 pl-6  text-lg" >{{ localTime(data.closeDate) }}</p>
                </div>    
                <div class="flex flex-row">
                    <p class="flex items-center w-40 h-16 pl-6  text-lg font-semibold">Display</p>
                    <p class="ann-display flex items-center w-full h-16 pl-6  text-lg" >{{ data.announcementDisplay }}</p>
                </div>          

            </div>
            <div @click="backListAnnouce()" class="ann-button w-14 p-1 px-3 normal-case rounded bg-gray-300 hover:bg-gray-400 mt-3" >Back</div>
        </div>
    </div>
    </template>
     
    <style scoped>
        p {
          word-wrap: break-word;
          max-width: 1100px;
          white-space: pre-wrap;
        }
    </style>