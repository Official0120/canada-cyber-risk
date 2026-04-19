// Canadian Threat Data (from CCCS 2025-2026: Ransomware top, cybercrime rising)[web:23][web:29]
const threatData = {
    ON: {ransomware: 0.25, phishing: 0.20, ddos: 0.15}, // Hamilton example: $18.5M attack[web:26][web:32]
    QC: {ransomware: 0.22, phishing: 0.25, ddos: 0.12},
    // Add others...
};

function runSimulation() {
    const province = document.getElementById('province').value;
    const industry = document.getElementById('industry').value;
    const size = parseInt(document.getElementById('size').value);
    const remote = parseFloat(document.getElementById('remote').value) / 100;

    // Simple Monte Carlo: 1000 sims for risk distro[web:27]
    let risks = [];
    for (let i = 0; i < 1000; i++) {
        let risk = (threatData[province].ransomware * (size / 1000)) + (remote * 0.3) + (Math.random() * 0.1);
        risks.push(risk);
    }
    const avgRisk = risks.reduce((a, b) => a + b) / risks.length;
    const highRisk = risks.filter(r => r > 0.3).length / 10; // % high risk

    // Heatmap Chart (Chart.js)
    const ctx = document.getElementById('heatmap').getContext('2d');
    new Chart(ctx, {
        type: 'bar', // Or heatmap lib if added
        data: { labels: ['Ransomware', 'Phishing', 'DDoS'], datasets: [{data: Object.values(threatData[province]), backgroundColor: ['red', 'orange', 'yellow']}] },
        options: { title: { display: true, text: `ON Risk Heatmap (Avg: ${avgRisk.toFixed(2)})` } }
    });

    // Display
    document.getElementById('risk-score').innerHTML = `<h3>Risk Score: ${avgRisk.toFixed(3)} (High: ${highRisk.toFixed(0)}% chance)</h3>`;
    document.getElementById('playbook').innerHTML = `
        <h3>PIPEDA-Compliant Playbook:</h3>
        <ol>
            <li>Enable 2FA & Encrypt Data</li>
            <li>Incident Response: Report to CCCS</li>
            <li>Train Staff (16% CA biz hit in 2023)[web:24]</li>
        </ol>
    `;

    // PDF Export (html2canvas + jsPDF – add CDNs if needed)
    // window.print(); simple version
}

function exportPDF() { window.print(); }
