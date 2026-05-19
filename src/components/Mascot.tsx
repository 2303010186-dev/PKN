/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { User } from 'lucide-react';

export default function Mascot({ mood = 'happy' }: { mood?: 'happy' | 'thinking' | 'correct' | 'wrong' }) {
  return (
    <motion.div 
      className="relative flex flex-col items-center"
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    >
      {/* Fallback for the Sundanese character since no image generation */}
      <div className="w-32 h-40 bg-[#FFE0BD] rounded-full border-4 border-[#8B4513]/20 flex items-center justify-center relative overflow-hidden shadow-xl">
        {/* Simple sundanese-inspired hat (Ikat) represented with shapes */}
        <div className="absolute top-0 w-full h-8 bg-[#3D2B1F] rounded-t-full transform -rotate-2" />
        
        {/* Character head */}
        <div className="flex flex-col items-center">
            <User className="w-20 h-20 text-[#8B4513]" />
            <div className="flex gap-2 -mt-4">
               {mood === 'happy' && <span className="text-2xl">😊</span>}
               {mood === 'thinking' && <span className="text-2xl">🤔</span>}
               {mood === 'correct' && <span className="text-2xl">🎉</span>}
               {mood === 'wrong' && <span className="text-2xl">😅</span>}
            </div>
        </div>

        {/* Traditional shirt accent */}
        <div className="absolute bottom-0 w-full h-12 bg-[#8B4513] border-t-2 border-[#D2691E]" />
      </div>
      
      <div className="mt-2 bg-white px-4 py-1 rounded-full shadow-md border-2 border-[#8B4513]/10">
        <p className="text-xs font-bold text-[#8B4513] uppercase tracking-wider">Saya</p>
      </div>
    </motion.div>
  );
}
