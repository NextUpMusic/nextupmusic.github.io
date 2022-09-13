let client_id = 'e7612da4dc4442758c74601d0349d254';
let client_secret = 'b9e58a18037641f2b620c7b9683e3da3';

async function getToken(clientId, clientSecret) 
{
  let authToken = '';
  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://accounts.spotify.com/api/token', false);
  xhr.setRequestHeader('Authorization', 'Basic ' + btoa(clientId + ':' + clientSecret));
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send('grant_type=client_credentials');
  if (xhr.status === 200) {
    let response = JSON.parse(xhr.responseText);
    authToken = response.access_token;
  }
  return authToken;
}

async function getSearch(searchString, types = 'album,track,artist', limit = '20') {
  let token = await getToken(client_id, client_secret);
  let url = 'https://api.spotify.com/v1/search?q=' + searchString + '&type=' + types + '&market=US' + '&limit=' + limit;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  xhr.send();
  let response = JSON.parse(xhr.responseText);
  return response;
}

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

async function getReccomendations(type, id)
{
  let token = await getToken(client_id, client_secret);
  let url = 'https://api.spotify.com/v1/recommendations?seed_' + type + '=' + id;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  xhr.send();
  let response = JSON.parse(xhr.responseText);
  return response;
}

async function Testing()
{
    let text = document.getElementById('nextup').textContent;
    text = 'foo';
    while (true)
    {
        if (text == 'foo')
        {
            text = 'bar';
        }
        else if (text == 'bar')
        {
            text = 'foo';
        }
    }
}