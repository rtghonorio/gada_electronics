# -*- coding: utf-8 -*-
# Copyright (c) 2022, Russell Todd Honorio and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class PurchaseInvoice(Document):
	def validate (self):
		if(self.posting_date > self.due_date):
			frappe.throw('Your selected <b>Posted Date</b> is more recent than <b>Due Date</b>!')
	def on_submit (self):
		# credit side
		doc = frappe.new_doc('General Ledger Entry')
		doc.title = "Credit"
		doc.posting_date = self.posting_date
		doc.due_date = self.due_date
		doc.party = self.supplier
		doc.account = self.credit_to
		doc.account_type = "Liability"
		doc.credit_amount = self.total_amount
		frappe.db.commit()
		doc.insert()
		# debit side
		doc = frappe.new_doc('General Ledger Entry')
		doc.title = "Debit"
		doc.posting_date = self.posting_date
		doc.due_date = self.due_date
		doc.account = self.expense_account
		doc.party = self.supplier
		doc.account_type = "Expense"
		doc.profit = (0 - self.total_amount)
		doc.debit_amount = self.total_amount
		frappe.db.commit()
		doc.insert()