import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import { CartItem } from "../MyProducts/DisplayProducts";

const RelatedProducts = ({
  currentProductId,
  productCategory,
  products,
  title = "Related Products",
}) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const relatedProducts = products
    .filter(
      (product) =>
        product.pid !== currentProductId &&
        (!productCategory || product.nameEng === productCategory)
    )
    .slice(0, 10);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 20);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 20
    );
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
      setShowRightArrow(container.scrollWidth > container.clientWidth);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, [relatedProducts]);

  useEffect(() => {
    const handleResize = () => {
      checkScrollPosition();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!Array.isArray(relatedProducts) || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="py-12 px-4 md:px-6">
      {/* Title */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-px bg-black"></div>
          <h3 className="px-4 text-lg font-extrabold uppercase text-black">
            {title}
          </h3>
          <div className="w-16 h-px bg-black"></div>
        </div>
        <p className="text-gray-600 max-w-xl mx-auto">
          You might also be interested in these products from similar categories
        </p>
      </div>

      {/* Scrollable area with arrows */}
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute md:top-1/2 top-1/3 md:-left-[10px] -left-[20px] -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-colors"
            aria-label="Scroll left"
            // style={{ transform: "translateY(-50%)", left: "-10px" }}
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Product Slider */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-scroll scroll-smooth pb-6 gap-6 no-scrollbar"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollBehavior: "smooth",
          }}
          onScroll={checkScrollPosition}
        >
          {relatedProducts.map((product, index) => (
            <div
              key={product.pid || index}
              className="min-w-[250px] md:min-w-[280px] flex-shrink-0"
            >
              {/* <CartItem {...product} index={index} /> */}
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute md:top-1/2 top-1/3 md:-right-[10px] -right-[20px] -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-colors"
            aria-label="Scroll right"
            // style={{ transform: "translateY(-50%)", right: "-10px" }}
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {/* Hide scrollbar style */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `,
        }}
      />
    </div>
  );
};

export default RelatedProducts;
