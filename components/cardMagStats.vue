<template>
  <v-col v-show="show" :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card :class="cardClass">
      <v-card-title>Magnitude Statistics</v-card-title>
      <v-card-text>
        <alerce-mag-stats
          :stats="localStats"
          :hide-default-footer="false"
          :items-per-page="7"
          dense
        />
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { objectStore } from '~/store'
@Component
export default class CardMagStats extends Vue {
  @Prop({ type: Number | String, default: 12 }) cols

  @Prop({ type: Number | String, default: 12 }) lg

  @Prop({ type: Number | String, default: 12 }) md

  @Prop({ type: Number | String, default: 12 }) sm

  @Prop({ type: Boolean, default: true }) show

  @Prop({ type: Array, required: true }) stats

  @Prop({ type: String }) cardClass

  localStats = []

  mounted() {
    if (this.stats.length) this.formatStats(this.stats)
  }

  get bandMap() {
    return objectStore.bandMap
  }

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
          const val = this.formatStatValue(stat, this.stats[i][stat])
          obj[band] = val
        })
        this.localStats.push(obj)
      }
    })
  }

  formatStatValue(stat, val) {
    if (!stat.includes('mjd') && Number(val) === val && val % 1 !== 0) {
      return val.toFixed(3)
    }
    return val
  }

  @Watch('stats')
  onStatsChange(newVal) {
    this.formatStats(newVal)
  }
}
</script>
