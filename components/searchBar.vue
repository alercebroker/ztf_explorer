<template>
  <div @keyup="onKeyUp">
    <v-expansion-panels v-model="panelsSync" dense> <!--Inicio de los paneles-->
      <v-expansion-panel value="true">
        <v-expansion-panel-header> <!--Inicio panel superior SEARCH FILTERS-->
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title"
                >Search Filters</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-expansion-panel-header> <!--Fin panel superior SEARCH FILTERS, contiene los paneles de busqueda-->
        <v-expansion-panel-content> <!--Inicio paneles de busqueda-->
          <v-list dense expand>
            <v-list-group value="true" no-action> <!--Inicio panel de FILTROS GENERALES-->
              <template v-slot:activator> 
                <v-list-item-title>Filtros generales</v-list-item-title> <!--titulo-->
              </template>

              <v-list-item class="pl-4"> <!--INICIO de los items del panel-->
                <v-list-item-content>
                    <validation-provider
                      rules="ndet|oidFormat|oidLength|probability"
                      :bails="false"
                      v-slot="{ failedRules }"
                    >
                    <inputs-default-search
                        v-model="generalFiltersSync"
                        :limit-ndet="limitNdet"
                        :classifiers="classifiers"
                        :classes="classes"
                        :validationErrors="failedRules"
                    />
                    </validation-provider>
                </v-list-item-content>
              </v-list-item> <!--FIN de los items del panel-->
            </v-list-group>  <!--FIN panel de FILTROS GENERALES-->

            <v-divider></v-divider> <!--DIVISIÓN-->

            <v-list-group no-action> <!--INICIO panel de fecha de descubrimiento-->
              <template v-slot:activator>
                <v-list-item-title>Discovery Date Filters</v-list-item-title> <!--titulo-->
              </template>
              <v-list-item class="pl-4">
                <v-list-item-content>
                  <validation-provider rules="date" v-slot="{ failedRules }">
                    <inputs-date-search
                      v-model="dateFiltersSync"
                      :validationErrors="failedRules"
                    />
                  </validation-provider>
                </v-list-item-content>
              </v-list-item>
            </v-list-group> <!--FIN panel de fecha de descubrimiento-->

            <v-divider></v-divider> <!--DIVISIÓN-->

            <v-list-group no-action> <!--INICIO panel CONESEARCH-->

              <template v-slot:activator>
                <v-list-item-title>CONESEARHC</v-list-item-title> <!--titulo-->
              </template>

              <v-list-item class="pl-4">  <!--INICIO de los items del panel-->
                <v-list-item-content>
                  <v-row> <!--BOTÓN-->
                    <v-col lg="8" md="12">
                      <v-btn
                        block
                        :disabled="loading || invalid"
                        @click="onSearchClicked"
                        >Resolve</v-btn
                      >
                    </v-col>
                  </v-row> <!--FIN BOTÓN-->
                  <validation-provider
                    rules="conesearch|radiusPositive"
                    :bails="false"
                    v-slot="{ failedRules }"
                  >
                    <inputs-coordinates-search
                      v-model="conesearchFiltersSync"
                      :validationErrors="failedRules"
                    />
                  </validation-provider>
                </v-list-item-content>
              </v-list-item>  <!--FIN de los items del panel-->
            </v-list-group> <!--FIN panel CONESEARCH-->

            <v-list-item class="pl-4"> <!--INICIO sección botones SEARCH Y CLEAR-->
              <v-list-item-content>
                <v-row>
                  <v-col lg="8" md="12">
                    <v-btn
                      color="primary"
                      block
                      :disabled="loading || invalid"
                      @click="onSearchClicked"
                      >search</v-btn
                    >
                  </v-col>
                  <v-col lg="4" md="12">
                    <v-btn color="danger" block @click="onClearClicked"
                      >clear</v-btn
                    >
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item> <!--FIN sección botones SEARCH Y CLEAR-->
          </v-list>
        </v-expansion-panel-content> <!--Fin paneles de busqueda-->
      </v-expansion-panel>
    </v-expansion-panels> <!--Fin de los paneles generales-->
  </div>
</template>

<script>
import { Vue, Component, PropSync, Prop } from 'nuxt-property-decorator'
@Component
export default class SearchBar extends Vue {
  @PropSync('generalFilters', { type: Object }) generalFiltersSync
  @PropSync('dateFilters', { type: Object }) dateFiltersSync
  @PropSync('conesearchFilters', { type: Object }) conesearchFiltersSync
  @PropSync('panels', { type: Number }) panelsSync
  @Prop({ type: Array }) classifiers
  @Prop({ type: Array }) classes
  @Prop({ type: Boolean, default: false }) loading
  @Prop({ type: Boolean }) invalid

  get limitNdet() {
    return this.$store.state.filters.limitNdet
  }

  onSearchClicked() {
    this.$emit('search')
  }

  onClearClicked() {
    this.$emit('clear')
  }

  onKeyUp(event) {
    if (event.key === 'Enter' && !this.invalid) this.onSearchClicked()
  }
}
</script>
