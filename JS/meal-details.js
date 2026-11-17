//function to fetch details of selected meal
console.log('meals page js')
const ID = 52772;
const Category = "Seafood";
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

//manipulating DOM to get dynamic details
getMealDetails().then((mealDetails) => {
  console.log(mealDetails);
  //meal name
  const breadcrumbHeader = document.querySelectorAll("#breadcrumbHeader");
  breadcrumbHeader[0].textContent = mealDetails.strMeal;
  breadcrumbHeader[1].textContent = mealDetails.strMeal;
  //meal category
  const mealCategory = document.getElementById("mealCategory");
  mealCategory.textContent = mealDetails.strCategory;
  //meal source
  const mealSource = document.getElementById("strImageSource");
  if (mealDetails.strImageSource) {
    mealSource.textContent = mealDetails.strImageSource;
  }
  //meal tags
  const mealTag = document.getElementById("mealTag");
  let mealTags = mealDetails.strTags.split(",");
  for (let i of mealTags) {
    const tagEl = document.createElement("span");
    tagEl.className = "item-tag";
    tagEl.textContent = i;
    mealTag.append(tagEl);
  }

  //meal ingredients
  const mealIngredients = document.getElementById("mealIngredients");
  for (let i of Object.entries(mealDetails)) {
    if (i[0].startsWith("strIngredient") && i[1]) {
      const ingredient = document.createElement("li");
      ingredient.className = "list-ord-item";
      ingredient.textContent = i[1];
      mealIngredients.append(ingredient);
    }
  }

    //meal measure
  const mealMesures = document.getElementById("mealMesures");
  for (let i of Object.entries(mealDetails)) {
    if (i[0].startsWith("strMeasure") && i[1]) {
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
