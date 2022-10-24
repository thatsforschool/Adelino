// defining global variables
const body = document.querySelector("body");
const header = document.querySelector("header");
const main = document.querySelector("main");
const alcoholLink = document.querySelector("#alcohol");

let url = window.location.href;
const homePageUrldefault = `https://mmd.ucn.dk/class/MDE-CSD-S21/10407746/Adelino/`;
const homePageUrl = `https://mmd.ucn.dk/class/MDE-CSD-S21/10407746/Adelino/index.html`;
const alcoholUrl = `https://mmd.ucn.dk/class/MDE-CSD-S21/10407746/Adelino/alcohol-catalouge.html`;
const pantryUrl = `https://mmd.ucn.dk/class/MDE-CSD-S21/10407746/Adelino/pantry-catalouge.html`;
const homeUrl = `https://mmd.ucn.dk/class/MDE-CSD-S21/10407746/Adelino/home-catalouge.html`;

let alcoholData;
let pantryData;
let homeData;
let art;
let prodId;
let allData;

// this function fires on onload, the main task of this function is to figure out where within the site the user is and execute the correct part of the code
initPage = () => {
  // fetching data
  fetch(`./assets/data/dataBase_Adelino.json`)
    .then((result) => result.json())
    .then((data) => {
      //assign array to global variable
      allData = data.filter((elm) => true);
      console.log("product data ready");
      console.log(allData);
      // checking which part of the code to execute
      console.log(url);
      if (url == homePageUrl || url == homePageUrldefault) {
        console.log(`you are on the front page`);
        loadHomePage();
      }
      if (url == alcoholUrl) {
        console.log(`you are on the alcohol page`);
        getAlcoholData();
      }
      if (url == pantryUrl) {
        console.log(`you are on the pantry page`);
        getPantryData();
      }
      if (url == homeUrl) {
        console.log(`you are on the home page`);
        getHomeData();
      }
    });
};

window.addEventListener("load", initPage());

// this function populate the cataloge section on front page
loadHomePage = () => {
  // filtering through all fetched data to find the ones maching the requirements
  alcData = allData.filter((item) => item.category == "alcohol");
  // using the filtered data in previously definded function
  loadCatalogue(alcData);
  pantData = allData.filter((item) => item.category == "pantry");
  loadCatalogue(pantData);
  homeData = allData.filter((item) => item.category == "home");
  loadCatalogue(homeData);
};

// this function is used in the function above
loadCatalogue = (dataArray) => {
  // since the catalogue only displays 5 product, FOR loop is being used
  for (let i = 0; i < 5; i++) {
    // targeting proper output within the HTML document
    const catalogueoutput = document.querySelector(
      `#${dataArray[i].category}Catalouge`
    );
    // creating the element, filling it out with previously attained data
    const img = document.createElement("img");
    img.alt = dataArray[i].name;
    img.src = `./assets/data/photos/images-no-background/${dataArray[i].photo}`;
    const h5 = document.createElement("h5");
    h5.innerText = dataArray[i].name;
    const sect = document.createElement("section");
    sect.dataset.id = dataArray[i].id;
    sect.dataset.category = dataArray[i].category;
    sect.dataset.type = dataArray[i].type;
    sect.dataset.name = dataArray[i].name;
    sect.appendChild(img);
    sect.appendChild(h5);
    catalogueoutput.appendChild(sect);
    // creating onclick event on a section
    sect.addEventListener("click", (item) => {
      // delates all of the previous elements within this specific part of HTML
      document.querySelector("video").remove();
      main.innerHTML = "";
      // this fuction uses data from an article that the onclick event has occured at
      console.log(item.currentTarget);
      // the article dataset.id correspond to 'id' key within an object at the json file the data is taken from
      prodId = item.currentTarget.dataset.id;
      console.log(prodId);

      // breadcrumb links are being created and appended to HTML
      const crumbSect = document.createElement("section");
      crumbSect.classList.add("crumb");
      main.appendChild(crumbSect);

      const categoryCrumb = document.createElement("a");
      categoryCrumb.innerText = item.currentTarget.dataset.category;
      categoryCrumb.href = `https://mmd.ucn.dk/class/MDE-CSD-S21/10407746/Adelino/${item.currentTarget.dataset.category}-catalouge.html`;
      crumbSect.appendChild(categoryCrumb);

      const currentCat = item.currentTarget.dataset.category;
      const currentType = item.currentTarget.dataset.type;
      const typeCrumb = document.createElement("a");
      typeCrumb.innerText = item.currentTarget.dataset.type;
      typeCrumb.href = `#`;
      // creating an onclick event to filter through and display requested data
      typeCrumb.addEventListener("click", () => {
        // clearing out HTML
        main.innerHTML = "";
        // didplaying requested data
        typeCrumbFunction(currentCat, currentType);
      });
      crumbSect.appendChild(typeCrumb);

      const nameCrumb = document.createElement("a");
      nameCrumb.innerText = item.currentTarget.dataset.name;
      nameCrumb.href = `#`;
      crumbSect.appendChild(nameCrumb);

      // displaying item information
      displayItemInfo(dataArray);
      displayItemDetails();
    });
  }
};

