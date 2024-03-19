<template>
  <TheNavigation></TheNavigation>
  <div class="container">
    <!--
      vue's key attribute - used by vue under the hood to optimize performance
      gets input about what needs to be re-rendered and when
      whenever the value changes, vue will destroy the currently rendered component
      and re-render from scratch
      if we want to make sure vue re-renders the components in our router-view
      whenever a route changes, we can assign the router-view a key attribute
      with the value of $route.path
      this works because the path is always going to be something different for each page
    -->
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>

import TheNavigation from './components/TheNavigation.vue';
import sourceData from '@/data.json'

export default {
  data() {
    return {
      destinations: sourceData.destinations
    }
  },
  components: {
    TheNavigation
  },
}

</script>

