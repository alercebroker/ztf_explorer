<template>
  <v-col v-show="show" :cols="cols" :lg="lg" :md="md" :sm="sm">
    <alerce-aladin v-model="object" :objects="objects" :class="cardClass" />
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

  @Prop({ type: Number, default: 0 })
  ra

  @Prop({ type: Number, default: 0 })
  dec

  @Prop({ type: Boolean, default: true })
  show

  @Prop({ type: Array, default: () => [] }) objects

  @Model('objectSelected', { type: String }) selectedObject

  @Prop({ type: Object }) objectData

  @Prop({ type: String }) cardClass

  object = {}

  mounted() {
    if (!this.objectData) return
    this.object = {
      oid: this.objectData.oid,
      meanra: this.objectData.meanra,
      meandec: this.objectData.meandec,
    }
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
