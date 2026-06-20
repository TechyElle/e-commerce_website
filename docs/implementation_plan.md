# Implementation Plan: AI Sales Performance Dashboard in the Admin Account

Add a comprehensive, premium AI Sales Performance Dashboard to the Admin panel of Xontrix Electronics. This plan covers database additions, order seeding for analytics, detailed layout implementation matching the user-provided design, and the addition of a user-side AI Electronics Consultant and an admin-side AI Financial & Strategic Advisor.

---

## Proposed Changes

We will group changes by component layer: Backend (DB schema, seed script, API endpoints) and Frontend (API wrappers, Admin interface, User layout chatbot).

### 1. Backend Layer

#### [MODIFY] [schema.sql](file:///c:/Users/pciel/Desktop/e-commerce_website-main/apps/backend/xontrix-backend/api/schema.sql)
Add a new `feedback` table to store customer satisfaction reviews.
```sql
CREATE TABLE IF NOT EXISTS feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(120) NOT NULL,
  customer_email VARCHAR(190) NOT NULL,
  rating INT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

#### [MODIFY] [install.php](file:///c:/Users/pciel/Desktop/e-commerce_website-main/apps/backend/xontrix-backend/api/install.php)
Seed robust mock data to populate our 6-month charts, analytics, and loyalty lists:
* **Orders**: Seed ~45 historical orders spanning Jan 2026 to June 2026. This allows actual calculation of monthly profits, growth rate (comparison between current and last month), target achievement, and order status summaries.
* **Customers**: Use consistent customer emails/names to trigger correct Loyalty Badge grouping (Bronze, Silver, Gold, Platinum).
* **Feedback**: Seed 5-star positive feedbacks to display in the "Customer Satisfaction" section.
* **Products**: Seed standard stock levels to ensure realistic stockouts for low-stock alarms.

#### [MODIFY] [sales.php](file:///c:/Users/pciel/Desktop/e-commerce_website-main/apps/backend/xontrix-backend/api/sales.php)
Expose new metrics via queries:
* **Monthly growth rate**: Calculates current month vs. prior month total revenue percentage.
* **Loyalty Customer Badges list**: Lists customer spend totals and assigns Silver (>=₱5k), Gold (>=₱15k), Platinum (>=₱40k) badges.
* **Top positive feedback**: Retrieves latest ratings of 4 or 5 stars.
* **Order status logs**: Computes visitor pattern analytics / monthly order velocity.

---

### 2. Frontend API & State

#### [MODIFY] [api.ts](file:///c:/Users/pciel/Desktop/e-commerce_website-main/apps/web/src/app/lib/api.ts)
Expose backend responses to the React app:
* Fetch customer loyalty records (`usersApi.loyalty()`).
* Fetch top feedback reviews (`salesApi.feedback()`).
* Fetch calendar/delivery logs (`salesApi.calendarEvents()`).

---

### 3. Admin Dashboard & Panels

#### [MODIFY] [Admin.tsx](file:///c:/Users/pciel/Desktop/e-commerce_website-main/apps/web/src/app/pages/Admin.tsx)
Expand the Admin dashboard tabs to support the new views:
1. **Dashboard Tab (Default)**:
   * **KPI Row**: Displays Total Revenue (from real order history), Growth Rate, Target Achievement, and Active Deals.
   * **Sales Performance Chart**: Visualizes monthly earnings with gradients, plus an interactive overlay showing conversion rates and drop-off metrics (e.g. conversion: 89%, drop-off: 11%).
   * **Track Order Status**: A detailed block displaying counts (New, On Progress, Completed, Returned), a segmented purple progress bar, and a table of the latest transactions.
   * **AI Strategic Advisor Chatbot**: A chatbot answering strategic financial prompts. Clicking a query like "How are sales this month?" uses a client-side advisor rule-engine to analyze the actual stats (revenue, top products, etc.) and give strategic summaries.
2. **Analytics Tab**:
   * Detailed charts comparing target achievement, profit margin analysis, and month-over-month sales trends.
3. **Invoices Tab**:
   * A clean invoices listing with a search bar. Admins can click any transaction to open a printable HTML Invoice showing full itemization.
4. **Calendar Tab**:
   * Renders a calendar view detailing upcoming restock dates, delivery timelines, shipped orders, and monthly target review dates.
5. **Loyalty Badges Tab**:
   * A table displaying all customer names, emails, total PHP spent, and their Loyalty Level Badges (Silver, Gold, Platinum).
6. **Product, Orders, Inventory, Users CRUD Tabs**:
   * Pre-existing tabs, styled to match the dark glassmorphism dashboard design.

---

### 4. User-Side Chatbot Widget

#### [MODIFY] [Layout.tsx](file:///c:/Users/pciel/Desktop/e-commerce_website-main/apps/web/src/app/components/Layout.tsx)
* Place a floating chat button in the bottom-right corner for normal store customers.
* Clicking the button expands the **AI Electronics Consultant** chat interface.
* Users can query product specs, seek project help (e.g. "How do I hook up a DHT22 sensor?"), or compare microcontrollers (e.g. "Arduino vs ESP32").
* Answering uses an intelligent rule engine based on the store's `products.json` and typical electronic guidelines.

---

## Verification Plan

### Automated Tests
- Build verification: Run `npm run build` or `vite build` from root to ensure no TypeScript compilation or bundling errors exist.

### Manual Verification
1. Access `/admin` (as `admin@xontrix.local` / `admin123`).
2. Verify all tabs load correctly: Dashboard layout match, interactive charts, and invoice details.
3. Test the Admin AI Advisor chat by clicking suggestions and verifying answers contain actual database analytics.
4. Go to `/` (home page) or `/products` and check the floating AI chat widget. Ask questions and confirm correct electronics troubleshooting answers are returned.
5. Place an order on the user site, return to admin, and verify that the spending levels and badges update accordingly.
