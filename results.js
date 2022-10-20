async function createResult(type, id)
{
    //define the actual result
    let result = document.createElement("div");
    result.style.width = "100%";
    result.style.height = "100px";

    //get all the data from spotify
    let catalog = await getCatalog(type, id);

    //create the artist image/album cover
    let image = document.createElement("img");
    image.style.width = "64px";
    image.style.height = "64px";
    image.style.marginLeft = "15px";
    image.style.marginTop = "10px";
    image.style.float = "left";
    result.appendChild(image);

    if (type == "artists")
    {
        image.style.borderRadius = "50%";
        image.src = catalog.images[0].url;
        let artistName = document.createElement("h2");
        let a = document.createElement("a");
        a.setAttribute("href", `/results.html?type=artists&id=${catalog.id}`);
        artistName.innerHTML = catalog.name;
        artistName.style.marginLeft = "10px";
        artistName.style.marginTop = "10px";
        artistName.style.float = "left";
        artistName.style.transform = "translateY(20px)";
        artistName.style.color = "lightgray";
        a.appendChild(artistName);
        result.appendChild(a);
    }

    if (type == "albums")
    {
        let albumName = document.createElement("h2");
        let a = document.createElement("a");
        a.setAttribute("href", `/results.html?type=albums&id=${catalog.id}`);
        image.src = catalog.images[0].url;
        albumName.innerHTML = catalog.name;
        albumName.style.marginLeft = "10px";
        albumName.style.marginTop = "10px";
        albumName.style.float = "left";
        albumName.style.transform = "translateY(20px)";
        albumName.style.color = "lightgray";
        a.appendChild(albumName);
        result.appendChild(a);
    }

    if (type == "tracks")
    {
        image.src = catalog.album.images[0].url;
        let trackName = document.createElement("h2");
        let a = document.createElement("a");
        a.setAttribute("href", `/results.html?type=tracks&id=${catalog.id}`);
        trackName.innerHTML = catalog.name;
        trackName.style.marginLeft = "10px";
        trackName.style.marginTop = "10px";
        trackName.style.float = "left";
        trackName.style.transform = "translateY(20px)";
        trackName.style.color = "lightgray";
        a.appendChild(trackName);
        result.appendChild(a);
    }

    return result;
}