// the three following function filter and display elements on subpages
// the structure is the same for all three of the function
getAlcoholData = () => {
  loadFiltersAlcohol();
  alcoholData = allData.filter(
    (elm) => elm.hasOwnProperty("category") && elm.category == "alcohol"
  );
  console.log(`the alcohol`);
  console.log(alcoholData);
  displayItem(alcoholData);
};
getPantryData = () => {
  loadFiltersPantry();
  pantryData = allData.filter(
    (elm) => elm.hasOwnProperty("category") && elm.category == "pantry"
  );
  console.log(`the pantry`);
  console.log(pantryData);
  displayItem(pantryData);
};
getHomeData = () => {
  loadFiltersHome();
  homeData = allData.filter(
    (elm) => elm.hasOwnProperty("category") && elm.category == "home"
  );
  console.log(`the pantry`);
  console.log(homeData);
  displayItem(homeData);
};

// the three following function create and append correct filtering buttons to the HTML

loadFiltersAlcohol = () => {
  // creating section in the HTML
  const filterNav = document.createElement("section");
  filterNav.classList.add("filters");
  main.appendChild(filterNav);

  // creating button
  const wineBtn = document.createElement("button");
  wineBtn.classList.add("filter");
  wineBtn.innerText = "wine";
  // adding dataset properties, which will be used later within clickFilter() function
  wineBtn.dataset.type = "wine";
  wineBtn.dataset.category = "alcohol";
  // appending button to previously created section within HTML
  filterNav.appendChild(wineBtn);
  clickFilter(wineBtn);
  // the rest follows the example above

  const rumBtn = document.createElement("button");
  rumBtn.classList.add("filter");
  rumBtn.innerText = "rum";
  rumBtn.dataset.type = "rum";
  rumBtn.dataset.category = "alcohol";
  filterNav.appendChild(rumBtn);
  clickFilter(rumBtn);

  const ginBtn = document.createElement("button");
  ginBtn.classList.add("filter");
  ginBtn.innerText = "gin";
  ginBtn.dataset.type = "gin";
  ginBtn.dataset.category = "alcohol";
  filterNav.appendChild(ginBtn);
  clickFilter(ginBtn);

  const otherAlcBtn = document.createElement("button");
  otherAlcBtn.classList.add("filter");
  otherAlcBtn.innerText = "other alcohol";
  otherAlcBtn.dataset.type = "otherAlcohol";
  otherAlcBtn.dataset.category = "alcohol";
  filterNav.appendChild(otherAlcBtn);
  clickFilter(otherAlcBtn);
};

