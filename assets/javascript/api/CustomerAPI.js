export class CustomerAPI {

    saveCustomer(modelCustomer) {
        return new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();

            http.onreadystatechange = () => {
                if (http.readyState === 4) {
                    if (http.status === 200) {
                        resolve(http.responseText);
                    } else {
                        reject(new Error(`HTTP request failed with status ${http.status}`));
                    }
                }
            };

            // Create FormData object and append the modelCustomer properties
            const formData = new FormData();
            for (const key in modelCustomer) {
                if (modelCustomer.hasOwnProperty(key)) {
                    formData.append(key, modelCustomer[key]);
                }
            }

            http.open("POST", "http://localhost:9090/ShoeShop/api/v1/customer", true);
            // Do not set the Content-Type header manually
            http.send(formData);
        });
    }

    getAllCustomersToTable() {
        return new Promise((resolve,reject)=>{
            const http = new XMLHttpRequest();
            http.onreadystatechange = () => {
                if (http.readyState === 4) {
                    if (http.status === 200) {
                        resolve(http.responseText);
                    } else {
                        reject(new Error(`HTTP request failed with status ${http.status}`));
                    }
                }
            }
            http.open("GET", "http://localhost:9090/ShoeShop/api/v1/customer/getAllCustomers", true);
            http.send();
        });
    }

    searchCustomer(customer_g_id) {
        return new Promise(function(resolve, reject) {
            const http = new XMLHttpRequest();
            const url = `http://localhost:9090/ShoeShop/api/v1/customer/${customer_g_id}`;

            http.onreadystatechange = () => {
                if (http.readyState === 4) {
                    if (http.status === 200) {
                        resolve(http.responseText);
                    } else {
                        reject(new Error(`HTTP request failed with status ${http.status}`));
                    }
                }
            };

            http.open("GET", url, true);
            http.send();
        });
    }

    update(modelCustomer) {
        return new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();
            http.onreadystatechange = () => {
                if (http.readyState === 4) {
                    if (http.status === 200) {
                        resolve(http.responseText);
                    } else {
                        reject(new Error(`HTTP request failed with status ${http.status}`));
                    }
                }
            }
            http.open("PATCH", "http://localhost:9090/ShoeShop/api/v1/customer", true);
            http.setRequestHeader("Content-Type","application/json");
            http.send(JSON.stringify(modelCustomer));
        });
    }

    delete(customer_g_id) {
        return new Promise(function(resolve, reject) {
            const http = new XMLHttpRequest();
            const url = `http://localhost:9090/ShoeShop/api/v1/customer/${customer_g_id}`;

            http.onreadystatechange = () => {
                if (http.readyState === 4) {
                    if (http.status === 200) {
                        resolve(http.responseText);
                    } else {
                        reject(new Error(`HTTP request failed with status ${http.status}`));
                    }
                }
            };

            http.open("DELETE", url, true);
            http.send();
        });
    }
}
