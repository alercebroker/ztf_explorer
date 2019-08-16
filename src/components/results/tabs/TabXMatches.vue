<template>
    <v-card fluid tile class="ma-0" outlined :loading="loading" min-height="500px">
        <v-container v-if="xmatches!=null">
            <v-layout  wrap justify-space-around>
                <v-flex xs1>
                    <p>Min distance for filter</p>
                </v-flex>
                <v-flex xs9>
                    <v-slider
                        v-model="distance"
                        step="0.001"
                        :min="0"
                        :max="20"
                    >
                        <template v-slot:append>
                            <v-text-field
                                v-model="distance"
                                prepend-icon="mdi-ruler"
                                class="mt-0 pt-0"
                                type="number"
                                :min="0"
                                :max="20"
                                step="0.001"
                                style="width: 175px"
                                suffix="arcsec"
                                hide-details
                                ></v-text-field>
                        </template>
                    </v-slider>
                </v-flex>
                <v-flex xs12 class="mt-2">
                    <v-expansion-panels>
                        <v-expansion-panel
                        v-for="(item,idx) in filtered"
                        :key="idx"
                        >
                        <v-expansion-panel-header>
                            <v-layout align-center>
                                <v-flex xs6 row align-center>
                                    <h6 class="title">{{item.catalog}} </h6>
                                    <h6 class="caption ml-1">({{ Object.keys(item.items).length }} items)</h6>
                                </v-flex>
                                <v-flex xs6 class="text--secondary">
                                    <p class="text-sm-right">Distance: {{ item.distance.value.toFixed(3) + " " + item.distance.unit }}</p>
                                </v-flex>
                            </v-layout>                
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-data-table
                                :headers="header"
                                :items="item.items"
                                hide-default-footer
                                disable-filtering
                                disable-pagination
                                dense
                            ></v-data-table>
                        </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-flex>
            </v-layout>
            <v-footer color="transparent">
                <v-spacer></v-spacer>
                <div class="caption">Powered by <a href="https://github.com/maayane/catsHTM" target="blank">catsHTM</a></div>
            </v-footer>
        </v-container>
        <v-container v-else>
            <v-alert type="warning">
                {{ erroMessagge }}
            </v-alert>
        </v-container>
    </v-card>
</template>
<script>
export default {
    name: "tabXMatches",
    data () {
        return {
            header: [
                {
                    text: "Item",
                    value: "name",
                    sortable: false,
                },
                {
                    text: "Value",
                    value: "value",
                    sortable: false,
                },
                {
                    text: "Unit",
                    value: "unit",
                    sortable: false,
                },
            ],
            distance: 10
        }
    },
    computed: {
        xmatches(){
            if(this.$store.state.results.objectDetails.xmatches){
                return this.$store.state.results.objectDetails.xmatches.data;
            }
            return null
            
        },
        values() {
            return this.xmatches
            .map(function(x)
            {
                let name = Object.keys(x)[0]
                var res = []
                for( var item in x[name]){
                    if(x[name][item].value != null && item != "distance") { 
                        res.push(
                            {
                                name: item,
                                value: x[name][item].value,
                                unit: x[name][item].unit
                            }
                        )
                    }
                }
                return { 
                    catalog: name,
                    distance: x[name].distance,
                    items: res,
                }
            })
        },
        loading: {
            get(){
                return this.$store.state.results.objectDetails.load_xmatches;
            },
            set(val){
                this.$store.state.results.objectDetails.load_xmatches = val;
            }
        },
        filtered() {
            if(this.distance == null){ return this.values}
            else { return this.values.filter(x => this.distance >= x.distance.value) }
        },
        erroMessagge() {
            return this.$store.state.results.objectDetails.error_xmatches
        }
    },
    watch: {
        xmatches(newVal){
            if(newVal){this.loading = false}
            else{ this.loading = true}
        },
        loading(newVal){
            this.loading = newVal
        }
    }
}
</script>

