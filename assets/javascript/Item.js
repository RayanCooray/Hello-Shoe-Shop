import{ModelItem} from "./model/Model-Item.js";
import {ItemAPI} from "./api/ItemAPI.js";
import {VarietyAPI} from "./api/VarietyAPI.js";
import {OccasionAPI} from "./api/OccasionAPI.js";
import {GenderAPI} from "./api/GenderAPI.js";
import {ModelOccasion} from "./model/Model-Occasion.js";
import {ModelVariety} from "./model/Model-Variety.js";
import {ModelGender} from "./model/Model-Gender.js";
const varietyAPI = new VarietyAPI();
const occasionAPI = new OccasionAPI();
const genderAPI = new GenderAPI();
const itemAPI = new ItemAPI();


// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//         // Fetch data from APIs
//         const [occasions, varieties, genders] = await Promise.all([
//             occasionAPI.getAllOccasions(),
//             varietyAPI.getVarieties(),
//             genderAPI.getAllGender()
//         ]);
//
//         // Populate the select elements
//         populateSelectElement('occasionEntity', occasions);
//         populateSelectElement('varietyEntity', varieties);
//         populateSelectElement('genderEntity', genders);
//
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// });
//
// function populateSelectElement(elementId, data) {
//     const selectElement = document.getElementById(elementId);
//     data.forEach(item => {
//         const option = document.createElement('option');
//         option.value = item.value; // Assuming 'value' is the property you want to use as the option value
//         option.textContent = item.label; // Assuming 'label' is the property you want to use as the option text
//         selectElement.appendChild(option);
//     });
// }

function PopulateValues() {
    varietyAPI.getVarieties().then(response => {
        const varieties = JSON.parse(response);

        // Map the fetched data to ModelVariety instances
        const varietyModels = varieties.map(v => new ModelVariety(v.varietyCode, v.varietyDesc));

        // Populate the select element with variety codes
        populateVarietySelect(varietyModels);
    }).catch(error => {
        console.error('Error fetching varieties:', error);
    });
}

function populateVarietySelect(varietyModels) {
    const varietySelect = document.getElementById('varietyEntity');
    varietyModels.forEach(variety => {
        const option = document.createElement('option');
        option.value = variety.varietyCode;
        option.textContent = variety.varietyDesc; // You can also set option.textContent to variety.varietyCode if you prefer
        varietySelect.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    PopulateValues();
});