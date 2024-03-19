
import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'

import sourceData from '@/data.json'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  },

  { path: '/', name: 'Home', component: Home },

  // the colon is how you use route params
  {
    path: '/destination/:id/:slug',
    name: 'destination.show',
    component: () => import('@/views/DestinationShow.vue'),

    // props: true,

    // you can pass an object to provide static prop values to your component's props
    // in this case, the route's component could have a property called "newsletterPopup"
    // and, when visited through this route, would always be false
    // props: {
    //   newsletterPopup: false,
    // }
    // props: route => ({newletterPopup: someExpression ? true : false}),


    // you can also create a function that receives the route as it's argument
    // and returns props.  This allows you to cast parameters into other types,
    // combine static values with routes based values, and more
    props: route => ({...route.params, id: parseInt(route.params.id)}),
    // route props: loosely coupled components give us greater flexibility if business requirements change
    // and we need to restructure our application
    // the DestinationShow component does not need to know where it gets its data from
    // it might be from an input field, the router, or another source

    beforeEnter(to, from) {
      // check to see if the location specified in the param exists as a location in our data
      // if it does, we'll allow our route to go ahead and show the destination it's meant to show
      // but, if it is not, we need to go to the not found page
      const exists = sourceData.destinations.find(
        destination => destination.id === parseInt(to.params.id)
      )
      if (!exists) return { name: 'NotFound' }
    },

    children: [
      {
        path: ':experienceSlug',
        name: 'experience.show',
        component: () => import('@/views/ExperienceShow.vue'),
        props: route => ({...route.params, id: parseInt(route.params.id)})
      }
    ]
  },


  // {
  //   path: '/destination/:id/:slug/:experienceSlug',
  //   name: 'experience.show',
  //   component: () => import('@/views/ExperienceShow.vue'),
  //   props: route => ({...route.params, id: parseInt(route.params.id)})
  // }

]


const router = createRouter({
  history: createWebHistory(),
  routes 
})

export default router