import PingChart from './components/pingCharts'
import './App.css'
import InfoIp from './components/infoIp'

function App() {

  return (
    <div className="grid grid-cols-12 gap-2.5 p-4">
      <div className="col-span-4 border border-gray-300 rounded-lg shadow-ld transform transition-transform duration-200 hover:scale-101 bg-gray-100 p-4">
        <PingChart />
      </div>
      <div className="col-span-3 border border-gray-300 rounded-lg shadow-ld transform transition-transform duration-200 hover:scale-101 bg-gray-100 p-4">
        <InfoIp />
      </div>
    </div>
  )
}

export default App
