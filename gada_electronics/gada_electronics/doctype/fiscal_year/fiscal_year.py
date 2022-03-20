from __future__ import unicode_literals
from frappe import msgprint
import frappe
from frappe.model.document import Document

class FiscalYear(Document):
	def validate (self):
		if(self.start_date > self.end_date):
			frappe.throw('Your selected <b>Start Date</b> is more recent than <b>End Date</b>!')