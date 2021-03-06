(function() {

init();

function buildResults(i){
    return (`
    <div class="track-info">
    <img src="${i.artworkUrl100}" class="track-pic" alt="${i.artistName}" name="${i.previewUrl}" id="${i.trackName}">
    <h3> ${i.artistName} </h3>
    <p> ${i.trackName} </p>
    </div>
    `)
}

function init(){
fetch(
  'https://itunes.apple.com/search?term=sting&country=US&media=music&limit=15'
).then(function(response) {
  return response.json()}).then(function(data){
    document.querySelector('.result').innerHTML = data.results.map(buildResults).reduce(function(sum,value) {return sum+value;})
    var trackArray = document.querySelectorAll('.track-pic');
    trackArray.forEach(function(item, counter){
      trackArray[counter].addEventListener('click', playTrack);
    })
    console.log(data);
  })
}

document.getElementById('search-submit').addEventListener('click', searchReturn);

function searchReturn(){
  var searchTerm = document.getElementById('search-bar').value;
fetch(
  'https://itunes.apple.com/search?term=' + searchTerm + '&country=US&media=music&limit=15'
).then(function(response) {
  return response.json()}).then(function(data){
    document.querySelector('.result').innerHTML = data.results.map(buildResults).reduce(function(sum,value) {return sum+value;})
    var trackArray = document.querySelectorAll('.track-pic');
    trackArray.forEach(function(item, counter){
      trackArray[counter].addEventListener('click', playTrack);
    })
    console.log(data);
  })
}

function playTrack(event){
  var track = event.target.name;
  var trackName = event.target.id;
  var artist = event.target.alt;
  document.getElementById('song-name').textContent = 'Now Playing: ' + trackName + ' - ' + artist;
  document.querySelector('.music-player').src = track;
  console.log(track);
}

}());
