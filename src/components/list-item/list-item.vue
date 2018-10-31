<template>
    <tr v-if="mode == 'read'">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.location}}</td>
        <td>{{item.currency}}</td>
        <td>
            <b-button-group>
                <b-button variant="info" @click="goMore()">more</b-button>
                <b-button variant="success" @click="editItem()">edit</b-button>
                <b-button variant="danger" @click="deleteItem()">delete</b-button>
            </b-button-group>
        </td>
    </tr>

    <tr v-else>
        <td>
            {{editedItem.id}}
        </td>
        <td>
            <b-form-input id="name"
                          v-model.trim="editedItem.name"
                          type="text"
                          :state="nameState"
                          aria-describedby="inputLiveHelp inputLiveFeedback"
                          placeholder="Enter your name"></b-form-input>
            <b-form-invalid-feedback id="inputNameFeedback">
                Enter at least 3 letters
            </b-form-invalid-feedback>
        </td>
        <td>
            <b-form-input id="location"
                          v-model.trim="editedItem.location"
                          type="text"
                          :state="locationState"
                          aria-describedby="inputLiveHelp inputLiveFeedback"
                          placeholder="Enter your location"></b-form-input>
            <b-form-invalid-feedback id="inputLocationFeedback">
                Enter at least 2 letters
            </b-form-invalid-feedback>
        </td>
        <td>
            <b-form-input id="currency"
                          v-model="editedItem.currency"
                          type="number"
                          :state="currencyState"
                          aria-describedby="inputLiveHelp inputLiveFeedback"
                          placeholder="Enter your currency"></b-form-input>
            <b-form-invalid-feedback id="inputCurrencyFeedback">
                Must be more 0
            </b-form-invalid-feedback>
        </td>
        <td>
            <b-button-group>
                <b-button variant="success" @click="saveItem()">save</b-button>
                <b-button variant="danger" @click="cancel()">cancel</b-button>
            </b-button-group>
        </td>
    </tr>
</template>

<script>
    export default {
        name: "list-item",
        props: {
            item: {
                type: Object
            },
            onSave: {
                type: Function
            }
        },
        computed: {
            nameState () {
                return this.editedItem.name.length > 3 ? true : false
            },
            locationState () {
                return this.editedItem.location.length > 2 ? true : false
            },
            currencyState () {
                return +this.editedItem.currency > 0 ? true : false
            }
        },
        methods: {
            editItem() {
                this.editedItem = Object.assign({}, this.item);
                this.mode = 'edit';
            },
            saveItem() {
                if(!this.nameState || !this.locationState || !this.currencyState) return;
                delete this.editedItem.key;
                this.editedItem.currency = +this.editedItem.currency;
                this.$store.dispatch('UPDATE_ITEM', {key: this.item.key, item: this.editedItem});
                this.$store.dispatch('SET_LIST');
                this.resetMode();
            },
            cancel() {
                this.resetMode();
            },
            deleteItem(){
                this.$store.dispatch('DELETE_ITEM', this.item.key);
                this.$store.dispatch('SET_LIST');
                this.resetMode();
            },
            goMore(){
                this.$router.push({name: 'item-info', params: {key: this.item.key}})
            },
            resetMode(){
                this.editedItem = null;
                this.mode = 'read';
            }
        },
        data() {
            return {
                mode: 'read',
                editedItem: null
            }
        }
    }
</script>

<style scoped>

</style>