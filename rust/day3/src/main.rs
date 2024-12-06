use std::fs;

fn main() {
    let contents =
        fs::read_to_string("../../day3.input").expect("Should have been able to read the file");

    println!("{contents}");

    //read the file and split it into lines and then split the lines into words
    let tokens = contents
        .split("mul(")
        .map(|t| {
            t.split(")")
                .next()
                .unwrap()
                .split(",")
                .map(|n| n.parse::<i32>())
        })
        .filter(|r| r.clone().count() == 2 && r.clone().all(|n| n.is_ok()))
        .map(|r| r.map(|n|n.unwrap()))
        .map(|r| r.reduce(|acc,curr|(acc*curr)).unwrap())
        .sum::<i32>();
        
    println!("{:?}", tokens);
}
