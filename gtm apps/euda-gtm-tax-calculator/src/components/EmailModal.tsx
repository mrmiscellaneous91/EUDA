import { X, Mail, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface EmailModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (email: string) => void;
}

export function EmailModal({ isOpen, onClose, onSubmit }: EmailModalProps) {
    const [email, setEmail] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(email);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />
            <div className="relative bg-card border border-border shadow-2xl rounded-[2rem] w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted/50 transition-colors text-muted-foreground"
                >
                    <X size={20} />
                </button>

                <div className="p-10 space-y-8">
                    <div className="space-y-4 text-center">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto">
                            <Sparkles size={32} />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight">Save your result & join EUDA</h2>
                            <p className="text-muted-foreground">
                                We'll email you this breakdown and an exclusive invite to lower your rent with EUDA.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                <Mail size={20} />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full bg-muted/30 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary focus:bg-card transition-all outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:opacity-90 transition-all shadow-lg active:scale-[0.98]"
                        >
                            Get My Breakdown
                        </button>
                    </form>

                    <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold">
                        No spam. Just rent savings.
                    </p>
                </div>
            </div>
        </div>
    );
}
