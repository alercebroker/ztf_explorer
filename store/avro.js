import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'

@Module({ name: 'avro', namespaced: true, stateFactory: true })
export default class AvroStore extends VuexModule {
  loading = false
  error = false
  avro = {}

  @VuexMutation
  setAvro(val) {
    this.avro = val
  }

  @VuexMutation
  setLoading(val) {
    this.loading = val
  }

  @VuexMutation
  setError(val) {
    this.error = val
  }

  @VuexAction({ rawError: true })
  async getAvro({ oid, candid, survey_id }) {
    this.setLoading(true)
    try {
      const avro = await this.store.$avroApi.getAvroInfo(oid, candid, survey_id)
      this.setAvro(avro.data)
      this.setError(null)
    } catch (error) {
      this.setError(error)
    }
    this.setLoading(false)
  }
}
