<template>

  <section v-if="destination" class="destination">

    <h1>{{ destination.name }}</h1>
    <div class="destination-details">
      <img :src="`/images/${destination.image}`" :alt="destination.name" />
      <p>{{ destination.description }}</p>
    </div>

  </section>
  
  <section class="experiences">
    <h2>Top Experiences in {{ destination.name }}</h2>
    <div class="cards">
      <router-link
        v-for="experience in destination.experiences"
        :key="experience.slug"
        :to="{name: 'experience.show', params:{experienceSlug: experience.slug }}"
      >
        <ExperienceCard
          :experience="experience"
        />
      </router-link>
    </div>

    <router-view />

  </section>

</template>

<script>

import sourceData from '@/data.json'
import ExperienceCard from '@/components/ExperienceCard.vue'

export default {
  components: { ExperienceCard },
  // data() {
  //   return {
  //     destination: null
  //   }
  // },

  props: {
    // id: {type: String, required: true}
    // this prop will correspond directly with the id param from our route
    id: {type: Number, required: true}
  },

  computed: {
    // destinationId(){
    //   // any param coming from the route is a string
    //   return parseInt(this.$route.params.id)
    // },
    destination() {
      console.log('destination computed, this.id:', this.id)
      // using $route in your component creates a tight coupling with the route
      // which limits the flexibility of the component as it can only be used on certain urls
      // we can decouple this behavior with a props option on our route records
      // for extra flexibility
      return sourceData.destinations.find(
        // destination => destination.id === this.destinationId
        // destination => destination.id === parseInt(this.id)
        // can remove parseInt because that is done in a function in the router prop
        destination => destination.id === this.id
      )
    }
  },
  methods: {
    // async initData() {
    //   console.log('initData running, slug:', this.$route.params.slug)
    //   const response = await fetch(`https://travel-dummy-api.netlify.app/${this.$route.params.slug}.json`)
    //   this.destination = await response.json()
    // }
  },
  // async created() {
  //   this.initData()
  //   // this.$watch(() => this.$route.params, this.initData)
  // }

}

</script>