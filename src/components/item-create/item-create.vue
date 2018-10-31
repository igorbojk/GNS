<template>
    <div class="container">
        <b-form @submit="onSubmit">
            <b-form-group id="nameGroup"
                          label="Name:"
                          label-for="name">
                <b-form-input id="name"
                              v-model.trim="form.name"
                              type="text"
                              :state="!$v.form.name.$invalid"
                              aria-describedby="inputLiveHelp inputLiveFeedback"
                              placeholder="Enter your name"></b-form-input>
                <b-form-invalid-feedback id="inputNameFeedback">
                    This is a required field and must be at least 3 characters
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="locationGroup"
                          label="Location:"
                          label-for="location">
                <b-form-input id="location"
                              v-model.trim="form.location"
                              type="text"
                              :state="!$v.form.location.$invalid"
                              aria-describedby="inputLiveHelp inputLiveFeedback"
                              placeholder="Enter your location"></b-form-input>
                <b-form-invalid-feedback id="inputLocationFeedback">
                    This is a required field and must be at least 3 characters
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="currencyGroup"
                          label="Currency:"
                          label-for="currency">
                <b-form-input id="currency"
                              v-model="form.currency"
                              type="number"
                              :state="!$v.form.currency.$invalid"
                              aria-describedby="inputLiveHelp inputLiveFeedback"
                              placeholder="Enter your currency"></b-form-input>
                <b-form-invalid-feedback id="inputLocationFeedback">
                    This is a required field and must be more 0
                </b-form-invalid-feedback>
            </b-form-group>

            <b-button type="submit" variant="primary" :disabled="$v.form.$invalid">Submit</b-button>
            <router-link  to="/list" class="btn btn-danger"> Cancel</router-link>
        </b-form>
    </div>
</template>

<script>
    import { validationMixin } from "vuelidate"
    import { required, minLength, minValue } from "vuelidate/lib/validators"

    export default {
        name: "item-create",
        methods: {
            onSubmit() {
                this.$store.dispatch('CREATE_ITEM', this.form);
                this.$router.push({name: 'list'});
            }
        },
        mixins: [
            validationMixin
        ],
        validations: {
            form: {
                name: {
                    required,
                    minLength: minLength(3)
                },
                location: {
                    required,
                    minLength: minLength(3)
                },
                currency: {
                    required,
                    minValue: minValue(1)
                }
            }
        },
        data() {
            return {
                form: {}
            }
        }
    }
</script>

<style scoped>

</style>