loadFiltersPantry = () => {
  const filterNav = document.createElement("section");
  filterNav.classList.add("filters");
  main.appendChild(filterNav);

  const jamBtn = document.createElement("button");
  jamBtn.classList.add("filter");
  jamBtn.innerText = "jam&honey";
  jamBtn.dataset.type = "jam&honey";
  jamBtn.dataset.category = "pantry";
  filterNav.appendChild(jamBtn);
  clickFilter(jamBtn);

  const spiceBtn = document.createElement("button");
  spiceBtn.classList.add("filter");
  spiceBtn.innerText = "spice";
  spiceBtn.dataset.type = "spice";
  spiceBtn.dataset.category = "pantry";
  filterNav.appendChild(spiceBtn);
  clickFilter(spiceBtn);

  const olivesBtn = document.createElement("button");
  olivesBtn.classList.add("filter");
  olivesBtn.innerText = "olives";
  olivesBtn.dataset.type = "olives";
  olivesBtn.dataset.category = "pantry";
  filterNav.appendChild(olivesBtn);
  clickFilter(olivesBtn);

  const oilVinBtn = document.createElement("button");
  oilVinBtn.classList.add("filter");
  oilVinBtn.innerText = "olive oil & vinegar";
  oilVinBtn.dataset.type = "oliveOil&vinegar";
  oilVinBtn.dataset.category = "pantry";
  filterNav.appendChild(oilVinBtn);
  clickFilter(oilVinBtn);

  const cannedfishBtn = document.createElement("button");
  cannedfishBtn.classList.add("filter");
  cannedfishBtn.innerText = "cannedfish";
  cannedfishBtn.dataset.type = "cannedfish";
  cannedfishBtn.dataset.category = "pantry";
  filterNav.appendChild(cannedfishBtn);
  clickFilter(cannedfishBtn);

  const snacksBtn = document.createElement("button");
  snacksBtn.classList.add("filter");
  snacksBtn.innerText = "snacks";
  snacksBtn.dataset.type = "snacks";
  snacksBtn.dataset.category = "pantry";
  filterNav.appendChild(snacksBtn);
  clickFilter(snacksBtn);
};

loadFiltersHome = () => {
  const filterNav = document.createElement("section");
  filterNav.classList.add("filters");
  main.appendChild(filterNav);

  const ceramicsBtn = document.createElement("button");
  ceramicsBtn.classList.add("filter");
  ceramicsBtn.innerText = "ceramics";
  ceramicsBtn.dataset.type = "ceramics";
  ceramicsBtn.dataset.category = "home";
  filterNav.appendChild(ceramicsBtn);
  clickFilter(ceramicsBtn);

  const containerBtn = document.createElement("button");
  containerBtn.classList.add("filter");
  containerBtn.innerText = "containers";
  containerBtn.dataset.type = "containers";
  containerBtn.dataset.category = "home";
  filterNav.appendChild(containerBtn);
  clickFilter(containerBtn);

  const accesoryBtn = document.createElement("button");
  accesoryBtn.classList.add("filter");
  accesoryBtn.innerText = "accesories";
  accesoryBtn.dataset.type = "accesories";
  accesoryBtn.dataset.category = "home";
  filterNav.appendChild(accesoryBtn);
  clickFilter(accesoryBtn);

  const soapBtn = document.createElement("button");
  soapBtn.classList.add("filter");
  soapBtn.innerText = "soaps";
  soapBtn.dataset.type = "soaps";
  soapBtn.dataset.category = "home";
  filterNav.appendChild(soapBtn);
  clickFilter(soapBtn);

  const stationeryBtn = document.createElement("button");
  stationeryBtn.classList.add("filter");
  stationeryBtn.innerText = "stationery";
  stationeryBtn.dataset.type = "stationery";
  stationeryBtn.dataset.category = "home";
  filterNav.appendChild(stationeryBtn);
  clickFilter(stationeryBtn);
};

// this function displays data depending on currently available data array, this function is dependable on the parameter and used in the part of the code above

clickFilter = (button) => {
  button.addEventListener("click", () => {
    // delates all of the previous elements within this specific part of HTML
    main.innerHTML = "";
    // creating a new section within the HTML to add breadcrumb links
    const crumbSection = document.createElement("section");
    crumbSection.classList.add("crumb");
    main.appendChild(crumbSection);
    // defining breadcrumb links, appending them to the section created
    const catCrumb = document.createElement("a");
    catCrumb.innerText = button.dataset.category;
    catCrumb.href = `https://mmd.ucn.dk/class/MDE-CSD-S21/10407746/Adelino/${button.dataset.category}-catalouge.html`;
    crumbSection.appendChild(catCrumb);

    const typeCrumb = document.createElement("a");
    typeCrumb.innerText = button.dataset.type;
    typeCrumb.href = `#`;
    crumbSection.appendChild(typeCrumb);

    // filtering through the content further, deprnding on the data within the button
    selectedItms = allData.filter(
      (item) => item.hasOwnProperty("type") && item.type == button.dataset.type
    );
    // this function displays item
    displayItem(selectedItms);
  });
};

