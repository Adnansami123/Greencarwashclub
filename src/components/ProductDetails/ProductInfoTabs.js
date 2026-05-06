import { useState } from "react";

function ProductInfoTabs({
  initialTab = "Additional information",
  tabContents,
}) {
  const [currentActiveTab, setCurrentActiveTab] = useState(initialTab);
  const tabs = ["Additional information", "Description", "Reviews"];
  const tabClickHandler = (tab) => {
    setCurrentActiveTab(tab);
  };

  //   const renderTabContent = () => {
  //     switch (currentActiveTab) {
  //       case "Additional information":
  //         return <p>Additional Information</p>;
  //       case "Description":
  //         return <p>Description</p>;
  //       case "Reviews":
  //         return <p>Reviews</p>;
  //       default:
  //         return null;
  //     }
  //   };

  return (
    <div className="mt-8 border rounded-lg shadow-sm overflow-hidden">
      {/* Tab navigation */}
      <div className="flex border-b flex-col sm:flex-row">
        {tabs.map((tab) => (
          <div key={tab} className="px-6 py-3">
            <button
              className={`font-medium text-xl relative transition-colors duration-200 ${
                currentActiveTab === tab
                  ? "text-black"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => tabClickHandler(tab)}
            >
              {tab}
              {currentActiveTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black -mb-4"></span>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-4 font-semibold text-black">
        {tabContents[currentActiveTab] || "No Content Available"}
      </div>
    </div>
  );
}

export default ProductInfoTabs;
