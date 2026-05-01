import { motion } from "framer-motion"
import { useState } from "react"
import { TrendingUp, Bike, Zap, BarChart3 } from "lucide-react"
import AnimatedButton from "./AnimatedButton"

const transportTypes = [
  {
    id: "scooter",
    name: "Самокат",
    icon: <Zap className="w-6 h-6" />,
    costPerMin: 5,
    description: "Электросамокат",
  },
  {
    id: "bike",
    name: "Велосипед",
    icon: <Bike className="w-6 h-6" />,
    costPerMin: 3,
    description: "Обычный велосипед",
  },
]

const subscriptionTypes = [
  { id: "permin", name: "Поминутно", discount: 1 },
  { id: "day", name: "День 299₽", discount: 0.6 },
  { id: "month", name: "Месяц 1990₽", discount: 0.3 },
]

export default function ROICalculatorHome() {
  const [tripsPerWeek, setTripsPerWeek] = useState(10)
  const [tripDuration, setTripDuration] = useState(15)
  const [selectedTransport, setSelectedTransport] = useState("scooter")
  const [selectedSub, setSelectedSub] = useState("permin")

  const transport = transportTypes.find((t) => t.id === selectedTransport)
  const sub = subscriptionTypes.find((s) => s.id === selectedSub)
  const costPerMin = transport?.costPerMin || 5
  const discount = sub?.discount || 1

  const monthlyTrips = tripsPerWeek * 4
  const costPerTrip = tripDuration * costPerMin * discount
  const monthlyCost = Math.round(monthlyTrips * costPerTrip)

  const taxiCostPerTrip = tripDuration * 25
  const monthlySaving = Math.round(monthlyTrips * taxiCostPerTrip - monthlyCost)
  const co2Saved = Math.round(monthlyTrips * tripDuration * 0.12)

  return (
    <section className="py-24 bg-black relative backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">Посчитайте экономию</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Узнайте, сколько вы сэкономите по сравнению с такси и личным автомобилем
          </p>
        </motion.div>

        <div className="bg-gray-900/40 border border-gray-700/30 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, rgba(34,197,94,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 80%, rgba(16,185,129,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 80%, rgba(20,184,166,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(34,197,94,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 20%, rgba(34,197,94,0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 15, repeat: Infinity }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Controls */}
            <div className="space-y-8">
              {/* Transport Type */}
              <div>
                <label className="block text-lg font-medium text-white mb-4">Тип транспорта</label>
                <div className="grid grid-cols-2 gap-3">
                  {transportTypes.map((t) => (
                    <motion.button
                      key={t.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTransport(t.id)}
                      className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                        selectedTransport === t.id
                          ? "bg-green-500/20 border-green-500/50 text-white"
                          : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`p-2 rounded-lg ${selectedTransport === t.id ? "bg-green-500/30" : "bg-gray-700/50"}`}>
                          {t.icon}
                        </div>
                        <div>
                          <div className="font-medium">{t.name}</div>
                          <div className="text-xs opacity-70">{t.description}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Subscription */}
              <div>
                <label className="block text-lg font-medium text-white mb-4">Тариф</label>
                <div className="grid grid-cols-3 gap-2">
                  {subscriptionTypes.map((s) => (
                    <motion.button
                      key={s.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedSub(s.id)}
                      className={`p-3 rounded-xl border transition-all duration-200 text-center text-sm ${
                        selectedSub === s.id
                          ? "bg-green-500/20 border-green-500/50 text-white"
                          : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600/50"
                      }`}
                    >
                      {s.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Trips per week slider */}
              <div>
                <label className="block text-lg font-medium text-white mb-4">Поездок в неделю</label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={tripsPerWeek}
                  onChange={(e) => setTripsPerWeek(Number(e.target.value))}
                  className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #22c55e 0%, #22c55e ${((tripsPerWeek - 1) / 29) * 100}%, #374151 ${((tripsPerWeek - 1) / 29) * 100}%, #374151 100%)`,
                  }}
                />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>1</span>
                  <span className="text-white font-bold text-lg">{tripsPerWeek} поездок</span>
                  <span>30</span>
                </div>
              </div>

              {/* Trip duration slider */}
              <div>
                <label className="block text-lg font-medium text-white mb-4">Длительность поездки</label>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={tripDuration}
                  onChange={(e) => setTripDuration(Number(e.target.value))}
                  className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${((tripDuration - 5) / 55) * 100}%, #374151 ${((tripDuration - 5) / 55) * 100}%, #374151 100%)`,
                  }}
                />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>5 мин</span>
                  <span className="text-white font-bold text-lg">{tripDuration} мин</span>
                  <span>60 мин</span>
                </div>
              </div>

              <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <BarChart3 className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium text-white">Сравниваем с такси</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Расчёт основан на средней стоимости такси 25 ₽/мин в городе. Реальная экономия может быть выше.
                </p>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* Big savings circle */}
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="6" fill="none" className="text-gray-700" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="url(#greenGradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 219.8" }}
                    animate={{
                      strokeDasharray: `${Math.min((monthlySaving / (monthlyCost + monthlySaving)) * 219.8, 219.8)} 219.8`,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="50%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      key={`${tripsPerWeek}-${tripDuration}-${selectedTransport}-${selectedSub}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl font-bold text-white"
                    >
                      {Math.round((monthlySaving / Math.max(monthlyCost + monthlySaving, 1)) * 100)}%
                    </motion.div>
                    <div className="text-gray-400 text-sm">Экономия</div>
                  </div>
                </div>
              </div>

              {/* Result Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 text-center">
                  <div className="w-8 h-8 text-green-400 mx-auto mb-2 flex items-center justify-center text-2xl font-bold">₽</div>
                  <motion.div
                    key={`cost-${tripsPerWeek}-${tripDuration}-${selectedTransport}-${selectedSub}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-white mb-1"
                  >
                    {monthlyCost.toLocaleString("ru-RU")}
                  </motion.div>
                  <div className="text-gray-400 text-sm">GreenWay/мес</div>
                </div>

                <div className="bg-gray-800/50 rounded-2xl p-6 border border-green-700/30 text-center">
                  <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <motion.div
                    key={`saving-${tripsPerWeek}-${tripDuration}-${selectedTransport}-${selectedSub}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-green-400 mb-1"
                  >
                    {monthlySaving > 0 ? `+${monthlySaving.toLocaleString("ru-RU")}` : "0"}
                  </motion.div>
                  <div className="text-gray-400 text-sm">Экономия/мес</div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/30 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🌿</div>
                <motion.div
                  key={`co2-${tripsPerWeek}-${tripDuration}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-2xl font-bold text-green-400 mb-1"
                >
                  {co2Saved} кг
                </motion.div>
                <div className="text-gray-400 text-sm">CO₂ сэкономлено в месяц</div>
              </div>

              <a href="#get-started">
                <AnimatedButton className="w-full bg-green-500 text-white hover:bg-green-400">
                  Попробовать бесплатно — 30 минут в подарок
                </AnimatedButton>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
