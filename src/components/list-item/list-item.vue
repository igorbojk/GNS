<template>
    <tr v-if="mode == 'read'">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.location}}</td>
        <td>{{item.currency}}</td>
        <td>
            <b-button-group>
                <b-button variant="success" @click="editItem()">edit</b-button>
            </b-button-group>
        </td>
    </tr>

    <tr v-else>
        <td>
            {{editedItem.id}}
        </td>
        <td>
            <input type="text" v-model="editedItem.name">
        </td>
        <td>{{item.location}}</td>
        <td>{{item.currency}}</td>
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
        methods: {
            editItem() {
                this.editedItem = Object.assign({}, this.item);
                this.mode = 'edit';
            },
            saveItem() {
                delete this.editedItem.key;
                this.$store.dispatch('UPDATE_ITEM', {key: this.item.key, item: this.editedItem});
                this.$store.dispatch('SET_LIST');
                this.editedItem = null;
                this.mode = 'read';
                this.onSave();
            },
            cancel() {
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