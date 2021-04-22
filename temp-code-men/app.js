async function getMenRankings() {

  await axios.get('https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/olympicrankings-kinaz/service/menolympicrankingsapi/incoming_webhook/api?secret=sEcrEt')
    .then(async (res) => {
      let menRanks = res.data
      let i = 1
      let score = 0
      let countries = {}
      let numTied = 0
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
       
        </tr>`
            document.getElementById('teamRow').append(row)
          }
          else {
            if (score === team.olympicPoints.$numberInt) {
              numTied++
              i = i - numTied
              // tied team in country's top 2 
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
       
        </tr>`
                i = i + 2
                document.getElementById('teamRow').append(row)
                score = team.olympicPoints.$numberInt
              }
              else {
                // tied team outside of top 15
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
       
        </tr>`
                i++
                numTied = 0
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
       
        </tr>`
                i++
                numTied = 0
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
       
        </tr>`
          document.getElementById('teamRow').append(row)

        }

      })
    }
    )
    .catch(err => console.error(err))
}
getMenRankings()


async function populateModal(tournamentList) {

  for (let i = 0; i < tournamentList.length; i++) {
    let rank = ''
    let event = tournamentList[i]
    let dateIn = parseInt(event.date.$date.$numberLong)

    let ranked = parseInt(event.rank.$numberInt)

    switch (ranked) {
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
      case 25:
        rank = "25th"
        break;
      case 33:
        rank = "33rd"
        break;
      case 41:
        rank = "41st"
        break;
      default:
        break;
    }



    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var date = new Date(dateIn);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = months[date.getMonth()]
    let day = date.getDate();

    let dateObject = month + ' ' + day + ' ' + year
    let tournament = document.createElement('li')
    tournament.innerHTML = `
    <div class="container">
  <div class="row">
  <div class="row">
  <div class="col-1">
     ${i + 1} 
    </div>
    <div class="col-7">
     <strong>${event.tournament}</strong>
    </div>
    <div class="col-2">
      ${rank}
    </div>
    <div class="col-2">
    ${event.points.$numberInt}
    </div>
    </div>
    <div class="row">
    <div class="col-1">
    </div>
    <div class="col-11">
    ${event.type} 
    </div>
    </div> 
    <div class="row">
    <div class="col-1">
    </div>
    <div class="col-11">
    ${dateObject}
    </div>
    </div> 
  </div>
</div>
<hr/>
    `
    document.getElementById('tournamentList').append(tournament)
  }
}

function openModal(tournamentList) {
  document.getElementById("backdrop").style.display = "block"
  document.getElementById("tournamentsModal").style.display = "block"
  document.getElementById("tournamentsModal").className += "show"
  modal.innerHTML = `
  <div class="modal-dialog" role="document">
  <div class="modal-content modal-lg">
 
          <div class="modal-header">
            <h5 class="modal-title" id="tournamentsModalLabel" style="margin-left:auto; margin-right:auto">${tournamentList[0].name}</h5>
                
      <button type="button" class="btn btn-secondary" onclick="closeModal()">Close</button>
 
          </div>
          <div class="modal-body">
          <ul id="tournamentList" style="list-style-type:none;" >
          <li>
          <div class="container">
          <div class="row">
          <div class="col-1">
          
          </div>
          <div class="col-7">
          <h5>Event</h5>
          </div>
          <div class="col-2">
          <h5 style="margin-left:-1rem">Place</h5>
          </div>
          <div class="col-2" >
          <h5 style="margin-left:-1.25rem">Points</h5>
          </div>
          </div>
  </div></li>
          </ul>
          </div>
   
          
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
  if (event.target == modal || event.target.class == "close") {
    closeModal()
  }
}



async function displayResults(res) {
  let tournamentList = res.data
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