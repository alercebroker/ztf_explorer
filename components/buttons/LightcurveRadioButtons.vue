<template>
  <v-radio-group v-model="localValue" row class="py-0">
    <div v-for="option in options" :key="'radio-' + option.value">
      <v-radio :disabled="!option.show" :value="option.value">
        <template v-slot:label>
          <div>
            {{ option.text }}
            <span v-if="option.tooltip">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon align="center" v-bind="attrs" v-on="on"
                    >mdi-help-circle</v-icon
                  >
                </template>
                <span>{{ option.tooltip }}</span>
              </v-tooltip>
            </span>
          </div>
        </template>
      </v-radio>
    </div>
  </v-radio-group>
</template>
<script>
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'

@Component
export default class LightcurveRadioButtons extends Vue {
  @Prop({ type: String, required: true }) value
  @Prop({ type: Array, default: () => [] }) options

  localValue = null

  mounted() {
    this.localValue = this.options.find((x) => {
      if ('default' in x) {
        return x.default
      }
    }).value
  }

  @Watch('localValue')
  onLocalValueChange(val) {
    this.$emit('input', val)
  }

  @Watch('value')
  onValue(val) {
    this.localValue = val
  }
}
</script>
