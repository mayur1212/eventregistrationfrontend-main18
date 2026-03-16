import React from "react";

const contactItems = [
  {
    title: "Phone Number",
    value: "(603) 666-3906",
    subtext: "Mon-Fri, 8:30 AM to 5:00 PM EST",
  },
  {
    title: "Email",
    value: "support@firstinspires.org",
    subtext: "Send us your questions anytime.",
  },
  {
    title: "Address",
    value: "200 Bedford Street, Manchester, NH 03101, United States",
    subtext: "FIRST headquarters mailing address.",
  },
];

const ContactUsC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 px-6 sm:px-10 lg:px-16 mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
            Contact Details
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
            Contact Us
          </h2>
          <p className="text-gray-600 mt-4 text-base sm:text-lg">
            Reach our team using the contact details below.
          </p>

          <div className="grid gap-5 mt-10">
            {contactItems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 sm:p-6"
              >
                <h3 className="text-lg font-semibold text-blue-900">
                  {item.title}
                </h3>
                <p className="text-xl font-bold text-gray-900 mt-2">
                  {item.value}
                </p>
                <p className="text-sm text-gray-600 mt-2">{item.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsC;
