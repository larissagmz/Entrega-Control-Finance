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

    let modal = document.querySelector(".modal__controller");
    buttonHeader.addEventListener("click", function () {
        modal.showModal();
    });
}

let main = document.querySelector("#app");
function renderMain(list) {
    renderNavBar(list);
}

function renderNavBar(list) {
    let navBar = document.createElement("nav");
    let titleNavBar = document.createElement("h2");
    let divFilter = document.createElement("div");
    let buttonEntries = document.createElement("button");
    let buttonExits = document.createElement("button");
    let buttonAll = document.createElement("button");

    buttonEntries.id = "buttons-nav-bar";
    buttonExits.id = "buttons-nav-bar";
    buttonAll.id = "buttons-nav-bar";

    navBar.className = "nav-bar";
    titleNavBar.innerText = "Resumo financeiro";
    divFilter.className = "div-filter";
    buttonAll.innerText = "Todos";
    buttonAll.className = "button-all";
    buttonEntries.innerText = "Entradas";
    buttonEntries.className = "button-entries";
    buttonExits.innerText = "Saidas";
    buttonExits.className = "button-exits";

    buttonEntries.setAttribute("data-id", 0);
    buttonExits.setAttribute("data-id", 1);
    buttonAll.setAttribute("data-id", 2);

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

        figureDelete.setAttribute("data-id", element.id);
        figureDelete.addEventListener("click", (e) => {
            let id = Number(figureDelete.getAttribute("data-id"));
            const index = list.findIndex((item) => item.id === id);
            insertedValuesFiltered.splice(index, 1);
            insertedValues.splice(index, 1);
            main.parentElement.children[1].removeChild(divSumValues);
            main.parentElement.children[1].removeChild(listExtract);
            console.log(list);
            renderExtract(list);
        });

        listExtract.append(extractLi);
        extractLi.append(priceExtract, divBin);
        divImageBin.append(figureDelete);
        divBin.append(typeExtract, divImageBin);
        figureDelete.append(deleteExtract);
    });
}
let modal = document.querySelector(".modal__controller");
function renderModal() {
    let modalContainer = document.querySelector(".modal__container");

    let divTitleExit = document.createElement("div");
    let titleModal = document.createElement("h2");
    let textModal = document.createElement("p");
    let buttonExitModal = document.createElement("button");
    let formModal = document.createElement("form");
    let label = document.createElement("label");
    let inputValue = document.createElement("input");
    let divTypeValue = document.createElement("div");
    let typeValue = document.createElement("label");
    let buttonEntry = document.createElement("button");
    let buttonExit = document.createElement("button");
    let divButtonsModal = document.createElement("div");
    let buttonCancel = document.createElement("button");
    let buttonInsert = document.createElement("button");

    divTitleExit.append(titleModal, buttonExitModal);
    formModal.append(label, inputValue, divTypeValue);
    divTypeValue.append(typeValue, buttonEntry, buttonExit, divButtonsModal);
    divButtonsModal.append(buttonCancel, buttonInsert);
    modalContainer.append(
        divTitleExit,
        textModal,
        formModal,
        divTypeValue,
        divButtonsModal
    );

    formModal.className = "form-modal";
    divTitleExit.className = "div-title-exit";
    titleModal.innerText = "Registro de valor";
    buttonExitModal.innerText = "X";
    textModal.innerText =
        "Digite o valor e em seguida aperte no botão referente ao tipo do valor ";
    label.innerText = "Valor";
    label.className = "label-input-value";
    inputValue.className = "input-value";
    typeValue.innerText = "Tipo de valor";
    typeValue.className = "text-type-value";
    divTypeValue.className = "div-type-value";
    buttonEntry.className = "button-entry";
    buttonEntry.innerText = "Entrada";
    buttonExit.className = "button-exit";
    buttonExit.innerText = "Saida";
    divButtonsModal.className = "div-buttons-modal";
    buttonCancel.innerText = "Cancelar";
    buttonCancel.className = "button-cancel";
    buttonInsert.className = "button-insert";
    buttonInsert.innerText = "Inserir valor";

    buttonExitModal.addEventListener("click", function () {
        modal.close();
    });
}

function filterExtract(list) {
    buttonList = document.querySelectorAll("#buttons-nav-bar");

    const removeExistingElements = () => {
        const divSumValues = document.querySelector(".div-sum-values");
        const listExtract = document.querySelector(".list-extract");

        divSumValues.remove();
        listExtract.remove();
    };

    listButton = Array.from(buttonList);
    insertedValuesFiltered = [];
    listButton.map((element) => {
        element.addEventListener("click", (e) => {
            let id = Number(element.getAttribute("data-id"));

            if (id === 2) {
                insertedValuesFiltered = list.slice();
            } else {
                insertedValuesFiltered = list.filter(
                    (extract) => extract.categoryID === id
                );
            }
            removeExistingElements();
            renderExtract(insertedValuesFiltered);
        });
    });
}
function addExtract(list) {
    let formModal = document.querySelector(".form-modal");
    let input = document.querySelector(".input-value");
    let buttonEntry = document.querySelector(".button-entry");
    let buttonExit = document.querySelector(".button-exit");
    let buttonInsert = document.querySelector(".button-insert");
    let buttonCancel = document.querySelector(".button-cancel");

    buttonEntry.setAttribute("data-id", 0);
    buttonExit.setAttribute("data-id", 1);
    // let idButton = Number(buttonExit.getAttribute("data-id"));
    // const removeExistingElements = () => {
    //     const divSumValues = document.querySelector(".div-sum-values");
    //     const listExtract = document.querySelector(".list-extract");

    //     divSumValues.remove();
    //     listExtract.remove();
    // };

    // formModal.addEventListener("submit", (e) => {
    //     let id = 0;
    //     e.preventDefault();
    //     if (buttonExit) {
    //         id = idButton;
    //     }
    //     let newExtract = {
    //         id: list.length + 1,
    //         value: input.value,
    //         categoryID: id,
    //     };
    //     list.push(newExtract);
    // });
    buttonInsert.addEventListener("click", (e) => {
        e.preventDefault();

        let id = 0;

        buttonExit.addEventListener("click", (e) => {
            id = Number(buttonExit.getAttribute("data-id"));
        });
        console.log(id);

        let newExtract = {
            id: list.length + 1,
            value: value,
            categoryID: id,
        };
        const value = parseFloat(input.value);

        list.push(newExtract);
        input.value = "";
        removeExistingElements();
        renderExtract(list);
    });

    const removeExistingElements = () => {
        const divSumValues = document.querySelector(".div-sum-values");
        const listExtract = document.querySelector(".list-extract");

        divSumValues.remove();
        listExtract.remove();
    };
}
renderHeader();
renderMain();
renderExtract(insertedValues);
renderModal();
filterExtract(insertedValues);
addExtract(insertedValues);
