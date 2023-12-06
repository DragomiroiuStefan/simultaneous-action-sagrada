<script setup>
import { ref} from "vue";

import DiceBag from "@/DiceBag";

import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';


const difficulties = ref([
  {val: 4, label: '4 dice per round'},
  {val: 5, label: '5 dice per round'},
  {val: 6, label: '6 dice per round'}
])
const selectedDifficulty = ref(5);
const roundNo = ref(1);
const noOfPlayers = ref(4);
const players = ref([]);
function start() {
  roundNo.value = 1;
  players.value = []
  for (let i = 0; i < noOfPlayers.value; i++) {
    players.value[i] = {};
    players.value[i].bag = new DiceBag(selectedDifficulty.value);
  }
}

function rollDice() {
  roundNo.value++;
  for (let i = 0; i < noOfPlayers.value; i++) {
    players.value[i].drawnDice = players.value[i].bag.drawDice(selectedDifficulty.value);
  }
}

</script>

<template>
  <header>
    <div class="card flex justify-content-center mt-4 mb-4">
      <img alt="Sagrada logo" class="logo" src="./assets/sagrada-logo.webp" width="200"/>
    </div>
  </header>
  <main>
    <div class="card flex justify-content-center">
      <form @submit.prevent="start" class="flex flex-column gap-2">
        <div class="field">
          <label for="difficulty" class="font-bold block mb-2"> Difficulty: </label>
          <Dropdown
              id="difficulty"
              v-model="selectedDifficulty"
              :options="difficulties"
              optionLabel="label"
              optionValue="val"
              placeholder="Select a difficulty"
              class="w-full" aria-describedby="dd-error"/>
        </div>
        <div class="field">
          <label for="players" class="font-bold block mb-2"> Players: </label>
          <InputNumber id="players" v-model="noOfPlayers" mode="decimal" showButtons :min="1" :max="100"/>
        </div>
        <Button type="submit" label="Start"/>
      </form>
    </div>
    <div class="card flex flex-column align-items-center gap-2 mt-5">
      <h3 class="font-bold">Round {{ roundNo }}</h3>
      <div v-for="(player, index) in players">
        <p class="font-bold"> Player {{ index + 1 }} </p>
        <span v-for="die in player.drawnDice" class="mr-3"> {{ die.dieNumber + ' ' + die.dieColor }}  </span>
        <p>Remaining:</p>
        <span> {{ player.bag }} </span>
      </div>
      <Button label="Roll" @click="rollDice" :disabled="roundNo === 10" class="mt-4"/>
    </div>
  </main>
</template>
