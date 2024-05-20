export class UserAPI {
    signup(userModel) {
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

            http.open("POST", "http://localhost:9090/ShoeShop/api/v1/user/signup", true);
            http.setRequestHeader("Content-Type", "application/json");
            http.send(JSON.stringify(userModel));
        });
    }

    login(loginUser) {
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

            http.open("POST", "http://localhost:9090/ShoeShop/api/v1/user/signin", true);
            http.setRequestHeader("Content-Type", "application/json");
            http.send(JSON.stringify(loginUser));
        });
    }
}
