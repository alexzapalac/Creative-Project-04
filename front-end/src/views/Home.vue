<template>
    <div id ="app">

        <div id="welcome">
            <p>Insert Photo</p>
            <h1>Welcome to your Local Auto Club</h1>
            <p> Add some cool Cars</p>
        </div>
     
        <div id="peoples">
            <h2>Log in:</h2>
            <p>Select your User</p>
            <button v-for="people in peoples" :key=people.id @click=selectPerson(people)>{{people.Person}}</button>
        </div>

        <form @submit.prevent="addPerson">
            <p>Create a new User</p>
            <input type="text" v-model="peopleName" placeholder="Your Name">
            <br/>
            <input type="text" v-model="description" placeholder="Description">
            <br/>
            <input type="file" name="carcoll" @change="fileChanged">
            <button type="submit">Add Your User</button>

        </form>

        <div class="theCars" v-if="people">
            <p>The Cars</p>
            <form @submit.prevent="addCars">
            <input type="text" v-model="make">
            <br/>
            <input type="text" v-model="model">
            <br/>
            <input type="text" v-model="color">
            <br/>
            <input type="text" v-model="year">
            <br/>
            <button type="submit">Add Make Car</button>
            </form>
        </div>




    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Home',
    
    data() {
        return {
            peoples: [],
            people: null,
            peopleName: '',
            description: '',
            carcoll: '',
            file: null,
            
            cars: [],
            make: '',
            model: '',
            color: '',
            year: '',
            path: '',
            show: 'all',
        }
    },
    created() {
        this.getPerson();
    },

    computed: {

    },

    methods: {
        fileChanged(event) {
            this.file = event.target.files[0]
        },

        async addPerson() {
            try {

                await axios.post("/api/peoples", {
                    Person: this.peopleName,
                    Description: this.description,
                    Owns: this.carcoll,
                });
                await this.getPerson();
            } catch (error) {
                console.log(error);
            }
        },
        async getPerson() {
            try {
                const response = await axios.get("/api/peoples");
                this.peoples = response.data;
            }   catch(error) {
                console.log(error);
            }
        },
        async selectPerson(people) {
            this.people = people;
            this.getCars();
        },

        async getCars(){
            try {
                const response = await axios.get(`/api/peoples/${this.people._id}/cars`);
                this.cars = response.data;
            }   catch(error) {
                console.log(error);
            }
        },
        async addCars(){
            try{
                await axios.post(`/api/peoples/${this.people._id}/cars`, {
                    make: this.make,
                    model: this.model,
                    color: this.color,
                    year: this.year,
                    path: this.path,
                });
                this.make = "";
                this.model = "";
                this.model = "";
                this.year = "";
                this. path = "";
                this.getCars();
            } catch (error) {
                console.log(error);
            }
        },
    }
}


</script>