import React, { useState } from "react";

export default function TipCalculator() {
  const [amount, setAmount] = useState("");
  const [tipPercent, setTipPercent] = useState(null);
  const [tip, setTip] = useState(null);
  const [total, setTotal] = useState(null);
  const [error, setError] = useState("");

  const handleCalculate = (e) => {
    e.preventDefault();
    setError("");
    setTip(null);
    setTotal(null);

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Ingrese un monto válido (mayor que cero).");
      return;
    }
    if (!tipPercent) {
      setError("Seleccione un porcentaje de propina.");
      return;
    }
    const calculatedTip = numAmount * tipPercent;
    setTip(calculatedTip);
    setTotal(numAmount + calculatedTip);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Calculadora de Propinas
      </h2>
      <form onSubmit={handleCalculate} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-1">Monto de la cuenta</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ej: 100.00"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Porcentaje de propina</label>
          <div className="flex space-x-2">
            {[0.1, 0.15, 0.2].map((percent) => (
              <button
                type="button"
                key={percent}
                onClick={() => setTipPercent(percent)}
                className={`px-4 py-2 rounded border ${
                  tipPercent === percent
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                } focus:outline-none`}
              >
                {percent * 100}%
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white rounded font-bold hover:bg-green-600 transition"
        >
          Calcular
        </button>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative">
            {error}
          </div>
        )}
        {(tip !== null && total !== null) && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 rounded mt-4 text-center">
            <div>
              <span className="font-semibold">Propina:</span> $ {tip.toFixed(2)}
            </div>
            <div>
              <span className="font-semibold">Total a pagar:</span> $ {total.toFixed(2)}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}