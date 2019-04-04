//     getTopCharacter([
// 	  { name: 'Kim', scores: [56, 85, 93] },
// 	  { name: 'Boris', scores: [56, 65, 54] },
// 	  { name: 'Donald', scores: [96, 95, 91] }
//      ]) === 'Donald';

{
    function AdultsInGroup(people) {
        return people.find(callbackFunction)
    }
    
    const group = [
        {name: 'Bobby', age: 13}, 
        {name: 'Arabella', age: 7}, 
        {name: 'George', age: 44}, 
        {name: 'Eva', age: 40}
    ];
    
    AdultsInGroup(group);
}

function getTopCharacter(people) {
  let arrayWithAverages = arrayWithAverages(people);

  let counter = 0;
  let winner = {};
  for (let obj in arrayWithAverages) {
    let roundWinner = arrayWithAverages.find((person, obj) => {
      return person.scores > counter;
    });

    if (roundWinner.scores > winner.scores) {
      winner = roundWinner;
    }
  }

  return winner.name;
}


function calculateAverage(array) {
    let average = array.reduce((number1, number2) => {
      return number1 + number2;
    });
    return average;
  }
  
  function arrayWithAverages(array) {
    let arrayWithAverages = array.map(obj => {
      obj.scores = calculateAverage(obj.scores);
      return obj;
    });
    return arrayWithAverages;
  }
  