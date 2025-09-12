// components/ContactUs.tsx

import React from 'react';
import { FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

interface Contact {
  name: string;
  phone: string;
  person: string;
}

const contacts: Contact[] = [
  { name: 'Tawhid Talukder', phone: '+86 13032717391', person: 'Tawhid Talukder' },
  { name: 'Xiao Liu', phone: '+86 18576458803', person: 'Xiao Liu' },
];

const cleanPhoneNumber = (phone: string): string => {
  return phone.replace(/[^0-9]/g, ''); // removes +, spaces, etc.
};

const CompanyInfo: React.FC = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 text-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
          Contact Us
        </h2>

        <div className="bg-gray-100 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm">
          <h3 className="text-lg sm:text-xl font-semibold text-center mb-6">
            Shen J-idian Technology (HK) Co., LTD.
          </h3>

          {/* Contact List */}
         <ul className="space-y-6">
  {contacts.map((contact, index) => {
    const phoneClean = cleanPhoneNumber(contact.phone);

    return (
      <li
        key={index}
        className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-blue-500" />
            <span className="text-base sm:text-lg text-blue-900">
              {contact.phone}
            </span>
            <span className="text-gray-700 text-sm sm:text-base">
              ({contact.person})
            </span>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">
          {/* Phone Call Button */}
          <a
            href={`tel:${phoneClean}`}
            className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center gap-1"
          >
            <FaPhoneAlt /> Call
          </a>

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${phoneClean}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm flex items-center gap-1"
          >
            <FaWhatsapp /> WhatsApp
          </a>

          {/* WeChat Button */}
          <a
            href={`/wechat-info?user=${encodeURIComponent(contact.person)}`}
            className="px-4 py-1 bg-gray-800 text-white rounded hover:bg-gray-900 text-sm flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Simple WeChat Icon */}
              <path d="M18.944 10.112C17.968 8.176 15.648 7 13 7c-3.312 0-6 2.238-6 5s2.688 5 6 5c.688 0 1.352-.096 1.96-.28.456.352 1.008.608 1.624.728.176.032.336-.112.336-.296v-1.28c1.12-.84 1.816-2.08 1.816-3.44 0-.776-.216-1.512-.592-2.12zm-7.44 1.92c-.44 0-.8-.36-.8-.8s.36-.8.8-.8.8.36.8.8-.36.8-.8.8zm3 0c-.44 0-.8-.36-.8-.8s.36-.8.8-.8.8.36.8.8-.36.8-.8.8z" />
            </svg>
            WeChat
          </a>
        </div>
      </li>
    );
  })}
</ul>

          {/* Address & Map */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Address Info */}
            <div className="text-center md:text-left">
              <h4 className="text-lg sm:text-xl font-semibold mb-3">
                <FaMapMarkerAlt className="inline text-red-500 mr-2" />
                Address
              </h4>
              <p className="text-gray-700 text-sm sm:text-base">
                Fuwei Second Industrial Zone, Fuwei Town, Baoan District, Shenzhen City, Guangdong Province, China
              </p>
              <p className="text-gray-500 text-xs sm:text-sm mt-2">
               中國廣東省深圳市寶安區富圍鎮富圍第二工業區
              </p>
            </div>

            {/* Google Map Embed */}
            <div className="w-full h-64 sm:h-72 md:h-80 rounded-lg overflow-hidden shadow-md">
              {/* <div class="embed-map-fixed"><div class="embed-map-container"><iframe class="embed-map-frame" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src=""></iframe><a href="https://sprunkiretake.net" style="font-size:2px!important;color:gray!important;position:absolute;bottom:0;left:0;z-index:1;max-height:1px;overflow:hidden">sprunki retake</a></div><style>.embed-map-fixed{position:relative;text-align:right;width:600px;height:400px;}.embed-map-container{overflow:hidden;background:none!important;width:600px;height:400px;}.embed-map-frame{width:600px!important;height:400px!important;}</style></div> */}
              <iframe
                title="Company Location"
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                className="border-0 w-full h-full"
                src="https://maps.google.com/maps?width=600&height=400&hl=en&q=Fuwei%20Second%20Industrial%20Zone%2C%20Fuwei%20Town%2C%20Baoan%20District%2C%20Shenzhen%20City%2C%20Guangdong%20Province%2C%20China&t=&z=14&ie=UTF8&iwloc=B&output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;
