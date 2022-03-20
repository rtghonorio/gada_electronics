// Copyright (c) 2022, Russell Todd Honorio and contributors
// For license information, please see license.txt

frappe.ui.form.on('Purchase Invoice', {
	setup(frm) {
        frm.set_query('supplier', () => {
            return {
                filters: {
                    party_type: 'Supplier'
                }
            };
        }); 
			frm.set_query('credit_to', () => {
            return {
                filters: {
                    account_type: 'Liability',
                    is_group: 0
                    }
                };
        });          
            frm.set_query('expense_account', () => {
            return {
                filters: {
                    account_type: 'Expense',
                    is_group: 0
                }
            };
        });
    frm.add_fetch('item','selling_rate','rate')
	}
})

frappe.ui.form.on('Purchase Item Table', {
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
        frm.refresh_field('total_qty');
        frm.refresh_field('total_amount');
    },
    rate:function(frm, cdt, cdn){
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
        frm.refresh_field('total_qty');
        frm.refresh_field('total_amount');
    },
    amount:function(frm, cdt, cdn){
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
        frm.refresh_field('total_qty');
        frm.refresh_field('total_amount');
    }
    
});