// this function displays data depending on currently available data array, this function is dependable on the parameter and used in the part of the code above
displayItem = (dataArray) => {
  // creating section which will serve as an output for the articles to come
  const itemSection = document.createElement("section");
  main.appendChild(itemSection);
  itemSection.classList.add("catalogues");

  // creating article with item information
  dataArray.forEach((element) => {
    // creating article
    art = document.createElement("article");
    art.classList.add("itemArt");
    // creaing img
    artPhoto = document.createElement("img");
    artPhoto.src = `./assets/data/photos/images-no-background/${element.photo}`;
    artPhoto.alt = element.name;
    // creaing title
    artTitle = document.createElement("a");
    artTitle.href = `#`;
    artTitle.innerText = element.name;
    // adding necessary data to the article
    art.dataset.id = element.id;
    art.dataset.category = element.category;
    art.dataset.type = element.type;
    art.dataset.name = element.name;
    art.classList.add(`${element.type}`);
    art.classList.add(`item`);
    // appending to the HTML
    art.appendChild(artPhoto);
    art.appendChild(artTitle);
    itemSection.appendChild(art);
    // creating onclick event on an article
    art.addEventListener("click", (item) => {
      // delates all of the previous elements within this specific part of HTML
      main.innerHTML = "";
      // this fuction uses data from an article that the onclick event has occured at
      console.log(item.currentTarget);
      // the article dataset.id correspond to 'id' key within an object at the json file the data is taken from
      prodId = item.currentTarget.dataset.id;
      console.log(prodId);

      // as previously breadcrumb links are being created
      const crumbSect = document.createElement("section");
      main.appendChild(crumbSect);
      crumbSect.classList.add("crumb");
      const categoryCrumb = document.createElement("a");
      categoryCrumb.innerText = item.currentTarget.dataset.category;
      categoryCrumb.href = `https://mmd.ucn.dk/class/MDE-CSD-S21/10407746/Adelino/${item.currentTarget.dataset.category}-catalouge.html`;
      crumbSect.appendChild(categoryCrumb);

      const currentCat = item.currentTarget.dataset.category;
      const currentType = item.currentTarget.dataset.type;
      const typeCrumb = document.createElement("a");
      typeCrumb.innerText = item.currentTarget.dataset.type;
      typeCrumb.href = `#`;

      // creating an onclick event to filter through and display requested data
      typeCrumb.addEventListener("click", () => {
        // clearing out HTML
        main.innerHTML = "";
        // didplaying requested data
        typeCrumbFunction(currentCat, currentType);
      });
      crumbSect.appendChild(typeCrumb);

      const nameCrumb = document.createElement("a");
      nameCrumb.innerText = item.currentTarget.dataset.name;
      nameCrumb.href = `#`;
      crumbSect.appendChild(nameCrumb);

      // displaying item information
      displayItemInfo(dataArray);
      displayItemDetails();
    });
  });
};

// this function displays information regardin product based on metadata uniform for all products, this function is dependable on the parameter and used in the part of the code above

