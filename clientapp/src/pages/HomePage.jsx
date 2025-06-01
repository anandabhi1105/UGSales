import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to UG Sales</h1>
        <p>Your trusted partner in product sales performance and analytics.</p>
      </header>

      <section className="home-section">
        <h2>What We Do</h2>
        <p>
          UG Sales empowers sales representatives to track, manage, and optimize their product sales with ease.
          From real-time dashboards to detailed analytics, we bring everything together in one platform.
        </p>
      </section>

      <section className="home-features">
        <h2>Features</h2>
        <ul>
          <li>📊 Real-time Sales Tracking</li>
          <li>📈 Performance Analytics</li>
          <li>🧾 Sales Reports and History</li>
          <li>🔐 Secure User Access</li>
        </ul>
      </section>

      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} JD Sales. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
