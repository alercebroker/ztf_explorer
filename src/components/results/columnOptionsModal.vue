<template>
    <b-modal id="showDetails" ok-variant="secondary" ok-title="Close" :ok-only="true">
      <b-form-group>
        <template slot="label">
          <b>Choose your options:</b>
          <br>
          <b-form-checkbox
            v-model="allSelected"
            :indeterminate="indeterminate"
            aria-describedby="options"
            aria-controls="options"
            @change="toggleAll"
          >{{ allSelected ? 'Un-select All' : 'Select All' }}</b-form-checkbox>
        </template>
        <b-form-checkbox-group
          id="flavors"
          stacked
          v-model="selected"
          name="flavs"
          :options="options"
          class="ml-4"
          aria-label="Individual options"
        ></b-form-checkbox-group>
      </b-form-group>
    </b-modal>
</template>

<script>
    export default {
        name: "column-options-modal"
    }
</script>

<style scoped>

</style>