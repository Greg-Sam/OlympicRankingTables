// const axios = require('axios')

// const { TableRow } = require("@material-ui/core")

// let mA = []
// let mB = []
// let mC = []
// let mD = []
// let mE = []
// let mF = []
// let wA = []
// let wB = []
// let wC = []
// let wD = []
// let wE = []
// let wF = []
// let thirds = []

// compareThirds = (gender) => {
//   thirds = []
//   console.log(gender)
//   if (gender == 'm') {
//     thirds.push(mA.teams[2], mB.teams[2], mC.teams[2], mD.teams[2], mE.teams[2], mF.teams[2])
//   } else {
//     thirds.push(wA.teams[2], wB.teams[2], wC.teams[2], wD.teams[2], wE.teams[2], wF.teams[2])
//   }

//   thirds.sort((a, b) => a.pointsFor.$numberInt / a.pointsAgainst.$numberInt < b.pointsFor.$numberInt / b.pointsAgainst.$numberInt ? 1 : -1)
//   thirds.sort((a, b) => a.setWins.$numberInt / a.setLosses.$numberInt > b.setWins.$numberInt / b.setLosses.$numberInt ? 1 : -1)
//   thirds.sort((a, b) => a.matchPoints.$numberInt < b.matchPoints.$numberInt ? 1 : -1)

//   console.log(thirds)
//   document.getElementById('teamRow').innerHTML = ''
//   thirds.map(team => {
//     let lowerFlag = team.nationality.toLowerCase()
//     let flag = `https://flagcdn.com/w40/${lowerFlag}.png`
//     let row = document.createElement('tr')
//     row.className = 'table-primary'
//     row.id = team.teamNo.$numberInt
//     row.innerHTML = `<tr > 
//         <td>${team.teamName}</td>
//         <td><img src="${flag}" alt="${team.nationality}"></td>
//         <td>${team.matchWins.$numberInt}-${team.matchLosses.$numberInt}</td>
//         <td>${team.setWins.$numberInt}-${team.setLosses.$numberInt}</td>
//         <td>${team.pointsFor.$numberInt}-${team.pointsAgainst.$numberInt}</td>

//         </tr>`
//     document.getElementById('teamRow').append(row)
//   })
// }
let menTop = []
let menBottom = []
let menFinals = []
let womenTop = []
let womenBottom = []
let womenFinals = []
let activeBracket = []

