<template>
  <div id="container">
<section class="row">
  <div class="you">
    <h1 class="text-center">YOU</h1>
    <div class="healthbar">
      <div class="healthbar-inner text-center" :style="{width: playerHealth + '%'}">
        {{playerHealth}}
      </div>
    </div>
  </div>
  <div class="monster">
    <h1 class="text-center">MONSTER</h1>
    <div class="healthbar">
      <div class="healthbar-inner text-center" :style="{width: monsterHealth + '%'}"> 
        {{monsterHealth}}
      </div>
    </div>
  </div>
</section>
<section class="row-controls" v-if="!gameIsRunning" @click="startGame">
  <div class="small-12 columns">
    <button id="start-game" class="btn btn-secondary"> START NEW GAME</button>
  </div>
</section>
<section class="row-controls" v-else>
  <div class="small-12 columns">
    <button id="attack" class="btn btn-secondary m-2" @click="attack"> ATTACK</button>
    <button id="special-attack" class="btn btn-danger m-2" @click="specialAttack"> SPECIAL ATTACK</button>
    <button id="heal" class="btn btn-success m-2" @click="heal"> HEAL</button>
    <button id="give-up" class="btn btn-dark m-2" @click="endGame"> GIVE UP</button>
  </div>
</section>
<section class="row log" v-if="turns.length > 0">
  <div class="small-12 columns">
    <ul>
      <li v-for="(turn, i) in turns" v-bind:key="i" :class="{'player-turn' : turn.isPlayer, 'monster-turn': !turn.isPlayer}">
        {{turn.text}}
      </li>
    </ul>
  </div>
</section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        playerHealth : 100,
        monsterHealth : 100,
        gameIsRunning : false,
        turns : []
      }
    },
    methods: {
      startGame() {
        this.gameIsRunning = true;
        this.playerHealth = 100,
        this.monsterHealth = 100,
        this.turns = []
      },
      attack() {
        var damage = this.calcDamage(3, 10);
        this.monsterHealth -= damage;
        this.turns.unshift({
          isPlayer : true,
          text : "Player Hits Monster with " + damage
        })
        if ( this.checkWin()) {
          return;
        }
        this.monsterAttack();
      },
      specialAttack() {
        var damage = this.calcDamage(8, 18);
        this.monsterHealth -=  damage;

        this.turns.unshift({
          isPlayer: true,
          text: "Player hits Monster hard with" + damage
        }
        )
        if ( this.checkWin()) {
          return;
        }
        this.monsterAttack();
       
      },
      heal() {
        if (this.playerHealth <= 90) {
        this.playerHealth += 10;  
        } else {
          this.playerHealth = 100;
        }
         this.turns.unshift({
          isPlayer: true,
          text: "Player heals for 10"
        }
        )
        this.monsterAttack();
      },
      endGame() {
        this.gameIsRunning = false;
      },
      calcDamage(min, max) {
        return Math.max(Math.floor(Math.random() * max) + 1, min);
      },
      checkWin() {
         if (this.monsterHealth <= 0) {
           if (confirm('You won ! New Game ?')) {
             this.startGame();
           } else {
             this.gameIsRunning = false;
           }
           return true;
            } else if(this.playerHealth <= 0) {
             if (confirm('You Lost ! New Game ?')) {
             this.startGame();
           } else {
              this.gameIsRunning = false;
           }
           return true;      
        }
        return false;
      },
      monsterAttack() {
        var damage = this.calcDamage(5, 12);
         this.playerHealth -= damage;
         this.checkWin();
         this.turns.unshift({
          isPlayer : false,
          text : "Monster Hits Player with " + damage
        })

        
      }
    }
  }
</script>

<style lang="scss" scoped>
.healthbar {
  box-shadow: 6px 6px 6px -6px rgb(233, 228, 228);
  border: 1px solid rgb(241, 233, 233);
}
.healthbar-inner {
  background-color: green;
  margin: 0;
  color: white;
  width: 80%;
  height: 40px;
  transition: width 500ms;
  display: flex;
  align-items: center;
  justify-content: center;
  
}
.btn:focus {
  outline: none;
  box-shadow: none;
}
.btn:hover {
  box-shadow: 0px 5px 20px rgba(46, 229, 157, 0.4);
}
.you, .monster {
  text-align: center;
  width: 300px;
  margin: auto;
}
.you h1, .monster h1{
  font-size: 30px;
}
.row-controls {
  margin-top: 60px;
}
.log {
  margin-top: 20px;
  padding: 6px 0 ;
  box-shadow:
       inset 0 -3em 3em rgba(0,0,0,0.1),
             0 0  0 2px rgb(255,255,255),
             0.3em 0.3em 1em rgba(0,0,0,0.3);

}

.log ul .player-turn {
    color: blue;
    background-color: #e4e8ff;
}
.log ul .monster-turn {
    color: red;
    background-color: #ffc0c1;
}
.log ul li {
  list-style: none;
}
</style>