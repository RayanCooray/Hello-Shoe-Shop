export class StocksAPI{
    saveStock(newStock) {
        return new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();

            http.onreadystatechange = () => {
                if (http.readyState === 4) {
                    if (http.status === 200) {
                    } else {
                        reject(new Error(`HTTP  request failed with status ${http.status}`));
                    }
                }
            };

            const token = localStorage.getItem('token');
            http.open("POST", "http://localhost:9090/ShoeShop/api/v1/stock/StockSave", true);
            http.setRequestHeader("Content-Type", "application/json");
            http.setRequestHeader("Authorization", `Bearer ${token}`);
            http.send(JSON.stringify(newStock));
        });
    }

    getAllStocks() {
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
            const token = localStorage.getItem('token');
            http.open('GET', 'http://localhost:9090/ShoeShop/api/v1/stock/getAllStock', true);
            http.setRequestHeader('Content-Type', 'application/json');
            http.setRequestHeader("Authorization", `Bearer ${token}`);
            http.send();
        });
    }

    updateStock(newStock) {
        return new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();

            http.onreadystatechange = () => {
                if (http.readyState === 4) {
                    if (http.status === 200) {
                    } else {
                        reject(new Error(`HTTP  request failed with status ${http.status}`));
                    }
                }
            };

            const token = localStorage.getItem('token');
            http.open("PUT", "http://localhost:9090/ShoeShop/api/v1/stock/StockUpdate", true);
            http.setRequestHeader("Content-Type", "application/json");
            http.setRequestHeader("Authorization", `Bearer ${token}`);
            http.send(JSON.stringify(newStock));
        });
    }

    deleteStock(stockId) {
        return new Promise(function(resolve, reject) {
            const http = new XMLHttpRequest();
            const url = `http://localhost:9090/ShoeShop/api/v1/stock/deleteStock/${stockId}`;

            http.onreadystatechange = () => {
                if (http.readyState === 4) {
                    if (http.status === 200) {
                        resolve(http.responseText);
                    } else {
                        reject(new Error(`HTTP request failed with status ${http.status}`));
                    }
                }
            };

            const token = localStorage.getItem('token');
            http.open("DELETE", url, true);
            http.setRequestHeader("Authorization", `Bearer ${token}`);
            http.send();
        });


    }
}