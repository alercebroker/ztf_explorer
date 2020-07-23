<template>
  <v-col v-if="show" :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card>
      <v-card-title>Magnitude Statistics</v-card-title>
      <alerce-mag-stats
        :stats="localStats"
        dense
        :hide-default-footer="false"
        :items-per-page="7"
      />
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { objectStore } from '~/store'
@Component
export default class CardMagStats extends Vue {
  @Prop({ type: Number | String, default: 12 })
  cols

  @Prop({ type: Number | String, default: 12 })
  lg

  @Prop({ type: Number | String, default: 12 })
  md

  @Prop({ type: Number | String, default: 12 })
  sm

  @Prop({ type: Boolean, default: true })
  show

  @Prop({ type: Array, required: true }) stats

  localStats = []

  mounted() {
    if (this.stats.length) this.formatStats(this.stats)
  }

  get bandMap() {
    return objectStore.bandMap
  }

  /**
  * form this object
    {
     stat: mean,
     g: 1,
     r: 1
     }
  */
  formatStats(stats) {
    this.localStats = []
    const bands = this.stats.map((x) => {
      return this.bandMap[x.fid]
    })
    Object.keys(this.stats[0]).forEach((stat) => {
      if (stat !== 'fid') {
        const obj = {
          stat,
        }
        bands.forEach((band, i) => {
          obj[band] = this.stats[i][stat]
        })
        this.localStats.push(obj)
      }
    })
  }

  @Watch('stats')
  onStatsChange(newVal) {
    this.formatStats(newVal)
  }
}
</script>
