# 📈 Master Trading Terminal v1.1

Web-based trading journal and execution logger designed for forex traders. 

## 🚀 Key Features

* **Lifecycle Trade Management:** Move trades from **Pending (Active)** to **Closed (Realized)**. Log entries the moment you execute in MT5 and finalize them once they hit TP/SL.
* **Persistent Storage:** Built with `localStorage` technology; your trade history and equity curve remain intact even after browser refreshes or system restarts.
* **Precision Metrics:** Automatic calculation of **Risk-to-Reward (RR) Ratios**, **Win Rates**, and **Total Realized P/L**.
* **Quantitative Analytics:** Real-time **Equity Growth Curve** visualization using Chart.js.
* **Risk Lab:** Integrated position sizing calculator based on pip-distance and dollar-risk.
* **Data Portability:** One-click **CSV Export** to move your weekly data into Excel or Google Sheets for deep-dive auditing.

## 📖 How to Use

1.  **Risk Calc:** Enter your SL pips and Dollar risk to get your lot size.
2.  **Open Position:** Fill in the Pair, Type (Buy/Sell), and Entry levels. Click **OPEN POSITION**.
3.  **Monitor:** The trade will appear in the **Live Management Dashboard**.
4.  **Finalize:** Once the trade is finished, click **CLOSE**, enter the final Profit/Loss, and confirm. 
5.  **Analyze:** View your growth on the Equity Curve and review your "Logic" notes in the Ledger.

---
*Developed by Benyahmin*
