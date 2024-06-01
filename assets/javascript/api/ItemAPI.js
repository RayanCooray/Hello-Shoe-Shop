export class ItemAPI{

    saveItem(modelItem) {
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

            const formData = new FormData();
            for (const key in modelItem) {
                if (modelItem.hasOwnProperty(key)) {
                    formData.append(key, modelItem[key]);
                }
            }

            http.open("POST", "http://localhost:9090/ShoeShop/api/v1/item", true);
            http.send(formData);
        });
    }

    getAllItems() {
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
            http.open("GET", "http://localhost:9090/ShoeShop/api/v1/item/getAllItems", true);
            // http.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);
            // console.log(localStorage.getItem('token'));
            http.send();
        });
    }

    searchItemByItemId(selected_item_id) {

    }
}