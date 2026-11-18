//adding current page name to session storage to identify the page which we are in. Used for navigating from from js page to another
sessionStorage.setItem("currentPage", "category");

//function to fetch details of selected category to be displayed
async function getCategoryDetails() {
  try {
    //fetching the category selected in index page to pass it to api url
    let category = sessionStorage.getItem("selectedCategory");
    let categoryDescription = sessionStorage.getItem("categoryDescription");
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
    );
    if (!response.ok) {
      throw new Error("Request failed: " + response.status);
    }
    const result = await response.json();

    //Setting values for category heading an description
    const categoryHead = document.getElementById("categoryHead");
    categoryHead.textContent = category;
    const categoryDesc = document.getElementById("categoryDesc");
    categoryDesc.textContent = categoryDescription;
    return result.meals;
  } catch (error) {
    console.log("Error:", error.message);
  }
}

//DOM Manipulation and looping for meals grid
const mealsGrid = document.getElementById("mealsGrid");

getCategoryDetails().then((mealDetails) => {
  for (let i of mealDetails) {
    //outer div element
    const outerDiv = document.createElement("div");
    outerDiv.classList.add("category-card", "card-alignment");

    //anchor element
    const aTag = document.createElement("a");
    aTag.addEventListener("click", (e) => {
      sessionStorage.setItem("selectedMealId", i.idMeal);
      sessionStorage.setItem("selectedMeal", i.strMeal);
    });
    aTag.setAttribute("href", "./meal-details.html");

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
});