displayItemInfo = (dataArray) => {
  // creating section which will serve as an output for the elements to come
  const titleSect = document.createElement("section");
  titleSect.classList.add("product");
  main.appendChild(titleSect);
  const photoProduct = document.createElement("div");
  photoProduct.classList.add("img-product");
  titleSect.appendChild(photoProduct);
  const contentProduct = document.createElement("div");
  contentProduct.classList.add("content-product");
  titleSect.appendChild(contentProduct);
  dataArray.forEach((item) => {
    // the information below will be displayed dependend on whether or not the json object's 'id' key value is the same as the 'id' key value on currently targeted element
    if (item.id == prodId) {
      const selctID = item.id;
      console.log(`this is seceltID ${selctID} of main info`);
      // the code below checks for specific key values and outputs resuts in HTML depending on the key existence and value

      // the first IF statement executes the code in ideal situation when the key exists and has a value other than null or empty string, the second IF statement executes the code in the situation when key exists but has a value equal null or empty string. NOTICE THAT AN IFELSE STATEMENT HAVE NOT BEEN USED SINCE ANOTHER POSSIBLE CASE EXIST IN THIS SITUATION, where the key does not exist. We do not wish to execute any code if that's the case. Using IFELSE statement instead of second IF statement would include such case in the second execution.

      // photo
      if (
        item.hasOwnProperty("photo") &&
        (item.photo !== null || item.photo !== "")
      ) {
        const photo = document.createElement("img");
        photo.alt = item.name;
        photo.src = `./assets/data/photos/images-no-background/${item.photo}`;
        photoProduct.appendChild(photo);
      }
      if (
        item.hasOwnProperty("photo") &&
        (item.photo == null || item.photo == "")
      ) {
        const photo = document.createElement("img");
        photo.alt = item.name;
        photo.src = `./img-placeholder.png`;
        photoProduct.appendChild(photo);
      }
      // name
      if (
        item.hasOwnProperty("name") &&
        (item.name !== null || item.name !== "")
      ) {
        const title = document.createElement("h1");
        title.innerText = item.name;
        contentProduct.appendChild(title);
      }
      if (
        item.hasOwnProperty("name") &&
        (item.name == null || item.name == "")
      ) {
        const title = document.createElement("h1");
        title.innerText = `Title is not here`;
        contentProduct.appendChild(title);
      }
      // producent
      if (
        item.hasOwnProperty("producent") &&
        (item.producent !== null || item.producent !== "")
      ) {
        const producent = document.createElement("h4");
        producent.classList.add("h4-products");
        producent.innerText = `produced by ${item.producent}`;
        contentProduct.appendChild(producent);
      }
      // region
      if (
        item.hasOwnProperty("region") &&
        (item.region !== null || item.region != "")
      ) {
        const region = document.createElement("h4");
        region.classList.add("h4-products");
        region.innerText = `manufactured in ${item.region}`;
        contentProduct.appendChild(region);
      }

      // product_description
      if (
        item.hasOwnProperty("product_description") &&
        (item.product_description !== null || item.product_description !== "")
      ) {
        const description = document.createElement("p");
        description.classList.add("p-products");
        description.innerText = item.product_description;
        contentProduct.appendChild(description);
      }
      if (
        item.hasOwnProperty("product_description") &&
        (item.product_description == null || item.product_description == "")
      ) {
        const description = document.createElement("p");
        description.innerText = `no description available`;
        contentProduct.appendChild(description);
      }
      // status
      if (
        item.hasOwnProperty("status") &&
        (item.status !== null || item.status !== "")
      ) {
        const description = document.createElement("a");
        description.innerText = item.status;
        description.href = `https://www.adelino.dk/`;
        contentProduct.appendChild(description);
      }
    }
  });
};

// this function displays information regardin product based on metadata specific to the group of products,

