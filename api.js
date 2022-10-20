//this is very not secure but its too much effort to make an api for this
let client_id = 'e7612da4dc4442758c74601d0349d254';
let client_secret = 'b9e58a18037641f2b620c7b9683e3da3';

//get auth token
async function getToken(clientId, clientSecret) 
{
  let token = '';
  let url = 'https://accounts.spotify.com/api/token';
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url, false);
  xhr.setRequestHeader('Authorization', 'Basic ' + btoa(clientId + ':' + clientSecret));
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send('grant_type=client_credentials');
  if (xhr.status === 200) {
    let response = JSON.parse(xhr.responseText);
    token = response.access_token;
  }
  return token;
}

//get search results based on raw text input
async function getSearch(searchString, limit = 20, types = 'album,track,artist') 
{
  let token = await getToken(client_id, client_secret);
  let url = 'https://api.spotify.com/v1/search?q=' + searchString + '&type=' + types + '&market=US' + '&limit=' + limit;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  xhr.send();
  let response = JSON.parse(xhr.responseText);
  return response;
}

//get catalog data based on type and id
async function getCatalog(type, id)
{
    let token = await getToken(client_id, client_secret);
    let url = 'https://api.spotify.com/v1/' + type + '/' + id;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.send();
    let response = JSON.parse(xhr.responseText);
    return response;
}

//get tracks in an album or playlist
async function getTracks(type, id)
{
  let token = await getToken(client_id, client_secret);
  let url = 'https://api.spotify.com/v1/' + type + '/' + id + '/tracks';
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  xhr.send();
  let response = JSON.parse(xhr.responseText);
  return response;
}

//seed an id and get reccomended tracks
async function getReccomendations(type, id)
{
  let token = await getToken(client_id, client_secret);
  let url = 'https://api.spotify.com/v1/recommendations?seed_' + type + '=' + id + "&max_popularity=30";
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  xhr.send();
  let response = JSON.parse(xhr.responseText);
  return response;
}
