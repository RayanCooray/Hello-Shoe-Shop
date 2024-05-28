import {SupplierAPI} from "./api/SupplierAPI.js";
import {ModelSupplier} from "./model/Model-Supplier.js";

const supplierAPI = new SupplierAPI();
let modelSupplier = new ModelSupplier();

const save_Supplier_Button = $('#saveSupplierButton');
const update_Supplier_Button = $('#updateSupplierButton');
const delete_Supplier_Button = $('#deleteSupplierButton');
// const supplier_id = $('#supplier-id').val();
// const supplier_name = $('#supplier_name').val();
// const category = $('#category').val();
// const address1 = $('#address_line_01').val();
// const address2 = $('#address_line_02').val();
// const address3 = $('#address_line_03').val();
// const address4 = $('#address_line_04').val();
// const address5 = $('#address_line_05').val();
// const address6 = $('#address_line_06').val();
// const contact_no1 = $('#contact_no_1').val();
// const contact_no2 = $('#contact_no_2').val();
// const email = $('#supplier_email').val();
//
// save_Supplier_Button.on('click', () => {
//     modelSupplier.supplier_id = supplier_id;
//     modelSupplier.supplier_name = supplier_name.val();
//     modelSupplier.category = category.val();
//     modelSupplier.address_line_01 = address1.val();
//     modelSupplier.address_line_02 = address2.val();
//     modelSupplier.address_line_03 = address3.val();
//     modelSupplier.address_line_04 = address4.val();
//     modelSupplier.address_line_05 = address5.val();
//     modelSupplier.address_line_06 = address6.val();
//     modelSupplier.contact_no_1 = contact_no1.val();
//     modelSupplier.contact_no_2 = contact_no2.val();
//     modelSupplier.email = email.val();
//     console.log(modelSupplier)
// })

$(document).ready(() => {
    loadSuppliers();
});


save_Supplier_Button.on('click', () => {
    const sup_id = $('#supplier_id').val();
    const supp_name = $('#supplier_name').val();
    const category = $('#category').val();
    const address1 = $('#address_line_01').val();
    const address2 = $('#address_line_02').val();
    const address3 = $('#address_line_03').val();
    const address4 = $('#address_line_04').val();
    const address5 = $('#address_line_05').val();
    const address6 = $('#address_line_06').val();
    const contact_no1 = $('#contact_no_1').val();
    const contact_no2 = $('#contact_no_2').val();
    const email = $('#supplier_email').val();

    // Validation
    let isValid = true;
    let errorMessage = '';

    if (!supp_name) {
        isValid = false;
        errorMessage += 'Supplier name is required.\n';
    }
    if (!category) {
        isValid = false;
        errorMessage += 'Category is required.\n';
    }
    if (!address1) {
        isValid = false;
        errorMessage += 'Address line 1 is required.\n';
    }
    if (!contact_no1) {
        isValid = false;
        errorMessage += 'Contact number 1 is required.\n';
    } else if (!validatePhoneNumber(contact_no1)) {
        isValid = false;
        errorMessage += 'Contact number 1 is not valid.\n';
    }
    if (contact_no2 && !validatePhoneNumber(contact_no2)) {
        isValid = false;
        errorMessage += 'Contact number 2 is not valid.\n';
    }
    if (!email) {
        isValid = false;
        errorMessage += 'Email is required.\n';
    } else if (!validateGmailOrOutlook(email)) {
        isValid = false;
        errorMessage += 'Email is not a valid Gmail or Outlook address.\n';
    }

    if (!isValid) {
        alert(errorMessage);
        return;
    }

    const modelSupplier = {
        supplier_id: sup_id,
        supplier_name: supp_name,
        category: category,
        address_line_01: address1,
        address_line_02: address2,
        address_line_03: address3,
        address_line_04: address4,
        address_line_05: address5,
        address_line_06: address6,
        contact_no_1: contact_no1,
        contact_no_2: contact_no2,
        email: email
    };
    supplierAPI.saveSupplier(modelSupplier).then(data => {
        alert(`Success: ${data}`);
        console.log(data);
    });
    // console.log(modelSupplier);
});


