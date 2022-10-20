//define elements
var searchBar = document.getElementById("search");
var drop = document.getElementById("drop");
var results = document.getElementById("results");

//set up timer so that the results only show up 1 second after the user stops typing
var timer;
var interval = 1000;
var hasResults = false;

searchBar.addEventListener("keyup", function() {
  clearTimeout(timer);
  timer = setTimeout(search, interval);
});

searchBar.addEventListener("keydown", function() {
    clearTimeout(timer);
});

//search function
async function search() {
  if (searchBar.value.length > 0) {
    drop.style.backgroundColor = "#1e2638";
  }
  
  else {
    drop.style.backgroundColor = "transparent";
    while (results.firstChild) {
      results.removeChild(results.firstChild);
    }
    hasResults = false;
  }

  if (!hasResults) {
    let query = await getSearch(searchBar.value, 5);

    let result = await createResult("artists", query.artists.items[0].id);
    results.appendChild(result);

    result = await createResult("albums", query.albums.items[0].id);
    results.appendChild(result);

    for (let i = 0; i < 5; i++) {
      result = await createResult("tracks", query.tracks.items[i].id);
      results.appendChild(result);
    }

    hasResults = true;
  }
}