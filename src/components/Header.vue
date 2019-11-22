<template>
    <v-app-bar app dark color="header" clipped-left>
        <a :to="{'path':'/'}">
            <v-img
                :src="require('../assets/logos/footerAlerceWhite.png')"
                max-width="40px"
                class="mr-4"
            ></v-img>
        </a>

        <v-toolbar-title :to="{'path':'/'}" class="white--text mr-4">
            <span>ZTF Explorer</span>
        </v-toolbar-title>

        <v-toolbar-items>
            <v-btn
                class="pl-5 pr-5 d-none d-md-flex text-capitalize"
                v-for="item in items"
                :key="item.link"
                :href="item.link"
            >{{ item.title }}</v-btn>
            <v-btn
                class="pl-5 pr-5 d-none d-md-flex text-capitalize"
                @click="startTutorial"
            >Tutorial</v-btn>
        </v-toolbar-items>

        <!-- <v-menu full-width :z-index="priority">
            <template v-slot:activator="{ on }">
                <v-app-bar-nav-icon class="d-xs-flex d-md-none" v-on="on"></v-app-bar-nav-icon>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in items" :key="index" :href="item.link">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>-->

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <!-- <v-btn text>FAQ</v-btn> -->
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
export default {
    data: () => ({
        priority: 10,
        items: [
            { title: "SN Hunter", link: "https://snhunter.alerce.online" },
            { title: "About", link: "http://alerce.science" }
            // { title: 'AGN Ranger' , link:"http://alerce.online"},
            // { title: 'VS Scout' , link:"http://alerce.online"},
        ]
    }),
    methods: {
        startTutorial() {
            this.$tours["tutorial"].start()
            this.$store.dispatch("setTutorialOpen", true);
        }
    }
};
</script>
