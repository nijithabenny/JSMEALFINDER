//adding current page name to session storage to identify the page which we are in. Used for navigating from from js page to another
sessionStorage.setItem("currentPage", "index");

//function to fetch list of all categories to be displayed in page1
async function getMealCategories() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php",
    );
    if (!response.ok) {
      throw new Error("Request failed: " + response.status);
    }
    const result = await response.json();
    return result.categories;
  } catch (error) {
    console.log("Error:", error.message);
  }
}

//Category value population in side panel
const sidebarCategoryList = document.getElementById("sidebarCategoryList");

getMealCategories().then((categoryList) => {
  for (let i of categoryList) {
    //creating new list for each category
    const newList = document.createElement("li");
    newList.classList.add("nav-item");
    newList.classList.add("horz-divider");
    //creating new anchor tag for click enabling
    const newAnchor = document.createElement("a");
    newAnchor.className = "nav-link";
    newAnchor.setAttribute("aria-current", "page");
    newAnchor.addEventListener("click", (e) => {
      //setting session storage to fetch meals based on category in category.js file
      sessionStorage.setItem("selectedCategory", i.strCategory);
      sessionStorage.setItem("categoryDescription", i.strCategoryDescription);
      //to reuse same code in all 3 pages
      if (sessionStorage.getItem("currentPage") == "index") {
        newAnchor.setAttribute("href", "./pages/category.html");
      } else {
        newAnchor.setAttribute("href", "./category.html");
      }
    });
    newAnchor.textContent = i.strCategory;
    //appending li,a to side panel list
    newList.append(newAnchor);
    sidebarCategoryList.append(newList);
  }
});

//Populating category values to form the grid with image
const categoryGrid = document.getElementById("categortGrid");
getMealCategories().then((categoryList) => {
  for (let i of categoryList) {
    //creating new outer div
    const outerDiv = document.createElement("div");
    outerDiv.className = "category-card";
    //creating new a tag for navigation
    const aTag = document.createElement("a");
    aTag.addEventListener("click", (e) => {
      sessionStorage.setItem("selectedCategory", i.strCategory);
      sessionStorage.setItem("categoryDescription", i.strCategoryDescription);
      sessionStorage.setItem("currentPage", "category");
    });
    if (sessionStorage.getItem("currentPage") == "index") {
      aTag.setAttribute("href", "./pages/category.html");
    } else {
      aTag.setAttribute("href", "./category.html");
    }
    //creating new img tag
    const imgTag = document.createElement("img");
    imgTag.className = "card-img-top";
    imgTag.setAttribute("src", i.strCategoryThumb);
    imgTag.setAttribute("alt", "beef");
    //creating new innerDiv
    const innerDiv = document.createElement("div");
    innerDiv.className = "category-badge";
    innerDiv.textContent = i.strCategory.toUpperCase();
    //appending
    aTag.append(imgTag);
    aTag.append(innerDiv);
    outerDiv.append(aTag);
    categoryGrid.append(outerDiv);
  }
});

//search action
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchMeal(searchInput.value);
});

//function to fetch list of meals searched
async function searchMeal(foodName) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`,
    );
    if (!response.ok) {
      throw new Error("Request failed: " + response.status);
    }
    const result = await response.json();

    const mealsSect = document.getElementById("mealsSect"); //section including header, underline and meals grid
    const mealsGrid = document.getElementById("mealsGrid"); //grid for listing meals

    //to avoid appending new result to previously searched result
    mealsGrid.textContent = "";

    //adding heading and underline for meals section
    if (!mealsSect.textContent.trim()) {
      //to avoid appending meals header at each search. If already present, no need to append again
      const subHead = document.createElement("h4");
      subHead.className = "sub-head";
      subHead.textContent = "MEALS";
      const subHeadLine = document.createElement("div");
      subHeadLine.className = "sub-head-underline";
      mealsSect.prepend(subHead, subHeadLine);
    }

    //if empty value is searched the meals section should be empty
    if (!searchInput.value.trim()) {
      mealsGrid.textContent = "No Meals Found";
      result.meals = [];
    }

    //populating searched result to be displayed
    for (let i of result.meals) {
      //outer div element
      const outerDiv = document.createElement("div");
      outerDiv.classList.add("category-card", "card-alignment");
      //anchor element
      const aTag = document.createElement("a");
      aTag.addEventListener("click", (e) => {
        //session storage used for enabling navigation to meal details page
        sessionStorage.setItem("selectedMealId", i.idMeal);
        sessionStorage.setItem("selectedMeal", i.strMeal);
      });
      aTag.setAttribute("href", "./pages/meal-details.html");

      //img element
      const imgTag = document.createElement("img");
      imgTag.className = "card-img-veg";
      imgTag.setAttribute("src", i.strMealThumb);
      imgTag.setAttribute("alt", "...");

      //inner div
      const innerDiv = document.createElement("div");
      innerDiv.className = "card-body";

      //p1
      const p1 = document.createElement("p");
      p1.className = "card-text";
      p1.textContent = i.strCountry;

      //p2
      const p2 = document.createElement("p");
      p2.className = "card-text-main";
      p2.textContent = i.strMeal;

      //appending all new elements into meal grid
      innerDiv.append(p1);
      innerDiv.append(p2);
      aTag.append(imgTag);
      aTag.append(innerDiv);
      outerDiv.append(aTag);
      mealsGrid.append(outerDiv);
    }
  } catch (error) {
    console.log("Error:", error.message);
    mealsGrid.textContent = "No Meals Found";
  }
}
