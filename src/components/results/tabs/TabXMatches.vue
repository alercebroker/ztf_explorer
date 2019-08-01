<template>
    <v-card fluid tile class="ma-0" outlined :loading="loading">
        <v-container v-if="xmatches!=null">
            <v-expansion-panels>
                <v-expansion-panel
                v-for="(item,idx) in values"
                :key="idx"
                >
                <v-expansion-panel-header>
                    <v-layout align-center>
                        <h6 class="title">{{item.catalog}} </h6>
                        <h6 class="caption ml-1">({{ Object.keys(item.items).length }} fields)</h6>
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
            ]
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
                    if(x[name][item].value != null) { 
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
        }
    },
    watch: {
        xmatches(newVal){
            if(newVal){this.loading = false}
            else{ this.loading = true}
        }
    }
}
</script>

