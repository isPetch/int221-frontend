<script setup>
import { ref, onMounted } from 'vue'
import { getAllAnnouncement } from '../composable/getAnnouncement'
import { useRouter } from 'vue-router'

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

const announcement = ref([])

onMounted(async () => {
  announcement.value = await getAllAnnouncement()
})

const router = useRouter()

const goToOneAnnounce = (announceId) => {
  console.log(announceId)
    router.push({
      name: 'OneAnnouncement', 
      params:{id: announceId}
    })
}


</script>
 
<template>
<div  class="w-full h-screen bg-gray-200" >
  <div class="flex flex-col w-full h-full">
    <div class="flex w-full h-20 justify-center items-center">
      <p class="text-3xl font-bold">SIT Announcement System (SAS)</p>
    </div>
    <div class="flex w-full h-full justify-center">
      <div class="flex flex-col w-5/6 h-full ">
        <div class="flex w-full h-8  items-center space-x-2">
          <p class="text-lg font-semibold">Date/Time show in Timezone:</p>
          <p class=" text-blue-600">{{ Timezone }}</p>
        </div>

        <div class="overflow-x-auto mt-2" >
          <table class="table w-full">
           <thead>
            <tr>
             <th class="normal-case text-lg">No.</th>
             <th class="normal-case text-lg" >Title</th>
             <th class="normal-case text-lg">Category</th>
             <th class="normal-case text-lg">Publish Date</th>
             <th class="normal-case text-lg">Close Date</th>
             <th class="normal-case text-lg">Display</th>
             <th class="normal-case text-lg">Action</th>
            </tr>
           </thead>
           <tbody >
            <tr v-for="(announ, index) in announcement" :key="announ.id"  class="ann-item">
             <th>{{ index+1 }}</th>
             <td style="word-wrap: break-word; white-space: pre-wrap;" class="ann-title">{{ announ?.announcementTitle }}</td>
             <td class="ann-category">{{ announ.announcementCategory }}</td>
             <td class="ann-publish-date">{{ localTime(announ.publishDate) }}</td>
             <td class="ann-close-date">{{ localTime(announ.closeDate) }}</td>
             <td class="ann-display">{{ announ.announcementDisplay }}</td>
             <td @click="goToOneAnnounce(announ.id)" class="ann-button">
              <div class="w-14 p-1 px-3 normal-case rounded bg-gray-300 hover:bg-gray-400" >view</div>
            </td>
            </tr>
           </tbody>
          </table>
        </div>
        <div v-if="announcement && announcement.length === 0" class="flex w-full h-4/6  justify-center items-center">
            <div class=" font-bold text-4xl text-gray-500">No Announcements</div>
        </div>    
      </div>
    </div>
  </div>
</div>
</template>
 
<style scoped>
    td {
      word-wrap: break-word;
      max-width: 200px;
      white-space: pre-wrap;
    }
</style>