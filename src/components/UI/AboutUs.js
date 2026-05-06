import { useState } from "react";
import { Car, Droplets, Shield, Smile } from "lucide-react";
import CEO from "../../assets/images/CEO.png";
import MD from "../../assets/images/Managing Director.png";

export default function AboutUsPage() {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <div className="bg-white">
      {/* HERO */}
      <div className="relative h-[300px] sm:h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9"
          className="w-full h-full object-cover"
          alt="Car Wash"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center">
          <div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white">
              About Green Car Wash Club
            </h1>
            <p className="text-white mt-3 max-w-xl mx-auto">
              Complete vehicle care solutions – from washing to buying & selling
              🚗✨
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="py-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-600">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Car className="mx-auto text-green-600 mb-3" />
            <h3 className="font-semibold text-lg">Professional Service</h3>
            <p className="text-sm text-gray-600">
              Expert team with modern equipment for premium vehicle care.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Droplets className="mx-auto text-green-500 mb-3" />
            <h3 className="font-semibold text-lg">All Vehicle Types</h3>
            <p className="text-sm text-gray-600">
              Services available for SUV, Auto, DCM, Tata Ace, 2-Wheeler & more.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Shield className="mx-auto text-green-700 mb-3" />
            <h3 className="font-semibold text-lg">Safe & Trusted</h3>
            <p className="text-sm text-gray-600">
              100% safety and trusted by hundreds of happy customers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Smile className="mx-auto text-green-400 mb-3" />
            <h3 className="font-semibold text-lg">Customer Satisfaction</h3>
            <p className="text-sm text-gray-600">
              Fast service, friendly support, and guaranteed satisfaction.
            </p>
          </div>
        </div>
      </div>
      {/* TEAM SECTION */}
      <div className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-600">
          Our Leadership
        </h2>

        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CEO */}
            <div className="flex flex-col items-center text-center bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-green-200">
              <img
                src={CEO}
                alt="CEO"
                className="w-40 h-40 rounded-2xl object-cover border-4 border-green-500 shadow"
              />

              <div className="mt-4">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Shaik Hamza
                </h3>

                <p className="text-green-600 font-medium mb-2">
                  CEO & Chairman
                </p>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Visionary leader driving Green Car Wash Club towards
                  innovation, quality, and customer satisfaction across all
                  services.
                </p>
              </div>
            </div>

            {/* MD */}
            <div className="flex flex-col items-center text-center bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-green-200">
              <img
                src={MD}
                alt="MD"
                className="w-40 h-40 rounded-2xl object-cover border-4 border-green-500 shadow"
              />

              <div className="mt-4">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Abdul Hameed
                </h3>

                <p className="text-green-600 font-medium mb-2">
                  Managing Director
                </p>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Leading operations and ensuring efficient service delivery
                  with strong focus on quality and customer experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="pricing-section">
        <h2>Shading Plans & Packages</h2>

        <div class="cards">
          <div class="card">
            <h3>3 Months</h3>
            <p class="highlight">3 + 1 Months Service</p>
            <div class="price">₹1,485</div>
            <ul class="features">
              <li>✔ Total 4 Months Service</li>
              <li>✔ 1 Free Service</li>
              <li>✔ Worth ₹500</li>
            </ul>
            <a href="#" class="btn">
              Choose Plan
            </a>
          </div>

          <div class="card">
            <div class="badge">🔥 Most Popular</div>
            <h3>6 Months</h3>
            <p class="highlight">6 + 2 Months Service</p>
            <div class="price">₹2,470</div>
            <ul class="features">
              <li>✔ Total 8 Months Service</li>
              <li>✔ 2 Free Services</li>
              <li>✔ Worth ₹1,000</li>
            </ul>
            <a href="#" class="btn">
              Choose Plan
            </a>
          </div>

          <div class="card">
            <h3>9 Months</h3>
            <p class="highlight">9 + 3 Months Service</p>
            <div class="price">₹4,455</div>
            <ul class="features">
              <li>✔ Total 12 Months Service</li>
              <li>✔ 3 Free Services</li>
              <li>✔ Worth ₹1,500</li>
            </ul>
            <a href="#" class="btn">
              Choose Plan
            </a>
          </div>

          <div class="card">
            <h3>12 Months</h3>
            <p class="highlight">12 + 4 Months Service</p>
            <div class="price">₹5,940</div>
            <ul class="features">
              <li>✔ Total 16 Months Service</li>
              <li>✔ 4 Free Services</li>
              <li>✔ Worth ₹2,200</li>
            </ul>
            <a href="#" class="btn">
              Choose Plan
            </a>
          </div>
        </div>

        <div class="offer">🎉 Extra 15% OFF on every wash for club members</div>
      </section>
      <div className="py-12 px-6">
        <div className="flex justify-center gap-6 mb-8">
          <button
            onClick={() => setActiveTab("mission")}
            className={`px-4 py-2 ${
              activeTab === "mission"
                ? "border-b-2 border-green-600 text-green-600"
                : ""
            }`}
          >
            Mission
          </button>

          <button
            onClick={() => setActiveTab("story")}
            className={`px-4 py-2 ${
              activeTab === "story"
                ? "border-b-2 border-green-600 text-green-600"
                : ""
            }`}
          >
            Our Story
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-2 ${
              activeTab === "services"
                ? "border-b-2 border-green-600 text-green-600"
                : ""
            }`}
          >
            Our Services
          </button>

          <button
            onClick={() => setActiveTab("values")}
            className={`px-4 py-2 ${
              activeTab === "values"
                ? "border-b-2 border-green-600 text-green-600"
                : ""
            }`}
          >
            Values
          </button>
        </div>

        <div className="max-w-3xl mx-auto text-center text-gray-700">
          {/* MISSION */}
          {activeTab === "mission" && (
            <>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p>
                At Green Car Wash Club, our mission is to provide premium and
                affordable vehicle care services that enhance the performance
                and appearance of every vehicle. We aim to deliver fast,
                reliable, and high-quality services using modern technology and
                skilled professionals.
              </p>
            </>
          )}

          {/* STORY */}
          {activeTab === "story" && (
            <>
              <h3 className="text-2xl font-bold mb-4">Our Journey</h3>
              <p>
                Green Car Wash Club started as a small initiative with a vision
                to transform traditional car washing into a professional and
                premium experience. Today, we are growing as a trusted brand
                offering not only washing services but also vehicle sales,
                purchase, finance, and exchange solutions.
              </p>
            </>
          )}

          {/* SERVICES */}
          {activeTab === "services" && (
            <>
              <h3 className="text-2xl font-bold mb-4">Our Services</h3>
              <ul className="space-y-2">
                <li>✔ Steam Wash & Foam Wash</li>
                <li>✔ Interior Cleaning & Polishing</li>
                <li>✔ Vehicle Sales & Purchase</li>
                <li>✔ Easy Finance Facility</li>
                <li>✔ Exchange Offers Available</li>
                <li>✔ Services for SUV, Auto, DCM, Tata Ace & 2-Wheelers</li>
              </ul>
            </>
          )}

          {/* VALUES */}
          {activeTab === "values" && (
            <>
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <ul className="space-y-2">
                <li>✔ Quality & Attention to Detail</li>
                <li>✔ Customer First Approach</li>
                <li>✔ Transparent Pricing</li>
                <li>✔ Innovation & Modern Technology</li>
              </ul>
            </>
          )}
        </div>
      </div>

      {/* CTA */}
      {/* <div className="bg-gradient-to-r from-green-600 to-green-400 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Give Your Vehicle the Care It Deserves 🚗✨
        </h2>
        <p className="mb-6">
          Book your service today and experience complete vehicle solutions in
          one place.
        </p>
        <button className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
          Book Now
        </button>
      </div> */}
    </div>
  );
}
