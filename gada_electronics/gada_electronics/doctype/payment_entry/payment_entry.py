# Copyright (c) 2022, Russell Todd Honorio and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class PaymentEntry(Document):
	def on_submit (self):
		#Debit side
		doc = frappe.new_doc('General Ledger Entry')
		doc.posting_date = self.posting_date
		doc.account = self.paid_to
		doc.party = self.party
		doc.debit_amount = self.amount
		frappe.db.commit()
		doc.insert()
		#Credit side
		doc = frappe.new_doc('General Ledger Entry')
		doc.posting_date = self.posting_date
		doc.account = self.paid_to
		doc.party = self.party
		doc.credit_amount = self.amount
		frappe.db.commit()
		doc.insert()
