import run from "./boilerplate.js";

run(6, (input) => 
{
    //code goes here
    let map = input.split("\r\n").map(x => x.split(""));
    console.log({map});

    let height = map.length;
    let width = map[0].length;

    let guard = {};
    for (var y = 0; y < height; y++)
    {
        for (var x = 0; x < width; x++)
        {
            let c = map[y][x];
            if (c != "." && c != "#")
            {
                //found the guard
                map[y][x] = ".";
                guard.x = x; guard.y = y;
            }
        }
    }
    console.log({guard});

    function tryMaze(startPos, map, obstacle)
    {
        let guard = {x: startPos.x, y: startPos.y}; //a copy here, useful
        //deep copy map 
        map = map.map(x => x.slice());

        if (obstacle) 
        {
            map[obstacle.y][obstacle.x] = "#";
            if (obstacle.x == startPos.x && obstacle.y == startPos.y) return {visited: new Set(), loop: false};
        }
        
        function moveGuard(guard, map, dir)
        {
            let x = guard.x + dir.x;
            let y = guard.y + dir.y;
            if (x < 0 || x >= width || y < 0 || y >= height) return {guard, dir, outOfBounds: true};
            let c = map[y][x];
            if (c == "#") return { guard, dir: rot90(dir), outOfBounds: false };
            guard.x = x;
            guard.y = y;
            return { guard, dir, outOfBounds: false };
        }

        function rot90(dir)
        {
            return { x: -dir.y, y: dir.x }; //copilot, magic? :)
        }

        function isLoop(guard, visited, dir,  startPos, positionDirPairs)
        {
            //this check doesn't work because loop may not include the the startpos
            //return dir.x == 0 && dir.y == -1 && startPos.x == guard.x && startPos.y == guard.y;
            //insted, check if we have been in this position before with this direction
            return positionDirPairs.has(guard.x+","+guard.y+","+dir.x+","+dir.y);
        }

        let visited = new Set();
        let positionDirPairs = new Set(); //for part 2... dont know if this is best solution or not
        let dir = {x: 0, y: -1};//start facing up (always?)
        let outOfBounds = false;
        do
        {
            ({guard, dir, outOfBounds} = moveGuard(guard, map, dir));
            
            if (!outOfBounds && isLoop(guard, visited, dir, startPos, positionDirPairs))
            {
                //console.log({positionDirPairs, guard, dir});
                //console.log(debugMapWithVisited(map, visited, guard));
                //console.log({guard});
                //console.log({visited});
                //console.log("loop");
                return {visited, loop: true};
            }
            visited.add(guard.x+","+guard.y);
            positionDirPairs.add(guard.x+","+guard.y+","+dir.x+","+dir.y);

        }
        while (!outOfBounds);

        return {visited, loop: false};
    }

    let {visited, _} = tryMaze(guard, map, null);
    let count = visited.size+1;//+1? ugh lol
    console.log({part1: count});
    console.log(debugMapWithVisited(map, visited, guard));    

    //for part 2, try putting an obstacle in each of the visited spots, and do the whole thing again
    let loopCount = 0;
    for (var v of visited)
    {
        let [x, y] = v.split(",").map(x => parseInt(x));
        let obstacle = {x, y};
        console.log({obstacle});
        let {visited, loop} = tryMaze(guard, map, obstacle);
        console.log({vv:visited.size, loop});
        if (loop)
        {
            loopCount++;
        }
    }
    console.log({part2: loopCount});

    function debugMapWithVisited(map, visited, guard)
    {
        let debug = map.map(x => x.slice());
        for (var v of visited)
        {
            let [x, y] = v.split(",").map(x => parseInt(x));
            debug[y][x] = "o";
        }
        debug[guard.y][guard.x] = "G";
        return debug.map(x => x.join("")).join("\r\n");
    }
    
});