async function getRSS() {

await axios.get('https://beachvolleyblog.net/feed')
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => console.log(data))
}
  getRSS()