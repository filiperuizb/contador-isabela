"use client"

import { useState, useEffect } from "react"
import { Minus, Plus, RotateCcw, Microscope, Target, FlaskConical } from "lucide-react"

export default function ContadorCelular() {
  const [celEpitelial, setCelEpitelial] = useState(0)
  const [linfocito, setLinfocito] = useState(0)

  useEffect(() => {
    const savedCelEpitelial = localStorage.getItem("celEpitelial")
    const savedLinfocito = localStorage.getItem("linfocito")
    if (savedCelEpitelial !== null) setCelEpitelial(Number(savedCelEpitelial))
    if (savedLinfocito !== null) setLinfocito(Number(savedLinfocito))
  }, [])

  useEffect(() => {
    localStorage.setItem("celEpitelial", String(celEpitelial))
    localStorage.setItem("linfocito", String(linfocito))
  }, [celEpitelial, linfocito])

  const maxCelEpitelial = 160
  const isMaxReached = celEpitelial >= maxCelEpitelial

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

  return (
    <div className="min-h-screen microscope-pattern flex flex-col">
      <div className="pt-4 pb-2">
        <div className="max-w-sm sm:max-w-md md:max-w-lg mx-auto w-full px-2 sm:px-4">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <Microscope size={16} className="text-white sm:w-5 sm:h-5" />
              </div>
              <h1 className="text-lg sm:text-2xl code-bold text-purple-600">CONTADOR</h1>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-600 rounded-full flex items-center justify-center">
                <FlaskConical size={16} className="text-white sm:w-5 sm:h-5" />
              </div>
            </div>
            <p className="text-gray-600 text-xs code-bold">CONTAGEM DE CÉLULAS • BIOMEDICINA</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-2 sm:p-4">
        <div className="max-w-sm sm:max-w-md md:max-w-lg mx-auto w-full">
          {isMaxReached && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 text-amber-800 px-2 py-1 sm:px-3 sm:py-2 rounded-2xl text-center mb-3 shadow-lg">
              <div className="flex items-center justify-center gap-2">
                <Target size={14} className="text-amber-600" />
                <span className="code-bold text-xs sm:text-sm">Limite de 160 células atingido!</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div
              onClick={incrementCelEpitelial}
              className="cell-counter-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-purple-600"></div>

              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <h2 className="code-bold text-sm sm:text-lg text-purple-700 leading-tight max-w-[calc(100%-2.5rem)]">
                  CÉLULAS
                  <br />
                  EPITELIAIS
                </h2>
                <button
                  onClick={(e) => { e.stopPropagation(); decrementCelEpitelial(); }}
                  disabled={celEpitelial === 0}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-100 hover:bg-purple-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center transition-all duration-200 shadow-md active:scale-90 border-2 border-purple-200"
                >
                  <Minus size={14} className="text-purple-600 sm:w-4 sm:h-4" />
                </button>
              </div>

              <div className="text-center mb-4 sm:mb-6">
                <div className="text-4xl sm:text-6xl font-bold text-purple-600 mb-2">{celEpitelial}</div>
                <div className="text-sm text-gray-500 code-bold">máximo: {maxCelEpitelial}</div>
              </div>
            </div>

            <div
              onClick={incrementLinfocito}
              className="cell-counter-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 to-cyan-600"></div>

              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <h2 className="code-bold text-sm sm:text-lg text-cyan-700 leading-tight max-w-[calc(100%-2.5rem)]">
                  LINFÓCITOS
                </h2>
                <button
                  onClick={(e) => { e.stopPropagation(); decrementLinfocito(); }}
                  disabled={linfocito === 0 || isMaxReached}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-100 hover:bg-cyan-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center transition-all duration-200 shadow-md active:scale-90 border-2 border-cyan-200"
                >
                  <Minus size={14} className="text-cyan-600 sm:w-4 sm:h-4" />
                </button>
              </div>

              <div className="text-center mb-4 sm:mb-6">
                <div className="text-4xl sm:text-6xl font-bold text-cyan-600 mb-2">{linfocito}</div>
                <div className="text-sm text-gray-500 code-bold">sem limite</div>
              </div>
            </div>
          </div>

          <div className="fixed bottom-4 right-4">
            <button
              onClick={resetCounters}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:via-rose-600 hover:to-pink-700 text-white code-bold text-sm sm:text-lg rounded-full flex items-center justify-center transition-all duration-200 shadow-xl active:scale-95 border-2 border-pink-400/30 cursor-pointer"
            >
              <RotateCcw size={18} className="sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="text-center pt-3 sm:pt-4">
            <div className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <div className="text-xs text-gray-500 code-bold">Feito com 🏎💜</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
