export class ModelStock{
    constructor(stockId, qty,unitBuyingPrice,unitSellingPrice,branch,supplierEntity,itemEntity,suppliedDate) {
        this.stockId = stockId;
        this.qty = qty;
        this.unitBuyingPrice = unitBuyingPrice;
        this.unitSellingPrice = unitSellingPrice;
        this.branch = branch;
        this.supplierEntity = supplierEntity;
        this.itemEntity = itemEntity;
        this.suppliedDate = suppliedDate;
    }
}