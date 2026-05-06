import React from "react";

export default function Faqs() {
  const faqs = [
    {
      q: "What types of car wash services do you offer?",
      a: "We offer a wide range of services including exterior body wash, foam wash, interior cleaning, steam wash, polishing, and ceramic/teflon coating for complete car care.",
    },
    {
      q: "How long does a car wash take?",
      a: "A basic wash takes around 20–30 minutes, while detailed services like interior cleaning or polishing may take 1–2 hours depending on the vehicle condition.",
    },
    {
      q: "Do I need to book an appointment?",
      a: "Walk-ins are welcome, but we recommend booking in advance to avoid waiting time, especially during weekends and peak hours.",
    },
    {
      q: "Is your car wash safe for my vehicle?",
      a: "Yes, we use high-quality products and professional techniques that are completely safe for your car’s paint, interior, and overall condition.",
    },
    {
      q: "Do you use eco-friendly cleaning methods?",
      a: "Yes, we use water-efficient and eco-friendly cleaning solutions that minimize environmental impact while delivering excellent results.",
    },
    {
      q: "What is included in interior cleaning?",
      a: "Interior cleaning includes vacuuming, dashboard polishing, seat cleaning, floor mat washing, and sanitization for a fresh and hygienic cabin.",
    },
    {
      q: "Do you provide doorstep car wash service?",
      a: "Yes, we offer doorstep services in selected areas. You can book through our app or contact us directly for availability.",
    },
    {
      q: "What is the benefit of polishing or coating?",
      a: "Polishing restores your car’s shine and removes minor scratches, while coatings like Teflon or ceramic provide long-lasting protection and gloss.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      {/* HERO */}
      <div className="bg-gradient-to-r from-green-600 to-green-600 text-white py-12 text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
          FAQs
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto">
          Everything you need to know about our car washing services.
        </p>
      </div>

      {/* FAQ SECTION */}
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 text-gray-800">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {item.q}
              </h3>
              <p className="text-sm text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      {/* <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-3">Still have questions?</h3>
        <p className="text-gray-600 mb-5">
          Contact our team for more details about our services.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
          Contact Us
        </button>
      </div> */}
    </div>
  );
}