m1Score = ''
m2Score = ''
m3Score = ''
m4Score = ''
m5Score = ''
m6Score = ''
halfLabel = ''
async function getMatches() {

  await axios.get('https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/olympicpools-lijdw/service/knockout-matches/incoming_webhook/webhook0')
    .then(async (res) => {
      let matches = res.data
      menTop = [matches[38], matches[39], matches[40], matches[41], matches[46], matches[47]]
      menBottom = [matches[42], matches[43], matches[44], matches[45], matches[48], matches[49]]
      menFinals = [matches[50], matches[51], matches[52], matches[53]]
      womenTop = [matches[92], matches[93], matches[94], matches[95], matches[100], matches[101]]
      womenBottom = [matches[96], matches[97], matches[98], matches[99], matches[102], matches[103]]
      womenFinals = [matches[104], matches[105], matches[106], matches[107]]
    })
    .catch(err => console.error(err))

  setBracket = (bracketLocation) => {
    switch (bracketLocation) {
      case 'mTop':
        clearActiveBracket()
        activeBracket = menTop
        halfLabel = `Men's Top Half`
        break;
      case 'mBottom':
        clearActiveBracket()
        activeBracket = menBottom
        halfLabel = `Men's Bottom Half`
        break;
      case 'wTop':
        clearActiveBracket()
        activeBracket = womenTop
        halfLabel = `Women's Top Half`
        break;
      case 'wBottom':
        clearActiveBracket()
        activeBracket = womenBottom
        halfLabel = `Women's Bottom Half`
        break;
      default:
        break;
    }

    document.getElementById("firstColumn").innerText = "First Round"
    document.getElementById("secondColumn").innerText = "Quarterfinals"
    document.getElementById("thirdColumn").innerText = "Semifinals"
    document.getElementById("goldMedal").innerText = ""
    document.getElementById("bronzeMedal").innerText = ""

    let stuff = document.getElementsByClassName("not-finals")
    for (let i = 0; i < stuff.length; i++) {
      const element = stuff[i];
      console.log(element)
      element.classList.remove("remove-bracket-part")
    }

    // set match scores

    if (activeBracket[0].pointsTeamBSet1 === null) { m1Score = 'Match' }
    else if (activeBracket[0].pointsTeamBSet3 === null) {
      m1Score = `(${activeBracket[0].pointsTeamASet1.$numberInt}-${activeBracket[0].pointsTeamBSet1.$numberInt}, ${activeBracket[0].pointsTeamASet2.$numberInt}-${activeBracket[0].pointsTeamBSet2.$numberInt})`
    }
    else { m1Score = `(${activeBracket[0].pointsTeamASet1.$numberInt}-${activeBracket[0].pointsTeamBSet1.$numberInt}, ${activeBracket[0].pointsTeamASet2.$numberInt}-${activeBracket[0].pointsTeamBSet2.$numberInt}, ${activeBracket[0].pointsTeamASet3.$numberInt}-${activeBracket[0].pointsTeamBSet3.$numberInt})` }

    if (activeBracket[1].pointsTeamBSet1 === null) { m2Score = 'Match' }
    else if (activeBracket[1].pointsTeamBSet3 === null) {
      m2Score = `(${activeBracket[1].pointsTeamASet1.$numberInt}-${activeBracket[1].pointsTeamBSet1.$numberInt}, ${activeBracket[1].pointsTeamASet2.$numberInt}-${activeBracket[1].pointsTeamBSet2.$numberInt})`
    }
    else { m2Score = `(${activeBracket[1].pointsTeamASet1.$numberInt}-${activeBracket[1].pointsTeamBSet1.$numberInt}, ${activeBracket[1].pointsTeamASet2.$numberInt}-${activeBracket[1].pointsTeamBSet2.$numberInt}, ${activeBracket[1].pointsTeamASet3.$numberInt}-${activeBracket[1].pointsTeamBSet3.$numberInt})` }

    if (activeBracket[2].pointsTeamBSet1 === null) { m3Score = 'Match' }
    else if (activeBracket[2].pointsTeamBSet3 === null) {
      m3Score = `(${activeBracket[2].pointsTeamASet1.$numberInt}-${activeBracket[2].pointsTeamBSet1.$numberInt}, ${activeBracket[2].pointsTeamASet2.$numberInt}-${activeBracket[2].pointsTeamBSet2.$numberInt})`
    }
    else { m3Score = `(${activeBracket[2].pointsTeamASet1.$numberInt}-${activeBracket[2].pointsTeamBSet1.$numberInt}, ${activeBracket[2].pointsTeamASet2.$numberInt}-${activeBracket[2].pointsTeamBSet2.$numberInt}, ${activeBracket[2].pointsTeamASet3.$numberInt}-${activeBracket[2].pointsTeamBSet3.$numberInt})` }

    if (activeBracket[3].pointsTeamBSet1 === null) { m4Score = 'Match' }
    else if (activeBracket[3].pointsTeamBSet3 === null) {
      m4Score = `(${activeBracket[3].pointsTeamASet1.$numberInt}-${activeBracket[3].pointsTeamBSet1.$numberInt}, ${activeBracket[3].pointsTeamASet2.$numberInt}-${activeBracket[3].pointsTeamBSet2.$numberInt})`
    }
    else { m4Score = `(${activeBracket[3].pointsTeamASet1.$numberInt}-${activeBracket[3].pointsTeamBSet1.$numberInt}, ${activeBracket[3].pointsTeamASet2.$numberInt}-${activeBracket[3].pointsTeamBSet2.$numberInt}, ${activeBracket[3].pointsTeamASet3.$numberInt}-${activeBracket[3].pointsTeamBSet3.$numberInt})` }

    if (activeBracket[4].pointsTeamBSet1 === null) { m5Score = 'Match' }
    else if (activeBracket[4].pointsTeamBSet3 === null) {
      m5Score = `(${activeBracket[4].pointsTeamASet1.$numberInt}-${activeBracket[4].pointsTeamBSet1.$numberInt}, ${activeBracket[4].pointsTeamASet2.$numberInt}-${activeBracket[4].pointsTeamBSet2.$numberInt})`
    }
    else { m5Score = `(${activeBracket[4].pointsTeamASet1.$numberInt}-${activeBracket[4].pointsTeamBSet1.$numberInt}, ${activeBracket[4].pointsTeamASet2.$numberInt}-${activeBracket[4].pointsTeamBSet2.$numberInt}, ${activeBracket[4].pointsTeamASet3.$numberInt}-${activeBracket[4].pointsTeamBSet3.$numberInt})` }

    if (activeBracket[5].pointsTeamBSet1 === null) { m6Score = 'Match' }
    else if (activeBracket[5].pointsTeamBSet3 === null) {
      m6Score = `(${activeBracket[5].pointsTeamASet1.$numberInt}-${activeBracket[5].pointsTeamBSet1.$numberInt}, ${activeBracket[5].pointsTeamASet2.$numberInt}-${activeBracket[5].pointsTeamBSet2.$numberInt})`
    }
    else { m6Score = `(${activeBracket[5].pointsTeamASet1.$numberInt}-${activeBracket[5].pointsTeamBSet1.$numberInt}, ${activeBracket[5].pointsTeamASet2.$numberInt}-${activeBracket[5].pointsTeamBSet2.$numberInt}, ${activeBracket[5].pointsTeamASet3.$numberInt}-${activeBracket[5].pointsTeamBSet3.$numberInt})` }

    //  create names with flags

    // let lowerFlag = activeBracket[0].teamANationality.toLowerCase()
    // let m1t1Flag = `https://flagcdn.com/w40/${lowerFlag}.png`
    // let m1t1Name = ` < img src = ${m1t1Flag}> <h6>${activeBracket[0].teamAName}</h6>`

    // set half label
    document.getElementById("halfLabel").innerText = halfLabel

    // set values for bracket elements
    document.getElementById("sFT1").innerText = ''
    document.getElementById("sFT2").innerText = ''

    document.getElementById("m1t1").innerHTML = activeBracket[0].teamAName
    if (activeBracket[0].matchPointsB !== null) { document.getElementById("m1t1MScore").innerText = activeBracket[0].matchPointsA.$numberInt }
    else {
      document.getElementById("m1t1MScore").innerText = 0
    }
    document.getElementById("m1t2").innerText = activeBracket[0].teamBName
    if (activeBracket[0].matchPointsB !== null) {
      document.getElementById("m1t2MScore").innerText = activeBracket[0].matchPointsB.$numberInt
    }
    else {
      document.getElementById("m1t2MScore").innerText = 0
    }
    document.getElementById("m1Score").innerText = m1Score

    document.getElementById("m2t1").innerText = activeBracket[1].teamAName
    if (activeBracket[1].matchPointsB !== null) { document.getElementById("m2t1MScore").innerText = activeBracket[1].matchPointsA.$numberInt }
    else {
      document.getElementById("m2t1MScore").innerText = 0
    }
    document.getElementById("m2t2").innerText = activeBracket[1].teamBName
    if (activeBracket[1].matchPointsB !== null) {
      document.getElementById("m2t2MScore").innerText = activeBracket[1].matchPointsB.$numberInt
    }
    else {
      document.getElementById("m2t2MScore").innerText = 0
    }
    document.getElementById("m2Score").innerText = m2Score

    document.getElementById("m3t1").innerText = activeBracket[2].teamAName
    if (activeBracket[2].matchPointsB !== null) { document.getElementById("m3t1MScore").innerText = activeBracket[2].matchPointsA.$numberInt }
    else {
      document.getElementById("m3t1MScore").innerText = 0
    }
    document.getElementById("m3t2").innerText = activeBracket[2].teamBName
    if (activeBracket[2].matchPointsB !== null) {
      document.getElementById("m3t2MScore").innerText = activeBracket[2].matchPointsB.$numberInt
    }
    else {
      document.getElementById("m3t2MScore").innerText = 0
    }
    document.getElementById("m3Score").innerText = m3Score

    document.getElementById("m4t1").innerText = activeBracket[3].teamAName
    if (activeBracket[3].matchPointsB !== null) { document.getElementById("m4t1MScore").innerText = activeBracket[3].matchPointsA.$numberInt }
    else {
      document.getElementById("m4t1MScore").innerText = 0
    }
    document.getElementById("m4t2").innerText = activeBracket[3].teamBName
    if (activeBracket[3].matchPointsB !== null) {
      document.getElementById("m4t2MScore").innerText = activeBracket[3].matchPointsB.$numberInt
    }
    else {
      document.getElementById("m4t2MScore").innerText = 0
    }
    document.getElementById("m4Score").innerText = m4Score

    document.getElementById("m5t1").innerText = activeBracket[4].teamAName
    if (activeBracket[4].matchPointsB !== null) {
      document.getElementById("m5t1MScore").innerText = activeBracket[4].matchPointsA.$numberInt
    }
    else {
      document.getElementById("m5t1MScore").innerText = 0
    }
    document.getElementById("m5t2").innerText = activeBracket[4].teamBName
    if (activeBracket[4].matchPointsB !== null) {
      document.getElementById("m5t2MScore").innerText = activeBracket[4].matchPointsB.$numberInt
    }
    else {
      document.getElementById("m5t2MScore").innerText = 0
    }
    document.getElementById("m5Score").innerText = m5Score

    document.getElementById("m6t1").innerText = activeBracket[5].teamAName
    if (activeBracket[5].matchPointsB !== null) {
      document.getElementById("m6t1MScore").innerText = activeBracket[5].matchPointsA.$numberInt
    }
    else {
      document.getElementById("m6t1MScore").innerText = 0
    }
    document.getElementById("m6t2").innerText = activeBracket[5].teamBName
    if (activeBracket[5].matchPointsB !== null) {
      document.getElementById("m6t2MScore").innerText = activeBracket[5].matchPointsB.$numberInt
    }
    else {
      document.getElementById("m6t2MScore").innerText = 0
    }
    document.getElementById("m6Score").innerText = m6Score



    if (activeBracket[4].matchPointsA !== null) {
      if (activeBracket[4].matchPointsA.$numberInt == 2) {
        document.getElementById("sFT1").innerText = activeBracket[4].teamAName
      }
    }
    if (activeBracket[4].matchPointsA !== null) {
      if (activeBracket[4].matchPointsB.$numberInt == 2) {
        document.getElementById("sFT1").innerText = activeBracket[4].teamBName
      }
    }

    if (activeBracket[5].matchPointsA !== null) {
      if (activeBracket[5].matchPointsA.$numberInt == 2) {
        document.getElementById("sFT2").innerText = activeBracket[5].teamAName
      }
    }
    if (activeBracket[5].matchPointsA !== null) {
      if (activeBracket[5].matchPointsB.$numberInt == 2) {
        document.getElementById("sFT2").innerText = activeBracket[5].teamBName
      }

    }



    // document.getElementById("sFT1").innerText = 'hi'
  }

  setFinalBracket = (bracketLocation) => {

    switch (bracketLocation) {

      case 'mFinals':
        clearActiveBracket()
        activeBracket = menFinals
        halfLabel = `Men's Finals`
        break;
      case 'wFinals':
        clearActiveBracket()
        activeBracket = womenFinals
        halfLabel = `Women's Finals`
        break;
      default:
        break;
    }
    document.getElementById("firstColumn").innerText = "Semifinals"
    document.getElementById("secondColumn").innerText = "Finals"
    document.getElementById("thirdColumn").innerText = ""
    document.getElementById("halfLabel").innerText = halfLabel
    document.getElementById("goldMedal").innerText = "Gold Medal Match"
    document.getElementById("bronzeMedal").innerText = "Bronze Medal Match"
    let stuff = document.getElementsByClassName("not-finals")
    for (let i = 0; i < stuff.length; i++) {
      const element = stuff[i];
      console.log(element)
      element.classList.add("remove-bracket-part")
    }
    // set match scores


    if (activeBracket[0].pointsTeamBSet1 === null) { m1Score = 'Match' }
    else if (activeBracket[0].pointsTeamBSet3 === null) {
      m1Score = `(${activeBracket[0].pointsTeamASet1.$numberInt}-${activeBracket[0].pointsTeamBSet1.$numberInt}, ${activeBracket[0].pointsTeamASet2.$numberInt}-${activeBracket[0].pointsTeamBSet2.$numberInt})`
    }
    else { m1Score = `(${activeBracket[0].pointsTeamASet1.$numberInt}-${activeBracket[0].pointsTeamBSet1.$numberInt}, ${activeBracket[0].pointsTeamASet2.$numberInt}-${activeBracket[0].pointsTeamBSet2.$numberInt}, ${activeBracket[0].pointsTeamASet3.$numberInt}-${activeBracket[0].pointsTeamBSet3.$numberInt})` }

    if (activeBracket[1].pointsTeamBSet1 === null) { m2Score = 'Match' }
    else if (activeBracket[1].pointsTeamBSet3 === null) {
      m2Score = `(${activeBracket[1].pointsTeamASet1.$numberInt}-${activeBracket[1].pointsTeamBSet1.$numberInt}, ${activeBracket[1].pointsTeamASet2.$numberInt}-${activeBracket[1].pointsTeamBSet2.$numberInt})`
    }
    else { m2Score = `(${activeBracket[1].pointsTeamASet1.$numberInt}-${activeBracket[1].pointsTeamBSet1.$numberInt}, ${activeBracket[1].pointsTeamASet2.$numberInt}-${activeBracket[1].pointsTeamBSet2.$numberInt}, ${activeBracket[1].pointsTeamASet3.$numberInt}-${activeBracket[1].pointsTeamBSet3.$numberInt})` }

    if (activeBracket[2].pointsTeamBSet1 === null) { m5Score = 'Match' }
    else if (activeBracket[2].pointsTeamBSet3 === null) {
      m5Score = `(${activeBracket[2].pointsTeamASet1.$numberInt}-${activeBracket[2].pointsTeamBSet1.$numberInt}, ${activeBracket[2].pointsTeamASet2.$numberInt}-${activeBracket[2].pointsTeamBSet2.$numberInt})`
    }
    else { m5Score = `(${activeBracket[2].pointsTeamASet1.$numberInt}-${activeBracket[2].pointsTeamBSet1.$numberInt}, ${activeBracket[2].pointsTeamASet2.$numberInt}-${activeBracket[2].pointsTeamBSet2.$numberInt}, ${activeBracket[2].pointsTeamASet3.$numberInt}-${activeBracket[2].pointsTeamBSet3.$numberInt})` }

    if (activeBracket[3].pointsTeamBSet1 === null) { m6Score = 'Match' }
    else if (activeBracket[3].pointsTeamBSet3 === null) {
      m6Score = `(${activeBracket[3].pointsTeamASet1.$numberInt}-${activeBracket[3].pointsTeamBSet1.$numberInt}, ${activeBracket[3].pointsTeamASet2.$numberInt}-${activeBracket[3].pointsTeamBSet2.$numberInt})`
    }
    else { m6Score = `(${activeBracket[3].pointsTeamASet1.$numberInt}-${activeBracket[3].pointsTeamBSet1.$numberInt}, ${activeBracket[3].pointsTeamASet2.$numberInt}-${activeBracket[3].pointsTeamBSet2.$numberInt}, ${activeBracket[3].pointsTeamASet3.$numberInt}-${activeBracket[3].pointsTeamBSet3.$numberInt})` }


    console.log(activeBracket)


    // set values for bracket elements
    document.getElementById("sFT1").innerText = ''
    document.getElementById("sFT2").innerText = ''



    document.getElementById("m1t1").innerHTML = activeBracket[0].teamAName
    if (activeBracket[0].matchPointsB !== null) { document.getElementById("m1t1MScore").innerText = activeBracket[0].matchPointsA.$numberInt }
    else {
      document.getElementById("m1t1MScore").innerText = 0
    }
    document.getElementById("m1t2").innerText = activeBracket[0].teamBName
    if (activeBracket[0].matchPointsB !== null) {
      document.getElementById("m1t2MScore").innerText = activeBracket[0].matchPointsB.$numberInt
    }
    else {
      document.getElementById("m1t2MScore").innerText = 0
    }
    document.getElementById("m1Score").innerText = m1Score

    document.getElementById("m2t1").innerText = activeBracket[1].teamAName
    if (activeBracket[1].matchPointsB !== null) { document.getElementById("m2t1MScore").innerText = activeBracket[1].matchPointsA.$numberInt }
    else {
      document.getElementById("m2t1MScore").innerText = 0
    }
    document.getElementById("m2t2").innerText = activeBracket[1].teamBName
    if (activeBracket[1].matchPointsB !== null) {
      document.getElementById("m2t2MScore").innerText = activeBracket[1].matchPointsB.$numberInt
    }
    else {
      document.getElementById("m2t2MScore").innerText = 0
    }
    document.getElementById("m2Score").innerText = m2Score



    document.getElementById("m5t1").innerText = activeBracket[3].teamAName
    if (activeBracket[3].matchPointsB !== null) {
      document.getElementById("m5t1MScore").innerText = activeBracket[3].matchPointsA.$numberInt
    }
    else {
      document.getElementById("m5t1MScore").innerText = 0
    }
    document.getElementById("m5t2").innerText = activeBracket[3].teamBName
    if (activeBracket[3].matchPointsB !== null) {
      document.getElementById("m5t2MScore").innerText = activeBracket[3].matchPointsB.$numberInt
    }
    else {
      document.getElementById("m5t2MScore").innerText = 0
    }
    document.getElementById("m5Score").innerText = m5Score

    document.getElementById("m6t1").innerText = activeBracket[2].teamAName
    if (activeBracket[2].matchPointsB !== null) {
      document.getElementById("m6t1MScore").innerText = activeBracket[2].matchPointsA.$numberInt
    }
    else {
      document.getElementById("m6t1MScore").innerText = 0
    }
    document.getElementById("m6t2").innerText = activeBracket[2].teamBName
    if (activeBracket[2].matchPointsB !== null) {
      document.getElementById("m6t2MScore").innerText = activeBracket[2].matchPointsB.$numberInt
    }
    else {
      document.getElementById("m6t2MScore").innerText = 0
    }
    document.getElementById("m6Score").innerText = m6Score



    if (activeBracket[3].matchPointsA !== null) {
      if (activeBracket[3].matchPointsA.$numberInt == 2) {
        document.getElementById("sFT1").innerText = activeBracket[3].teamAName
      }
    }
    if (activeBracket[3].matchPointsA !== null) {
      if (activeBracket[3].matchPointsB.$numberInt == 2) {
        document.getElementById("sFT1").innerText = activeBracket[3].teamBName
      }
    }

    if (activeBracket[2].matchPointsA !== null) {
      if (activeBracket[2].matchPointsA.$numberInt == 2) {
        document.getElementById("sFT2").innerText = activeBracket[2].teamAName
      }
    }
    if (activeBracket[2].matchPointsA !== null) {
      if (activeBracket[2].matchPointsB.$numberInt == 2) {
        document.getElementById("sFT2").innerText = activeBracket[2].teamBName
      }

    }



    // document.getElementById("sFT1").innerText = 'hi'
  }
  setBracket("mTop")
}




