import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  CheckCircle,
  Youtube,
} from "lucide-react";
import { FaPinterest } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send data to your backend here
    console.log("Form submitted:", formData);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };
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
    <div className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen w-full">
      {" "}
      {/* Hero Section - Responsive padding and text sizes */}
      <div
        className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500
  drop-shadow-sm transition-all duration-300 ease-in-out text-white py-10 sm:py-12 md:py-16 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 text-center">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-center text-indigo-100 px-2">
            We'd love to hear from you. Our team is always here to help.
          </p>
        </div>
      </div>
      {/* Main Content - Adjustable padding and grid layout */}
      <div className="max-w-7xl mx-auto py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {/* Contact Info Cards - Stack on mobile, side-by-side on larger screens */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 sm:p-3 rounded-full flex-shrink-0">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <h3 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-500">
                    Store
                  </h3>
                  <div className="mt-1 text-sm sm:text-base text-gray-600">
                    Plot No 98-5, Road No.9, Shed No. 2,Behind Supereme Weiht
                    Bridge,Opp:Gr Palace Function Hall,Gandhi Nagar,
                    Balanagar,Hyderabad-37,TS
                    <br />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 sm:p-3 rounded-full flex-shrink-0">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <h3 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-500">
                    Contact Us
                  </h3>
                  <div className="mt-1 text-sm sm:text-base text-green-00">
                    <div className="flex justify-between">
                      <span>Phone:</span>
                      <span className="ml-2">+91 93907 66350</span>
                      {/* <span className="ml-2">+91 9550502450</span> */}
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      {/* <span className="ml-2">vijayasarees.com@gmail.com</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 sm:p-3 rounded-full flex-shrink-0">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <h3 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-500">
                    Opening Hours
                  </h3>
                  <div className="mt-1 text-sm sm:text-base text-gray-600">
                    <div className="flex justify-between">
                      <span>Monday-Sunday:</span>
                      <span className="ml-2">9:00 AM - 8:00 PM</span>
                    </div>
                    {/* <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span className="ml-2">10:00 AM - 6:00 PM</span>
                    </div> */}
                    {/* <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="ml-2">Closed</span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">
                Connect With Us
              </h3>
              <div className="flex justify-between items-center max-w-xs mx-auto">
                <a
                  // href="https://www.facebook.com/Vijaya.designs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white p-2 sm:p-3 rounded-full hover:bg-blue-600 transform hover:scale-110 transition-all duration-300"
                >
                  <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
                <a
                  // href="https://www.instagram.com/vijayasarees_computerisedworks/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 text-white p-2 sm:p-3 rounded-full hover:bg-pink-700 transform hover:scale-110 transition-all duration-300"
                >
                  <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
                <a
                  // href="https://youtube.com/@vijayasarees8409 "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-500 text-white p-2 sm:p-3 rounded-full hover:bg-sky-600 transform hover:scale-110 transition-all duration-300"
                >
                  <Youtube className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
                <a
                  // href="https://in.pinterest.com/vijayasarees/_created/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-700 text-white p-2 sm:p-3 rounded-full hover:bg-blue-800 transform hover:scale-110 transition-all duration-300"
                >
                  <FaPinterest className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form and Map */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6 flex items-center">
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 mr-3 sm:mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-green-800">
                      Message Sent!
                    </h3>
                    <p className="text-sm sm:text-base text-green-600">
                      Thank you for contacting us. We'll get back to you
                      shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-transparent px-3 sm:px-4 py-2 sm:py-3 border border-black-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base placeholder:text-gray-400"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base placeholder:text-gray-400"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-transparent px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base placeholder:text-gray-400"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full bg-transparent px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base placeholder:text-gray-400"
                      placeholder="Tell us more about your inquiry..."
                      required
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500
  text-white py-3 px-6 rounded-lg
  hover:from-green-700 hover:to-emerald-600
  transition-all duration-300 ease-in-out
  flex items-center justify-center"
                    >
                      Send Message
                      <Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* google maps  */}
        <div className="mt-8">
          <h2 className="text-md font-medium mb-2 text-gray-800">
            Our Locations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Map 1 - Asbestos Colony */}
            {/* <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Store 1
              </h2>
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                4-42-452 Asbestos Hills Colony,Jagathgiri Gutta,
                Balanagar,Hyderabad-500037.
              </h2>

              <div className="w-full h-64 rounded-lg overflow-hidden shadow-md">
                <iframe
                  title="Asbestos Colony Location"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3805.2517221844696!2d78.4280926!3d17.4954932!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91d0835be565%3A0x378ce4cf623ce0d1!2sVijaya%20Sarees!5e0!3m2!1sen!2sin!4v1745238719109!5m2!1sen!2sin"
                ></iframe>
              </div>
            </div> */}

            {/* Map 2 - Kukatpally */}
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Store{" "}
              </h2>
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Plot No 98-5, Road No.9, Shed No. 2,Behind Supereme Weiht
                Bridge,Opp:Gr Palace Function Hall,Gandhi Nagar,
                Balanagar,Hyderabad-37,TS
              </h2>
              <div className="w-full h-64 rounded-lg overflow-hidden shadow-md">
                {/* <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d399.98447978027696!2d78.43748354383317!3d17.49246485453538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91574ed9276f%3A0xe88372ff4faffc8c!2sSupreme%20Traders!5e0!3m2!1sen!2sin!4v1777111262833!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe> */}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section - Responsive grid */}
        <div className="mt-10 sm:mt-12 md:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen w-full">
            {" "}
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
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-3">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-5">
                Contact our team for more details about our services.
              </p>
              <button className="bg-Green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
