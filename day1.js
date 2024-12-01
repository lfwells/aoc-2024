import run from "./boilerplate.js";
import { sum } from "./utils.js";

run(1, (input) => 
{
    //part 1 (sort two lists, map the difference, sum it)
    var lines = input.split("\n");
    lines = lines.map(l => l.split(" ").map(n => parseInt(n)).filter(n => !isNaN(n)));

    var one = lines.map(l => l[0]).sort();
    var two = lines.map(l => l[1]).sort();

    var pairs = one.map((n,i) => Math.abs(n - two[i]));
    var part1 = sum(pairs);
    console.log({part1});
    
    //part 2 (for each number in list one, iterate list two, adding to a tally only if the number found is the same)
    //could be optimized since lists are sorted
    var similarity = one.map(n => two.reduce((acc, cur) => cur == n ? cur+acc : acc, 0));
    var part2 = sum(similarity);
    console.log({part2});
});