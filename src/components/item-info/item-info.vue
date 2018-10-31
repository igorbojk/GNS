<template>
    <div class="container">
        <div v-if="singleItem">
            <b-card :header="singleItem.id"
                    :title="singleItem.name"
                    :sub-title="'location: ' + singleItem.location">
                <p class="card-text">
                    currency: {{singleItem.currency}}
                </p>
                <router-link  to="/list" class="card-link"> < Back</router-link>
            </b-card>
        </div>
        <p v-if="!singleItem">Loading...</p>
    </div>
</template>

<script>
    export default {
        name: "item-info",
        computed: {
          singleItem(){
              return this.$store.getters.singleItem;
          }
        },
        created(){
            this.$store.dispatch('SET_SINGLE_ITEM', this.$route.params.key);
        },
        destroyed(){
            this.$store.dispatch('REMOVE_SINGLE_ITEM');
        }
    }
</script>

<style scoped>
    .container{
        padding-top: 16px;
    }
</style>