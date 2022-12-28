<script lang="ts">
import GameControl from "@/components/GameControl.vue";
import axios from "axios";

export default {
  components: { GameControl },
  async created() {
    const { data } = await axios.get("http://localhost:1337/api/words", {
      headers: {
        Authorization:
          "Bearer 24629ab19d2c880888663211a69c74783bf8e690e52783fbf69392b398245060254889e613c11c1be811bf88106d775ac0ecc72e763b7a6e478bae335099f3300b88dd72c77c38be3826342aaca5b5ddaf45450bc4ee1d252145b4190bb80771aa83579f54e2b8af4b7e9af55a76f10412c2a5d281195f43fcbebec139f50182",
      },
    });

    console.log(data);
  },
};
</script>

<template>
  <div>
    <GameControl solution="books" />
  </div>
</template>

<style></style>
