<template>
    <div>
        <div id="link">
            <router-link to="/" tag="button">Back to Home</router-link>
        </div>
        <h2>Welcome to my page!</h2>
        <div id="bar">
        </div>

        <div id="editUser">
            <button @click="setEditUserTrue()">Edit User</button>
            <div class="EditUserButton" v-if="editUser">
                <input type="text" v-model="peopleName" placeholder="Your Name">
                <br/>
                <input type="text" v-model="description" placeholder="Description">
                <br/>
                <button @click="editUserInfo(person)">Submit Changes</button>           
            </div>     
        </div>
        <div class="wrapper">

            <div class="container">
                <div class="image">
                    <img :src="person.Owns">
                </div>
                <div class="info">
                    <h3>{{person.Person}}</h3>

                    <h4>{{person.Description}}</h4>
            </div>


            </div>

        </div>

        <div id="bar">
        </div>

        <div class="carHeader">
            <h3>My Car Collection</h3>
        </div>
        
        <div class="wrapcoll">
            <div class="contcoll" v-for="car in cars" :key=car._id>
                <div class="carImage">
                    <img :src="car.path">
                </div>
                <div class="infocoll">
                    <p>Make: {{car.make}}</p>
                    <p>Model: {{car.model}}</p>
                    <p>Year: {{car.year}}</p>
                    <p>Color: {{car.color}}</p>
                </div>
                <div class="buttons">
                    <button @click="setEditTrue()">Edit Car</button>
                    <div class="editButton" v-if="editItem">
                        <input type="text" v-model="make" placeholder="Make">
                        <br/>
                        <input type="text" v-model="model" placeholder="Model">
                        <br/>
                        <input type="text" v-model="color" placeholder="Color">
                        <br/>
                        <input type="text" v-model="year" placeholder="Year">
                        <br/>
                        <button @click="editCar(car)">Submit Edit</button>
                    </div>
                    <button @click="deleteCar(car)">Remove Car</button>
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
            make: '',
            model: '',
            year: '',
            color: '',
            editItem: false,
            editUser: false,
            peopleName: '',
            description: '',
        }
    },
    created() {
        this.getPerson();
        this.getCars();
    },
    computed: {
        item() {
            return this.$root.$data.item;
        },

    },
    methods: {
        setEditTrue() {
            this.editItem = true;
        },    
        setEditUserTrue() {
            this.editUser = true;
        },

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
                const response = await axios.get(`/api/peoples/${this.$route.params.id}/cars`);
                this.cars = response.data;
            } catch(error) {
                console.log(error);
            }
        },
        async deleteCar(car) {
            try {
                await axios.delete(`/api/peoples/${this.$route.params.id}/cars/${car._id}`);
                this.getCars();
            }   catch (error) {
                console.log(error);
            }
        },
        async editUserInfo(person) {
            console.log(person);
            console.log(this.peopleName);
            try {
                await axios.put(`/api/peoples/${person._id}`, {
                    Person: this.peopleName,
                    Description: this.description,
                });
                this.getPerson();
                this.peopleName='';
                this.description='';
                this.editUser = false;
                return true;
            }   catch(error) {
                console.log(error);
            }

        },
        async editCar(car) {

            try {
                await axios.put(`/api/peoples/${this.$route.params.id}/cars/${car._id}`,{
                    make: this.make,
                    model: this.model,
                    year: this.year,
                    color: this.color,

                });
                this.getCars();
                this.make='';
                this.model='';
                this.year='';
                this.color='';
                this.editItem = false;
                return true;
            } catch (error){
                console.log(error);
            }
        },
    }
}

</script>


<style scoped>
#bar {
    color: black;
    border-block-color: black;
    margin-top: 35px;
    padding-top: 5px;
    background-color: black;
    display: flex;
}
input {
    margin: 5px;
}
#link {
    text-align: center;
}

h2 {
    text-align: center;
}

.wrapper {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
.wrapper .button {
    align-content: flex-end;
}
#editUser {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    margin-bottom: 15px;
}
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    text-align: center;
}

.image {
    width: auto;
    display: flex;
    justify-content: center;
    margin-top: 5px;
}

.info {
    text-align: center;
}


.image img {
    width: 50%;

}

.carImage img {
    width: 90%;
    height: auto;
    display: flex;
    justify-content: center;
    text-align: center;
    align-content: center;
    margin-top: 5px;
}
.carHeader {
    text-align: center;
    margin-top: 20px;
}

.wrapcoll {
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.contcoll {
    margin: 10px;
    margin-top: 50px;
    width: 400px;
    background-color: burlywood;
}

.carImage {
    display: flex;
    align-content: center;
    text-align: center;
    justify-content: center;
}

.infocoll {

    text-align: center;
}

.buttons {
    display: flex;
    justify-content: center;
}

</style>