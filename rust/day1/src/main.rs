use std::fs;

fn main() {
    let contents = fs::read_to_string("../../day1.input")
        .expect("Should have been able to read the file");

    println!("{contents}");

    //read the file and split it into lines and then split the lines into words
    let lines = contents.lines().into_iter();
    let words = lines
        .map(|line| line.split_whitespace())
        .map(|v| v.map(|n| n.parse::<i32>().unwrap())
        .collect::<Vec<_>>())
        .into_iter();
 
    //split the two columns into separate vectors and sort them
    let mut one = words
        .clone()
        .map(|v| v[0])
        .into_iter()
        .collect::<Vec<_>>();
    one.sort();

    let mut two = words
        .clone()
        .map(|v| v[1])
        .into_iter()
        .collect::<Vec<_>>();
    two.sort();

    //use zip to iterate over one and two at the same time, then map the difference between the two values
    let differences = one
        .clone()
        .into_iter()
        .zip(two.clone().into_iter())
        .map(|pair| (pair.0-pair.1)
        .abs())
        .collect::<Vec<_>>();

    //sum the differences for part 1 solution
    let differencesSum = differences.iter().fold(0, |acc, x| acc + x);
    println!("{:?}", differencesSum);

    //part 2
    let similarity = one
        .into_iter()
        .map(|number| two
            .clone()
            .iter()
            .fold(0, |acc,x| if number == *x {acc+number} else {acc})
        )
        .collect::<Vec<_>>();
    
        println!("{:?}", similarity);
        
    //sum the similarity for part 2 solution
    let similaritySum = similarity.iter().fold(0, |acc, x| acc + x);
    println!("{:?}", similaritySum);

    /*let lines = contents.lines().map(|line|line.split_ascii_whitespace().collect::<Vec<&str>>()).into_iter();
    println!("{:#?}", lines);
    let one = lines.map(|line|line.get(0));//.into_iter().intersperse(" ").collect::<String>();
    let two = lines.map(|line|line.get(1));//.into_iter().intersperse(" ").collect::<String>();
    println!("{:#?}", one);
    println!("{:#?}", two);
    */
}