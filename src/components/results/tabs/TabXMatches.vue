<template>
    <v-card fluid tile class="ma-0" outlined :loading="loading">
        <v-container v-if="xmatches!=null">
            <v-flex xs3>
                <v-text-field
                type="number" 
                label="Maximum distance" 
                step="0.001"
                :min="0"
                v-model="distance"
                clearable
                persistent-hint
                hint="Distance in arcsec"
                ></v-text-field>
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
                                <h6 class="caption ml-1">({{ Object.keys(item.items).length }} fields)</h6>
                            </v-flex>
                            <v-flex xs6 class="text--secondary">
                                Distance: {{ item.distance.value + " " + item.distance.unit }}
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
            distance: null
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

