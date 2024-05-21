export class ModelCustomer {
    constructor(customerCode,customer_name,DOB,gender,joined_date,total_points,level,address_line_01,address_line_02,address_line_03,address_line_04,address_line_05,contact,email,purchase_date_time) {
        this.customerCode = customerCode;
        this.customer_name = customer_name;
        this.DOB = DOB;
        this.gender = gender;
        this.joined_date = joined_date;
        this.total_points = total_points;
        this.address_line_01 = address_line_01;
        this.address_line_02 = address_line_02;
        this.address_line_03 = address_line_03;
        this.address_line_04 = address_line_04;
        this.address_line_05 = address_line_05;
        this.contact = contact;
        this.email = email;
        this.purchase_date_time = purchase_date_time;


    }
}