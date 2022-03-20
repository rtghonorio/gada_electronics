# Copyright (c) 2022, Russell Todd Honorio and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import datetime
import frappe
from frappe import _


def execute(filters=None):
	return get_columns(filters), get_data(filters)

def get_data(filters):
	print(f"\n\n\n{filters}\n\n\n\n")
	_from, to = filters.get('from_date'), filters.get('to_date')
	data = frappe.db.sql(f"""SELECT posting_date, due_date, party, account, debit_amount, credit_amount, (credit_amount-debit_amount) 
	FROM `tabtrial ledger`
	WHERE (account_type = 'Income' OR account_type = 'Expense') AND (creation BETWEEN '{_from}' AND '{to}');""")
	return data


def get_columns(filters):
	columns = [
		{
			"label": _("Posting Date"),
			"fieldtype": "Date",
			"fieldname": "posting_date",
			"options": "General Ledger Entry",
			"width": 100
		},
		{
			"label": _("Due Date"),
			"fieldtype": "Date",
			"fieldname": "due_date",
			"options": "General Ledger Entry",
			"width": 100
		},
		{
			"label": _("Party"),
			"fieldtype": "Data",
			"fieldname": "party",
			"options": "General Ledger Entry",
			"width": 100
		},
		{
			"label": _("Account"),
			"fieldtype": "Data",
			"fieldname": "account",
			"options": "General Ledger Entry",
			"width": 50
		},
		{
			"label": _("Expense"),
			"fieldtype": "Currency",
			"fieldname": "debit_amount",
			"options": "General Ledger Entry",
			"width": 100
		},
		{
			"label": _("Income"),
			"fieldtype": "Currency",
			"fieldname": "credit_amount",
			"options": "General Ledger Entry",
			"width": 100
		},
		{
			"label": _("Profit"),
			"fieldtype": "Currency",
			"fieldname": "profit",
			"options": "General Ledger Entry",
			"width": 100
		}

	]

	return columns
