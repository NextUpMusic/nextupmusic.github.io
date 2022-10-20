let query = new URLSearchParams(window.location.search);
let id = query.get("id");
let type = query.get("type");

setPage();

async function setPage()
{
    let catalog = await getCatalog(type, id);

    document.getElementById("name").innerHTML = catalog.name;
}