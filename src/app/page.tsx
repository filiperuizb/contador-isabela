"use client"

import { useState, useEffect } from "react"
import { Minus, Plus, RotateCcw, Microscope, FlaskConical, Target } from "lucide-react"

export default function ContadorCelular() {
  const [celEpitelial, setCelEpitelial] = useState(0)
  const [linfocito, setLinfocito] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const savedCelEpitelial = localStorage.getItem("celEpitelial")
    const savedLinfocito = localStorage.getItem("linfocito")
    if (savedCelEpitelial !== null) setCelEpitelial(Number(savedCelEpitelial))
    if (savedLinfocito !== null) setLinfocito(Number(savedLinfocito))
  }, [])

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("celEpitelial", String(celEpitelial))
      localStorage.setItem("linfocito", String(linfocito))
    }
  }, [celEpitelial, linfocito, isMounted])
  const maxCelEpitelial = 160

  const isMaxReached = celEpitelial >= maxCelEpitelial
  const progressPercentage = (celEpitelial / maxCelEpitelial) * 100

  const incrementCelEpitelial = () => {
    if (celEpitelial < maxCelEpitelial) {
      setCelEpitelial((prev) => prev + 1)
    }
  }

  const incrementLinfocito = () => {
    if (!isMaxReached) {
      setLinfocito((prev) => prev + 1)
    }
  }

  const decrementCelEpitelial = () => {
    setCelEpitelial((prev) => Math.max(0, prev - 1))
  }

  const decrementLinfocito = () => {
    setLinfocito((prev) => Math.max(0, prev - 1))
  }

  const resetCounters = () => {
    setCelEpitelial(0)
    setLinfocito(0)
    localStorage.removeItem("celEpitelial")
    localStorage.removeItem("linfocito")
  }

  if (!isMounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 microscope-pattern p-3">
      <div className="max-w-sm mx-auto space-y-4">
        <div className="text-center py-4">
          <div className="flex justify-center items-center gap-2 mb-2">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
              <Microscope size={20} className="text-white" />
            </div>
            <h1 className="text-2xl code-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Contador
            </h1>
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
              <FlaskConical size={20} className="text-white" />
            </div>
          </div>
          <p className="text-gray-600 code-bold text-sm">Contagem de Células • Biomedicina</p>
        </div>

        {isMaxReached && (
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-3 rounded-xl text-center shadow-lg pulse-animation">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Target size={16} className="text-white" />
              <p className="code-bold text-sm">Limite Atingido!</p>
              <Target size={16} className="text-white" />
            </div>
            <p className="text-xs opacity-90">Células epiteliais: 160/160 completas</p>
          </div>
        )}

        <div className="space-y-6">
          <div className="cell-counter-card rounded-2xl p-4 shadow-xl border-l-4 border-purple-400">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <h2 className="text-center text-lg code-bold text-purple-700">Células Epiteliais</h2>
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            </div>

            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-purple-600 mb-1">{celEpitelial}</div>
              <div className="code-bold text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1 inline-block">
                máximo: {maxCelEpitelial}
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={decrementCelEpitelial}
                disabled={celEpitelial === 0}
                  className="w-12 h-12 rounded-xl border-2 border-purple-200 bg-white hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center code-bold transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              >
                <Minus size={20} className="text-purple-600" />
              </button>

              <button
                onClick={incrementCelEpitelial}
                disabled={isMaxReached}
                  className="w-20 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white code-bold flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer"
              >
                <Plus size={24} />
              </button>
            </div>
          </div>

          <div className="cell-counter-card rounded-2xl p-4 shadow-xl border-l-4 border-cyan-400">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              <h2 className="text-center text-lg code-bold text-cyan-700">Linfócitos</h2>
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
            </div>

            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-cyan-600 mb-1">{linfocito}</div>
              <div className="code-bold text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1 inline-block">
                sem limite
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={decrementLinfocito}
                disabled={linfocito === 0 || isMaxReached}
                  className="w-12 h-12 rounded-xl border-2 border-cyan-200 bg-white hover:bg-cyan-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center code-bold transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              >
                <Minus size={20} className="text-cyan-600" />
              </button>

              <button
                onClick={incrementLinfocito}
                disabled={isMaxReached}
                  className="w-20 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white code-bold flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer"
              >
                <Plus size={24} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button
            onClick={resetCounters}
              className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white code-bold text-lg rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer"
          >
            <RotateCcw size={20} />
            Resetar Contadores
          </button>
        </div>

        <div className="text-center pb-4 pt-4">
          <div className="text-xs text-gray-400 code-bold">Feito com Amor 🏎❤</div>
        </div>
      </div>
    </div>
  )
}
