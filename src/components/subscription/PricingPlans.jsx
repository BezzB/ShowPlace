function PricingPlans() {
  return (
    <div className="pricing-container">
      <div className="pricing-tier basic">
        <h2>Basic</h2>
        <p className="price">$7.99/month</p>
        <ul>
          <li>HD Streaming</li>
          <li>Watch on 1 Device</li>
          <li>Limited Library</li>
        </ul>
        <button className="subscribe-btn">Choose Plan</button>
      </div>
      
      <div className="pricing-tier premium featured">
        <h2>Premium</h2>
        <p className="price">$14.99/month</p>
        <ul>
          <li>4K Ultra HD</li>
          <li>Watch on 4 Devices</li>
          <li>Full Library Access</li>
          <li>Offline Downloads</li>
          <li>Ad-free Experience</li>
        </ul>
        <button className="subscribe-btn">Choose Plan</button>
      </div>
    </div>
  );
}

export default PricingPlans; 