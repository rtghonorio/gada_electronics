// Copyright (c) 2022, Russell Todd Honorio and contributors
// For license information, please see license.txt

frappe.ui.form.on('Sales Invoice', {
	refresh(frm, cdt, cdn) {  
        var total_qty = 0; 
        var total_amt = 0;
        var item_amount = 0;
        var child = locals[cdt][cdn];
        frm.set_query('customer', () => {
            return {
                filters: {
                    party_type: 'Customer'
                }
            };
        });   
		frm.set_query('debit_to', () => {
            return {
                filters: {
                    account_type: 'Asset',
                    is_group: 0
                }
            };
        });          
        frm.set_query('income_account', () => {
            return {
                filters: {
                    account_type: 'Income',
                    is_group: 0
                }
            };
        });
        frm.add_fetch('item','selling_rate','rate');
        frm.doc.item_table.forEach(function(child) { 
            item_amount = child.qty * child.rate;  
            child.amount = item_amount;
            total_qty += child.qty;  
            total_amt += item_amount;    
            child.amount = item_amount;
        });
        frm.set_value("total_qty", total_qty);
        frm.set_value("total_amount", total_amt);
	}
})
frappe.ui.form.on('Sales Item Table', {
    item:function(frm, cdt, cdn){
        frm.refresh();
    },
	qty:function(frm, cdt, cdn){
        var child = locals[cdt][cdn];
        var total_qty = 0; 
        var total_amt = 0;
        var item_amount = 0;
        frm.doc.item_table.forEach(function(child) { 
            item_amount = child.qty * child.rate;  
            child.amount = item_amount;
            total_qty += child.qty;  
            total_amt += item_amount; 
        });
        frm.set_value("total_qty", total_qty);
        frm.set_value("total_amount", total_amt);
        frm.refresh();
    },
    rate:function(frm, cdt, cdn){
        frm.refresh();
    }
});