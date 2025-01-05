import run from "./boilerplate.js";
import {parseInts, sum} from "./utils.js";

run(7, (input) => 
{
    //code goes here
    let lines = input.split("\r\n").map(l => l.split(": ").map(x => parseInts(x.split(" "))));
    
    function evaluate(line, ops)
    {
        let target = line[0];
        let nums = line[1];
        let sum = nums[0];
        for (var i = 1; i < nums.length; i++)
        {
            var a = nums[i];
            if (ops[i-1] == "+")
            {
                sum += a;
            }
            else if (ops[i-1] == "*")
            {
                sum *= a;
            }
            else if (ops[i-1] == "|")
            {
                sum = parseInt(`${sum}${a}`);
            }
        }
        //console.log({sum, target, ops});
        return sum == target ? sum : 0;
    }
    function combinations(line)
    {
        let sum = 0;
        let count = line[1].length-1;
        for (var i = 0; i < Math.pow(3, count); i++)
        {
            let bin = i.toString(3).padStart(count, "0");
            let op = bin.split("").map(b => b == "1" ? "+" : b == "2" ? "*" : "|");    
                    
            let e = evaluate(line, op);
            if (e > 0)
            {
                sum = e;
                break;
            }
            
        }
        return sum;
    }

    let s = sum(lines.map(combinations));
    console.log({part1:s});
    

    
});