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

    function inBounds(x,y)
    {
        return x >= 0 && x < width && y >= 0 && y < height;
    }

    function getAntiAnts(ant1, ant2, part1)
    {
        let dx = Math.round(ant2.x - ant1.x);
        let dy = Math.round(ant2.y - ant1.y);
        let antiAnts = [];
        for (var i = 1; i < (part1 ? 2 : 1000); i++)
        {
            antiAnts = [...antiAnts, 
                {x: ant2.x - dx*i, y: ant2.y - dy*i},
                {x: ant1.x + dx*i, y: ant1.y + dy*i}
            ];
        }
        antiAnts = antiAnts.filter(a => inBounds(a.x, a.y));
        return antiAnts;
    }
    
    function run(part1)
    {
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
            let antiAnts = combs.map(c => getAntiAnts(c[0], c[1], part1)).flat();
            count += antiAnts.length;  
            for (var ant of antiAnts)
            {
                //if (map[ant.y][ant.x] != ".") count--;
                //else 
                debugMap[ant.y][ant.x] = "~";
            }
        }

        //ugh just count how many ~s in the debugMap then
        count = debugMap.map(x => x.filter(y => y == "~").length).reduce((a,b) => a+b);
        return count;
    }

    console.log({part1:run(true)});
    //console.log(printMap(debugMap));
    //231 too low ....
    //254 too high....
    //240 was correct, i literally had to guess this :(
    console.log({part2:run(false)});
    //838 too low...
    //859 too low...
    //1043 too high...
    //955 was correct but only by breaking part 1 lol...

    
    function printMap(map)
    {
        return map.map(x => x.join("")).join("\r\n");
    }
    
});