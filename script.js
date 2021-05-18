const goblin = {
    name: 'goblin',
    health: 25,
    attack: 8,
    defense: 2,
    dodge: 4,
}
const hero = {
    name: 'hero',
    health: 50,
    attack: 7,
    defense: 2,
    dodge: 1,
}
//check if the game is on,
//if it is, then have the player choose attack or defend,
//if attack => take combat turns with enemy, player attacks
//if defense => take combat turns with enemy, player defends
//game is over when enemy or player's health reaches zero
//combat turns are: roll for dodge chance,
//if dodge is true, attack does 0 damage,
//if dodge is false, attack does damage to enemy health + defense.
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
function rollForDodge (combatant){
    const dodgeChance = getRandomInt(10);
    if (dodgeChance <= combatant.dodge){
        return true;
    }
    return false;
}
function attackTurn (player, enemy) {
    if(!rollForDodge(enemy)){
        enemy.health = (enemy.health + enemy.defense) - (player.attack + player.attack/2);
        if(!rollForDodge(player)){
            player.health = (player.health + player.defense) - enemy.attack;
        }
    }
    return player.health;
}
function defenseTurn (player, enemy) {
    if(!rollForDodge(enemy)){
        enemy.health = (enemy.health + enemy.defense) - (player.attack/2);
        if(!rollForDodge(player)){
            player.health = (player.health + player.defense) - (enemy.attack/2);
        }
    }
    return player.health;
}
function gameOver (playerHealth, enemyHealth){
    if (playerHealth > 0 && enemyHealth > 0){
        return false;
    } else {
        return true;
    }
}
function playerPrompt (){
    let mssgPrompt = prompt('Will you attack or defend?');
    while(mssgPrompt){
        if(mssgPrompt === 'attack'){
            return true;
        } else if (mssgPrompt === 'defend'){
            return false;
        } else {
            alert('please enter "attack" or "defend"');
            mssgPrompt = '';}
    }
}
console.log(hero);
console.log(goblin);
alert('the battle begins!');
while(!gameOver(hero.health, goblin.health)){
    if(playerPrompt()){
        attackTurn(hero, goblin);
        console.log('your health is: ' + hero.health);
        console.log('your enemy has a health pool of: ' + goblin.health);
    } else {
        defenseTurn(hero, goblin);
        console.log('your health is: ' + hero.health);
        console.log('your enemy has a health pool of: ' + goblin.health);
    }
}
console.log('game over!');