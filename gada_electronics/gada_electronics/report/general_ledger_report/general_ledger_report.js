// Copyright (c) 2022, Russell Todd Honorio and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["General Ledger Report"] = {
	"filters": [
		{
			"fieldname": "from_date",
			"label": __("From Date"),
			"fieldtype": "Date",
			"width": 100,
			"reqd": 1,
			"default": dateutil.year_start()
		},
		{
			"fieldname": "to_date",
			"label": __("To Date"),
			"fieldtype": "Date",
			"width": 100,
			"reqd": 1,
			"default": dateutil.year_end()
		}
	]
};
