rank = ''
numbers = [2, 3, 5, 9, 1, 4, 3]

for (let i = 0; i < numbers.length; i++) {
number = numbers[i]
console.log(number)
  switch (number) {
    case 1:
      rank = "1st"
      break;
    case 2:
      rank = "2nd"
      break;
    case 3:
      rank = "3rd"
      break;
    case 4:
      rank = "4th"
      break;
    case 5:
      rank = "5th"
      break;
    case 9:
      rank = "9th"
      break;
    case 17:
      rank = "17th"
      break;
    case 23:
      rank = "23rd"
      break;
    default:
      break;
  }
  console.log(rank)
}