getMatches()




clearActiveBracket = () => {
  activeBracket = []
}


document.getElementById('mTop').addEventListener('click', function () { setBracket("mTop") })
document.getElementById('mBottom').addEventListener('click', function () { setBracket('mBottom') })
document.getElementById('mFinals').addEventListener('click', function () { setFinalBracket('mFinals') })
document.getElementById('wTop').addEventListener('click', function () { setBracket('wTop') })
document.getElementById('wBottom').addEventListener('click', function () { setBracket('wBottom') })
document.getElementById('wFinals').addEventListener('click', function () { setFinalBracket('wFinals') })



// async function populateModal(matchResults) {
//   console.log('The Button Works')
// }

// function openModal(matchResults) {
// }

// function closeModal() {
//   document.getElementById("backdrop").style.display = "none"
//   document.getElementById("matchResultsModal").style.display = "none"
//   document.getElementById("matchResultsModal").className += document.getElementById("matchResultsModal").className.replace("show", "")
// }

// // Get the modal
// var modal = document.getElementById('matchResultsModal');

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal || event.target.class == "close") {
//     closeModal()
//   }
// }


// async function displayResults(res) {
//   let tournamentList = res.data
//   openModal(tournamentList)
// }


// async function getTournaments(teamNo) {
//   await axios.get(`https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/olympicrankingswomen-amjnt/service/team_results/incoming_webhook/team_results?teamNo=${teamNo}`)
//     .then(async (res) => {
//       displayResults(res)
//     }
//     )
// }

// document.addEventListener('click', event => {
//   var target = event.target
//   parent = target.parentElement
//   console.log(parent.id)
//   if (parent.id > 0) {
//     getTournaments(parent.id)
//   }

// })