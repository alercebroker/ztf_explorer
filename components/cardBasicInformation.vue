<template>
  <v-col v-if="show" :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card>
      <alerce-basic-information :information="information" />
      <alerce-catalogs-buttons
        :ra="information.meanra"
        :dec="information.meandec"
      />
      <alerce-tns-information
        :type="tns.type"
        :name="tns.name"
        :redshift="tns.redshift"
      />
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CardBasicInformation extends Vue {
  @Prop({ type: Number | String, default: 12 })
  cols

  @Prop({ type: Number | String, default: 12 })
  lg

  @Prop({ type: Number | String, default: 12 })
  md

  @Prop({ type: Number | String, default: 12 })
  sm

  @Prop({ type: Object, default: () => {} })
  information

  @Prop({ type: Object, default: () => {} })
  tns

  @Prop({ type: Boolean, default: true })
  show
}
</script>
