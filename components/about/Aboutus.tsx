// components/AboutUs.tsx

import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section className="px-6 py-12 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>

      <p className="mb-4">
        Welcome to <strong>Shen J-idian Technology (HK) Co., LTD. </strong> – s a Modern Technology company specializing in the research and development, production, and sales of driving recorders. Focus on global ODM&OEM business, dedicated professional R&D, ID design, and products assembly factory are our advantages.
      </p>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Our Vision </h2>
       <p>After nearly 5 years of development, the company&aposs products serve major 4S service providers and trading companies. With the rapid development of cross-border e-commerce, in recent years, the products have been exported to multiple countries and regions at home and abroad, such as the United States, Saudi Arabia, Turkey, South Korea, Japan, Thailand, Russia, Taiwan, etc.. They are deeply welcomed and trusted by consumers. We are providing OEM services to multiple well-known brands both domestically and internationally.</p>
        {/* <ul className="list-disc list-inside space-y-1">
          <li><strong>Next.js</strong> for lightning-fast, SEO-friendly React applications.</li>
          <li><strong>TypeScript</strong> for safer, more maintainable code with strong typing.</li>
          <li><strong>Tailwind CSS</strong> for rapid UI development using a utility-first approach.</li>
        </ul> */}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
         <p>Its products mainly cover Dash Cam, Action Cam ,Car Play, full-screen streaming media series recorders, WIFI series driving recorders, multi-functional recorders with WiFi GPS, specialized streaming electronic rearview mirrors for special vehicles, high-definition dual recording recorders, and more.</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Our Philosophy</h2>
        <p>With years of professional dedication and experience, J-idian will continue to focus on customer needs and pursue a perfect user experience in the new journey, providing the most comprehensive products and real-time services for billions of car owners, based in China and serving the world.</p>
      </div>
    </section>
  );
};

export default AboutUs;
