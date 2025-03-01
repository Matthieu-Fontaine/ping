import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type PingData = {
  labels: string[];
  datasets: { label: string; data: number[]; borderColor: string; fill: boolean; pointRadius: number }[];
};

function PingChart() {
  const [pingData, setPingData] = useState<PingData>({
    labels: [],
    datasets: [{ label: "Ping (ms)", data: [], borderColor: "#3b82f6", fill: false, pointRadius: 0 }]
  });
  const [currentPing, setCurrentPing] = useState<string | number>("--");
  const [averagePing, setAveragePing] = useState<number>(0);

  async function getPing(): Promise<number> {
    const start = performance.now();
    try {
      await fetch("185.216.27.125", { mode: "no-cors" });
    } catch (e) { }
    return Math.round(performance.now() - start);
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      const ping = await getPing();
      setCurrentPing(ping);
      setPingData((prevData) => {
        const newLabels = [...prevData.labels, new Date().toLocaleTimeString()];
        const newData = [...prevData.datasets[0].data, ping];

        if (newLabels.length > 50) newLabels.shift();
        if (newData.length > 50) newData.shift();

        const sum = newData.reduce((a, b) => a + b, 0);
        setAveragePing(sum / newData.length);

        return { labels: newLabels, datasets: [{ ...prevData.datasets[0], data: newData, pointRadius: 0 }] };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md">
        <Line
          data={pingData}
          options={{
            responsive: true,
            scales: { y: { beginAtZero: true } },
            elements: {
              line: { borderWidth: 2 },
              point: { radius: 3 }
            },
            plugins: {
              legend: { display: true },
              tooltip: { enabled: true }
            },
            datasets: {
              line: {
                segment: {
                  borderColor: (ctx: any) => {
                    const value = ctx.p1.raw; // Récupère la valeur du point suivant
                    return value < 50 ? "green" : value < 100 ? "orange" : "red";
                  }
                }
              }
            }
          }}
        />
      </div>
      <p className="mt-4 text-lg text-gray-700">Ping actuel: <span className="font-semibold">{currentPing} ms</span></p>
      <p className="mt-2 text-lg text-gray-700">Ping moyen: <span className="font-semibold">{averagePing.toFixed(2)} ms</span></p>
    </div>
  );
}

export default PingChart;