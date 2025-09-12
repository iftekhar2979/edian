// components/ShippingPolicy.tsx

const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-center">Shipping Policy</h1>

      <section className="mb-6">
        <p><strong>Effective Date:</strong> [Insert Date]</p>
        <p><strong>Company:</strong> Shen J-idian Technology (HK) Co., LTD.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">1. Order Processing Time</h2>
        <p>
          All orders are processed within <strong>1–3 business days</strong> (excluding weekends and holidays)
          after receiving your order confirmation. Custom/OEM orders may take longer depending on
          complexity and volume.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">2. Shipping Rates & Delivery Estimates</h2>
        <p className="mb-4">
          Shipping charges are calculated at checkout or quoted directly for B2B/OEM orders.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200 text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Region</th>
                <th className="border px-4 py-2">Estimated Delivery Time</th>
                <th className="border px-4 py-2">Shipping Method</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Domestic (China)</td>
                <td className="border px-4 py-2">2–5 business days</td>
                <td className="border px-4 py-2">SF Express / Local Courier</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Asia (Japan, Korea, Thailand)</td>
                <td className="border px-4 py-2">5–10 business days</td>
                <td className="border px-4 py-2">DHL / FedEx / EMS</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Europe & North America</td>
                <td className="border px-4 py-2">7–14 business days</td>
                <td className="border px-4 py-2">FedEx / UPS / EMS</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Middle East</td>
                <td className="border px-4 py-2">7–12 business days</td>
                <td className="border px-4 py-2">Aramex / DHL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">3. International Shipping</h2>
        <p>
          We ship globally. Shipping costs and applicable import taxes/duties vary by destination.
          Customers are responsible for providing an accurate and accessible shipping address.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">4. Customs, Duties, and Taxes</h2>
        <p>
          Shen J-idian Technology is not liable for any customs fees, import duties, or taxes incurred
          during shipping. These are the responsibility of the customer or recipient.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">5. Order Tracking</h2>
        <p>
          After shipment, a tracking number will be sent to your email or preferred contact method.
          You can track your package on the carrier’s official website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">6. Lost, Delayed, or Damaged Shipments</h2>
        <p>
          We are not responsible for delays or damage caused by shipping carriers or customs processes.
          For lost or damaged items, please contact us promptly at:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li><strong>Email:</strong> [Insert Contact Email]</li>
          <li><strong>Phone:</strong> [Insert Phone Number]</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">7. Shipping for OEM/Bulk Orders</h2>
        <p>
          OEM and bulk orders are shipped based on agreed Incoterms (FOB, CIF, DDP, etc.). Clients may
          also use their own logistics providers upon request.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">8. Questions?</h2>
        <p>
          For any questions related to shipping, please contact our support team:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li><strong>Email:</strong> support@shenjie</li>
          <li><strong>Phone:</strong> [Insert Phone Number]</li>
          <li><strong>Address:</strong> [Insert Company Address]</li>
        </ul>
      </section>
    </div>
  );
};

export default ShippingPolicy;
