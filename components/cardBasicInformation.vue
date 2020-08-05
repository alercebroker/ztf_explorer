<template>
  <v-col v-if="show" :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card :class="cardClass">
      <v-card-text>
        <alerce-basic-information :information="information" />
        <v-row>
          <v-col cols="6" class="pr-0 pt-0 pb-0">
            <alerce-finding-chart-button
              :oid="information.oid"
              :candid="candid"
            />
          </v-col>
          <v-col cols="6" class="pl-0 pt-0 pb-0">
            <alerce-catalogs-buttons
              :ra="information.meanra"
              :dec="information.meandec"
            />
          </v-col>
        </v-row>
        <alerce-tns-information
          :type="tns.type"
          :name="tns.name"
          :redshift="tns.redshift"
        />
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CardBasicInformation extends Vue {
  @Prop({ type: Number | String, default: 12 }) cols

  @Prop({ type: Number | String, default: 12 }) lg

  @Prop({ type: Number | String, default: 12 }) md

  @Prop({ type: Number | String, default: 12 }) sm

  @Prop({ type: Object, default: () => {} }) information

  @Prop({ type: Number | String, default: 0 }) candid

  @Prop({ type: Object, default: () => {} }) tns

  @Prop({ type: Boolean, default: true }) show

  @Prop({ type: String }) cardClass
}
</script>
