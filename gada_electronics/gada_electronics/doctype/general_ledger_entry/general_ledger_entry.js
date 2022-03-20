// Copyright (c) 2022, Russell Todd Honorio and contributors
// For license information, please see license.txt

frappe.ui.form.on('General Ledger Entry', {
	refresh: function(frm, cdt, cdn) {
		var child = locals[cdt][cdn];
		var _profit = 0;
		frm.add_fetch('account','account_type','account_type')
	},
	debit_amount: function(frm, cdt, cdn) {
		var field = locals[cdt][cdn];
		var _profit = 0;
		if(field.account_type == 'Expense' || field.account_type == 'Income'){
			_profit = (field.credit_amount - field.debit_amount);
		}
		frm.set_value("profit", _profit);
		frm.refresh();
	},
	credit_amount: function(frm, cdt, cdn) {
		var field = locals[cdt][cdn];
		var _profit = 0;
		if(field.account_type == 'Expense' || field.account_type == 'Income'){
			_profit = (field.credit_amount - field.debit_amount);
		}
		frm.set_value("profit", _profit);
		frm.refresh();
	}
});
