// components/FAQ.tsx
'use client'
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What does Shen J-idian Technology specialize in?",
    answer:
      "We specialize in R&D, production, and sales of high-quality driving recorders including dash cams, CarPlay systems, and more.",
  },
  {
    question: "Do you provide OEM and ODM services?",
    answer:
      "Yes, we specialize in OEM/ODM services, offering tailored product solutions for global brands.",
  },
  {
    question: "What types of products do you offer?",
    answer:
      "We offer Dash Cams, Action Cams, CarPlay devices, streaming recorders, WiFi-enabled GPS recorders, and more.",
  },
  {
    question: "Who are your main clients?",
    answer:
      "Our clients include 4S automotive service providers, trading companies, and international brands via cross-border e-commerce.",
  },
  {
    question: "Can I customize a product with my own brand or design?",
    answer:
      "Absolutely. We support full custom branding and ID design through our OEM/ODM services.",
  },
  {
    question: "In which countries are your products available?",
    answer:
      "Our products are available in the US, Saudi Arabia, Turkey, South Korea, Japan, Thailand, Russia, Taiwan, and more.",
  },
  {
    question: "Do you provide after-sales support?",
    answer:
      "Yes, we offer professional after-sales support to ensure satisfaction and reliable performance.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-16 text-black">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-md shadow-sm transition-all"
          >
            <button
              className="w-full text-left px-6 py-4 focus:outline-none flex justify-between items-center"
              onClick={() => toggleAccordion(index)}
            >
              <span className="text-gray-800 font-bold">{faq.question}</span>
              <span className="text-gray-500">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
