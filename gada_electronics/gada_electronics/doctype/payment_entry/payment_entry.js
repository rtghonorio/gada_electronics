// Copyright (c) 2022, Russell Todd Honorio and contributors
// For license information, please see license.txt

frappe.ui.form.on('Payment Entry', {
	refresh: function(frm) {
		frm.set_query('party_type', () => {
            return {
                filters: {
                    name: 'Party'
                }
            };
        });
        frm.set_query('paid_from', () => {
            return {
                filters: {
                    is_group: 0,
                    account_type: 'Asset'
                }
            };
        });
        if (frm.doc.payment_type == "Receive"){
            frm.set_query('paid_to', () => {
                return {
                    filters: {
                        is_group: 0,
                        account_type: 'Asset'
                    }
                };
            });
        }  
        if (frm.doc.payment_type == "Pay"){
            frm.set_query('paid_to', () => {
                return {
                    filters: {
                        is_group: 0,
                        account_type: 'Liability'
                    }
                };
            });
        }
	},
    payment_type:function(frm){ 
        frm.refresh();
    }
});
