//Adding category list from API to side panel

//function to fetch list of all categories
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

//DOM Manipulation and looping for side panel
const sidebarCategoryList = document.getElementById("sidebarCategoryList");

getMealCategories().then((categoryList) => {
  for (let i of categoryList) {
    //creating new list
    const newList = document.createElement("li");
    newList.classList.add("nav-item");
    newList.classList.add("horz-divider");
    //creating new anchor tag
    const newAnchor = document.createElement("a");
    newAnchor.className = "nav-link";
    newAnchor.setAttribute("aria-current", "page");
    newAnchor.setAttribute("href", "#");
    newAnchor.textContent = i.strCategory;
    //appending li,a
    newList.append(newAnchor);
    sidebarCategoryList.append(newList);
  }
});

//DOM Manipulation and looping for category grid
const categoryGrid = document.getElementById("categortGrid");
getMealCategories().then((categoryList) => {
  for (let i of categoryList) {
    //creating new outer div
    const outerDiv = document.createElement("div");
    outerDiv.className = "category-card";
    //creating new img tag
    const imgTag = document.createElement("img");
    imgTag.className = "card-img-top";
    let srcLink = i.strCategoryThumb;
    imgTag.setAttribute("src", srcLink);
    imgTag.setAttribute("alt", "beef");
    //creating new innerDiv
    const innerDiv = document.createElement("div");
    innerDiv.className = "category-badge";
    innerDiv.textContent = i.strCategory.toUpperCase();
    //appending
    outerDiv.append(imgTag);
    outerDiv.append(innerDiv);
    categoryGrid.append(outerDiv);
  }
});
