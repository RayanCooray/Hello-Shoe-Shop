export class OccasionAPI{

    saveOccasion(occ_model) {
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
            http.open('POST', 'http://localhost:9090/ShoeShop/api/v1/inset/saveOccasion', true);
            http.setRequestHeader('Content-Type', 'application/json');
            http.send(JSON.stringify(occ_model));
        });
    }

    getAllOccasions() {
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
            http.open('GET', 'http://localhost:9090/ShoeShop/api/v1/inset/getAllOccasions', true);
            http.setRequestHeader('Content-Type', 'application/json');
            http.send();
        });
    }

    getOccasionById(code) {
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
            http.open('GET', `http://localhost:9090/ShoeShop/api/v1/inset/getOccasion/${code}`, true);
            http.setRequestHeader('Content-Type', 'application/json');
            http.send();
        });
    }

    updateOccasion(occ_model) {
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
            http.open('PATCH', 'http://localhost:9090/ShoeShop/api/v1/inset/updateOccasion', true);
            http.setRequestHeader('Content-Type', 'application/json');
            http.send(JSON.stringify(occ_model));
        });
    }

    deleteOccasion(occasion_code) {
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
            http.open('DELETE', `http://localhost:9090/ShoeShop/api/v1/inset/deleteOccasion/${occasion_code}`, true);
            http.setRequestHeader('Content-Type', 'application/json');
            http.send();
        });
    }
}
