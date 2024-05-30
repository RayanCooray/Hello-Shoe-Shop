export class ModelItem{
    constructor(itemCode, itemDesc,item_qty,item_pic, status, stocks, occasionEntity, varietyEntity, genderEntity) {
        this.itemCode = itemCode;
        this.item_desc = itemDesc;
        this.item_qty = item_qty;
        this.item_pic = item_pic;
        this.status = status;
        this.stocks = stocks;
        this.occasionEntity = occasionEntity;
        this.varietyEntity = varietyEntity;
        this.genderEntity = genderEntity;
    }
}