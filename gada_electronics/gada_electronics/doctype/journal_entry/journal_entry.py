# Copyright (c) 2022, Russell Todd Honorio and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class JournalEntry(Document):
	def validate (self):
		if (self.difference != 0):
			frappe.throw("The Debit and Credit in your Journal Entry is not balanced!")
	def on_submit (self):
		doc = frappe.new_doc('General Ledger Entry')
		doc.posting_date = self.posting_date
		doc.party = self.party
		doc.debit_amount = self.total_debit
		doc.credit_amount = self.total_credit
		doc.profit = self.total_profit
		if (self.total_profit > 0):
			doc.account_type = 'Income'
		if (self.total_profit < 0):
			doc.account_type = 'Expense'
		frappe.db.commit()
		doc.insert()
