export class SupplierAPI{

    saveSupplier(modelSupplier) {
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
            for (const key in modelSupplier) {
                if (modelSupplier.hasOwnProperty(key)) {
                    formData.append(key, modelSupplier[key]);
                }
            }


            http.open("POST", "http://localhost:9090/ShoeShop/api/v1/supplier", true);
            http.send(formData);
        });
    }

    loadSupplierTable() {
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
            http.open("GET", "http://localhost:9090/ShoeShop/api/v1/supplier/getAllSuppliers", true);
            // http.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);
            // console.log(localStorage.getItem('token'));
            http.send();
        });
    }

    SearchAndSetSupplier(supplier_g_id) {
        return new Promise(function(resolve, reject) {
            const http = new XMLHttpRequest();
            const url = `http://localhost:9090/ShoeShop/api/v1/supplier/${supplier_g_id}`;

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

    updateSupplier(modelSupplier) {
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

            // Create FormData object and append the modelEmployee properties
            const formData = new FormData();
            for (const key in modelSupplier) {
                if (modelSupplier.hasOwnProperty(key)) {
                    formData.append(key, modelSupplier[key]);
                }
            }

            http.open("PATCH", "http://localhost:9090/ShoeShop/api/v1/supplier", true);
            // Do not set the Content-Type header manually
            http.send(formData);
        });
    }

    deleteSupplier(sup_id) {
        return new Promise(function(resolve, reject) {
            const http = new XMLHttpRequest();
            const url = `http://localhost:9090/ShoeShop/api/v1/supplier/${sup_id}`;

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