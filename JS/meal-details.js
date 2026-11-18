sessionStorage.setItem("currentPage", "meals");

const ID = sessionStorage.getItem("selectedMealId");
//function to fetch details of selected meal
async function getMealDetails() {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`,
    );
    if (!response.ok) {
      throw new Error("Request failed: " + response.status);
    }
    const result = await response.json();
    return result.meals[0];
  } catch (error) {
    console.log("Error:", error.message);
  }
}

//manipulating DOM to get details of selected meal
getMealDetails().then((mealDetails) => {
  //meal name
  const breadcrumbHeader = document.querySelectorAll("#breadcrumbHeader");
  breadcrumbHeader[0].textContent = mealDetails.strMeal;
  breadcrumbHeader[1].textContent = mealDetails.strMeal;

  //meal Image
  const mealThumb = document.getElementById("mealThumb");
  mealThumb.setAttribute("src", mealDetails.strMealThumb);

  //meal category
  const mealCategory = document.getElementById("mealCategory");
  mealCategory.textContent = mealDetails.strCategory;

  //meal source
  const mealSource = document.getElementById("mealSource");
  if (mealDetails.strSource) {
    mealSource.textContent = mealDetails.strSource;
  }

  //meal tags
  const mealTag = document.getElementById("mealTag");
  if (mealDetails.strTags) {
    //using split to convert string value of tags in to array
    let mealTags = mealDetails.strTags.split(",");
    for (let i of mealTags) {
      const tagEl = document.createElement("span");
      tagEl.className = "item-tag";
      tagEl.textContent = i;
      mealTag.append(tagEl);
    }
  }

  //meal ingredients
  const mealIngredients = document.getElementById("mealIngredients");
  //making an array of ingredients from different key-value pairs and removing empty/null values
  for (let i of Object.entries(mealDetails)) {
    if (i[0].startsWith("strIngredient") && i[1].trim()) {
      const ingredient = document.createElement("li");
      ingredient.className = "list-ord-item";
      ingredient.textContent = i[1];
      mealIngredients.append(ingredient);
    }
  }

  //meal measure
  const mealMesures = document.getElementById("mealMesures");
  //making an array of measures from different key-value pairs and removing empty/null values
  for (let i of Object.entries(mealDetails)) {
    if (i[0].startsWith("strMeasure") && i[1].trim()) {
      const measure = document.createElement("li");
      measure.className = "list-unord-item";
      measure.textContent = i[1];
      mealMesures.append(measure);
    }
  }

  //meal instructions
  const instructionsList = document.getElementById("instructionsList");
  //looping to get instructions one by one instead of a single paragraph
  let textList = mealDetails.strInstructions.split("\r\n");
  for (let i of textList) {
    const insList = document.createElement("li");
    insList.className = "list-ins-item";
    insList.textContent = i;
    //   insList.textContent = mealDetails.strInstructions;
    instructionsList.append(insList);
  }
});
