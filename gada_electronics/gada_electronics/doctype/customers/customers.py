# Copyright (c) 2022, Russell Todd Honorio and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Customers(Document):
	def validate(self):
		doc = frappe.new_doc('Party')
		doc.title = self.customer_name
		doc.party_name = self.customer_name
		doc.party_type = "Customer"
		frappe.db.commit()
		doc.insert()