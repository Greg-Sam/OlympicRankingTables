// const axios = require('axios')

// const { TableRow } = require("@material-ui/core")

async function getPools() {
  let gender = 'men'
  // let menButton = document.getElementById('mensButton')
  // let womenButton = document.getElementById('womensButton')
  // menButton.onClick = function() { 
  //   gender = 'men'
  //   console.log(gender)
  // }
  // womenButton.onClick = function() {
  //   gender = 'women'
  //   console.log(gender)
  // }

  // console.log(gender)
  await axios.get('https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/olympicpools-lijdw/service/olympic-pools-api/incoming_webhook/webhook0')
    .then(async (res) => {
      let pools = res.data
      pools.sort((a, b) => a.pool > b.pool && 1 || -1)


      let mA = pools[0]
      let mB = pools[1]
      let mC = pools[2]
      let mD = pools[3]
      let mE = pools[4]
      let mF = pools[5]
      let wA = pools[6]
      let wB = pools[7]
      let wC = pools[8]
      let wD = pools[9]
      let wE = pools[10]
      let wF = pools[11]


      let pool = wC
      console.log(pool)
      let letter = pool.pool.slice(-1)
      let sex = pool.pool.slice(0, 1)
      console.log(sex)
      let label = ''
      if (sex === 'm') {
        label = `Men's Pool ${letter}`
      } else {
        label = `Women's Pool ${letter}`
      }
      document.getElementById("poolLabel").innerHTML = label

      pool.teams.map(team => {
        let lowerFlag = team.nationality.toLowerCase()
        let flag = `https://flagcdn.com/w40/${lowerFlag}.png`
        let row = document.createElement('tr')
        row.className = 'table-primary'
        row.id = team.teamNo
        row.innerHTML = `<tr > 
        <td>${team.teamName}</td>
        <td><img src="${flag}" alt="${team.nationality}"></td>
        <td>${team.matchWins.$numberInt}-${team.matchLosses.$numberInt}</td>
        <td>${team.setWins.$numberInt}-${team.setLosses.$numberInt}</td>
        <td>${team.pointsFor.$numberInt}-${team.pointsAgainst.$numberInt}</td>
    
        </tr>`
        document.getElementById('teamRow').append(row)
      })

      //    let lowerFlag1 = pool.team1Nationality.toLowerCase()
      //    let flag = `https://flagcdn.com/w40/${lowerFlag}.png`
      //    let row = document.createElement('tr')
      //    row.className = 'table-primary'
      //    row.id = `mens${letter}`


    })
    .catch(err => console.error(err))
}

getPools()