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

    for (var i = 0; i < numbers.length; i++)
    {
        let number = numbers[i];
        if (isFile)
        {
            disk += (fileID.toString()+"|").repeat(number);
            fileID++;
        }
        else
        {
            disk += ".|".repeat(number);
        }

        isFile = !isFile;
    }
    disk = disk.substring(0, disk.length-1).split("|");
    console.log({disk});

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

    function checksum(disk)
    {
        return disk.map((char, index) => char == "." ? 0 : index*parseInt(char)).reduce((a, b) => a+b, 0);

    }
});