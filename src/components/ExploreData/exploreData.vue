<template>
    <div>
        <b-row mt="5">
          <b-col md="3" offset="1">
              <searchOptions/>
          </b-col>
        </b-row>
    </div>
</template>

<script>

import searchOptions from './searchOptions.vue'
export default {
  name: 'exploreData',
  props: {

  },
  components: {
    searchOptions,
  }
}
</script>
