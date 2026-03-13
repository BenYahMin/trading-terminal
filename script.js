    let chart = null;
    let currentBalance = 0;

    const log = (msg) => {
        const con = document.getElementById('console');
        con.innerHTML += `<br>> ${msg}`;
        con.scrollTop = con.scrollHeight;
    };

    const cleanNum = (str) => {
        if (!str) return 0;
        const n = parseFloat(str.replace(/[^0-9.-]+/g, ""));
        return isNaN(n) ? 0 : n;
    };

    const parseReport = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const rows = Array.from(doc.querySelectorAll('tr'));
        const trades = [];
        let balance = 0;

        rows.forEach(r => {
            const cols = r.querySelectorAll('td');
            if (r.innerText.toLowerCase().includes('balance') && !r.innerText.toLowerCase().includes('credit')) {
                balance = cleanNum(cols[cols.length-1]?.innerText);
            }
            if (cols.length < 13) return;
            const type = cols[3].innerText.trim().toLowerCase();
            const profit = cleanNum(cols[cols.length-1].innerText);
            const isTrade = (type.includes('buy') || type.includes('sell')) && Math.abs(profit) !== 250;
            
            if (isTrade) {
                const hourMatch = cols[1].innerText.match(/\d{2}:\d{2}/);
                const hour = hourMatch ? parseInt(hourMatch[0].split(':')[0]) : 12;
                trades.push({ symbol: cols[2].innerText.trim(), type: type.toUpperCase(), profit, hour });
            }
        });
        return { trades, balance };
    };

    const updateUI = (data) => {
        const { trades, balance } = data;
        if (trades.length === 0) {
            log("Error: No trade data found in this file.");
            return;
        }

        currentBalance = balance || 1000;
        const total = trades.reduce((s,t) => s + t.profit, 0);
        const wins = trades.filter(t => t.profit > 0).length;
        const wr = trades.length > 0 ? ((wins / trades.length) * 100).toFixed(1) : 0;

        document.getElementById('totalProfit').innerText = total.toFixed(2);
        document.getElementById('totalProfit').className = `hero-val ${total >= 0 ? 'profit-pos' : 'profit-neg'}`;
        document.getElementById('winRate').innerText = `Win Rate: ${wr}% (${trades.length} trades)`;

        const pairs = {}; const sessions = { Asian: 0, London: 0, NY: 0 }; const sides = { BUY: 0, SELL: 0 };
        trades.forEach(t => {
            pairs[t.symbol] = (pairs[t.symbol] || 0) + t.profit;
            sides[t.type.includes('BUY') ? 'BUY' : 'SELL'] += t.profit;
            if (t.hour >= 0 && t.hour < 9) sessions.Asian += t.profit;
            else if (t.hour >= 10 && t.hour < 15) sessions.London += t.profit;
            else sessions.NY += t.profit;
        });

        document.getElementById('sideStats').innerHTML = Object.entries(sides).map(([n,p]) => `<div class="data-row"><span>${n}</span><span class="${p >=0 ? 'profit-pos' : 'profit-neg'}">${p.toFixed(2)}</span></div>`).join('');
        document.getElementById('sessionStats').innerHTML = Object.entries(sessions).map(([n,p]) => `<div class="data-row"><span>${n}</span><span class="${p >=0 ? 'profit-pos' : 'profit-neg'}">${p.toFixed(2)}</span></div>`).join('');
        document.getElementById('pairStats').innerHTML = Object.entries(pairs).sort((a,b)=>b[1]-a[1]).map(([n,p]) => `<div class="data-row"><span>${n}</span><span class="${p >=0 ? 'profit-pos' : 'profit-neg'}">${p.toFixed(2)}</span></div>`).join('');

        renderChart(trades);
        calcRisk();
        log(`Success: Parsed ${trades.length} trades. Balance: $${currentBalance}`);
    };

    const renderChart = (trades) => {
        const ctx = document.getElementById('equityChart');
        if (chart) chart.destroy();
        let cum = 0;
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: trades.map((_,i)=>i+1),
                datasets: [{ data: trades.map(t => { cum += t.profit; return cum; }), borderColor: '#00ff88', tension: 0.3, fill: true, backgroundColor: 'rgba(0,255,136,0.05)', pointRadius: 0 }]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { x: { display: false }, y: { grid: { color: '#222' } } }, plugins: { legend: { display: false } } }
        });
    };

    const calcRisk = () => {
        const sl = parseFloat(document.getElementById('riskSL').value) || 1;
        const perc = parseFloat(document.getElementById('riskPerc').value) || 1;
        const lot = (currentBalance * (perc/100)) / (sl * 10);
        document.getElementById('lotSizeResult').innerText = lot > 0 ? lot.toFixed(2) : "0.00";
    };

    document.querySelectorAll('.guard').forEach(c => c.addEventListener('change', () => {
        const all = Array.from(document.querySelectorAll('.guard')).every(i => i.checked);
        const btn = document.getElementById('lockBtn');
        btn.className = all ? 'btn-lock btn-unlock' : 'btn-lock';
        btn.innerText = all ? 'SYSTEM READY ✅' : 'LOCKED 🔒';
    }));

    document.getElementById('fileInput').addEventListener('change', (e) => {
        const reader = new FileReader();
        log("Reading file...");
        reader.onload = (ev) => updateUI(parseReport(ev.target.result));
        reader.readAsText(e.target.files[0]);
    });