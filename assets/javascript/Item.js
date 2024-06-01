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
const add_item_button = $('#saveItemButton');
const update_item_button = $('#updateItemButton');
const delete_item_button = $('#deleteItemButton');

function searchandsetItemDetails(selected_item_id) {
    alert("Update button clicked for item: " + selected_item_id);
    itemAPI.searchItemByItemId(selected_item_id);
}

function loadItems() {
    itemAPI.getAllItems().then(items => {
        const parsedItems = JSON.parse(items);
        $('#card-container').empty(); // Clear the card container
        parsedItems.forEach(item => {
            const cardHtml = `
                <div class="item-card">
                    <div>
                        <img src="${item.item_pic}" alt="Item Image" accept="image/*">
                    </div>
                    <div class="item-info-card">
                        <div class="card-header">
                            <h3 class="item-code-h3">${item.itemCode}</h3>
                        </div>
                        <div class="item-info-card-body">
                            <div class="row">
                                <div class="col">
                                    ${item.item_desc}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    Variety : ${item.varietyEntity.varietyDesc}
                                </div>
                                <div class="col">
                                    Gender: ${item.genderEntity.genderDesc}
                                </div>
                                <div class="col">
                                    Occasion: ${item.occasionEntity.occasionDesc}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button id="item-card-update-button">Update</button>
                    <button id="item-card-delete-button">Delete</button>
                </div>
            `;


            const $card = $(cardHtml);
            $card.find('.item-info-card-body').click(function() {
                const itemCode = $(this).closest('.item-card').find('.item-code-h3').text();
                console.log("Item Code:", itemCode);
                localStorage.setItem('itemCode', itemCode);
                alert(localStorage.getItem('itemCode'))
            });

            // Attach click event listener to the Update button
            $card.find('#item-card-update-button').click(function() {
                const selected_item_id =  item.itemCode;
                // alert("Update button clicked for item: " + item.itemCode);
                searchandsetItemDetails(selected_item_id);
            });

            $('#card-container').append($card);
        });
    });
}

// function loadItems() {
//     itemAPI.getAllItems().then(items => {
//         const parsedItems = JSON.parse(items);
//         $('#card-container').empty(); // Clear the card container
//         parsedItems.forEach(item => {
//             const cardHtml = `
//                 <div class="item-card" data-item-code="${item.itemCode}">
//                     <div>
//                         <img src="${item.item_pic}" alt="Item Image" accept="image/*">
//                     </div>
//                     <div class="item-info-card">
//                         <div class="card-header">
//                             <h3 class="item-code-h3">${item.itemCode}</h3>
//                         </div>
//                         <div class="item-info-card-body">
//                             <div class="row">
//                                 <div class="col">
//                                     ${item.item_desc}
//                                 </div>
//                             </div>
//                             <div class="row">
//                                 <div class="col">
//                                     Variety : ${item.varietyEntity.varietyDesc}
//                                 </div>
//                                 <div class="col">
//                                     Gender: ${item.genderEntity.genderDesc}
//                                 </div>
//                                 <div class="col">
//                                     Occasion: ${item.occasionEntity.occasionDesc}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <button id="item-card-update-button">Update</button>
//                     <button id="item-card-delete-button">Delete</button>
//                 </div>
//             `;
//
//             $('#card-container').append(cardHtml);
//         });
//
//         // Add click event listeners to the buttons
//         $('.item-card').click(function() {
//             const itemCode = $(this).data('item-code');
//             alert("Item Code:", itm);
//             // Perform actions with the item code
//         });
//
//         // $('.item-card-update-button').click(function(event) {
//         //     // Handle update button click
//         //     event.stopPropagation(); // Prevents the click event from bubbling up to the .item-card div
//         //     const itemCode = $(this).closest('.item-card').data('item-code');
//         //     console.log("Update Item Code:", itemCode);
//         //     // Perform actions for updating the item with the item code
//         // });
//         //
//         // $('.item-card-delete-button').click(function(event) {
//         //     // Handle delete button click
//         //     event.stopPropagation(); // Prevents the click event from bubbling up to the .item-card div
//         //     const itemCode = $(this).closest('.item-card').data('item-code');
//         //     console.log("Delete Item Code:", itemCode);
//         //     // Perform actions for deleting the item with the item code
//         // });
//     });
// }


