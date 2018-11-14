<template>
	<div>
        <b-btn class="mb-3" v-b-modal.showDetails>Show more details</b-btn>

        <b-modal id="showDetails" >
            <b-form-group>
                <template slot="label">
                    <b>Choose your options:</b><br>
                    <b-form-checkbox v-model="allSelected"
                                     :indeterminate="indeterminate"
                                     aria-describedby="options"
                                     aria-controls="options"
                                     @change="toggleAll"
                    >
                        {{ allSelected ? 'Un-select All' : 'Select All' }}
                    </b-form-checkbox>
                </template>
                <b-form-checkbox-group id="flavors"
                                       stacked
                                       v-model="selected"
                                       name="flavs"
                                       :options="options"
                                       class="ml-4"
                                       aria-label="Individual options"
                ></b-form-checkbox-group>
            </b-form-group>

        </b-modal>

        <b-table striped hover :items="result" :fields="selected"></b-table>
	</div>
</template>

<script>

export default {
    name: 'tabData',
    props: ["result"],
    data() {
        return {
            allSelected: false,
            indeterminate: false,
            selected: ['nobs','oid','pclass'], // TODO: must contain default columns
            options: [ //TODO: change values and text
                {text: 'Object ID', value: {
                        key: 'oid',
                        sortable: false,
                        label: 'Object ID'
                    }},
                {text: 'Nobs', value: {
                        key: 'nobs',
                        sortable: false,
                        label: '# Obs'
                    }},
                {text: 'Pclass', value: {
                            key: 'pclass',
                            sortable: false,
                            label: 'Probability on class'
                        }},
                {text: 'Class', value: 'class'},
                {text: 'FirstJd', value: 'firstjd'},
                {text: 'LastJd', value: 'lastjd'},
                {text: 'DeltaJd', value: 'deltajd'},
                {text: 'Ext', value: 'ext'},
                {text: 'Firstmagg', value: 'firstmagg'},
                {text: 'Lastmagg', value: 'lastmagg'},
                {text: 'Firstmagr', value: 'firstmagr'},
                {text: 'Lastmagr', value: 'lastmagr'},
                {text: 'Maxg', value: 'maxg'},
                {text: 'Maxr', value: 'maxr'},
                {text: 'Meandec', value: 'meandec'},
                {text: 'Meang', value: 'Meang'},
                {text: 'Meanr', value: 'Meanr'},
                {text: 'Meanra', value: 'Meanra'},
                {text: 'Mediang', value: 'Mediang'},
                {text: 'Medianr', value: 'Medianr'},
                {text: 'Ming', value: 'Ming'},
                {text: 'Minr', value: 'Minr'},
                {text: 'Period', value: 'Period'},
                {text: 'Rmsdec', value: 'Rmsdec'},
                {text: 'Rmsg', value: 'Rmsg'},
                {text: 'Rmsr', value: 'Rmsr'},
                {text: 'Rmsra', value: 'Rmsra'},
                {text: 'Slope', value: 'Slope'}
            ],

        }
    },
    methods: {
        toggleAll(checked) {
            this.selected = checked ? this.options.map(a => a.value).slice() : []
        }
    },
    watch: {
        selected (newVal, oldVal) {
            // Handle changes in individual flavour checkboxes
            if (newVal.length === 0) {
                this.indeterminate = false
                this.allSelected = false
            } else if (newVal.length === this.options.length) {
                this.indeterminate = false
                this.allSelected = true
            } else {
                this.indeterminate = true
                this.allSelected = false
            }
        }
    }
}
</script>
