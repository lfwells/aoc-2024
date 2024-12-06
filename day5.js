import run from "./boilerplate.js";
import { sum, shuffle } from "./utils.js";

run(5, (input) => 
{
    //code goes here
    let [rules,reports] = input.split("\n\n");
    rules = rules.split("\n").map(x => x.split("|").map(n => parseInt(n)));
    reports = reports.split("\n").map(l => l.split(",").map(n => parseInt(n)));

    let mustBeAfter = {};
    rules.forEach(rule => {
        let key = rule[0];
        if (mustBeAfter[key] === undefined) mustBeAfter[key] = [];
        mustBeAfter[key].push(rule[1]);
    });
    console.log({rules,reports, mustBeAfter});
    
    
    function mapToBefores(report)
    {
        let result = {};
        let befores = [];
        for (let i = 0; i < report.length; i++)
        {
            result[report[i]] = [...befores];//makes a copy of befores at this point
            befores.push(report[i]);
        }
        return result;
    }
    function getValidReports(reports)
    {
        let befores = reports.map(mapToBefores);
        //console.log({befores:JSON.stringify(befores)});
        let validNumbers = befores.map(report => Object.entries(report).map(([number,before]) => mustBeAfter[number] == undefined || mustBeAfter[number].every(n => !before.includes(n))));   
        //console.log({validNumbers});
        let valid = validNumbers.map(v => v.reduce((a,b) => a && b, true));
        //console.log({valid});
        
        let validReports = reports.filter((_,i) => valid[i]);
        //console.log({validReports});
        return [validReports, valid, validNumbers];
    }
    
    let [validReports, valid] = getValidReports(reports);
    let middles = validReports.map(report => report[(report.length-1) / 2]);
    console.log({middles});
    console.log({part1: sum(middles)});

    let invalidReports = reports.filter((_,i) => !valid[i]);
    console.log({invalidReports});

    for (var i = 0; i < invalidReports.length; i++)
    {
        var v = false;
        while (v == false)
        {
            //too slow
            //shuffle(invalidReports[i]);

            

            let reports = [invalidReports[i]];
            let [[validReport], [valid], [validNumbers]] = getValidReports(reports);

            console.log({validReport, valid, validNumbers});
            break;
            
            if (valid)
            {
                console.log({i,validReport, valid});
                v = valid;
            }
            else
            {
                //console.log(invalidReports[i].join(","));
            }
        }
        console.log({nowValid:invalidReports[i]});

    }

    middles = invalidReports.map(report => report[(report.length-1) / 2]);
    console.log({middles});
    console.log({part2: sum(middles)});
});