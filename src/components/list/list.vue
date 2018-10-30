<template>
    <div>
        <div class="search-block">
            <input class="form-control" type="text" v-on:keyup="filterList" v-model="name"
                   placeholder="Enter your name">

            <b-form-group label="Sort by..." v-if="selected">
                <b-form-radio-group id="btnradios1"
                                    buttons
                                    v-model="selected"
                                    :options="options"
                                    name="radiosBtnDefault"/>
            </b-form-group>
        </div>
        <div class="text-right sum-block">
            Summary: {{currencySum}}
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">name</th>
                    <th scope="col">location</th>
                    <th scope="col">currency</th>
                    <th scope="col">actions</th>
                </tr>
            </thead>
            <tbody v-if="!isLoadingList">
                <list-item v-for="(item, index) in orderBy(items,selected)" :key="index" :item="item" :onSave="onSave"></list-item>
            </tbody>
            <tbody v-else>
                LOADING....
            </tbody>
        </table>
    </div>
</template>

<script>

    import ListItem from '@/components/list-item/list-item.vue';

    export default {
        name: "list",
        components: {
            ListItem
        },
        computed: {
            items() {
                return this.$store.getters.filteredList;
            },
            currencySum() {
                return this.$store.getters.currencySum;
            },
            isLoadingList() {
                return this.$store.getters.isLoadingList;
            }
        },
        created() {
            this.$store.dispatch('SET_LIST');
        },
        methods: {
            filterList() {
                this.$store.dispatch('SET_QUERY', this.name);
            },
            onSave(){
                this.filterList();
            }
        },
        data() {
            return {
                name: '',
                selected: 'name',
                options: [
                    {text: 'name', value: 'name'},
                    {text: 'location', value: 'location'},
                    {text: 'currency', value: 'currency'}
                ]
            }
        }
    }
</script>

<style scoped>
    .search-block {
        padding: 16px;
    }

    .search-block input[type="text"] {
        margin-bottom: 16px;
    }

    .sum-block {
        padding-right: 16px;
    }
</style>