add_item_button.on('click', (event) => {
    event.preventDefault();

    // Retrieve values from the form fields
    const Item_Code = $('#item_code').val();
    const Item_Desc = $('#item_desc').val();
    const Item_QTY = $('#item_qty').val();
    const Item_PIC = $('#item_pic')[0].files[0]; // Get the selected file
    const Item_STATUS = $('#status-item').val();
    const Item_STOCKS = $('#stocks').val();
    const Item_OCCASION = $('#occasionEntity').val();
    const Item_VARIETY = $('#varietyEntity').val();
    const Item_GENDER = $('#genderEntity').val();

    // Create a new instance of ModelItem with the retrieved values
    let modelItem = new ModelItem();

    if (Item_PIC){
        const reader = new FileReader()
        reader.readAsDataURL(Item_PIC);
        reader.onload = function () {
                const item_base64 = reader.result;
            modelItem = {
                itemCode : Item_Code,
                item_desc : Item_Desc,
                item_qty : Item_QTY,
                item_pic : item_base64, // Placeholder for the base64-encoded image
                status : Item_STATUS,
                stocks : Item_STOCKS,
                occasionEntity : Item_OCCASION,
                varietyEntity : Item_VARIETY,
                genderEntity : Item_GENDER
            };
            
            console.log(modelItem)
            itemAPI.saveItem(modelItem).then(r => {
                alert(`Success: ${r}`);
                loadItems();
            })
        }
    }


    //
    // Convert the selected image to base64
    // const reader = new FileReader();
    // reader.onload = () => {
    //     modelItem.item_pic = reader.result; // Set the base64-encoded image to modelItem
    //     console.log(modelItem);
    //     // Generate the HTML for the card
    //     const cardHtml = `
    //         <div class="item-card">
    //             <div>
    //                 <img src="${modelItem.item_pic}" alt="Item Image" accept="image/*">
    //             </div>
    //             <div class="item-info-card">
    //                 <div class="card-header">
    //                     <h3 class="item-code-h3">${modelItem.itemCode}</h3>
    //                 </div>
    //                 <div class="item-info-card-body">
    //                     <div class="row">
    //                         <div class="col">
    //                             ${modelItem.item_desc}
    //                         </div>
    //                     </div>
    //                     <div class="row">
    //                         <div class="col">
    //                             ${modelItem.occasionEntity}
    //                         </div>
    //                         <div class="col">
    //                             ${modelItem.varietyEntity}
    //                         </div>
    //                         <div class="col">
    //                             ${modelItem.genderEntity}
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //             <button id="item-card-update-button">Update</button>
    //             <button id="item-card-delete-button">Delete</button>
    //         </div>
    //     `;
    //
    //     // Append the card HTML to the card container
    //     $('#card-container').append(cardHtml);
    // };
    // reader.readAsDataURL(Item_PIC); // Convert the selected file to base64
});



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
    occasionAPI.getAllOccasions().then(response => {
        const occasions = JSON.parse(response);

        // Map the fetched data to ModelOccasion instances
        const occasionModels = occasions.map(o => new ModelOccasion(o.occasionCode, o.occasionDesc));

        // Populate the select element with occasion codes
        populateOccasionSelect(occasionModels);
    })
    genderAPI.getAllGender().then(response => {
        const genders = JSON.parse(response);

        // Map the fetched data to ModelGender instances
        const genderModels = genders.map(g => new ModelGender(g.genderCode, g.genderDesc));

        // Populate the select element with gender codes
        populateGenderSelect(genderModels);
    })
}

function populateVarietySelect(varietyModels) {
    const varietySelect = document.getElementById('varietyEntity');
    varietyModels.forEach(variety => {
        const option = document.createElement('option');
        option.value = variety.varietyCode;
        option.textContent = variety.varietyDesc; // You can also set option.textContent to variety.varietyCode if you prefer
        // option.textContent = variety.varietyCode; // You can also set option.textContent to variety.varietyCode if you prefer
        varietySelect.appendChild(option);
    });
}

function populateOccasionSelect(occasionModels) {
    const occasionSelect = document.getElementById('occasionEntity');
    occasionModels.forEach(occasion => {
        const option = document.createElement('option');
        option.value = occasion.occasionCode;
        option.textContent = occasion.occasionDesc; // You can also set option.textContent to variety.varietyCode if you prefer
        // option.textContent = occasion.occasionCode; // You can also set option.textContent to variety.varietyCode if you prefer
        occasionSelect.appendChild(option);
    });
}

function populateGenderSelect(genderModels) {
    const genderSelect = document.getElementById('genderEntity');
    genderModels.forEach(gender => {
        const option = document.createElement('option');
        option.value = gender.genderCode;
        option.textContent = gender.genderDesc; // You can also set option.textContent to variety.varietyCode if you prefer
        // option.textContent = gender.genderCode; // You can also set option.textContent to variety.varietyCode if you prefer
        genderSelect.appendChild(option);
    });
}



document.addEventListener('DOMContentLoaded', () => {
    PopulateValues();
    loadItems()
});