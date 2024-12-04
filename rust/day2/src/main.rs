use std::fs;

fn main() {
    let contents =
        fs::read_to_string("../../day2.input").expect("Should have been able to read the file");

    println!("{contents}");

    //read the file and split it into lines and then split the lines into words
    let lines = contents.lines().into_iter();
    let words = lines
        .map(|line| line.split_whitespace())
        .map(|v| v.map(|n| n.parse::<i32>().unwrap()).collect::<Vec<_>>())
        .into_iter();

    fn safe<I>(arr: I) -> i32
        where 
            I: IntoIterator<Item = i32> + Clone
    {
        return if 
            arr.clone().into_iter().reduce(|prev, curr| if prev == -1 { -1 } else { if (curr - prev) >= 1 && (curr - prev) <= 3 { curr } else { -1 } }).unwrap() != -1 //increasing
            ||
            arr.clone().into_iter().reduce(|prev, curr| if prev == -1 { -1 } else { if (prev - curr) >= 1 && (prev - curr) <= 3 { curr } else { -1 } }).unwrap() != -1 //decreasing;
            { 1 } else { 0 }; //this result of 1 or 0 makes it easier to just count the number of safe reports in the next step
    }

    let safe_count = words.clone().map(safe).reduce(|acc, curr| acc+curr ).unwrap();
    println!("Part 1: {:?}", safe_count);

    fn allCombinations<I>(arr: I) -> Vec<Vec<i32>>
        where 
            I: IntoIterator<Item = i32> + Clone
    {
        let len = arr.clone().into_iter().size_hint().0;
        println!("ORIG {:?}", arr.clone().into_iter().collect::<Vec<_>>());
        //create a bunch of copies of arr, each with the element at position n removed
        let mut n = 0;
        return std::iter::from_fn(move || {
            n+=1;
            if n > len {
                return None;
            }
            //this part i needed ai, as I didn't know how to use chain yet
            //I also don't know why this needs to be wrapped in Some (I guess its the from_fn needs to do None/Some)
            //I also don't know if the many clones here are dangerous/expensive
            let r = Some(arr.clone().into_iter().take(n-1).chain(arr.clone().into_iter().skip(n)).collect::<Vec<_>>());
            println!("{:?}", r);
            return r;

            //here was my attempt with a skip of 1 but didn't work
            //return Some(arr.clone().into_iter().take(n-1).skip(1).take(len).collect::<Vec<_>>());
        }).collect::<Vec<_>>()
    }
    fn anySafeCombination<I>(arr: I) -> i32
        where  
            I: IntoIterator<Item = Vec<i32>> + Clone
    {
        return arr.clone().into_iter().map(safe).reduce(|acc, curr| acc+curr).unwrap().signum(); //returning 1 or 0 here
    }

    let safe_count = words.clone().map(allCombinations).map(anySafeCombination).reduce(|acc, curr| acc+curr ).unwrap();
    println!("Part 2: {:?}", safe_count);
}
