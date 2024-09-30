const meatTypes = {
    "ground beef": { shrinkage: 0.25 },
    "ground chicken": { shrinkage: 0.20 },
    "ground turkey": { shrinkage: 0.22 },
    "chicken breast": { shrinkage: 0.30 },
    "chicken thighs": { shrinkage: 0.28 }
};

const cookingMethods = {
    "pan-frying": 1.0,
    "grilling": 1.0,
    "baking": 0.95,
    "broiling": 0.90
};

// Placeholder for nutritional data (replace with actual API/database calls)
function getNutritionalInfo(meatType) {
    // This is a placeholder, replace with your actual implementation
    return {
        calories: 200,       // Calories per 100g (or your reference amount)
        protein: 25,         // Protein in grams per 100g
        fat: 10,            // Fat in grams per 100g
        carbs: 0,           // Carbs in grams per 100g
        reference_amount: 100 // The amount in grams to which the nutritional values refer (e.g., 100g)
    }; 
}

function updateFatPercentageVisibility() {
    const meatType = document.getElementById("meat-type").value;
    const fatPercentageContainer = document.getElementById("fat-percentage-container");
    if (meatType.includes("ground")) {
        fatPercentageContainer.style.display = "block";
    } else {
        fatPercentageContainer.style.display = "none"; 
    }
}

function calculate() {
    const cookedMeatPerMeal = parseFloat(document.getElementById("cooked-meat").value);
    const numMeals = parseInt(document.getElementById("num-meals").value);
    const meatType = document.getElementById("meat-type").value;
    const cookingMethod = document.getElementById("cooking-method").value;
    let fatPercentage = 0; // Initialize fatPercentage

    // Check if fat percentage field exists before accessing its value
    if (document.getElementById("fat-percentage")) {
        fatPercentage = parseFloat(document.getElementById("fat-percentage").value) / 100 || 0; // Default to 0 if not entered
    }

    try {
        if (!meatTypes[meatType]) {
            throw new Error("Invalid meat type");
        }
        if (!cookingMethods[cookingMethod]) {
            throw new Error("Invalid cooking method");
        }

        let shrinkage = meatTypes[meatType].shrinkage;
        if (meatType.includes("ground")) {
            shrinkage *= (1 + 0.1 * fatPercentage);
        }
        shrinkage *= cookingMethods[cookingMethod];

        const totalCookedMeat = cookedMeatPerMeal * numMeals;
        const uncookedMeat = totalCookedMeat / (1 - shrinkage);

        const nutritionalInfo = getNutritionalInfo(meatType);
        const referenceAmountGrams = nutritionalInfo.reference_amount || 100;

        // Calculate macros per meal (adjusting for reference amount)
        const caloriesPerMeal = (nutritionalInfo.calories * cookedMeatPerMeal * 28.35) / referenceAmountGrams;
        const proteinPerMeal = (nutritionalInfo.protein * cookedMeatPerMeal * 28.35) / referenceAmountGrams;
        const fatPerMeal = (nutritionalInfo.fat * cookedMeatPerMeal * 28.35) / referenceAmountGrams;
        const carbsPerMeal = (nutritionalInfo.carbs * cookedMeatPerMeal * 28.35) / referenceAmountGrams;

        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = `
            You need approximately ${uncookedMeat.toFixed(2)} ounces of uncooked ${meatType} to prepare ${numMeals} meals.

            Per Meal (${cookedMeatPerMeal.toFixed(2)} oz):<br>
            - Calories: ${caloriesPerMeal.toFixed(2)}<br>
            - Protein: ${proteinPerMeal.toFixed(2)}g<br>
            - Fat: ${fatPerMeal.toFixed(2)}g<br>
            - Carbs: ${carbsPerMeal.toFixed(2)}g
        `;

    } catch (error) {
        document.getElementById("result").innerHTML = `Error: ${error.message}`;
    }
}

// Initial setup
updateFatPercentageVisibility(); 
document.getElementById("meat-type").addEventListener('change', updateFatPercentageVisibility);
