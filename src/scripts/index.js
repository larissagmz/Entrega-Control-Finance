/* Desenvolva sua lógica aqui */
let body = document.body;

function renderHeader() {
    let header = document.createElement("header");
    let divHeader = document.createElement("div");
    let titleHeader = document.createElement("h1");
    let buttonHeader = document.createElement("button");
    let span = document.createElement("span");

    span.innerText = "Finance";
    titleHeader.innerText = "Control ";
    buttonHeader.innerText = "Registrar novo valor";
    divHeader.className = "container div-header";

    titleHeader.append(span);
    divHeader.append(titleHeader, buttonHeader);
    header.append(divHeader);
    document.body.insertBefore(header, app);
}
let main = document.querySelector("#app");
function renderMain(list) {
    renderNavBar(list);
}

function renderNavBar(list) {
    let navBar = document.createElement("nav");
    let titleNavBar = document.createElement("h2");
    let divFilter = document.createElement("div");
    let buttonAll = document.createElement("button");
    let buttonEntries = document.createElement("button");
    let buttonExits = document.createElement("button");

    navBar.className = "nav-bar";
    titleNavBar.innerText = "Resumo financeiro";
    divFilter.className = "div-filter";
    buttonAll.innerText = "Todos";
    buttonAll.className = "button-all";
    buttonEntries.innerText = "Entradas";
    buttonEntries.className = "button-entries";
    buttonExits.innerText = "Saidas";
    buttonExits.className = "button-exits";

    main.append(navBar);
    navBar.append(titleNavBar, divFilter);
    divFilter.append(buttonAll, buttonEntries, buttonExits);
}

function renderExtract(list) {
    let textTotalValue = list.reduce((acumulater, currentValue) => {
        return acumulater + currentValue.value;
    }, 0);
    let formatPrice = textTotalValue.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
    });

    let divSumValues = document.createElement("div");
    let textSumValue = document.createElement("p");
    let totalValueExtract = document.createElement("strong");
    let listExtract = document.createElement("ul");

    totalValueExtract.innerText = formatPrice;
    textSumValue.innerText = "Soma dos valores";
    divSumValues.className = "div-sum-values";
    listExtract.className = "list-extract";

    main.append(divSumValues);
    main.append(listExtract);
    divSumValues.append(textSumValue, totalValueExtract);

    list.forEach((element) => {
        let extractLi = document.createElement("li");
        let priceExtract = document.createElement("strong");
        let divBin = document.createElement("div");
        let typeExtract = document.createElement("div");
        let figureDelete = document.createElement("figure");
        let deleteExtract = document.createElement("img");
        let divImageBin = document.createElement("div");
        let priceExtractFormat = element.value.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        });

        divBin.className = "div-bin";
        extractLi.className = "extract-li";
        priceExtract.innerText = priceExtractFormat;
        divImageBin.className = "div-image-bin";
        typeExtract.innerText = valuesCategory[element.categoryID];
        typeExtract.className = "type-extract";
        figureDelete.className = "image-bin";
        deleteExtract.src = "./src/assets/trash.png";

        listExtract.append(extractLi);
        extractLi.append(priceExtract, divBin);
        divImageBin.append(figureDelete);
        divBin.append(typeExtract, divImageBin);
        figureDelete.append(deleteExtract);
    });
}
renderHeader();
renderMain();
renderExtract(insertedValues);
