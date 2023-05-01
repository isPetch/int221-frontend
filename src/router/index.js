import { createRouter, createWebHistory } from 'vue-router'
import ListsAnnouncement from '../views/ListsAnnouncement.vue'
import OneAnnounce from '../components/OneAnnounce.vue'
import { getAnnouncementById } from '../composable/getAnnouncement'

const router = createRouter({
  history: createWebHistory(),
  routes: [
      {
          path: '/admin/announcement',
          name: 'ListAllAnnouncement',
          component: ListsAnnouncement     
      },
      {
          path: '/admin/announcement/:id',
          name: 'OneAnnouncement',
          component: OneAnnounce,       
          props: true,
          beforeEnter: async (to, from, next) => {
            const id = Number(to.params.id);
            if (!Number.isInteger(id) ) {
              alert('The request page is not available');
              next('/admin/announcement');
            } else {
              try {
                const announcement = await getAnnouncementById(id);
                if (!announcement) {
                  alert('The request page is not available');
                  next('/admin/announcement');
                } else {
                  next();
                }
              } catch (error) {
                alert('The request page is not available');
                console.log(error);
                next('/admin/announcement');
              }
            }
          }
        }
  ]
})
export default router
