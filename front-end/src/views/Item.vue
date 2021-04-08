<template>
    <div>
        <h1>This is my user page</h1>

        <router-link to="/">Back to Home</router-link>

        <div class="wrapper">

            <div class="container">
                <div class="image">
                    <img :src="person.Owns">
                </div>
                <div class="info">
                    <h3>{{person.Person}}</h3>
                </div>
                <div class="descrip">
                    <h4>{{person.Description}}</h4>
            </div>


            </div>

        </div>
        <div class="carHeader">
            <h3>My Car Collection</h3>
        </div>
        <div class="wrapcoll">


            <div class="contcoll" v-for="car in cars" :key=car._id>
                <p> Add Photo</p>
                <div class="infocoll">
                    <p>Make</p>
                    <p>{{car.make}}</p>
                    <p>Model</p>
                    <p>{{car.model}}</p>
                    <p>Year</p>
                    <p>Color</p>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Item',
    data() {
        return {
            loading: false,
            person: {},
            cars: [],
            car: null,
        }
    },
    created() {
        this.getPerson();
    },
    computed: {
        item() {
            return this.$root.$data.item;
        },
    },
    methods: {
        async getPerson() {
            try{
                let response = await axios.get(`/api/peoples/${this.$route.params.id}`);
                this.person = response.data;
                return true;
            } catch(error) {
                console.log(error);
            }
        },
        async getCars() {
            try{
                const response = await axios.get(`/api/peoples/${this.people._id}/cars`);
                this.cars = response.data;
            } catch(error) {
                console.log(error);
            }
        },
    }
}

</script>


<style scoped>



</style>