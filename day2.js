import run from "./boilerplate.js";

run(2, (input) => 
{
    //part 1, use a reducer to check if the difference between each element is between 1 and 3
    //only complexity is that we need to check this in decreasing and increasing order
    //some other way to do this would have been to reverse the array and check the same thing
    let increasing = (prev,curr) => prev === false ? false : ((curr - prev) >= 1 && (curr - prev) <= 3) ? curr : false;
    let decreasing = (prev,curr) => prev === false ? false : ((prev - curr) >= 1 && (prev - curr) <= 3) ? curr : false;
    let safe = x => x.reduce(increasing) || x.reduce(decreasing);
    let part1 = input.split("\r\n").map(x => x.split(" ")).map(safe).filter(x => x !== false).length;
    console.log({part1});

    //part 2, just brute force the same "algorithm" on all combinations of missing one element lol
    let createPossibleCombinations = (report) => {
        let combos = [];
        for (var i = 0; i < report.length; i++) {
            //get all elements except i
            let combo = report.filter((x, index) => index !== i); 
            combos = combos.concat([combo]);
            
        }
        return combos;
    } 
    let anySafeCombination = combinations => combinations.map(safe).reduce((prev, curr) => prev || curr, false);
    let part2 = input.split("\r\n").map(x => x.split(" ")).map(createPossibleCombinations).map(anySafeCombination).filter(x => x !== false).length;
    
    console.log({part2});
});