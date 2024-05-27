
let base = 0;
let iv = 0;
let level = 0;
let ev = 0;
let nature = 0;

let hp = Math.floor(0.01 * ( ( (2 * base) + iv) + Math.floor(0.25 * ev) * level) + (level + 10));
let other = Math.floor(0.01 * ( ( (2 * base) + iv) + Math.floor(0.25 * ev) * level) + (level + 5) * nature)
//floor(0.01 x (2 x Base + IV + floor(0.25 x EV)) x Level) + 5) x Nature.
//HP = floor(0.01 x (2 x Base + IV + floor(0.25 x EV)) x Level) + Level + 10

// const getHp = (base, level, ev, iv) => {
//     return Math.floor((iv + base * 2 + ev / 4) * level / 100 + 10 + level)
// }
//
// const getStat = (base, level, ev, iv, natureBonus) => {
//     const res =  Math.floor(((iv + base * 2 + ev / 4) * level / 100 + 5))
//     return Math.floor(res * natureBonus);
// }
// // return Math.floor(((iv + base * 2 + ev / 4) * level / 100 + 5 + level) * natureBonus)
//
//
// const getNatureBonus = (nature: string, stat: string) => {
//
// }
//
// const getPokemon = (pokemonNo: number) => {
//
// }