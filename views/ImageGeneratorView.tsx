
import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import LoadingSpinner from '../components/LoadingSpinner';

const ImageGeneratorView: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setImageUrl(null);
        try {
            const url = await generateImage(prompt);
            setImageUrl(url);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-2 mb-8">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A cinematic shot of a raccoon in a library, award-winning photography"
                    rows={2}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow resize-none"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    className="bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-600 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? <LoadingSpinner className="w-6 h-6" /> : 'Generate'}
                </button>
            </form>

            <div className="aspect-square bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center">
                {isLoading && <LoadingSpinner className="w-16 h-16" />}
                {error && <p className="text-red-400 p-4">{error}</p>}
                {imageUrl && !isLoading && (
                    <img src={imageUrl} alt={prompt} className="object-contain w-full h-full rounded-lg" />
                )}
                {!isLoading && !error && !imageUrl && (
                    <p className="text-slate-500">Your generated image will appear here</p>
                )}
            </div>
        </div>
    );
};

export default ImageGeneratorView;
