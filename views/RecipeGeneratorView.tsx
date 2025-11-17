
import React, { useState } from 'react';
import { generateRecipes } from '../services/geminiService';
import type { Recipe } from '../types';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';

const RecipeGeneratorView: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setRecipes([]);
        try {
            const result = await generateRecipes(prompt);
            setRecipes(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-2 mb-8">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Healthy chicken dinners, vegan desserts with chocolate"
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    className="bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-600 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? <LoadingSpinner className="w-6 h-6" /> : 'Get Recipes'}
                </button>
            </form>

            {isLoading && (
                <div className="flex justify-center items-center h-64">
                    <LoadingSpinner className="w-16 h-16" />
                </div>
            )}
            {error && (
                <div className="text-center p-4 bg-red-500/10 text-red-400 rounded-lg">
                    <p><strong>Error:</strong> {error}</p>
                </div>
            )}
            
            {!isLoading && !error && recipes.length === 0 && (
                <div className="text-center py-16 px-4 bg-slate-800/30 border-2 border-dashed border-slate-700 rounded-lg">
                    <h2 className="text-2xl font-semibold text-slate-400">Welcome to the Recipe Generator</h2>
                    <p className="text-slate-500 mt-2">Enter a theme or some ingredients above to discover new recipes!</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

export default RecipeGeneratorView;
