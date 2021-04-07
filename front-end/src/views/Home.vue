<template>
    <div id ="app">

        <div id="welcome">
            <p>Insert Photo</p>
            <h1>Welcome to your Local Auto Club</h1>
            <p> Add some cool Cars</p>
        </div>
        <div id="bar">
        </div>

        <h2>Log in:</h2>
        <p>Select your User</p>      
        <div class="wrapper">

            <div id="peoples" v-for="people in peoples" :key=people.id>
                <div class="info">
                    <h3>{{people.Person}}</h3>
                </div>
                <div class="image">
                    <img :src="people.Owns" />
                </div>
                <button @click=selectPerson(people)>Start Adding Cars</button>
                <div class="topage" v-on:click="goToPage(people)">
                    <router-link to="/item">Visit My Page</router-link>
                </div>
            </div>

            <form @submit.prevent="addPerson">
                <p>Create a new User</p>
                <input type="text" v-model="peopleName" placeholder="Your Name">
                <br/>
                <input type="text" v-model="description" placeholder="Description">
                <br/>
                <input type="file" name="photo" @change="fileChanged">
                <button type="submit">Add Your User</button>

            </form>
        </div>
        <div class="upload" v-if="addItem">
        <img :src="addItem.path" />
        </div>

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
            addItem: null,
            infoToPage: [],
            
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

        goToPage(people) {
            this.infoToPage.push(people);
        },

        async addPerson() {
            try {
                const formData = new FormData();
                formData.append('photo', this.file, this.file.name)
                let r1 = await axios.post('/api/photos', formData)
                let r2 = await axios.post('/api/peoples', {
                    Person: this.peopleName,
                    Description: this.description,
                    Owns: r1.data.Owns
                });
                this.addItem = r2.data;
                /*await axios.post("/api/peoples", {
                    Person: this.peopleName,
                    Description: this.description,
                    Owns: this.carcoll,
                });
                await this.getPerson();
            */} catch (error) {
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

<style scoped>

#app {

}
#welcome {

    align-content: center;
    align-items: center;
    text-align: center;
}
#bar {
    color: black;
    border-block-color: black;
    margin-top: 5px;
    padding-top: 5px;
    background-color: black;
    display: flex;
}

.wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

#peoples {
    margin: 10px;
    margin-top: 50px;
    width: 200px;
    background-color: burlywood;
}

#peoples img{
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
    
}
#peoples .image {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
}

.info {
    
    color: #000;
    padding: 10px 30px;
    height: 80px;
}

#peoples button {
    display: flex;
    align-content: center;
    justify-content: center;
    align-self: center;
    text-align: center;
}

</style>