
import React, { useState } from 'react';
import { summarizeText } from '../services/geminiService';
import LoadingSpinner from '../components/LoadingSpinner';

const SummarizerView: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSummarize = async () => {
        if (!inputText.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setSummary('');
        try {
            const result = await summarizeText(inputText);
            setSummary(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-full">
            <div className="flex-1 flex flex-col">
                <label htmlFor="input-text" className="text-lg font-semibold mb-2 text-slate-300">
                    Text to Summarize
                </label>
                <textarea
                    id="input-text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your text here..."
                    className="flex-1 w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow resize-none"
                    disabled={isLoading}
                />
            </div>

            <div className="flex flex-col items-center justify-center lg:w-40">
                <button
                    onClick={handleSummarize}
                    disabled={isLoading || !inputText.trim()}
                    className="bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-600 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed w-full"
                >
                    {isLoading ? <LoadingSpinner className="w-6 h-6 mx-auto" /> : 'Summarize'}
                </button>
            </div>

            <div className="flex-1 flex flex-col">
                <label htmlFor="summary-output" className="text-lg font-semibold mb-2 text-slate-300">
                    Summary
                </label>
                <div className="flex-1 w-full bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-slate-300 overflow-y-auto">
                    {error && <p className="text-red-400">{error}</p>}
                    {summary ? <p className="whitespace-pre-wrap">{summary}</p> : <p className="text-slate-500">Your summary will appear here.</p>}
                </div>
            </div>
        </div>
    );
};

export default SummarizerView;
