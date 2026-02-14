'use client';

import React, { useState } from 'react';
import { Heart, MessageCircle, User, Star, X, Check, Flower2 } from 'lucide-react';
import Image from 'next/image';

// --- Assets & Styles ---
// Hinge uses specific fonts (Modern Era for UI, Tiempos for Prompts). 
// We simulate this with standard fonts in the Tailwind classes.

// Color Palette based on Hinge Brand
const colors = {
  purple: '#613393', // Hinge Brand Purple
  rose: '#E65D5D',   // Rose Red
  offWhite: '#F9FAFB', // Background
  textMain: '#101010',
  textGray: '#6B7280',
};

// --- Components ---

// 1. Navigation Bar (Bottom)
const BottomNav = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const navItems = [
    { id: 'hinge', icon: <Image src={"/hinge_logo.png"} alt="hinge_logo" width={25} height={10}/>, label: 'Hinge' },
    { id: 'standouts', icon: <Star size={24} />, label: 'Standouts' },
    { id: 'matches', icon: <Heart size={24} fill={activeTab === 'matches' ? 'black' : 'none'} />, label: 'Matches', badge: 1 },
    { id: 'messages', icon: <MessageCircle size={24} />, label: 'Messages' },
    { id: 'profile', icon: <User size={24} />, label: 'Profile' },
  ];

  return (
    <div className="absolute bottom-0 w-full bg-white border-t border-gray-200 pb-6 pt-3 px-6 flex justify-between items-center z-50">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center justify-center transition-colors ${
            activeTab === item.id ? 'text-black opacity-100' : 'text-gray-400 opacity-60'
          }`}
        >
          <div className="relative">
            {item.icon}
            {item.badge && activeTab !== 'matches' && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </div>
          {/* Hinge doesn't usually show labels, just icons, but we keep structure clean */}
        </button>
      ))}
    </div>
  );
};

// 2. The "Fake" Discover Tab (Landing Page)
const DiscoverTab = () => (
  <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50 pt-10 pb-20 px-4">
    <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-[70vh] relative">
      <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center text-gray-400">
        Loading Potential Matches...
      </div>
      {/* Overlay to prompt navigation */}
      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center max-w-xs mx-4">
          <p className="text-lg font-serif mb-2">Someone sent you a rose.</p>
          <p className="text-sm text-gray-500">Go to your Likes to see who it is.</p>
        </div>
      </div>
    </div>
  </div>
);

// 3. The Target "Matches/Likes" Tab
const MatchesTab = () => {
  const [subTab, setSubTab] = useState('likes'); // 'likes' or 'standouts'

  return (
    <div className="flex flex-col h-full pt-12 pb-24 bg-white">
      {/* Top Toggle */}
      <div className="flex justify-center items-center gap-8 mb-6 text-lg font-bold">
        <button 
          onClick={() => setSubTab('likes')}
          className={`${subTab === 'likes' ? 'text-black border-b-2 border-black pb-1' : 'text-gray-400 pb-1'}`}
        >
          Likes You
        </button>
        <button 
          onClick={() => setSubTab('standouts')}
          className={`${subTab === 'standouts' ? 'text-black border-b-2 border-black pb-1' : 'text-gray-400 pb-1'}`}
        >
          Standouts
        </button>
      </div>

      {subTab === 'likes' ? (
        <div className="flex-1 overflow-y-auto px-4">
          <p className="text-center text-gray-400 text-sm mb-4">
            Has liked you just now
          </p>

          {/* The Card for Chetanya */}
          <div className="w-full max-w-md mx-auto bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative">
             
            {/* 1. ROSE HEADER (The crucial part) */}
            <div className="bg-[#FFF0F0] p-3 flex items-center justify-center gap-2 text-[#E65D5D]">
                <Flower2 size={18} fill="#E65D5D" />
                <span className="font-semibold text-sm">Rose</span>
            </div>

            {/* 2. PROMPT SECTION (Top half of card in Hinge usually starts with content or photo) */}
            {/* In Hinge, a Rose often highlights the specific prompt they liked. */}
            <div className="p-8 pt-10 pb-6 flex flex-col items-start justify-center">
               <h3 className="text-gray-500 text-sm font-semibold mb-2 uppercase tracking-wide">
                 Replied to Your Prompt
               </h3>
               <div className="text-3xl font-serif text-black leading-tight">
                 “Full Marx”
               </div>
            </div>

            {/* 3. PHOTO SECTION */}
            <div className="relative w-full aspect-[3/4] bg-gray-200">
               {/* Replace src with actual photo if available */}
               <Image 
                 src="/chetanya.jpeg" // Generic handsome dude placeholder
                 alt="Chetanya"
                 fill
                 className="object-cover"
               />
               
               {/* Name Overlay */}
               <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6 pt-20">
                 <h2 className="text-white text-3xl font-bold">Chetanya Goyal</h2>
                 <p className="text-white/90 text-lg">Active now</p>
               </div>
            </div>

            {/* 4. ACTION BUTTONS */}
            <div className="p-4 flex items-center justify-between px-12 pb-8 pt-6">
                <button className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                    <X size={32} />
                </button>
                <button className="w-16 h-16 rounded-full bg-white border border-[#E65D5D] flex items-center justify-center text-[#E65D5D] shadow-sm hover:scale-105 transition-transform">
                    <Heart size={32} fill="#E65D5D" />
                </button>
            </div>
          </div>
          
          <div className="h-10"></div>{/* Spacer */}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <p>No Standouts today.</p>
        </div>
      )}
    </div>
  );
};


// --- Main Layout ---
export default function HingeApp() {
  const [activeTab, setActiveTab] = useState('hinge'); // Start at 'hinge' (discover)

  // Render the current view
  const renderContent = () => {
    switch (activeTab) {
      case 'matches':
        return <MatchesTab />;
      default:
        return <DiscoverTab />;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-slate-900 mx-auto max-w-lg relative shadow-2xl overflow-hidden border-x border-gray-200">
      
      {/* Status Bar Shim (Mobile look) */}
      <div className="h-12 w-full bg-white/80 backdrop-blur-md sticky top-0 z-40 flex items-end justify-between px-6 pb-2">
         <span className="text-xs font-bold">9:41</span>
         <div className="flex gap-1">
            <div className="w-4 h-4 rounded-full bg-black/10"></div>
            <div className="w-4 h-4 rounded-full bg-black/10"></div>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="h-[calc(100vh-140px)] w-full relative">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
}