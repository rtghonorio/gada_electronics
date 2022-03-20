# Copyright (c) 2022, Russell Todd Honorio and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Suppliers(Document):
	def validate(self):
		doc = frappe.new_doc('Party')
		doc.title = self.supplier_name
		doc.party_name = self.supplier_name
		doc.party_type = "Supplier"
		frappe.db.commit()
		doc.insert()