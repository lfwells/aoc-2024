import run from "./boilerplate.js";

run(4, (input) => 
{
    var directions = [
        {x: 0, y: 1},
        {x: 1, y: 0},
        {x: 0, y: -1},
        {x: -1, y: 0},
        //diag
        {x: 1, y: 1},
        {x: 1, y: -1},
        {x: -1, y: 1},
        {x: -1, y: -1}
    ];
    function searchDir(x,y,dir,len)
    {
        if (x < 0 || x >= width || y < 0 || y >= lines.length)
        {
            return;
        }
        var word = xy(x,y);
        for (var i = 0; i < len-1; i++)
        {
            x+=dir.x;
            y+=dir.y;
            if (x < 0 || x >= width || y < 0 || y >= lines.length)
            {
                return;
            }
            word += xy(x,y);
        }
        return word;
    }

    var lines = input.split("\r\n").map(l =>l.split(""));
    var width = lines[0].length;
    function xy(x,y) { return lines[y][x]; }

    //part 1
    //find all the X stating positions, then use all the directions and search
    var count = 0;
    for (var x = 0; x < width; x++)
    {
        for (var y = 0; y < lines.length; y++)
        {
            var l = xy(x,y);
            if (l == "X")
            {                
                count += directions.map(dir => searchDir(x,y,dir,4)).filter(w => w == "XMAS").length;
            }
        }
    }
    console.log({part1:count});
    
    //part 2
    //a bit ugly, used searchDir when something more specific could have probably done this
    count = 0;
    for (var x = 0; x < width; x++)
    {
        for (var y = 0; y < lines.length; y++)
        {
            var l = xy(x,y);
            if (l == "A")
            {
                var a = searchDir(x-1,y-1,{x:1,y:1},3);
                var b = searchDir(x-1,y+1,{x:1,y:-1},3);
                var found = a == "MAS" || a == "SAM";
                found &= b == "MAS" || b == "SAM";
                if (found)
                {
                    count++;
                }
            }
        }
    }
    console.log({part2:count});
    
    
});