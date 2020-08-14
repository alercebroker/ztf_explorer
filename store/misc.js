import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'

@Module({ name: 'misc', namespaced: true, stateFactory: true })
export default class MiscModule extends VuexModule {
  selectedNavItem = 0

  @VuexMutation
  setSelectedNavItem(val) {
    this.selectedNavItem = val
  }

  @VuexAction({ rawError: true })
  changeSelectedNavItem(val) {
    this.setSelectedNavItem(val)
  }
}
