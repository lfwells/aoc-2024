export const sum = function(arr)
{
    return arr.reduce((prev,curr) => prev+curr);
}
export const multiply = function(arr)
{
    return arr.reduce((prev,curr) => prev*curr, 1);
}
export const sortProperty = function(arr, predicate)
{
    return arr.sort((a,b) => predicate(b) - predicate(a));
}
export const parseInts = function(arr)
{
    return arr.map(n => parseInt(n));
}


export const mod = function(n, m) {
  //console.log(typeof(n), n)
  //console.log(typeof(m), m)
  return ((n % m) + m) % m;
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
export const isSuperset = function(set, subset) {
    for (const elem of subset) {
      if (!set.has(elem)) {
        return false;
      }
    }
    return true;
  }
  
  export const union = function(setA, setB) {
    const _union = new Set(setA);
    for (const elem of setB) {
      _union.add(elem);
    }
    return _union;
  }
  
  export const intersection = function(setA, setB) {
    const _intersection = new Set();
    for (const elem of setB) {
      if (setA.has(elem)) {
        _intersection.add(elem);
      }
    }
    return _intersection;
  }
  
  export const symmetricDifference = function(setA, setB) {
    const _difference = new Set(setA);
    for (const elem of setB) {
      if (_difference.has(elem)) {
        _difference.delete(elem);
      } else {
        _difference.add(elem);
      }
    }
    return _difference;
  }
  
  export const difference = function(setA, setB) {
    const _difference = new Set(setA);
    for (const elem of setB) {
      _difference.delete(elem);
    }
    return _difference;
  }

  //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  export const shuffle = function(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

  // https://stackoverflow.com/questions/43241174/javascript-generating-all-combinations-of-elements-in-a-single-array-in-pairs
  export const combinationN = function* (array, n) {
    if (n === 1) {
      for (const a of array) {
        yield [a];
      }
      return;
    }
  
    for (let i = 0; i <= array.length - n; i++) {
      for (const c of combinationN(array.slice(i + 1), n - 1)) {
        yield [array[i], ...c];
      }
    }
  }