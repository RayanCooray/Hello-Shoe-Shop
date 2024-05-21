import {CustomerAPI} from "./api/CustomerAPI.js";
import {ModelCustomer} from "./model/Model-Customer.js";

const customerAPI = new CustomerAPI();
const modelCustomer = new ModelCustomer();

// const customer_name = document.getElementById('customer-name');
// const customer_DOB = document.getElementById('date-of-birth-customer');
// const gender = document.getElementById('gender-customer');
// const total_points = document.getElementById('total-points');
// const address1 = document.getElementById('address1-customer');
// const address2 = document.getElementById('address2-customer');
// const address3 = document.getElementById('address3-customer');
// const address4 = document.getElementById('address4-customer');
// const address5 = document.getElementById('address5-customer');
// const contact = document.getElementById('contact-number-customer');
// const customer_email = document.getElementById('email-customer');
// const purchase_time_date = document.getElementById('p-date&time-customer')

const customer_name = $('#customer-name');
const customer_DOB = $('#date-of-birth-customer');
const gender = $('#gender-customer');
const joined_date = $('#date-of-joining-customer');
const total_points = $('#total-points');
const address1 = $('#address1-customer');
const address2 = $('#address2-customer');
const address3 = $('#address3-customer');
const address4 = $('#address4-customer');
const address5 = $('#address5-customer');
const contact = $('#contact-number-customer');
const customer_email = $('#email-customer');
const purchase_date_time = $('#datetime-customer');
const add_customer_button = $('#add-customer-button');
const update_customer_button = $('#update-customer-button');
const delete_customer_button = $('#delete-update-button');


add_customer_button.on('click', () => {
    modelCustomer.customerCode = customer_name.val();
    modelCustomer.DOB = customer_DOB.val();
    modelCustomer.gender = gender.val();
    modelCustomer.joined_date = joined_date.val();
    modelCustomer.total_points = total_points.val();
    modelCustomer.address_line_01 = address1.val();
    modelCustomer.address_line_02 = address2.val();
    modelCustomer.address_line_03 = address3.val();
    modelCustomer.address_line_04 = address4.val();
    modelCustomer.address_line_05 = address5.val();
    modelCustomer.contact = contact.val();
    modelCustomer.email = customer_email.val();
    modelCustomer.purchase_date_time = purchase_date_time.val();
    // console.log(modelCustomer);

    customerAPI.saveCustomer(modelCustomer)
        .then(response => {
            alert(`Success: ${response}`);

        })
        .catch(error => {
            alert(`Error: ${error.message}`);
        });

});


function search_andsetCustomer(customer_g_id) {
    customerAPI.searchCustomer(customer_g_id)
        .then(response => {
            // Parse the JSON response
            const customerData = JSON.parse(response);

            // Set field values with retrieved data
            customer_name.val(customerData.customer_name);
            customer_DOB.val(customerData.DOB);
            gender.val(customerData.gender);
            joined_date.val(customerData.joined_date);
            total_points.val(customerData.total_points);
            address1.val(customerData.address_line_01);
            address2.val(customerData.address_line_02);
            address3.val(customerData.address_line_03);
            address4.val(customerData.address_line_04);
            address5.val(customerData.address_line_05);
            contact.val(customerData.contact);
            customer_email.val(customerData.email);
            purchase_date_time.val(customerData.purchase_date_time);
            
            
            
            // update method
            update_customer_button.on('click',() => {
                modelCustomer.customerCode = customer_g_id;
                modelCustomer.customer_name = customer_name.val();
                modelCustomer.DOB = customer_DOB.val();
                modelCustomer.gender = gender.val();
                modelCustomer.joined_date = joined_date.val();
                modelCustomer.total_points = total_points.val();
                modelCustomer.address_line_01 = address1.val();
                modelCustomer.address_line_02 = address2.val();
                modelCustomer.address_line_03 = address3.val();
                modelCustomer.address_line_04 = address4.val();
                modelCustomer.address_line_05 = address5.val();
                modelCustomer.contact = contact.val();
                modelCustomer.email = customer_email.val();
                modelCustomer.purchase_date_time = purchase_date_time.val();
                console.log(modelCustomer)
                customerAPI.update(modelCustomer).then(r => {
                    alert(`Success: ${r}`);
                }).catch(
                    error => {
                        alert(`Error: ${error.message}`);
                    }
                )
            })
            
            // delete method
            delete_customer_button.on('click',() => {
                customerAPI.delete(customer_g_id).then(r => {
                    alert(`Success deleted: ${r}`);
                }).catch(
                    error => {
                        alert(`Error: ${error.message}`);
                    }
                )
            })
            // Optionally, you can trigger change events if necessary
            customer_name.trigger('change');
            customer_DOB.trigger('change');
            gender.trigger('change');
            // Repeat for other fields...

            alert("Customer data successfully retrieved and set!");
            add_customer_button.prop('disabled', true);
        })
        .catch(error => {
            alert(`Error: ${error.message}`);
        });
}

customerAPI.getAllCustomersToTable()
    .then(responseText => {
        // console.log(responseText);
        let customer_DB = JSON.parse(responseText);
        let customer_table = $('#customerTable');
        customer_table.empty();
        customer_DB.forEach(customer => {
            let row = $('<tr onclick="selectCustomer(this)"></tr>');
            row.append(`<td>${customer.customerCode}</td>`);
            row.append(`<td>${customer.customer_name}</td>`);
            row.append(`<td>${customer.contact}</td>`);
            row.append(`<td>${customer.email}</td>`);
            customer_table.append(row);
            row.on('click', () => {
                localStorage.setItem('customer_id', customer.customerCode);
                const customer_g_id =localStorage.getItem('customer_id');
                search_andsetCustomer(customer_g_id)
                
            });
        })
    })
    .catch(error => {
        console.error(error);
    });


function call_customer_id(){
const customer_id = localStorage.getItem('customer_id');
console.log(`Received Customer ID: ${customer_id}`);
}
