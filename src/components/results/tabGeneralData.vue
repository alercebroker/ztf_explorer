<template>
    <b-card-group deck class="mb-2">
        <b-card bg-variant="secondary" text-variant="white" class="text-center">
            <b-card-title>
                <span class="fas fa-meteor fa-3x"></span>
            </b-card-title>
            <b-card-body>
                <strong>31.097.872</strong> objects
            </b-card-body>
        </b-card>
        
        <b-card bg-variant="secondary" text-variant="white" class="text-center">
            <b-card-title>
                <span class="fas fa-exclamation-triangle fa-3x"></span> 
            </b-card-title>
            <b-card-body>
                <strong>31.097.872</strong> alerts
            </b-card-body>
        </b-card>

        <b-card bg-variant="secondary" text-variant="white" class="text-center">
            <b-card-title>
                <span class="fas fa-plus-circle fa-3x"></span>
            </b-card-title>
            <b-card-body>
                <strong>1.097.872</strong> new alerts
            </b-card-body>
            <div slot="footer"><small>Last updated 3 mins ago</small></div>
        </b-card>

        <b-card bg-variant="secondary" text-variant="white" class="text-center">
            <b-card-title>
                <span class="fas fa-plus-circle fa-3x"></span>
            </b-card-title>
            <b-card-body>
                <strong>1.097.872</strong> new alerts
            </b-card-body>
            <div slot="footer"><small>Last updated 3 mins ago</small></div>
        </b-card>

      
    </b-card-group>
</template>
<script>
export default {
    name: "generalData"
}
</script>

