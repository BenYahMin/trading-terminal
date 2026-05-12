# Master Trading Terminal v1.1 📈

A high-performance web-based analytics dashboard designed to transform raw MT5 (MetaTrader 5) HTML reports into actionable trading intelligence. This terminal provides quantitative insights into directional bias, session performance, and asset rankings, alongside a real-time risk management suite.

---

## 🚀 Key Features

### 📊 Performance Analytics
* **Equity Growth Curve:** Visualizes your account trajectory using Chart.js to identify consistency and drawdowns.
* **Directional Bias Tracking:** Breaks down PnL by BUY vs. SELL orders to identify if you perform better in specific market regimes.
* **Session Profits (EAT):** Automatically categorizes trades into **Asian, London, and New York** sessions based on East Africa Time.
* **Asset Ranking:** Lists symbols by profitability to show which pairs are your primary "breadwinners."

### 🛡️ Risk & Discipline Suite
* **Pre-Trade Checklist:** A psychological "circuit breaker" that locks the system until you confirm trend alignment, structural SL, news status, and emotional neutrality.
* **Dynamic Risk Calculator:** Instantly calculates the required **Lot Size** based on your current account balance, desired risk percentage, and stop loss pips.

### 🛠️ Technical Stack
* **Frontend:** HTML5, CSS3 (Custom Properties/Grid/Flexbox).
* **Typography:** Inter (UI) and JetBrains Mono (Data).
* **Visuals:** Chart.js via CDN.
* **Logic:** Pure Vanilla JavaScript (DOMParser API for MT5 report extraction).

---

## 📁 File Structure

* `index.html`: The core structure, including the terminal grid layout and UI components.
* `style.css`: Modern "Dark Mode" aesthetics with a high-contrast accent palette (`#00ff88`).
* `script.js`: The "brain" of the terminal—handles file reading, regex-based parsing of MT5 reports, and UI updates.

---

## 📖 How to Use

1.  **Export Report:** In MetaTrader 5, go to the **History** tab, right-click, and select **Report > HTML**.
2.  **Launch Terminal:** Open `index.html` in any modern web browser (or via VS Code Live Server).
3.  **Sync Data:** Click the **"Sync Account Report 📥"** button and upload your MT5 HTML file.
4.  **Analyze:** The terminal will instantly populate your stats, growth curve, and lot size calculations.

---

## 🧪 Performance Lab Notes

The terminal uses a specific logic for parsing:
* **Calculations:** It filters for trades only (ignoring credit/deposit rows).
* **Timezones:** Session categorization is optimized for **EAT (UTC+3)**, ideal for traders in the East African region.
* **Lot Sizing:** Uses the formula: 
    $$\text{Lot Size} = \frac{\text{Balance} \times (\text{Risk}\%)}{\text{SL Pips} \times 10}$$

---

## 🛠️ Development

To modify the terminal or styles:
* **Styles:** Edit the `:root` variables in `style.css` to change the theme.
* **Logic:** Adjust the `parseReport` function in `script.js` if your MT5 report uses a non-standard column layout.

**Terminal Ready.** Waiting for your next winning session... ⚡
