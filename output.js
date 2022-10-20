let query = new URLSearchParams(window.location.search);
let id = query.get("id");
let type = query.get("type");

var content = document.getElementById("content");

setPage();

async function setPage()
{
    var catalog = await getCatalog(type, id);

    document.getElementById("name").innerHTML = catalog.name;

    if (type == "artists")
    {
        document.getElementById("pfp").style.borderRadius = "50%";
        document.getElementById("pfp").style.backgroundImage = catalog.images[0].url;
        console.log (catalog.images[0].url);
        document.getElementById("pfp").style.backgroundSize = "cover";
    }

    if (type == "albums")
    {
        document.getElementById("pfp").style.backgroundImage = catalog.images[0].url;
        document.getElementById("pfp").style.backgroundSize = "cover";
    }

    if (type == "tracks")
    {
        document.getElementById("pfp").style.backgroundImage = catalog.album.images[0].url;
        document.getElementById("pfp").style.backgroundSize = "cover";
    }

    if (type == "artists" || type == "tracks")
    {
        var recs = await getReccomendations(type, id);
    }

    else
    {
        let request = await getTracks("albums", id);
        let popularity = [];
        let tracks = [];

        for (let i = 0; i < request.items.length; i++)
        {
            popularity.push(await getCatalog("tracks", request.items[i].id).popularity);
            tracks.push(await request.items[i]);
        }

        let sorted = popularity;
        sorted.sort(function(a, b){return a-b});

        let ids = "";

        for (let i = 0; i < 5; i++)
        {
            let index = popularity.indexOf(sorted[i]);
            ids += tracks[index].id + ",";
        }

        ids = ids.substring(0, ids.length - 1);
        var recs = await getReccomendations("tracks", ids);
    }


    for (let i = 0; i < 10; i++)
    {
            let result = await createResult("tracks", recs.tracks[i].id);
            content.appendChild(result);
            content.appendChild(document.createElement("br"));
    }
}

