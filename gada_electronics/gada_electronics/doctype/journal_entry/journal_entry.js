frappe.ui.form.on('Journal Entry', {
	refresh(frm, cdt, cdn) {
        frm.add_fetch('account','account_type','account_type');
        var child = locals[cdt][cdn];
        var overall_debit = 0; 
        var overall_credit = 0;
        var diff = 0;
        var overall_profit = 0;
        frm.doc.entry_table.forEach(function(child) { 
            overall_debit += child.debit;  
            overall_credit += child.credit; 
			diff = overall_debit - overall_credit;
            if(child.account_type == 'Expense' || child.account_type == 'Income'){
                child.profit = (child.credit - child.debit);
            }
            else{
                child.profit = 0;
            }
            overall_profit += child.profit;
        });
        frm.set_value("total_profit", overall_profit);
        frm.set_value("total_debit", overall_debit);
        frm.set_value("total_credit", overall_credit);
		frm.set_value("difference", (overall_debit - overall_credit));
	}
})

frappe.ui.form.on('Accounting Entries Table', {
	account:function(frm, cdt, cdn){
        var child = locals[cdt][cdn];
        var overall_debit = 0; 
        var overall_credit = 0;
        var diff = 0;
        var overall_profit = 0;
        frm.doc.entry_table.forEach(function(child) { 
            overall_debit += child.debit;  
            overall_credit += child.credit; 
			diff += overall_debit - overall_credit
            if(child.account_type == 'Expense' || child.account_type == 'Income'){
                child.profit = (child.credit - child.debit);
            }
            else{
                child.profit = 0;
            }
            overall_profit += child.profit;
        });
        frm.set_value("total_profit", overall_profit);
        frm.set_value("total_debit", overall_debit);
        frm.set_value("total_credit", overall_credit);
        frm.set_value("difference", (overall_debit - overall_credit));
        frm.refresh()
    },
    debit:function(frm, cdt, cdn){
        var child = locals[cdt][cdn];
        var overall_debit = 0; 
        var overall_credit = 0;
        var diff = 0;
        var overall_profit = 0;
        frm.doc.entry_table.forEach(function(child) { 
            overall_debit += child.debit;  
            overall_credit += child.credit; 
			diff += overall_debit - overall_credit;
            if(child.account_type == 'Expense' || child.account_type == 'Income'){
                child.profit = (child.credit - child.debit);
            }
            else{
                child.profit = 0;
            }
            overall_profit += child.profit;
        });
        frm.set_value("total_profit", overall_profit);
        frm.set_value("total_debit", overall_debit);
        frm.set_value("total_credit", overall_credit);
        frm.set_value("difference", (overall_debit - overall_credit));
        frm.refresh()
    },
    credit:function(frm, cdt, cdn){
        var child = locals[cdt][cdn];
        var overall_debit = 0; 
        var overall_credit = 0;
        var diff = 0;
        var overall_profit = 0;
        frm.doc.entry_table.forEach(function(child) { 
            overall_debit += child.debit;  
            overall_credit += child.credit; 
			diff += overall_debit - overall_credit
            if(child.account_type == 'Expense' || child.account_type == 'Income'){
                child.profit = (child.credit - child.debit);
            }
            else{
                child.profit = overall_profit;
            }
            overall_profit += child.profit;
        });
        frm.set_value("total_profit", overall_profit);
        frm.set_value("total_debit", overall_debit);
        frm.set_value("total_credit", overall_credit);
        frm.set_value("difference", (overall_debit - overall_credit));
        frm.refresh()
    }
})