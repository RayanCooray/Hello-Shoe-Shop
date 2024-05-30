import {VarietyAPI} from "./api/VarietyAPI.js";
import {OccasionAPI} from "./api/OccasionAPI.js";
import {GenderAPI} from "./api/GenderAPI.js";
import {ModelVariety} from "./model/Model-Variety.js";
import {ModelOccasion} from "./model/Model-Occasion.js";
import {ModelGender} from "./model/Model-Gender.js";

const varietyAPI = new VarietyAPI();
const occasionAPI = new OccasionAPI();
const genderAPI = new GenderAPI();
const modelVariety = new ModelVariety();
const modelOccasion = new ModelOccasion();
const modelGender = new ModelGender();

const save_Gender_button = $('#saveGenderButton');
const update_Gender_button = $('#updateGenderButton');
const delete_Gender_button = $('#deleteGenderButton');

const save_Occasion_button = $('saveOccasionButton');
const update_Occasion_button = $('updateOccasionButton');
const delete_Occasion_button = $('deleteOccasionButton');

const save_Variety_button = $('saveVarietyButton');
const update_Variety_button = $('updateVarietyButton');
const delete_Variety_button = $('deleteVarietyButton');



save_Gender_button.on('click', (event) => {
    event.preventDefault()
    const gender_code = $('#genderCode').val();
    const gender_desc = $('#genderDesc').val();
    let  gen_model = new ModelGender();

    gen_model = {
        genderCode : gender_code,
        genderDesc : gender_desc
    }
    genderAPI.saveGender(gen_model).then(r =>{
        alert(`Success: ${r}`);
        loadGenders();
    });

})

update_Gender_button.on('click', () => {
    event.preventDefault();
    const gender_code = $('#genderCode').val();
    const gender_desc = $('#genderDesc').val();
    let  gen_model = new ModelGender();

    gen_model = {
        genderCode : gender_code,
        genderDesc : gender_desc
    }
    genderAPI.updateGender(gen_model).then(r =>{
        alert(`Success: ${r}`);
        loadGenders()
    }).catch(error => {
        alert(`Error: ${error}`);
    })
})


delete_Gender_button.on('click', () => {
    const gender_code = $('#genderCode').val();
    genderAPI.deleteGender(gender_code).then(r => {
        alert(`Success: ${r}`);
        loadGenders();
    });
})
function loadGenders(key) {
    genderAPI.getAllGender().then(data => {
            const genders = JSON.parse(data);
            const tableBody = $('#Gender-table tbody');
            tableBody.empty(); // Clear existing rows

            genders.forEach(gender => {
                const row = $('<tr></tr>');
                row.append(`<td>${gender.genderCode}</td>`);
                row.append(`<td>${gender.genderDesc}</td>`);
                tableBody.append(row);

                row.on('click', () => {
                    localStorage.setItem('selected_gender_code', gender.genderCode);
                    alert(`Selected Gender: ${gender.genderCode}`)
                    const code = localStorage.getItem('selected_gender_code', gender.genderCode);
                    searchByGenderID(code)
                });
            });
        })
        .catch(error => {
            console.error('Error loading genders:', error);
        });
}

function searchByGenderID(code) {
    genderAPI.getGenderById(code).then(r => {
        const search_gender_result = JSON.parse(r)
        const code = search_gender_result.genderCode;
        $('#genderCode').val(code);
        $('#genderDesc').val(search_gender_result.genderDesc);

        if ( $('#genderModal').modal('show')){
            $('#saveGenderButton').prop('disabled', true);
        }else {
            $('#saveGenderButton').prop('disabled', false);
        }

    })
}

$(document).ready(() => {
    loadGenders();
});