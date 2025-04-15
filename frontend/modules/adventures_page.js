
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  const city = params.get('city');
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let response = await fetch(`${config.backendEndpoint}/adventures/?city=${city}`);
    let data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let parentContainer = document.getElementById("data");

  adventures.forEach((ele, idx)=>{
    // let cardDiv = document.createElement("div");
    let bannerDiv = document.createElement("div");
    bannerDiv.setAttribute("class","category-banner");
    bannerDiv.innerText = ele.category;

    let cardImg = document.createElement("img");
    cardImg.setAttribute("src", ele.image);

    let cityDivParent = document.createElement("div");
    cityDivParent.setAttribute("class","d-flex justify-content-between p-2");
    let cityDiv = document.createElement("div");
    cityDiv.innerText = ele.name;
    let cityPriceDiv = document.createElement("div");
    cityPriceDiv.innerText = "₹" + ele.costPerHead;
    cityDivParent.append(cityDiv,cityPriceDiv);

    let durationDivParent = document.createElement("div");
    durationDivParent.setAttribute("class","d-flex justify-content-between p-2");
    let durationDiv = document.createElement("div");
    durationDiv.innerText = "Duration";
    let durationHrsDiv = document.createElement("div");
    durationHrsDiv.innerText = ele.duration + " Hours";
    durationDivParent.append(durationDiv, durationHrsDiv);

    let detailsDiv = document.createElement("div");
    detailsDiv.setAttribute("class","activity-card-details");
    detailsDiv.append(cityDivParent,durationDivParent);

    let anchorTag = document.createElement("a");
    anchorTag.setAttribute("class","col-sm-6 col-lg-3 my-2 activity-card");
    anchorTag.setAttribute("id", ele.id);
    anchorTag.setAttribute("href", `detail/?adventure=${ele.id}`);
    anchorTag.append(bannerDiv,cardImg,detailsDiv);

    parentContainer.append(anchorTag);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let result = list.filter((ele)=>{
    if(ele.duration >= parseInt(low) && ele.duration <= parseInt(high)){
      return ele;
    }
  });

  return result;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let result = list.filter((ele)=>{
      if(categoryList.includes(ele.category)){
        return ele;
      }
  });

  return result;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredResults = list;

  if(filters.duration.length != 0 && filters.category.length == 0){
    filteredResults = filterByDuration(list, filters.duration.split("-")[0], filters.duration.split("-")[1]);
  }

  if(filters.duration.length == 0 && filters.category.length != 0){
    filteredResults = filterByCategory(list, filters.category);
  }

  if(filters.duration.length != 0 && filters.category.length != 0){
    let f1 = filterByDuration(list, filters.duration.split("-")[0], filters.duration.split("-")[1]);
    let f2 = filterByCategory(f1, filters.category);
    filteredResults = f2;
  }

  return filteredResults;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const data = JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return data;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let pillsArr = filters.category;
  let parentDiv = document.getElementById("category-list");

  pillsArr.forEach((ele)=>{
    let pill = document.createElement("div");
    pill.innerText = ele;
    pill.setAttribute("class","category-filter");
    
    parentDiv.append(pill);
  });
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
