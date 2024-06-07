import {StocksAPI} from "./api/Stocks-API.js";
import {ModelStock} from "./model/Model-Stock.js";
import {ItemAPI} from "./api/ItemAPI.js";
import {SupplierAPI} from "./api/SupplierAPI.js";

const saveStockButton = $('#saveStockButton');
const updateStockButton = $('#updateStockButton');
const deleteStockButton = $('#deleteStockButton');

function populateValueItem() {
    const itemapi = new ItemAPI();
    itemapi.getAllItems().then(r => {
        const result = JSON.parse(r);
        console.log(result);

        // Get the combo box element
        const itemSelect = document.getElementById('Item-form');

        // Clear any existing options (except the default one)
        itemSelect.innerHTML = '<option value="" disabled selected>Enter Item</option>';

        // Populate the combo box with item codes
        result.forEach(item => {
            const option = document.createElement('option');
            option.value = item.itemCode;  // Use itemCode as the value
            option.textContent = item.itemCode; // Display itemCode as the text
            itemSelect.appendChild(option);
        });
    }).catch(error => {
        console.error("Error fetching items:", error);
    });
}

function populateValueSupplier() {
    const supAPI = new SupplierAPI();
    supAPI.loadSupplierTable().then(r => {
        const result = JSON.parse(r);
        console.log(result);

        // Get the combo box element
        const supplierSelect = document.getElementById('supplierEntity-form');

        // Clear any existing options (except the default one)
        supplierSelect.innerHTML = '<option value="" disabled selected>Enter Supplier</option>';

        // Populate the combo box with supplier IDs
        result.forEach(supplier => {
            const option = document.createElement('option');
            option.value = supplier.supplierId;  // Use supplierId as the value
            option.textContent = supplier.supplierId; // Display supplierId as the text
            supplierSelect.appendChild(option);
        });
    }).catch(error => {
        console.error("Error fetching suppliers:", error);
    });
}

function PopulateValuesofStocks() {
    populateValueItem()
    populateValueSupplier()

}



function loadStocks() {
    const stk = new StocksAPI();
    stk.getAllStocks().then(r => {
        const allstocks = JSON.parse(r);
        console.log(allstocks)
        const tableBody = document.querySelector('#stock-table tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        allstocks.forEach(stock => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${stock.stockId}</td>
                <td>${stock.qty}</td>
                <td>${stock.unitBuyingPrice}</td>
                <td>${stock.unitSellingPrice}</td>
                <td>${stock.branch}</td>
                <td>${stock.supplierEntity.supplierId}</td>
                <td>${stock.itemEntity.itemCode}</td>
                <td>${stock.suppliedDate}</td>
            `;
            tableBody.appendChild(row);

            // Add click event listener to each row
            row.addEventListener('click', () => {
                $('#stockId').val(stock.stockId);
                $('#qty').val(stock.qty);
                $('#unitBuyingPrice').val(stock.unitBuyingPrice);
                $('#unitSellingPrice').val(stock.unitSellingPrice);
                $('#stock-branch').val(stock.branch);
                $('#supplierEntity-form').val(stock.supplierEntity.supplierId);
                $('#Item-form').val(stock.itemEntity.itemCode);
                $('#supplied-date').val(stock.suppliedDate);
                // localStorage.setItem('stock_ID', stock.stockId);
                // const stocksearchID = localStorage.getItem('stock_ID');
                // searchAndSetStock(stocksearchID);
                // alert(stocksearchID);
                // console.log(stocksearchID);
                
                if ( $('#StockModal').modal('show')){
                    $('#saveStockButton').prop('disabled', true);
                }else {
                    $('#saveStockButton').prop('disabled', false);
                }
            });
        });
    });
}




document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('form-stocks');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                PopulateValuesofStocks();
                loadStocks()
                observer.disconnect(); // Stop observing after loading suppliers
            }
        });
    }, { threshold: 0.1 }); // Adjust threshold as needed

    observer.observe(section);
});



saveStockButton.on('click', () => {
    const stockId = document.getElementById('stockId').value;
    const qty = document.getElementById('qty').value;
    const unitBuyingPrice = document.getElementById('unitBuyingPrice').value;
    const unitSellingPrice = document.getElementById('unitSellingPrice').value;
    const supplierEntity = document.getElementById('supplierEntity-form').value;
    const itemEntity = document.getElementById('Item-form').value;
    const suppliedDate = document.getElementById('supplied-date').value;
    const branch = document.getElementById('stock-branch').value;

    const newStock = new ModelStock(stockId, qty, unitBuyingPrice, unitSellingPrice, branch, supplierEntity, itemEntity, suppliedDate);

    console.log(newStock)
    const stocksAPI = new StocksAPI();
    stocksAPI.saveStock(newStock)
        .then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Supplier updated successfully: ${response}`
            });
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Error updating supplier: ${error.message}`
            });
        });
});


updateStockButton.on('click', () => {
    const stockId = document.getElementById('stockId').value;
    const qty = document.getElementById('qty').value;
    const unitBuyingPrice = document.getElementById('unitBuyingPrice').value;
    const unitSellingPrice = document.getElementById('unitSellingPrice').value;
    const supplierEntity = document.getElementById('supplierEntity-form').value;
    const itemEntity = document.getElementById('Item-form').value;
    const suppliedDate = document.getElementById('supplied-date').value;
    const branch = document.getElementById('stock-branch').value;

    const newStock = new ModelStock(stockId, qty, unitBuyingPrice, unitSellingPrice, branch, supplierEntity, itemEntity, suppliedDate);

    console.log(newStock)
    const stocksAPI = new StocksAPI();
    stocksAPI.updateStock(newStock)
        .then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Supplier updated successfully: ${response}`
            });
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Error updating supplier: ${error.message}`
            });
        });
    //
    // Swal.fire({
    //     icon: 'success',
    //     title: 'Success',
    //     text: `${r}`,
    //     confirmButtonText: 'OK'
    // }).then(() => {
    //     // Reload items after OK is clicked
    //     loadItems();
    // });
});


deleteStockButton.on('click', () => {
    const stockId = document.getElementById('stockId').value;

    // Display confirmation dialog
    Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete this stock. This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            // User confirmed deletion
            const stocksAPI = new StocksAPI();
            stocksAPI.deleteStock(stockId)
                .then(response => {
                    Swal.fire({
                        icon:'success',
                        title: 'Success',
                        text: `Stock deleted successfully: ${response}`
                    });
                    // Optionally reload items after deletion
                    // loadItems();
                    loadStocks()
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Error deleting stock: ${error.message}`
                    });
                });
        }
    });
});