update_Supplier_Button.on('click', () => {
    const sup_id = $('#supplier_id').val();
    const supp_name = $('#supplier_name').val();
    const category = $('#category').val();
    const address1 = $('#address_line_01').val();
    const address2 = $('#address_line_02').val();
    const address3 = $('#address_line_03').val();
    const address4 = $('#address_line_04').val();
    const address5 = $('#address_line_05').val();
    const address6 = $('#address_line_06').val();
    const contact_no1 = $('#contact_no_1').val();
    const contact_no2 = $('#contact_no_2').val();
    const email = $('#supplier_email').val();

    // Validation
    let isValid = true;
    let errorMessage = '';

    if (!supp_name) {
        isValid = false;
        errorMessage += 'Supplier name is required.\n';
    }
    if (!category) {
        isValid = false;
        errorMessage += 'Category is required.\n';
    }
    if (!address1) {
        isValid = false;
        errorMessage += 'Address line 1 is required.\n';
    }
    if (!contact_no1) {
        isValid = false;
        errorMessage += 'Contact number 1 is required.\n';
    } else if (!validatePhoneNumber(contact_no1)) {
        isValid = false;
        errorMessage += 'Contact number 1 is not valid.\n';
    }
    if (contact_no2 && !validatePhoneNumber(contact_no2)) {
        isValid = false;
        errorMessage += 'Contact number 2 is not valid.\n';
    }
    if (!email) {
        isValid = false;
        errorMessage += 'Email is required.\n';
    } else if (!validateGmailOrOutlook(email)) {
        isValid = false;
        errorMessage += 'Email is not a valid Gmail or Outlook address.\n';
    }

    if (!isValid) {
        alert(errorMessage);
        return;
    }

    const modelSupplier = {
        supplierId: sup_id,
        supplier_name: supp_name,
        category: category,
        address_line_01: address1,
        address_line_02: address2,
        address_line_03: address3,
        address_line_04: address4,
        address_line_05: address5,
        address_line_06: address6,
        contact_no_1: contact_no1,
        contact_no_2: contact_no2,
        email: email
    };
    supplierAPI.updateSupplier(modelSupplier).then(data => {
        alert(`Success: ${data}`);
        console.log(data);
    });
    console.log(modelSupplier)
})

delete_Supplier_Button.on('click', () => {
    const sup_id = $('#supplier_id').val();
    console.log(sup_id)
    supplierAPI.deleteSupplier(sup_id).then(data => {
        alert(`Success: ${data}`);
    });
})

function searchandSetSupplier(supplier_g_id) {
    supplierAPI.SearchAndSetSupplier(supplier_g_id).then(r => {

        const search_sup_result = JSON.parse(r)
        const code = search_sup_result.supplierId;
        $('#supplier_id').val(code);
        $('#supplier_name').val(search_sup_result.supplier_name);
        $('#category').val(search_sup_result.category);
        $('#address_line_01').val(search_sup_result.address_line_01);
        $('#address_line_02').val(search_sup_result.address_line_02);
        $('#address_line_03').val(search_sup_result.address_line_03);
        $('#address_line_04').val(search_sup_result.address_line_04);
        $('#address_line_05').val(search_sup_result.address_line_05);
        $('#address_line_06').val(search_sup_result.address_line_06);
        $('#contact_no_1').val(search_sup_result.contact_no_1);
        $('#contact_no_2').val(search_sup_result.contact_no_2);
        $('#supplier_email').val(search_sup_result.email);


        // $('#supplierModal').modal('show');
        if ( $('#supplierModal').modal('show')){
            $('#saveSupplierButton').prop('disabled', true);
        }else {
            $('#saveSupplierButton').prop('disabled', false);
        }
    });
}



function loadSuppliers() {
    supplierAPI.loadSupplierTable().then(response => {
        const suppliers = JSON.parse(response);

        const tableBody = $('#supplier-table tbody');
        tableBody.empty(); // Clear existing rows

        if (!Array.isArray(suppliers)) {
            console.error('Suppliers data is not an array:', suppliers);
            return;
        }

        suppliers.forEach(supplier => {
            const row = $('<tr onclick="selectSupplier(this)"></tr>');
            row.append(`<td>${supplier.supplierId}</td>`);
            row.append(`<td>${supplier.supplier_name}</td>`);
            row.append(`<td>${supplier.category}</td>`);
            row.append(`<td>${supplier.address_line_01}</td>`);
            row.append(`<td>${supplier.address_line_02}</td>`);
            row.append(`<td>${supplier.address_line_03}</td>`);
            row.append(`<td>${supplier.address_line_04}</td>`);
            row.append(`<td>${supplier.address_line_05}</td>`);
            row.append(`<td>${supplier.address_line_06}</td>`);
            row.append(`<td>${supplier.contact_no_1}</td>`);
            row.append(`<td>${supplier.contact_no_2}</td>`);
            row.append(`<td>${supplier.email}</td>`);
            tableBody.append(row);
            row.on('click', () => {
                localStorage.setItem('supplier_id', supplier.supplierId);
                const supplier_g_id =localStorage.getItem('supplier_id');
                searchandSetSupplier(supplier_g_id)
                console.log(supplier_g_id)

            });
        });
        
    }).catch(error => {
        console.error('Error loading suppliers:', error);
    });
}




function validatePhoneNumber(number) {
    const sriLankaPhonePattern = /^(0\d{2} \d{3} \d{4}|07\d \d{3} \d{4})$/;
    return sriLankaPhonePattern.test(number);
}

function validateGmailOrOutlook(email) {
    const emailPattern = /^[^\s@]+@(gmail\.com|outlook\.com)$/;
    return emailPattern.test(String(email).toLowerCase());
}