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
  { name: 'Edward', phone: '+86 176 8977 1938', person: 'Edward' },
  { name: 'Edward', phone: '+86 175 8916 9091', person: 'Edward' },
  { name: 'Kate', phone: '+86 137 1381 4226', person: 'Kate' },
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
            Shenzhen Antuxing Technology Co., LTD.
          </h3>

          {/* Contact List */}
          <ul className="space-y-6">
            {contacts.map((contact, index) => {
              const phoneClean = cleanPhoneNumber(contact.phone);
              return (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 border-b pb-4"
                >
                  <div className="flex items-center gap-2">
                    <FaPhoneAlt className="text-blue-500" />
                    <a
                      href={`tel:${phoneClean}`}
                      className="text-base sm:text-lg text-blue-600 hover:underline"
                    >
                      {contact.phone}
                    </a>
                    <span className="text-gray-700 text-sm sm:text-base">
                      ({contact.person})
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/${phoneClean}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-green-600 hover:underline mt-2 sm:mt-0"
                  >
                    <FaWhatsapp className="text-lg" /> WhatsApp / WeChat
                  </a>
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
