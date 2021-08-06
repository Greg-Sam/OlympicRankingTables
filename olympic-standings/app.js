// const axios = require('axios')

// const { TableRow } = require("@material-ui/core")

let mA = []
let mB = []
let mC = []
let mD = []
let mE = []
let mF = []
let wA = []
let wB = []
let wC = []
let wD = []
let wE = []
let wF = []
let thirds = []

compareThirds = (gender) => {
  thirds = []
  console.log(gender)
  if (gender == 'm') {
    thirds.push(mA.teams[2], mB.teams[2], mC.teams[2], mD.teams[2], mE.teams[2], mF.teams[2])
  } else {
    thirds.push(wA.teams[2], wB.teams[2], wC.teams[2], wD.teams[2], wE.teams[2], wF.teams[2])
  }

  thirds.sort((a, b) => a.pointsFor.$numberInt / a.pointsAgainst.$numberInt < b.pointsFor.$numberInt / b.pointsAgainst.$numberInt ? 1 : -1)
  thirds.sort((a, b) => a.setWins.$numberInt / a.setLosses.$numberInt > b.setWins.$numberInt / b.setLosses.$numberInt ? 1 : -1)
  thirds.sort((a, b) => a.matchPoints.$numberInt < b.matchPoints.$numberInt ? 1 : -1)

  console.log(thirds)
  document.getElementById('teamRow').innerHTML = ''
  thirds.map(team => {
    let lowerFlag = team.nationality.toLowerCase()
    let flag = `https://flagcdn.com/w40/${lowerFlag}.png`
    let row = document.createElement('tr')
    row.className = 'table-primary'
    row.id = team.teamNo.$numberInt
    row.innerHTML = `<tr > 
        <td>${team.teamName}</td>
        <td><img src="${flag}" alt="${team.nationality}"></td>
        <td>${team.matchWins.$numberInt}-${team.matchLosses.$numberInt}</td>
        <td>${team.setWins.$numberInt}-${team.setLosses.$numberInt}</td>
        <td>${team.pointsFor.$numberInt}-${team.pointsAgainst.$numberInt}</td>
    
        </tr>`
    document.getElementById('teamRow').append(row)
  })
}

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


      mA = pools[0]
      mB = pools[1]
      mC = pools[2]
      mD = pools[3]
      mE = pools[4]
      mF = pools[5]
      wA = pools[6]
      wB = pools[7]
      wC = pools[8]
      wD = pools[9]
      wE = pools[10]
      wF = pools[11]


      let pool = mA
      console.log(pool)
      let letter = pool.pool.slice(-1)
      let sex = pool.pool.slice(0, 1)
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
        row.id = team.teamNo.$numberInt
        row.innerHTML = `<tr > 
        <td>${team.teamName}</td>
        <td><img src="${flag}" alt="${team.nationality}"></td>
        <td>${team.matchWins.$numberInt}-${team.matchLosses.$numberInt}</td>
        <td>${team.setWins.$numberInt}-${team.setLosses.$numberInt}</td>
        <td>${team.pointsFor.$numberInt}-${team.pointsAgainst.$numberInt}</td>
    
        </tr>`
        document.getElementById('teamRow').append(row)
      })


    })
    .catch(err => console.error(err))
}

getPools()


emptyPool = () => {
  document.getElementById('teamRow').innerHTML = ''
}

loadPool = (poolToLoad) => {
  emptyPool()
  let pool = poolToLoad
  console.log(pool)
  let letter = pool.pool.slice(-1)
  let sex = pool.pool.slice(0, 1)
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
    row.id = team.teamNo.$numberInt
    row.innerHTML = `<tr > 
        <td>${team.teamName}</td>
        <td><img src="${flag}" alt="${team.nationality}"></td>
        <td>${team.matchWins.$numberInt}-${team.matchLosses.$numberInt}</td>
        <td>${team.setWins.$numberInt}-${team.setLosses.$numberInt}</td>
        <td>${team.pointsFor.$numberInt}-${team.pointsAgainst.$numberInt}</td>
    
        </tr>`
    document.getElementById('teamRow').append(row)
  })
}




document.getElementById('mA').addEventListener('click', function () { loadPool(mA) })
document.getElementById('mB').addEventListener('click', function () { loadPool(mB) })
document.getElementById('mC').addEventListener('click', function () { loadPool(mC) })
document.getElementById('mD').addEventListener('click', function () { loadPool(mD) })
document.getElementById('mE').addEventListener('click', function () { loadPool(mE) })
document.getElementById('mF').addEventListener('click', function () { loadPool(mF) })
document.getElementById('wA').addEventListener('click', function () { loadPool(wA) })
document.getElementById('wB').addEventListener('click', function () { loadPool(wB) })
document.getElementById('wC').addEventListener('click', function () { loadPool(wC) })
document.getElementById('wD').addEventListener('click', function () { loadPool(wD) })
document.getElementById('wE').addEventListener('click', function () { loadPool(wE) })
document.getElementById('wF').addEventListener('click', function () { loadPool(wF) })
document.getElementById('m3').addEventListener('click', function () { compareThirds('m') })
document.getElementById('w3').addEventListener('click', function () { compareThirds('w') })


async function populateModal(matchResults) {
  console.log('The Button Works')
}

function openModal(matchResults) {
}

function closeModal() {
  document.getElementById("backdrop").style.display = "none"
  document.getElementById("matchResultsModal").style.display = "none"
  document.getElementById("matchResultsModal").className += document.getElementById("matchResultsModal").className.replace("show", "")
}

// Get the modal
var modal = document.getElementById('matchResultsModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal || event.target.class == "close") {
    closeModal()
  }
}


async function displayResults(res) {
  let tournamentList = res.data
  openModal(tournamentList)
}


async function getTournaments(teamNo) {
  await axios.get(`https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/olympicrankingswomen-amjnt/service/team_results/incoming_webhook/team_results?teamNo=${teamNo}`)
    .then(async (res) => {
      displayResults(res)
    }
    )
}

document.addEventListener('click', event => {
  var target = event.target
  parent = target.parentElement
  console.log(parent.id)
  if (parent.id > 0) {
    getTournaments(parent.id)
  }

})