async function getMenRankings() {

  await axios.get('https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/olympicrankings-kinaz/service/menolympicrankingsapi/incoming_webhook/api?secret=sEcrEt')
    .then(async (res) => {
      let menRanks = res.data
      let i = 1
      let score = 0
      let countries = {}
      menRanks.map(team => {

        // check if in top two countries
        let country = team.country
        if ((`${country}` in countries)) {
          countries[`${country}`]++
        } else {
          countries[`${country}`] = 1
        }

        if (team.special === undefined) {
          // Teams not qualified through WC or OQT
          if (countries[`${country}`] > 2) {
            // teams outside of country's top 2 
            let lowerFlag = team.flag.toLowerCase()
            let flag = `https://flagcdn.com/w40/${lowerFlag}.png`
            let row = document.createElement('tr')
            row.className = 'table-danger'
            row.innerHTML = `<tr class="table-dark"> 
        <td>CQ</td>
        <td><img src="${flag}" alt="${team.country}"></td>
        <td>${team.name}</td>
        <td>${team.olympicPoints.$numberInt}</td>
        <td>${team.lowestCounted.$numberInt}</td>
        <td>${team.noOfTournaments.$numberInt}</td>
        </tr>`
            document.getElementById('teamRow').append(row)
          }
          else {
            console.log(team.olympicPoints.$numberInt)
            console.log(score)
            if (score === team.olympicPoints.$numberInt) {

              // tied team in country's top 2 
              if (i <= 15) {
                // teams in top 15
                i = i - 1
                let lowerFlag = team.flag.toLowerCase()
                let flag = `https://flagcdn.com/w40/${lowerFlag}.png`
                let row = document.createElement('tr')
                row.className = 'table-primary'
                row.innerHTML = `<tr class="table-dark"> 
        <td>#${i}</td>
        <td><img src="${flag}" alt="${team.country}"></td>
        <td>${team.name}</td>
        <td>${team.olympicPoints.$numberInt}</td>
        <td>${team.lowestCounted.$numberInt}</td>
        <td>${team.noOfTournaments.$numberInt}</td>
        </tr>`
                i = i + 2
                document.getElementById('teamRow').append(row)
                score = team.olympicPoints.$numberInt
              }
              else {
                // tied team outside of top 15
                i = i - 1
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
                i = i + 2
                document.getElementById('teamRow').append(row)
                score = team.olympicPoints.$numberInt
              }
            } else {
              // not tied team in country's top 2 
              if (i <= 15) {
                // teams in top 15

                let lowerFlag = team.flag.toLowerCase()
                let flag = `https://flagcdn.com/w40/${lowerFlag}.png`
                let row = document.createElement('tr')
                row.className = 'table-primary'
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
                score = team.olympicPoints.$numberInt
              }
              else {
                //  not tied team outside of top 15

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
                score = team.olympicPoints.$numberInt
              }
            }

          }
        }
        else {
          // teams qualified through WC or OQT
          let lowerFlag = team.flag.toLowerCase()
          let flag = `https://flagcdn.com/w40/${lowerFlag}.png`
          let row = document.createElement('tr')
          row.className = 'table-success'
          row.innerHTML = `<tr class="table-dark"> 
        <td>${team.special}</td>
        <td><img src="${flag}" alt="${team.country}"></td>
        <td>${team.name}</td>
        <td>${team.olympicPoints.$numberInt}</td>
        <td>${team.lowestCounted.$numberInt}</td>
        <td>${team.noOfTournaments.$numberInt}</td>
        </tr>`

          document.getElementById('teamRow').append(row)
          score = team.olympicPoints.$numberInt
        }

      })
    }
    )
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