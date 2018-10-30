<template>
    <div>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">id</th>
                <th scope="col">name</th>
                <th scope="col">location</th>
                <th scope="col">currency</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in items" :key="index">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.location}}</td>
                <td>{{item.currency}}</td>
            </tr>

            </tbody>
        </table>
    </div>
</template>

<script>
    import apiService from '../../services/apiService'

    export default {
        name: "list",
        created(){
            apiService.getJson().then(result => {
                this.items = result.data
            })
        },
        data() {
            return {
                items: []
            }
        }
    }
</script>

<style scoped>

</style>