displayItemDetails = () => {
  // creating section which will serve as an output for the elements to come
  const detailSect = document.createElement("section");
  main.appendChild(detailSect);
  // fetching the second json file (not used up til now)
  fetch(`./data/data_detail.json`)
    .then((result) => result.json())
    .then((data) => {
      detailData = data.filter((elm) => true);
      console.log("product detail ready");
      console.log(detailData);

      detailData.forEach((item) => {
        // the information below will be displayed dependend on whether or not the json object's 'id' key value is the same as the 'id' key value on currently targeted element
        if (item.id == prodId) {
          const selctID = item.id;
          console.log(`this is seceltID ${selctID}`);
          // the code below checks for specific key values and outputs resuts in HTML depending on the key existence and value

          // type

          // the first IF statement executes the code in ideal situation when the key exists and has a value other than null or empty string, the second IF statement executes the code in the situation when key exists but has a value equal null or empty string. NOTICE THAT AN IFELSE STATEMENT HAVE NOT BEEN USED SINCE ANOTHER POSSIBLE CASE EXIST IN THIS SITUATION, where the key does not exist. We do not wish to execute any code if that's the case. Using IFELSE statement instead of second IF statement would include such case in the second execution.
          if (
            item.hasOwnProperty("type") &&
            (item.type !== null || item.type !== "") &&
            item.hasOwnProperty("sparkling") &&
            item.sparkling == "yes"
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `wine type: sparkling ${item.type}`;
            detailSect.appendChild(paragraph);
          }
          if (
            item.hasOwnProperty("type") &&
            (item.type !== null || item.type !== "") &&
            item.hasOwnProperty("sparkling") &&
            item.sparkling == "no"
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `wine type: ${item.type}`;
            detailSect.appendChild(paragraph);
          }
          if (
            item.hasOwnProperty("type") &&
            (item.type !== null || item.type !== "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `type: ${item.type}`;
            detailSect.appendChild(paragraph);
          }
          if (
            item.hasOwnProperty("type") &&
            (item.type == null || item.type == "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `wine type: information unavailable`;
            detailSect.appendChild(paragraph);
          }
          // alcohol percentage
          if (
            item.hasOwnProperty("alk_perc") &&
            (item.alk_perc !== null || item.alk_perc !== "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `alcohol percentage: ${item.alk_perc}%`;
            detailSect.appendChild(paragraph);
          }
          if (
            item.hasOwnProperty("alk_perc") &&
            (item.alk_perc == null || item.alk_perc == "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `alcohol percentage: information unavailable`;
            detailSect.appendChild(paragraph);
          }
          // production year
          if (
            item.hasOwnProperty("production_year") &&
            (item.production_year !== null || item.production_year !== "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `production year: ${item.production_year}`;
            detailSect.appendChild(paragraph);
          }
          if (
            item.hasOwnProperty("production_year") &&
            (item.production_year == null || item.production_year == "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `production year: information unavailable`;
            detailSect.appendChild(paragraph);
          }

          // grape variety
          if (
            item.hasOwnProperty("grape_variety") &&
            (item.grape_variety !== null || item.grape_variety !== "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `grape variety: ${item.grape_variety}`;
            detailSect.appendChild(paragraph);
          }
          if (
            item.hasOwnProperty("grape_variety") &&
            (item.grape_variety == null || item.grape_variety == "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `grape variety: information unavailable`;
            detailSect.appendChild(paragraph);
          }

          // taste
          if (
            item.hasOwnProperty("taste") &&
            (item.taste !== null || item.taste !== "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `taste: ${item.taste}`;
            detailSect.appendChild(paragraph);
          }
          if (item.hasOwnProperty("taste") && item.taste == null) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `taste: information unavailable`;
            detailSect.appendChild(paragraph);
          }

          // age
          if (
            item.hasOwnProperty("age") &&
            (item.age !== null || item.age !== "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `age: ${item.age}`;
            detailSect.appendChild(paragraph);
          }
          if (
            item.hasOwnProperty("age") &&
            (item.age == null || item.age == "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `age: information unavailable`;
            detailSect.appendChild(paragraph);
          }

          // botanicals
          if (
            item.hasOwnProperty("botanicals") &&
            (item.botanicals !== null || item.botanicals !== "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `botanicals: ${item.botanicals}`;
            detailSect.appendChild(paragraph);
          }
          if (
            item.hasOwnProperty("botanicals") &&
            (item.botanicals == null || item.botanicals == "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `botanicals: information unavailable`;
            detailSect.appendChild(paragraph);
          }

          // flavour
          if (
            item.hasOwnProperty("flavour") &&
            (item.flavour !== null || item.flavour !== "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `flavour: ${item.flavour}`;
            detailSect.appendChild(paragraph);
          }
          if (
            item.hasOwnProperty("flavour") &&
            (item.flavour == null || item.flavour == "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `flavour: information unavailable`;
            detailSect.appendChild(paragraph);
          }

          // sub_type
          if (
            item.hasOwnProperty("sub_type") &&
            (item.sub_type !== null || item.sub_type !== "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `made with ${item.sub_type}`;
            detailSect.appendChild(paragraph);
          }
          if (
            item.hasOwnProperty("sub_type") &&
            (item.sub_type == null || item.sub_type == "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `made with: information unavailable`;
            detailSect.appendChild(paragraph);
          }

          // fish_type
          if (
            item.hasOwnProperty("fish_type") &&
            (item.fish_type !== null || item.fish_type !== "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `made from ${item.fish_type}`;
            detailSect.appendChild(paragraph);
          }
          if (
            item.hasOwnProperty("fish_type") &&
            (item.fish_type == null || item.fish_type == "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `made from: information unavailable`;
            detailSect.appendChild(paragraph);
          }

          // sauce_type
          if (
            item.hasOwnProperty("sauce_type") &&
            (item.sauce_type !== null || item.sauce_type !== "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `made with ${item.sauce_type} sauce`;
            detailSect.appendChild(paragraph);
          }
          if (
            item.hasOwnProperty("sauce_type") &&
            (item.sauce_type == null || item.sauce_type == "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `made with: information unavailable`;
            detailSect.appendChild(paragraph);
          }

          // sustanible_fishing
          if (
            item.hasOwnProperty("sustanible_fishing") &&
            item.sustanible_fishing == "yes"
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `fished sustainable`;
            detailSect.appendChild(paragraph);
          }

          // material
          if (
            item.hasOwnProperty("material") &&
            (item.material !== null || item.material !== "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `made out of ${item.material}`;
            detailSect.appendChild(paragraph);
          }
          if (
            item.hasOwnProperty("material") &&
            (item.material == null || item.material == "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `made out of: information unavailable`;
            detailSect.appendChild(paragraph);
          }

          // color_choice
          if (
            item.hasOwnProperty("color_choice") &&
            (item.color_choice !== null || item.color_choice !== "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `available colors: ${item.color_choice}`;
            detailSect.appendChild(paragraph);
          }
          if (
            item.hasOwnProperty("color_choice") &&
            (item.color_choice == null || item.color_choice == "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `available colors: information unavailable`;
            detailSect.appendChild(paragraph);
          }

          // function
          if (
            item.hasOwnProperty("function") &&
            (item.function !== null || item.function !== "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `function: ${item.function}`;
            detailSect.appendChild(paragraph);
          }
          if (
            item.hasOwnProperty("function") &&
            (item.function == null || item.function == "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `function: information unavailable`;
            detailSect.appendChild(paragraph);
          }
          // size
          if (
            item.hasOwnProperty("size") &&
            (item.size !== null || item.size !== "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `size: ${item.size}`;
            detailSect.appendChild(paragraph);
          }
          if (
            item.hasOwnProperty("size") &&
            (item.size == null || item.size == "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `size: information unavailable`;
            detailSect.appendChild(paragraph);
          }

          // amount
          if (
            item.hasOwnProperty("amount") &&
            (item.amount !== null || item.amount !== "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `amount: ${item.amount}`;
            detailSect.appendChild(paragraph);
          }
          if (
            item.hasOwnProperty("amount") &&
            (item.amount == null || item.amount == "")
          ) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `amount: information unavailable`;
            detailSect.appendChild(paragraph);
          }
        }
      });
    });
};

typeCrumbFunction = (category, type) => {
  // delating all of the previous elements within this specific part of HTML
  main.innerHTML = "";
  fetch(`./assets/data/dataBase_Adelino.json`)
    .then((result) => result.json())
    .then((data) => {
      allData = data.filter((elm) => true);
      console.log("product data ready");
      console.log(allData);
      const typeItems = allData.filter(
        (elm) => elm.hasOwnProperty("type") && elm.type == type
      );
      const crumbSec = document.createElement("section");
      crumbSec.classList.add("crumb");
      main.appendChild(crumbSec);
      const categoryCrumb = document.createElement("a");

      categoryCrumb.innerText = category;
      categoryCrumb.href = `https://mmd.ucn.dk/class/MDE-CSD-S21/10407746/Adelino/${category}-catalouge.html`;
      crumbSec.appendChild(categoryCrumb);

      const tyCrumb = document.createElement("a");
      tyCrumb.innerText = type;
      tyCrumb.href = `#`;
      crumbSec.appendChild(tyCrumb);

      displayItem(typeItems);
    });
};
