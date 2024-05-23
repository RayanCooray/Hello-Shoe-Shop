export class EmployeeAPI {

    add(modelEmployee) {
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
            for (const key in modelEmployee) {
                if (modelEmployee.hasOwnProperty(key)) {
                    formData.append(key, modelEmployee[key]);
                }
            }

            http.open("POST", "http://localhost:9090/ShoeShop/api/v1/employee", true);
            // Do not set the Content-Type header manually
            http.send(formData);
        });
    }

    searchEmployee(employeeId) {
        return new Promise(function(resolve, reject) {
            const http = new XMLHttpRequest();
            const url = `http://localhost:9090/ShoeShop/api/v1/employee/${employeeId}`;

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

    update(modelEmployee) {}
}
