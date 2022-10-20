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
        document.getElementById("pfp").style.backgroundImage = catalog.images[0].url;
        document.getElementById("pfp").style.backgroundSize = "cover";
    }

    let recs = await getReccomendations(type, id);
    console.log(recs);

    for (let i = 0; i < 10; i++)
    {
        if (recs.tracks[i].popularity > 30)
        {
            let result = await createResult("tracks", recs.tracks[i].id);
            content.appendChild(result);
            content.appendChild(document.createElement("br"));
        }
    }
}

