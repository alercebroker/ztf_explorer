<template>
  <v-col :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card v-if="isLoading || error" :class="cardClass">
      <v-card-text v-if="isLoading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
        Fetching data for object {{ $route.params.oid }} ...
      </v-card-text>
      <v-card-text v-else-if="error">
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          {{ error }}
        </v-alert>
      </v-card-text>
    </v-card>
    <v-card v-else :class="cardClass">
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
@Component
export default class CardMagStats extends Vue {
  @Prop({ type: Number | String, default: 12 }) cols

  @Prop({ type: Number | String, default: 12 }) lg

  @Prop({ type: Number | String, default: 12 }) md

  @Prop({ type: Number | String, default: 12 }) sm

  @Prop({ type: String }) cardClass

  localStats = []

  beforeMount() {
    if (this.stats.length) this.formatStats(this.stats)
  }

  get stats() {
    return this.$store.state.stats.stats
  }

  get bandMap() {
    return this.$store.state.object.bandMap
  }

  get isLoading() {
    return this.$store.state.stats.loading
  }

  get error() {
    return this.$store.state.stats.error
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
