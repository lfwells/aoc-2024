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

    let safe_count = words.map(safe).reduce(|acc, curr| acc+curr ).unwrap();
    println!("{:?}", safe_count);
}
