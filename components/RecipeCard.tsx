
import React from 'react';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-cyan-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10">
      <h3 className="text-xl font-bold text-cyan-300 mb-4">{recipe.recipeName}</h3>
      
      <div className="mb-4">
        <h4 className="font-semibold text-slate-300 mb-2">Ingredients:</h4>
        <ul className="list-disc list-inside space-y-1 text-slate-400">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-slate-300 mb-2">Instructions:</h4>
        <ol className="list-decimal list-inside space-y-2 text-slate-400">
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeCard;
