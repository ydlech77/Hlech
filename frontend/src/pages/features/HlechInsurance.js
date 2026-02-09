// src/pages/features/HlechInsurance.js
import React, { useState, useEffect } from "react";

export default function HlechInsurance() {
  const [goalName, setGoalName] = useState("");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("daily");
  const [duration, setDuration] = useState(30);
  const [fundType, setFundType] = useState("manual");
  const [cardNumber, setCardNumber] = useState("");
  const [showTotalSaved, setShowTotalSaved] = useState(true);

  const [plans, setPlans] = useState([]);
  const [notification, setNotification] = useState("");

  // Load plans from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("hlech-plans")) || [];
    setPlans(stored);
  }, []);

  // Save plans to localStorage
  const savePlans = (updatedPlans) => {
    setPlans(updatedPlans);
    localStorage.setItem("hlech-plans", JSON.stringify(updatedPlans));
  };

  // Generate 11-digit account number
  const generateAccountNumber = () => {
    return Math.floor(10000000000 + Math.random() * 90000000000).toString();
  };

  const handleCreatePlan = (e) => {
    e.preventDefault();
    if (!goalName) {
      alert("Please enter a savings goal!");
      return;
    }
    const newPlan = {
      id: Date.now(),
      goalName,
      amount: Number(amount),
      period,
      duration: Number(duration),
      fundType,
      cardNumber: fundType === "auto" ? cardNumber : "",
      saved: 0,
      day: 0,
      accountNumber: generateAccountNumber(),
      lastUpdate: new Date().getTime(),
    };
    const updatedPlans = [...plans, newPlan];
    savePlans(updatedPlans);
    setGoalName("");
    setAmount("");
    setDuration(30);
    setFundType("manual");
    setCardNumber("");
    alert(`🎉 Hlech Insurance plan created! Account Number: ${newPlan.accountNumber}`);
  };

  // Update plans (simulate daily/weekly increments)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const updatedPlans = plans.map((plan) => {
        if (plan.day >= plan.duration) return plan; // completed plan

        const msPerDay = 24 * 60 * 60 * 1000;
        const msPerWeek = 7 * msPerDay;
        const timePassed = now - plan.lastUpdate;

        if (
          (plan.period === "daily" && timePassed >= msPerDay) ||
          (plan.period === "weekly" && timePassed >= msPerWeek)
        ) {
          let newSaved = plan.saved;
          let newDay = plan.day + (plan.period === "daily" ? 1 : 7);
          if (newDay > plan.duration) newDay = plan.duration;

          if (plan.fundType === "auto") {
            newSaved += plan.amount;
            setNotification(
              `✅ Auto deduction successful for plan "${plan.goalName}": ₦${plan.amount} added`
            );
          } else {
            setNotification(
              `📢 It's time to fund your plan "${plan.goalName}" for day ${
                plan.period === "daily" ? newDay : Math.ceil(newDay / 7)
              } (₦${plan.amount})`
            );
          }

          return {
            ...plan,
            saved: newSaved,
            day: newDay,
            lastUpdate: now,
          };
        }
        return plan;
      });
      savePlans(updatedPlans);
    }, 10000); // check every 10 seconds for demo
    return () => clearInterval(interval);
  }, [plans]);

  const handleManualFund = (planId) => {
    const updatedPlans = plans.map((plan) => {
      if (plan.id === planId) {
        const newSaved = plan.saved + plan.amount;
        return { ...plan, saved: newSaved, day: plan.day + 1, lastUpdate: new Date().getTime() };
      }
      return plan;
    });
    savePlans(updatedPlans);
    setNotification(`✅ You funded your plan manually!`);
  };

  const handleWithdraw = (planId) => {
    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;
    if (plan.day < plan.duration) {
      alert(`❌ You cannot withdraw "${plan.goalName}" until day ${plan.duration}`);
      return;
    }
    alert(`🎉 Withdrawal successful for "${plan.goalName}": ₦${plan.saved}`);
    const updatedPlans = plans.filter((p) => p.id !== planId);
    savePlans(updatedPlans);
  };

  const handleClear = (planId) => {
    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;
    if (plan.day >= plan.duration) {
      const updatedPlans = plans.filter((p) => p.id !== planId);
      savePlans(updatedPlans);
      setNotification("");
    } else {
      alert("❌ You can only clear the plan after duration is complete!");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl space-y-4">
      <h1 className="text-2xl font-bold text-green-600">💚 Hlech Insurance</h1>

      <form onSubmit={handleCreatePlan} className="space-y-4">
        <div>
          <label>Savings Goal Name</label>
          <input
            type="text"
            required
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="e.g., Buy a phone"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label>Amount to save (₦)</label>
          <input
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label>Saving Period</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        <div>
          <label>Duration (days)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label>Funding Method</label>
          <select
            value={fundType}
            onChange={(e) => setFundType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="manual">Manual Funding</option>
            <option value="auto">Auto Bank Funding</option>
          </select>
        </div>

        {fundType === "auto" && (
          <div>
            <label>Debit Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="0000 0000 0000 0000"
              className="w-full p-2 border rounded"
            />
          </div>
        )}

        <div className="flex gap-2 items-center">
          <label>
            <input
              type="checkbox"
              checked={showTotalSaved}
              onChange={() => setShowTotalSaved(!showTotalSaved)}
              className="mr-2"
            />
            Show Total Saved
          </label>
        </div>

        <button className="w-full py-2 bg-green-600 text-white rounded">
          Create Hlech Insurance Plan
        </button>
      </form>

      {notification && (
        <div className="p-2 bg-yellow-100 text-yellow-800 rounded">{notification}</div>
      )}

      {plans.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Your Savings Plans</h2>
          {plans.map((plan) => {
            const totalTarget =
              plan.amount * (plan.period === "daily" ? plan.duration : Math.floor(plan.duration / 7));
            const progress = Math.min((plan.saved / totalTarget) * 100, 100);
            return (
              <div key={plan.id} className="p-4 border rounded space-y-2 bg-gray-50">
                <p>🏦 Goal: {plan.goalName}</p>
                <p>🏦 Account: {plan.accountNumber}</p>
                <p>📅 Day: {plan.day} / {plan.duration}</p>
                {showTotalSaved && <p>💰 Saved: ₦{plan.saved}</p>}
                <p>🎯 Target: ₦{totalTarget}</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {plan.fundType === "manual" && plan.day < plan.duration && (
                  <button
                    onClick={() => handleManualFund(plan.id)}
                    className="w-full py-2 bg-blue-600 text-white rounded"
                  >
                    Fund Now (₦{plan.amount})
                  </button>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleWithdraw(plan.id)}
                    className="flex-1 py-2 bg-black text-white rounded"
                  >
                    Withdraw
                  </button>
                  <button
                    onClick={() => handleClear(plan.id)}
                    className="flex-1 py-2 bg-red-600 text-white rounded"
                  >
                    Clear
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
