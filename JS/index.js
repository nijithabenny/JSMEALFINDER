//Adding category list from API to side panel

sessionStorage.setItem("currentPage", "index");
console.log("index page js", sessionStorage.getItem("currentPage"));
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
    newAnchor.addEventListener("click", (e) => {
      console.log("category selected", i.strCategory);
      sessionStorage.setItem("selectedCategory", i.strCategory);
      sessionStorage.setItem("categoryDescription", i.strCategoryDescription);
      if (sessionStorage.getItem("currentPage") == "index") {
        console.log("11111111111111", sessionStorage.getItem("currentPage"));
        newAnchor.setAttribute("href", "./pages/category.html");
      } else if (sessionStorage.getItem("currentPage") == "category") {
        console.log("222222222222222", sessionStorage.getItem("currentPage"));
        newAnchor.setAttribute("href", "./category.html");
      }
    });

    newAnchor.textContent = i.strCategory;
    //appending li,a
    newList.append(newAnchor);
    sidebarCategoryList.append(newList);
  }
});

//DOM Manipulation and looping for category grid with image
const categoryGrid = document.getElementById("categortGrid");
getMealCategories().then((categoryList) => {
  for (let i of categoryList) {
    //creating new outer div
    const outerDiv = document.createElement("div");
    outerDiv.className = "category-card";
    //creating new a tag for navigation
    const aTag = document.createElement("a");
    aTag.addEventListener("click", (e) => {
      console.log("category selected", i.strCategory);
      sessionStorage.setItem("selectedCategory", i.strCategory);
      sessionStorage.setItem("categoryDescription", i.strCategoryDescription);
      sessionStorage.setItem("currentPage", "category");
    });
    if (sessionStorage.getItem("currentPage") == "index") {
      aTag.setAttribute("href", "./pages/category.html");
    }
    if (sessionStorage.getItem("currentPage") == "category") {
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
