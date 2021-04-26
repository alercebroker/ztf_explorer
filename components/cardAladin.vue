<template>
  <v-col :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card v-if="isLoading || error">
      <v-card-text v-if="isLoading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
        Fetching data for object {{ $route.params.oid }} ...
      </v-card-text>
      <v-card-text v-if="error">
        <v-alert text prominent type="error" icon="mdi-cloud-alert">{{
          error
        }}</v-alert>
      </v-card-text>
    </v-card>
    <misc-aladin
      v-else
      v-model="object"
      :objects="objects"
      :class="cardClass"
      :fov="0.01"
    />
  </v-col>
</template>

<script>
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'

@Component
export default class CardAladin extends Vue {
  @Prop({ type: Number | String, default: 12 })
  cols

  @Prop({ type: Number | String, default: 12 })
  lg

  @Prop({ type: Number | String, default: 12 })
  md

  @Prop({ type: Number | String, default: 12 })
  sm

  @Model('objectSelected', { type: String }) selectedObject

  @Prop({ type: String }) cardClass

  object = {}

  beforeMount() {
    if (!this.objectData) return
    this.object = {
      oid: this.objectData.oid,
      meanra: this.objectData.meanra,
      meandec: this.objectData.meandec,
    }
  }

  get objectData() {
    return this.$store.state.object.object
      ? this.$store.state.object.object
      : {}
  }

  get objects() {
    return this.$store.state.objects.list
  }

  get isLoading() {
    return this.$store.state.object.loading
  }

  get error() {
    return this.$store.state.object.error
  }

  @Watch('objectData')
  onObjectDataChange(val) {
    this.object = {
      oid: val.oid,
      meanra: val.meanra,
      meandec: val.meandec,
    }
  }
}
</script>
<style>
@import 'https://aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.css';
</style>
