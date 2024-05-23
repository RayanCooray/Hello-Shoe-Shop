import { EmployeeAPI } from "./api/EmployeeAPI.js";
import { ModelEmployee } from "./model/Model-Employee.js";

const employeeAPI = new EmployeeAPI();
let modelEmployee = new ModelEmployee();



// Other parts of your code
$(document).ready(function () {
    const employee_saveButton = $("#save-button-modal");

    employee_saveButton.on('click', (event) => {
        event.preventDefault(); // Prevent form from submitting the default way

        const employee_name = $("#emName").val();
        const employee_gender = $("#gender").val();
        const employee_DOB = $("#date_of_birth").val();
        const employee_tel = $("#contact_no").val();
        const employee_em_tel = $("#emergency_contact_no").val();
        const employee_accessRole = $("#accessRole").val();
        const employee_designation = $("#designation").val();
        const employee_name_of_the_guardian = $("#name_of_the_guardian").val();
        const employee_date_of_joining = $("#date_of_joining").val();
        const employee_address1 = $("#address1").val();
        const employee_address2 = $("#address2").val();
        const employee_address3 = $("#address3").val();
        const employee_address4 = $("#address4").val();
        const employee_postal_code = $("#postalCode").val();
        const employee_branch = $("#branch").val();
        const employee_status = $("#status").val();
        const employee_email = $("#email").val();
        const employee_dp = document.getElementById('profile_picture').files[0];

        // Convert the profile picture to a Base64 string
        if (employee_dp) {
            const reader = new FileReader();
            reader.readAsDataURL(employee_dp);
            reader.onload = function () {
                const employee_dp_base64 = reader.result;

                modelEmployee = {
                    name: employee_name,
                    gender: employee_gender,
                    date_of_birth: employee_DOB,
                    contact_no: employee_tel,
                    emergency_contact_no: employee_em_tel,
                    profile_picture: employee_dp_base64, // Use the Base64 string
                    accessRole: employee_accessRole,
                    designation: employee_designation,
                    name_of_the_guardian: employee_name_of_the_guardian,
                    date_of_joining: employee_date_of_joining,
                    address1: employee_address1,
                    address2: employee_address2,
                    address3: employee_address3,
                    address4: employee_address4,
                    postalCode: employee_postal_code,
                    branch: employee_branch,
                    status: employee_status,
                    email: employee_email
                };

                console.log("Employee Data Object:", modelEmployee); // Log the entire employee data object

                // $.ajax({
                //     url: 'YOUR_API_ENDPOINT_HERE', // Replace with your API endpoint
                //     type: 'POST',
                //     contentType: 'application/json',
                //     data: JSON.stringify(employeeData),
                //     success: function(response) {
                //         console.log('Employee added successfully', response);
                //         // You can add further logic here to handle successful response
                //     },
                //     error: function(xhr, status, error) {
                //         console.error('Error adding employee', error);
                //         // You can add further logic here to handle errors
                //     }
                // });

                employeeAPI.add(modelEmployee).then(r => {
                    alert(`Success: ${r}`);
                    updateEmployeeTable();
                })


            };
            reader.onerror = function (error) {
                console.error('Error reading file:', error);
            };
        } else {
            console.error('No file selected for profile picture.');
        }
    });
});


function updateEmployeeTable() {
    $.ajax({
        url: 'http://localhost:9090/ShoeShop/api/v1/employee/getEmployees', // Endpoint to fetch employees from the server
        type: 'GET',
        success: function(data) {
            // Clear existing table rows
            $('#emp-table tbody').empty();
            console.log(data)

            // Append new rows with employee data
            data.forEach(function(employee) {
                $('#emp-table tbody').append(`
                            <tr>
                                <td>${employee.code}</td>
                                <td>${employee.name}</td>
                                <td>${employee.gender}</td>
                                <td>${employee.accessRole}</td>
                                <td>${employee.name_of_the_guardian}</td>
                                <td>${employee.branch}</td>
                                <td>${employee.designation}</td>
                                <td>${employee.email}</td>
                            </tr>
                        `);
            });
        },
        error: function(err) {
            console.error('Error fetching employees:', err);
        }
    });
}

// Call updateEmployeeTable when the page loads
$(document).ready(function() {
    updateEmployeeTable();
});