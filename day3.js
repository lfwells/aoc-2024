import run from "./boilerplate.js";
import { sum } from "./utils.js";

run(3, (input) => 
{
    //part 1 is easy, find all the instances mul( then find matching end brackets, look for a comma (using split) and check data is sensible
    var part1 = sum(input.split("mul(").map(x => x.split(")")[0].split(",")).filter(x => x.length == 2 && !isNaN(x[0]) && !isNaN(x[1]) && x[0].indexOf(" ") == -1 && x[1].indexOf(" ") == -1).map(x => parseInt(x[0]) * parseInt(x[1])));
    console.log({part1});

    //part 2 is a bit harder, reducer has a bit of logic, and finding DO DON'T messes with the previous trick for catching commas
    //but a new trick using endsWith emerges ;)
    var DO = true;
    function handleMultsDontsAndDos(acc,curr) {
        if (curr == "DONT")
        {
            DO = false;
            return acc;
        }
        if (curr == "DO")
        {
            DO = true;
            return acc;
        }
        if (DO == false)
        {
            return acc;
        }
        var x = curr.split(",");
        if (x.length != 2 || isNaN(x[0]) || isNaN(x[1]) || x[0].indexOf(" ") != -1 || x[1].indexOf(" ") != -1 || x[0].length == 0 || x[1].length == 0)
        {
            return acc;
        }
        //console.log({acc, curr, x});
        return acc + (parseInt(x[0]) * parseInt(x[1]));

    }
    var part2 = input.split("mul(").map(x => x.split(")").map(y => y.endsWith("don't(") ? "DONT" : y.endsWith("do(") ? "DO" : y)).flat().reduce(handleMultsDontsAndDos, 0);//.filter(x => x.length == 2 && !isNaN(x[0]) && !isNaN(x[1]) && x[0].indexOf(" ") == -1 && x[1].indexOf(" ") == -1).map(x => parseInt(x[0]) * parseInt(x[1]));
    console.log({part2});
});