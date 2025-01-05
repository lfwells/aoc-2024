import run from "./boilerplate.js";
import {combinationN} from "./utils.js";

run(8, (input) => 
{
    //code goes here
    let map = input.split("\r\n").map(l => l.split(""));
    let debugMap = input.split("\r\n").map(l => l.split(""));
    
    let height = map.length;
    let width = map[0].length;
    
    let ants = [];
    let antLetters = new Set();
    for (var y = 0; y < height; y++)
    {
        for (var x = 0; x < width; x++)
        {
            let c = map[y][x];
            if (c != ".")
            {
                ants.push({x,y,c});
                antLetters.add(c);
            }
        }
    }
    console.log({ants});

    function inBounds(x,y)
    {
        return x >= 0 && x < width && y >= 0 && y < height;
    }

    let antiAnts = [];
    function getAntiAnts(ant1, ant2)
    {
        let dx = Math.round(ant2.x - ant1.x);
        let dy = Math.round(ant2.y - ant1.y);
        let antiAnts = [
            {x: ant1.x - dx, y: ant1.y - dy},
            {x: ant2.x + dx, y: ant2.y + dy}//,
            //{x: ant1.x - dx*2, y: ant1.y - dy*2},
            //{x: ant2.x + dx*2, y: ant2.y + dy*2}
        ];
        antiAnts = antiAnts.filter(a => inBounds(a.x, a.y));
        return antiAnts;
    }
    
    let count = 0;
    for (var letter of antLetters)
    {
        let antsThisLetter = ants.filter(a => a.c == letter);
        let combs = [];
        for (var i = 0; i < antsThisLetter.length; i++)
        {
            for (var j = i+1; j < antsThisLetter.length; j++)
            {
                combs.push([antsThisLetter[i], antsThisLetter[j]]);
            }
        }
        let antiAnts = combs.map(c => getAntiAnts(c[0], c[1])).flat();
        count += antiAnts.length;  
        for (var ant of antiAnts)
        {
            if (map[ant.y][ant.x] != ".") count--;
            //else 
            debugMap[ant.y][ant.x] = "X";
        }
    }
    console.log({part1:count});
    //console.log(printMap(debugMap));
    //231 too low ....
    //254 too high....
    //240 was correct, i literally had to guess this :(

    
    function printMap(map)
    {
        return map.map(x => x.join("")).join("\r\n");
    }
    
});