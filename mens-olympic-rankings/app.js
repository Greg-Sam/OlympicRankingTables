async function getMenRankings() {

  await axios.get('https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/olympicrankings-kinaz/service/menolympicrankingsapi/incoming_webhook/api?secret=sEcrEt')
    .then(async (res) => {
      let menRanks = res.data
      let i = 1
      let score = 0
      let countries = {}
      menRanks.map(team => {
        let teamNo = team.teamNo.$numberDouble

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

            row.className = `table-danger`
            row.id = teamNo
            row.innerHTML = `<tr > 
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
            if (score === team.olympicPoints.$numberInt) {

              // tied team in country's top 2 
              if (i <= 15) {
                // teams in top 15
                i = i - 1
                let lowerFlag = team.flag.toLowerCase()
                let flag = `https://flagcdn.com/w40/${lowerFlag}.png`
                let row = document.createElement('tr')
                row.className = 'table-primary'
                row.id = teamNo
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
                row.id = teamNo
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
                row.id = teamNo
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
                row.id = teamNo
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
          row.id = teamNo
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


async function populateModal(tournamentList) {
  await tournamentList.map(oneTournament => {

  })
}

function openModal(tournamentList) {
  document.getElementById("backdrop").style.display = "block"
  document.getElementById("tournamentsModal").style.display = "block"
  document.getElementById("tournamentsModal").className += "show"
  modal.innerHTML = `
  <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="tournamentsModalLabel">${tournamentList[0].name}</h5>
          </div>
          <div class="modal-body">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="closeModal()">Close</button>
          </div>
        </div>
  `
  // document.getElementById('teamTournamentsModal').append(modal)
  populateModal(tournamentList)
}
function closeModal() {
  document.getElementById("backdrop").style.display = "none"
  document.getElementById("tournamentsModal").style.display = "none"
  document.getElementById("tournamentsModal").className += document.getElementById("tournamentsModal").className.replace("show", "")
}
// Get the modal
var modal = document.getElementById('tournamentsModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal()
  }
}



async function displayResults(res) {
  let tournamentList = res.data
  console.log(tournamentList)
  openModal(tournamentList)
}


async function getTournaments(teamNo) {
  await axios.get(`https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/olympicrankings-kinaz/service/team_results/incoming_webhook/team_results?teamNo=${teamNo}`)
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