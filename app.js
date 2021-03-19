async function getMenRankings() {

  await axios.get('https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/olympicrankings-kinaz/service/menolympicrankingsapi/incoming_webhook/api?secret=sEcrEt')
    .then(async (res) => {
      let menRanks = res.data
      console.log(menRanks)
      let i = 1
      menRanks.map(team => {
        let lowerFlag = team.flag.toLowerCase()
        let flag = `https://flagcdn.com/w40/${lowerFlag}.png`
        let row = document.createElement('tr')
        row.className = 'table-dark'
        row.innerHTML = `<tr class="table-dark"> 
        <td>#${i}</td>
        <td><img src="${flag}" alt="${team.country}"></td>
        <td>${team.name}</td>
        <td>${team.olympicPoints.$numberInt}</td>
        <td>${team.lowestCounted.$numberInt}</td>
        <td>${team.noOfTournaments.$numberInt}</td>
        </tr>`
        i++
        document.getElementById('teamRow').append(row)
        console.log('added a row')
      })
    })
    .catch(err => console.error(err))
}
getMenRankings()

// var tr = "<tr>";
// tr += "<td>" + posts_array[i][0] + "</td>";
// tr += "<td>" + posts_array[i][1] + "</td>";
// tr += "<td>" + posts_array[i][2] + "</td>";
// tr += "<td>" + posts_array[i][3] + "</td>";
// tr += "</tr>";

/* <th scope = "row" id = "rank" ></ >
<td id="flag">Mark</td>
<td id="name">Otto</td>
<td id="olympicPoints">@mdo</td>
<td id="lowestCounted">@mdo</td>
<td id="noOfTournaments">@mdo</td> */