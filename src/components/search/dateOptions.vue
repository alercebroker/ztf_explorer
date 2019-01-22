<template>
    <div name="dates" class="mb-3">
        <h2>Dates</h2>
        <b-card>
            <b-row class="align-middle" name="JD">
                <b-col>
                    <p class="small">MJD</p>
                </b-col>
                <b-col>
                    <p class="small">Date</p>
                </b-col>
            </b-row>
            <b-row class="align-middle">
                <b-col>
                    <label>Start Date</label>
                </b-col>
            </b-row>
            <b-row class="align-middle" name="firstJD">
                <b-col>
                    <b-form-input
                        size="sm"
                        id="firstjd"
                        v-model="firstjd"
                    />
                </b-col>
                <b-col>
                    <b-form-input
                        size="sm"
                        id="datepickerfirst"
                        name="firstJD"
                        type="date"
                        v-model="firstGreg"
                    />
                </b-col>
            </b-row>
            <br>
            <b-row class="align-middle">
                <b-col>
                    <label>End Date</label>
                </b-col>
            </b-row>
            <b-row class="align-middle" name="lastJD">
                <b-col>
                    <b-form-input
                        size="sm"
                        id="lastjd"
                        v-model="lastjd"
                    />
                </b-col>
                <b-col>
                    <b-form-input
                        size="sm"
                        id="datepickerlast"
                        name="lastJD"
                        type="date"
                        v-model="lastGreg"
                    />
                </b-col>
            </b-row>
            <br>
            <b-row class="align-middle">
                <b-col md="4" class="text-center small">min</b-col>
                <b-col md="4" class="text-center"></b-col>
                <b-col md="4" class="text-center small">max</b-col>
            </b-row>
            <b-row class="align-middle">
                <b-col md="4">
                    <b-form-input
                        size="sm"
                        id="minjd"
                        v-model="deltajd.min"
                    />
                </b-col>
                <b-col md="4" class="text-center">First to Last alert
                    <v-icon
                        v-b-tooltip.hover.right
                        class="mb-1 mx-1"
                        title="Time between the first alert and the last alert associated with an object"
                        name="info-circle"
                        color="#C0C0C0"
                    />
                    <small class="text-muted">(days)</small>
                </b-col>
                <b-col md="4">
                    <b-form-input
                        size="sm"
                        id="maxjd"
                        v-model="deltajd.max"
                    />
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: "date-options",
        data(){
            return{
                firstjd: null,
                lastjd: null,
                deltajd: {
                    min: null,
                    max: null
                }
            }
        }
    }
</script>

<style scoped>

</style>