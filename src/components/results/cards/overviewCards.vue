<template>
    <v-container fluid grid-list-lg >
        <v-layout row wrap justify-center>
            <v-flex xs6 md2>
                <v-card color="primary" class="white--text" height="100%">
                    <v-card-text class="text-center">
                        <v-icon x-large>add_circle</v-icon>
                    </v-card-text>
                    <div class="text-center" >
                        <div class="title">Recent Objects</div>
                    </div>
                    <v-card-text class="text-center">
                        <v-chip disabled color="header" text-color="white">1000</v-chip>
                        <p>(last 24 hours)</p>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs6 md2>
                <v-card color="primary" class="white--text" height="100%">
                    <v-card-text class="text-center">
                        <v-icon x-large>add_circle</v-icon>
                    </v-card-text>
                    <div class="text-center" >
                        <div class="title">Recent Alerts</div>
                    </div>
                    <v-card-text class="text-center">
                        <v-chip disabled color="header" text-color="white">1000</v-chip>
                        <p>(last 24 hours)</p>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs6 md2>
                <v-card color="primary" class="white--text" height="100%">
                    <v-card-text class="text-center">
                        <v-icon x-large>highlight_off</v-icon>
                    </v-card-text>
                    <div class="text-center" >
                        <div class="title">X-Matched Objects</div>
                    </div>
                    <v-card-text class="text-center">
                        <v-chip disabled color="header" text-color="white">1000</v-chip>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs6 md2>
                <v-card color="primary" class="white--text" height="100%">
                    <v-card-text class="text-center">
                        <v-icon x-large>category</v-icon>
                    </v-card-text>
                    <div class="text-center" >
                        <div class="title">Classified Objects</div>
                    </div>
                    <v-card-text class="text-center">
                        <v-chip disabled color="header" text-color="white">1000</v-chip>
                        <p>(Random Forest)</p>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs6 md2>
                <v-card color="primary" class="white--text" height="100%">
                    <v-card-text class="text-center">
                        <v-icon x-large>category</v-icon>
                    </v-card-text>
                    <div class="text-center" >
                        <div class="title">Classified Objects</div>
                    </div>
                    <v-card-text class="text-center">
                        <v-chip disabled color="header" text-color="white">1000</v-chip>
                        <p>(Early Classifier)</p>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>
