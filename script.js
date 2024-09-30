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
    return { calories: 200, protein: 25, fat: 10, carbs: 0, reference_amount: 100 }; 
}

function updateFatPercentageVisibility() {
    const meatType = document.getElementById("meat-type").value;
    const fatPercentageContainer = document.getElementById("fat-percentage-container");
    if (meatType.includes("ground")) {
        fatPercentageContainer.style.display = "block";
    } else {
        fatPercentageContainer.style.display = "none"; // Corrected line
    }
}

function calculate() {
    // ... (rest of the code remains the same)
}

// Initial setup
updateFatPercentageVisibility(); 
document.getElementById("meat-type").addEventListener('change', updateFatPercentageVisibility);
