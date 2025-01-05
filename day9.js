import run from "./boilerplate.js";
import { parseInts } from "./utils.js";

run(9, (input) => 
{
    //code goes here
    let numbers = parseInts(input.split(""));
    console.log(numbers);

    let disk = "";
    let fileID = 0;
    let isFile = true;

    //for part 2...
    let files = [];
    let free = [];
    let block = 0;
    for (var i = 0; i < numbers.length; i++)
    {
        let number = numbers[i];
        if (isFile)
        {
            disk += (fileID.toString()+"|").repeat(number);
            files.push({block,number});
            fileID++;
        }
        else
        {
            disk += ".|".repeat(number);
            free.push({block,number});
        }

        isFile = !isFile;
        block += number;
    };
    disk = disk.substring(0, disk.length-1).split("|");
    let disk2 = [...disk];
    console.log({disk, files, free});

    function swapArr(arr, i, j)
    {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    function lastIndexNotADot(disk)
    {
        for (var i = disk.length-1; i >= 0; i--)
        {
            if (disk[i] != ".")
            {
                return i;
            }
        }
        return -1;
    }

    let i2 = 0;
    let firstIndex = disk.findIndex(c => c == ".");
    while (firstIndex != lastIndexNotADot(disk)+1)
    {
        //get the l
        let lastIndex = lastIndexNotADot(disk);
        swapArr(disk, firstIndex, lastIndex);
        if (i2 % 10000 == 0) console.log({firstIndex, lastIndex});//, disk});
        firstIndex = disk.findIndex(c => c == ".");

        i2++;
    }
    console.log({disk, part1: checksum(disk)});
    //88055642995 is too low!?
    //6154342787400

    for (var i = files.length-1; i>=0; i--)
    {
        var ff = files[i];
        var number = ff.number;
        var pos = ff.block;
        for (var j = 0; j < free.length; j++)
        {
            var f = free[j];
            var number2 = f.number;
            var pos2 = f.block;
            if (number <= number2)//i.e. there is enough space
            {
                for (var k = 0; k < number; k++)
                {
                    disk2[pos+k] = ".";
                    disk2[pos2+k] = i;
                }
                free[j].number -= number;
                free[j].block += number;
                free.push({block: pos, number: number2-number});
                break;
            }
        }
    }
    console.log({disk2, files, free, part2: checksum(disk2)});
    //8318971197991 is too high!?

    function checksum(disk)
    {
        return disk.map((char, index) => char == "." ? 0 : index*parseInt(char)).reduce((a, b) => a+b, 0);
    }
});