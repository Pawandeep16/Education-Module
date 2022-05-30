frappe.listview_settings["Student"] = {
  add_fields: ["title", "name", "gender"],
  // set default filters

  before_render(doc) {
    console.log("y");

    // triggers before every render of list records
  },
  get_indicator(doc, frm) {
    // customize indicator color
    frappe.call({
      method: "erpnext.education.api.get_over_due",
      callback: function (r) {
        if (r) {
          $.each(r.message, function (i, d) {
            if ((i, d.student === doc.name)) {
              frappe.call({
                method: "frappe.client.set_value",
                args: {
                  doctype: "Student",
                  name: doc.name,
                  fieldname: "enabled",
                  value: 0,
                },
                freeze: true,
                callback: function (r) {
                  frappe.msgprint(__("Student has been Disable from Access"));
                },
              });
            }
          });
        }
      },
    });

    // if (doc.enabled) {
    //   return [__("Enabled"), "blue", "enabled,=,1"];
    //   // } else if (doc.unpaid) {
    //   //   return [__("unpaid"), "red", "unpaid,=,1"];
    // } else {
    //   return [__("Disabled"), "darkgray", "disabled,=,1"];
    // }
  },
};
