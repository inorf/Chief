import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const recipes = [
  { name: "Americano/Czarna/Biała duża", colbSize: 1, cupSize: 3, buttonType: 4, addon: "Brak" },
  { name: "Espresso lungo/Czarna/Biała mała", colbSize: 1, cupSize: 2, buttonType: 2, addon: "Brak" },
  { name: "Espresso doppio", colbSize: 2, cupSize: 2, buttonType: 3, addon: "Brak" },
  { name: "Espresso", colbSize: 1, cupSize: 1, buttonType: 1, addon: "Brak" },
  { name: "Espresso macchiato", colbSize: 1, cupSize: 1, buttonType: 1, addon: "Dolać mleko" },
  { name: "Cappuccino", colbSize: 1, cupSize: 2, buttonType: 1, addon: "Dolać mleko" },
  { name: "Cappuccino duże", colbSize: 2, cupSize: 3, buttonType: 3, addon: "Dolać mleko" },
  { name: "Latte", colbSize: 1, cupSize: 5, buttonType: 3, addon: "Najpierw mleko" },
  { name: "Latte duże", colbSize: 2, cupSize: 4, buttonType: 3, addon: "Najpierw mleko" },
  { name: "Latte machiato", colbSize: 2, cupSize: 6, buttonType: 3, addon: "Brak" },
];

const options = {
  cupSize: [1, 2, 3, 4, 5, 6],
  colbSize: [1, 2],
  buttonType: [1, 2, 3, 4],
  addon: ["Brak", "Dolać mleko", "Najpierw mleko"],
};

function CoffeeTest() {
  const [current, setCurrent] = useState(recipes[Math.floor(Math.random() * recipes.length)]);
  const [selected, setSelected] = useState({ cupSize: null, colbSize: null, buttonType: null, addon: null });
  const [result, setResult] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);

  const handleCheck = () => {
    const isCorrect =
      selected.cupSize == current.cupSize &&
      selected.colbSize == current.colbSize &&
      selected.buttonType == current.buttonType &&
      selected.addon == current.addon;
    setResult(isCorrect ? "✅ Poprawnie!" : "❌ Błąd. Spróbuj ponownie.");
    setShowCorrect(!isCorrect);
  };

  const getNextRecipe = () => {
    const availableRecipes = recipes.filter(recipe => recipe.name !== current.name);
    if (availableRecipes.length === 0) return current;
    return availableRecipes[Math.floor(Math.random() * availableRecipes.length)];
  };

  const handleNext = () => {
    const nextRecipe = getNextRecipe();
    setCurrent(nextRecipe);
    setSelected({ cupSize: null, colbSize: null, buttonType: null, addon: null });
    setResult(null);
    setShowCorrect(false);
  };


  return (
    <div className="p-4 max-w-4xl mx-auto flex flex-col gap-4 md:grid md:grid-cols-2">
      <Card className="bg-[#f6f2ee] border border-[#d8ccc2] shadow-lg">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-2xl font-bold text-[#5b3a29]">{current.name}</h2>

          <div>
            <p className="font-semibold text-[#3e2c23]">Rozmiar filiżanki</p>
            <div className="flex flex-wrap gap-2">
              {options.cupSize.map((val) => (
                <Button
                  key={val}
                  onClick={() => setSelected((s) => ({ ...s, cupSize: val }))}
                  className={`rounded-full px-4 py-2 transition-colors ${selected.cupSize === val ? "bg-[#8c5e3c] text-white" : "bg-white border border-[#c1a792] text-[#5b3a29]"}`}
                >
                  {val}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold text-[#3e2c23]">Kolba</p>
            <div className="flex gap-2">
              {options.colbSize.map((val) => (
                <Button
                  key={val}
                  onClick={() => setSelected((s) => ({ ...s, colbSize: val }))}
                  className={`rounded-full px-4 py-2 transition-colors ${selected.colbSize === val ? "bg-[#8c5e3c] text-white" : "bg-white border border-[#c1a792] text-[#5b3a29]"}`}
                >
                  {val}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold text-[#3e2c23]">Przycisk ekspresu</p>
            <div className="flex gap-2">
              {options.buttonType.map((val) => (
                <Button
                  key={val}
                  onClick={() => setSelected((s) => ({ ...s, buttonType: val }))}
                  className={`rounded-full px-4 py-2 transition-colors ${selected.buttonType === val ? "bg-[#8c5e3c] text-white" : "bg-white border border-[#c1a792] text-[#5b3a29]"}`}
                >
                  {val}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold text-[#3e2c23]">Dodatek</p>
            <div className="flex flex-wrap gap-2">
              {options.addon.map((val) => (
                <Button
                  key={val}
                  onClick={() => setSelected((s) => ({ ...s, addon: val }))}
                  className={`rounded-full px-4 py-2 transition-colors ${selected.addon === val ? "bg-[#8c5e3c] text-white" : "bg-white border border-[#c1a792] text-[#5b3a29]"}`}
                >
                  {val}
                </Button>
              ))}
            </div>
          </div>

          {result ? (
            <>
              <div className="text-center text-lg font-bold mt-4 text-[#5b3a29]">{result}</div>
              {showCorrect && (
                <div className="mt-2 p-2 bg-yellow-100 rounded text-sm">
                  ✅ Poprawna odpowiedź:<br />
                  ☕ Filiżanka: {current.cupSize} | 🧯 Kolba: {current.colbSize} | 🔘 Przycisk: {current.buttonType} | 🥛 Dodatek: {current.addon}
                </div>
              )}
              <Button className="w-full mt-2 bg-[#5b3a29] text-white" onClick={handleNext}>
                Następne pytanie
              </Button>
            </>
          ) : (
            <Button className="w-full mt-2 bg-[#5b3a29] text-white" onClick={handleCheck}>
              Sprawdź
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="bg-[#fff9f4] border border-[#d8ccc2] shadow-sm">
        <CardContent className="p-4">
          <h3 className="text-lg font-bold mb-2 text-[#5b3a29]">Twoje wybory</h3>
          <ul className="space-y-1 text-[#3e2c23]">
            <li>☕ Filiżanka: {selected.cupSize ?? "-"}</li>
            <li>🧯 Kolba: {selected.colbSize ?? "-"}</li>
            <li>🔘 Przycisk: {selected.buttonType ?? "-"}</li>
            <li>🥛 Dodatek: {selected.addon ?? "-"}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function RecipeList() {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-[#5b3a29]">Wszystkie recepty</h1>
      <ul className="space-y-2">
        {recipes.map((r, i) => (
          <li key={i} className="border p-3 rounded-md shadow-sm bg-[#fff9f4]">
            <div className="font-bold text-[#5b3a29]">{r.name}</div>
            <div>☕ Filiżanka: {r.cupSize}</div>
            <div>🧯 Kolba: {r.colbSize}</div>
            <div>🔘 Przycisk: {r.buttonType}</div>
            <div>🥛 Dodatek: {r.addon}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="p-4 flex gap-4 justify-center bg-[#f3ebe3]">
        <Link to="/" className="text-[#5b3a29] hover:underline font-semibold">Test</Link>
        <Link to="/recepty" className="text-[#5b3a29] hover:underline font-semibold">Wszystkie recepty</Link>
      </div>
      <Routes>
        <Route path="/" element={<CoffeeTest />} />
        <Route path="/recepty" element={<RecipeList />} />
      </Routes>
    </Router>
  );
}
