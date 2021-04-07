<template>
    <div>
        <h1>This is my item page</h1>

        <div class="wrapper">

            <div class="container" v-for="person in page" :key="person.id">
                <div class="image">
                    <img :src="people.Owns">
                </div>
                <div class="info">
                    <h3>person.person</h3>
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
            items: [],
        }
    },
    created() {
        this.getItems();
    },
    methods: {
        async getItems() {
            try{
                let response = await axios.get("/api/peoples");
                this.items = response.data;
                return true;
            } catch(error) {
                console.log(error);
            }
        },
    }
}

</script>


<style scoped>



</style>