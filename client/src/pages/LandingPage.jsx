// import {
//     ArrowRight,
//     Bot,
//     CheckCircle2,
//     ChevronRight,
//     FileText,
//     Globe,
//     LayoutDashboard,
//     MessageSquare,
//     Mic,
//     Play,
//     ShieldCheck,
//     Sparkles,
//     Zap
// } from 'lucide-react';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// export default function LandingPage() {
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);

//   return (
//     <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-green-100">
      
//       {/* --- NAVBAR --- */}
//       <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-gradient-to-tr from-green-600 to-green-600 rounded-lg flex items-center justify-center text-white font-bold">
//               J
//             </div>
//             <span className="font-bold text-xl tracking-tight">JapanVisa<span className="text-green-600">.ai</span></span>
//           </div>

//           <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
//             <a href="#features" className="hover:text-green-600 transition">Features</a>
//             <a href="#ai-simulator" className="hover:text-green-600 transition">AI Interview</a>
//             <a href="#testimonials" className="hover:text-green-600 transition">Success Stories</a>
//             <a href="#pricing" className="hover:text-green-600 transition">Pricing</a>
//           </div>

//           <div className="flex items-center gap-4">
//             <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden sm:block">Log in</Link>
//             <Link to="/register" className="text-sm font-bold bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition shadow-lg shadow-slate-200">
//               Get Started
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* --- HERO SECTION --- */}
//       <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
//         {/* Abstract Background Shapes */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
//            <div className="absolute top-20 right-0 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
//            <div className="absolute top-40 left-0 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-20"></div>
//         </div>

//         <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
//           <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-6 animate-in fade-in slide-in-from-bottom-4">
//             <Sparkles size={14} /> New: AI Mock Interviews V2.0
//           </div>
          
//           <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-500">
//             The Smartest Way to <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-600">Move to Japan.</span>
//           </h1>
          
//           <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700">
//             Automate your COE documents, track applications, and practice with our realistic AI Immigration Officer. Trusted by 50+ consultancies.
//           </p>

//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
//             <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-green-200 transition transform hover:-translate-y-1 flex items-center justify-center gap-2">
//               Start Free Trial <ArrowRight size={20} />
//             </Link>
//             <button onClick={() => setIsVideoPlaying(!isVideoPlaying)} className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2">
//               <Play size={20} className="fill-slate-700" /> Watch Demo
//             </button>
//           </div>

//           {/* Social Proof */}
//           <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center gap-4 animate-in fade-in delay-200">
//             <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Trusted by top consultancies in Nepal</p>
//             <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
//                {/* Placeholders for Logos */}
//                <span className="text-xl font-bold text-slate-800 flex items-center gap-2"><Globe size={20}/> GlobalReach</span>
//                <span className="text-xl font-bold text-slate-800 flex items-center gap-2"><Zap size={20}/> FastTrack</span>
//                <span className="text-xl font-bold text-slate-800 flex items-center gap-2"><ShieldCheck size={20}/> SecureVisa</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- DASHBOARD PREVIEW --- */}
//       <section className="pb-24 px-4">
//         <div className="max-w-6xl mx-auto rounded-2xl bg-slate-900 p-2 md:p-4 shadow-2xl ring-1 ring-slate-900/10">
//            <div className="relative rounded-xl overflow-hidden bg-slate-800 border border-slate-700 aspect-[16/9] group">
//               {/* This mimics the dashboard UI we built earlier */}
//               <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center group-hover:scale-105 transition duration-700">
//                   <div className="w-[90%] h-[90%] bg-white rounded-lg shadow-2xl opacity-100 overflow-hidden flex flex-col">
//                       {/* Fake Header */}
//                       <div className="h-12 border-b flex items-center px-4 gap-4 bg-slate-50">
//                          <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-400"></div><div className="w-3 h-3 rounded-full bg-yellow-400"></div><div className="w-3 h-3 rounded-full bg-green-400"></div></div>
//                          <div className="w-full h-2 bg-slate-200 rounded-full max-w-sm ml-4"></div>
//                       </div>
//                       {/* Fake Content */}
//                       <div className="p-6 grid grid-cols-3 gap-6">
//                          <div className="col-span-2 space-y-4">
//                             <div className="h-32 bg-green-50 border border-green-100 rounded-lg w-full"></div>
//                             <div className="h-16 bg-slate-50 rounded-lg w-full"></div>
//                             <div className="h-16 bg-slate-50 rounded-lg w-full"></div>
//                          </div>
//                          <div className="col-span-1 space-y-4">
//                              <div className="h-48 bg-green-50 border border-green-100 rounded-lg w-full flex items-center justify-center text-green-200">
//                                  <Bot size={48} />
//                              </div>
//                          </div>
//                       </div>
//                   </div>
//               </div>
//               <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent flex items-end justify-center pb-8">
//                   <p className="text-white font-medium">Interactive Student Dashboard</p>
//               </div>
//            </div>
//         </div>
//       </section>

//       {/* --- FEATURES GRID --- */}
//       <section id="features" className="py-24 bg-slate-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to get the visa.</h2>
//             <p className="text-slate-500 text-lg">We've digitized the entire Japanese immigration workflow.</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <FeatureCard 
//                icon={<FileText className="text-green-600" size={32}/>}
//                title="Auto-Document Gen"
//                desc="Generate COE Application forms, financial sponsors, and SOPs in one click. No more manual typing."
//             />
//             <FeatureCard 
//                icon={<LayoutDashboard className="text-green-600" size={32}/>}
//                title="Student CRM"
//                desc="Manage student profiles, documents, and application statuses from a single centralized dashboard."
//             />
//             <FeatureCard 
//                icon={<ShieldCheck className="text-green-600" size={32}/>}
//                title="Error Checking"
//                desc="Our system validates data against Immigration Bureau standards before you print."
//             />
//           </div>
//         </div>
//       </section>

//       {/* --- AI SECTION (Highlight) --- */}
//       <section id="ai-simulator" className="py-24 overflow-hidden relative">
//          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//             <div>
//                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
//                   <Bot size={14} /> Powered by Vapi.ai & GPT-4o
//                </div>
//                <h2 className="text-4xl font-bold text-slate-900 mb-6">
//                   Practice with a Real <br/>
//                   <span className="text-green-600">AI Immigration Officer.</span>
//                </h2>
//                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
//                   Don't let the interview scare you. Our AI simulator mimics a real Japanese immigration officer at Narita Airport. It speaks, listens, and reacts to your Japanese level.
//                </p>
               
//                <ul className="space-y-4 mb-8">
//                   <ListItem text="Real-time voice interaction (latency < 800ms)" />
//                   <ListItem text="Student & Skilled Worker scenarios" />
//                   <ListItem text="Feedback on pronunciation and grammar" />
//                </ul>

//                <Link to="/register" className="inline-flex items-center gap-2 text-green-600 font-bold hover:gap-3 transition-all">
//                   Try the Simulator <ChevronRight size={20} />
//                </Link>
//             </div>

//             <div className="relative">
//                {/* The "Orb" Visual Representation */}
//                <div className="absolute inset-0 bg-green-500 rounded-full blur-[100px] opacity-20"></div>
//                <div className="relative bg-slate-900 rounded-2xl p-8 border border-slate-700 shadow-2xl">
//                   <div className="flex justify-between items-center mb-8">
//                       <div className="flex gap-2">
//                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
//                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
//                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
//                       </div>
//                       <div className="text-slate-400 text-xs font-mono">LIVE SIMULATION</div>
//                   </div>
                  
//                   <div className="h-64 flex items-center justify-center">
//                       <div className="relative">
//                          <div className="w-32 h-32 rounded-full border-4 border-green-500 bg-slate-800 flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.4)] animate-pulse">
//                             <Bot className="text-green-400" size={48} />
//                          </div>
//                          <div className="absolute -right-16 top-0 bg-white p-3 rounded-lg rounded-bl-none shadow-lg text-sm max-w-[150px]">
//                             <p className="text-slate-800">こんにちは。お名前を教えてください。</p>
//                          </div>
//                          <div className="absolute -left-16 bottom-0 bg-green-600 p-3 rounded-lg rounded-tr-none shadow-lg text-sm max-w-[150px] text-white">
//                             <p>私はカランです。</p>
//                          </div>
//                       </div>
//                   </div>

//                   <div className="mt-8 flex justify-center gap-4">
//                       <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400"><MessageSquare size={20}/></div>
//                       <div className="h-12 w-12 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center border border-red-500/50"><div className="w-3 h-3 bg-red-500 rounded-sm"></div></div>
//                       <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400"><Mic size={20}/></div>
//                   </div>
//                </div>
//             </div>
//          </div>
//       </section>

//       {/* --- CTA SECTION --- */}
//       <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
//          <div className="absolute top-0 right-0 w-96 h-96 bg-green-600 rounded-full blur-[128px] opacity-20"></div>
//          <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-600 rounded-full blur-[128px] opacity-20"></div>
         
//          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
//             <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to streamline your visa process?</h2>
//             <p className="text-slate-400 text-lg mb-10">Join the platform that is processing thousands of applications for Japan every month.</p>
//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//                <Link to="/register" className="px-10 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-100 transition shadow-lg hover:shadow-xl hover:scale-105 transform duration-200">
//                   Get Started for Free
//                </Link>
//                <Link to="/contact" className="px-10 py-4 bg-transparent border border-slate-700 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition">
//                   Contact Sales
//                </Link>
//             </div>
//             <p className="mt-6 text-sm text-slate-500">No credit card required for 14-day trial.</p>
//          </div>
//       </section>

//       {/* --- FOOTER --- */}
//       <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
//          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
//             <div className="col-span-2 md:col-span-1">
//                <div className="flex items-center gap-2 mb-4">
//                   <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center text-white text-xs font-bold">J</div>
//                   <span className="font-bold text-lg">JapanVisa.ai</span>
//                </div>
//                <p className="text-sm text-slate-500">Helping students and workers reach Japan with confidence.</p>
//             </div>
//             <div>
//                <h4 className="font-bold text-slate-900 mb-4">Product</h4>
//                <ul className="space-y-2 text-sm text-slate-500">
//                   <li><a href="#" className="hover:text-green-600">Features</a></li>
//                   <li><a href="#" className="hover:text-green-600">Pricing</a></li>
//                   <li><a href="#" className="hover:text-green-600">API</a></li>
//                </ul>
//             </div>
//             <div>
//                <h4 className="font-bold text-slate-900 mb-4">Resources</h4>
//                <ul className="space-y-2 text-sm text-slate-500">
//                   <li><a href="#" className="hover:text-green-600">Documentation</a></li>
//                   <li><a href="#" className="hover:text-green-600">Visa Guide</a></li>
//                   <li><a href="#" className="hover:text-green-600">Blog</a></li>
//                </ul>
//             </div>
//             <div>
//                <h4 className="font-bold text-slate-900 mb-4">Company</h4>
//                <ul className="space-y-2 text-sm text-slate-500">
//                   <li><a href="#" className="hover:text-green-600">About</a></li>
//                   <li><a href="#" className="hover:text-green-600">Contact</a></li>
//                   <li><a href="#" className="hover:text-green-600">Legal</a></li>
//                </ul>
//             </div>
//          </div>
//          <div className="max-w-7xl mx-auto px-6 border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-sm text-slate-400">© 2025 Marici Technology. All rights reserved.</p>
//             <div className="flex gap-4">
//                {/* Social Icons Placeholder */}
//             </div>
//          </div>
//       </footer>
//     </div>
//   );
// }

// // --- SUB COMPONENTS ---

// function FeatureCard({ icon, title, desc }) {
//    return (
//       <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
//          <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-50 transition-colors">
//             {icon}
//          </div>
//          <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
//          <p className="text-slate-500 leading-relaxed">{desc}</p>
//       </div>
//    )
// }

// function ListItem({ text }) {
//    return (
//       <li className="flex items-center gap-3 text-slate-700">
//          <CheckCircle2 className="text-green-500 shrink-0" size={20} />
//          <span>{text}</span>
//       </li>
//    )
// }


import {
    ArrowRight,
    Bot,
    CheckCircle2,
    ChevronRight,
    FileText,
    Globe,
    LayoutDashboard,
    MessageSquare,
    Mic,
    Play,
    ShieldCheck,
    Sparkles,
    X,
    Zap
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// IMPORT YOUR NEW COMPONENTS
import Pricing from './Pricing'; // Adjust path as needed
import SuccessStories from './SuccessStories'; // Adjust path as needed

export default function LandingPage() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-green-100">
      
      {/* --- DEMO MODAL (Placeholder for future integration) --- */}
      {showDemoModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-slate-900 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl border border-slate-700">
                <div className="flex justify-between items-center p-4 border-b border-slate-700">
                    <h3 className="text-white font-bold">Platform Walkthrough</h3>
                    <button onClick={() => setShowDemoModal(false)} className="text-slate-400 hover:text-white"><X /></button>
                </div>
                <div className="aspect-video bg-black flex items-center justify-center">
                    <p className="text-slate-500">Video Demo Coming Soon...</p>
                    {/* Later, embed YouTube or Vimeo iframe here */}
                </div>
            </div>
        </div>
      )}

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-green-600 to-green-600 rounded-lg flex items-center justify-center text-white font-bold">
              J
            </div>
            <span className="font-bold text-xl tracking-tight">JapanVisa<span className="text-green-600">.ai</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-green-600 transition">Features</a>
            <a href="#ai-simulator" className="hover:text-green-600 transition">AI Interview</a>
            <a href="#testimonials" className="hover:text-green-600 transition">Success Stories</a>
            <a href="#pricing" className="hover:text-green-600 transition">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden sm:block">Log in</Link>
            <Link to="/register" className="text-sm font-bold bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition shadow-lg shadow-slate-200">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-6 animate-in fade-in slide-in-from-bottom-4">
            <Sparkles size={14} /> New: AI Mock Interviews V2.0
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-500">
            The Smartest Way to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-600">Move to Japan.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700">
            Automate your COE documents, track applications, and practice with our realistic AI Immigration Officer. Trusted by 50+ consultancies.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-green-200 transition transform hover:-translate-y-1 flex items-center justify-center gap-2">
              Start Free Trial <ArrowRight size={20} />
            </Link>
            
            {/* Updated Demo Button */}
            <button 
                onClick={() => setShowDemoModal(true)} 
                className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2"
            >
              <Play size={20} className="fill-slate-700" /> Watch Demo
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center gap-4 animate-in fade-in delay-200">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Trusted by top consultancies in Nepal</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               <span className="text-xl font-bold text-slate-800 flex items-center gap-2"><Globe size={20}/> GlobalReach</span>
               <span className="text-xl font-bold text-slate-800 flex items-center gap-2"><Zap size={20}/> FastTrack</span>
               <span className="text-xl font-bold text-slate-800 flex items-center gap-2"><ShieldCheck size={20}/> SecureVisa</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- DASHBOARD PREVIEW --- */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto rounded-2xl bg-slate-900 p-2 md:p-4 shadow-2xl ring-1 ring-slate-900/10">
           <div className="relative rounded-xl overflow-hidden bg-slate-800 border border-slate-700 aspect-[16/9] group">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center group-hover:scale-105 transition duration-700">
                  {/* ... (Existing Dashboard Mockup Code remains the same) ... */}
                  <div className="w-[90%] h-[90%] bg-white rounded-lg shadow-2xl opacity-100 overflow-hidden flex flex-col">
                      <div className="h-12 border-b flex items-center px-4 gap-4 bg-slate-50">
                         <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-400"></div><div className="w-3 h-3 rounded-full bg-yellow-400"></div><div className="w-3 h-3 rounded-full bg-green-400"></div></div>
                         <div className="w-full h-2 bg-slate-200 rounded-full max-w-sm ml-4"></div>
                      </div>
                      <div className="p-6 grid grid-cols-3 gap-6">
                         <div className="col-span-2 space-y-4">
                            <div className="h-32 bg-green-50 border border-green-100 rounded-lg w-full"></div>
                            <div className="h-16 bg-slate-50 rounded-lg w-full"></div>
                            <div className="h-16 bg-slate-50 rounded-lg w-full"></div>
                         </div>
                         <div className="col-span-1 space-y-4">
                             <div className="h-48 bg-green-50 border border-green-100 rounded-lg w-full flex items-center justify-center text-green-200">
                                 <Bot size={48} />
                             </div>
                         </div>
                      </div>
                  </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent flex items-end justify-center pb-8">
                  <p className="text-white font-medium">Interactive Student Dashboard</p>
              </div>
           </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to get the visa.</h2>
            <p className="text-slate-500 text-lg">We've digitized the entire Japanese immigration workflow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
               icon={<FileText className="text-green-600" size={32}/>}
               title="Auto-Document Gen"
               desc="Generate COE Application forms, financial sponsors, and SOPs in one click. No more manual typing."
            />
            <FeatureCard 
               icon={<LayoutDashboard className="text-green-600" size={32}/>}
               title="Student CRM"
               desc="Manage student profiles, documents, and application statuses from a single centralized dashboard."
            />
            <FeatureCard 
               icon={<ShieldCheck className="text-green-600" size={32}/>}
               title="Error Checking"
               desc="Our system validates data against Immigration Bureau standards before you print."
            />
          </div>
        </div>
      </section>

      {/* --- SUCCESS STORIES (NEW INTEGRATION) --- */}
      <SuccessStories />

      {/* --- AI SECTION --- */}
      <section id="ai-simulator" className="py-24 overflow-hidden relative bg-white">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* ... (Existing AI Section Code remains the same) ... */}
            <div>
               <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
                  <Bot size={14} /> Powered by Vapi.ai & GPT-4o
               </div>
               <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  Practice with a Real <br/>
                  <span className="text-green-600">AI Immigration Officer.</span>
               </h2>
               <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Don't let the interview scare you. Our AI simulator mimics a real Japanese immigration officer at Narita Airport. It speaks, listens, and reacts to your Japanese level.
               </p>
               <ul className="space-y-4 mb-8">
                  <ListItem text="Real-time voice interaction (latency < 800ms)" />
                  <ListItem text="Student & Skilled Worker scenarios" />
                  <ListItem text="Feedback on pronunciation and grammar" />
               </ul>
               <Link to="/register" className="inline-flex items-center gap-2 text-green-600 font-bold hover:gap-3 transition-all">
                  Try the Simulator <ChevronRight size={20} />
               </Link>
            </div>
            <div className="relative">
               <div className="absolute inset-0 bg-green-500 rounded-full blur-[100px] opacity-20"></div>
               <div className="relative bg-slate-900 rounded-2xl p-8 border border-slate-700 shadow-2xl">
                  <div className="flex justify-between items-center mb-8">
                      <div className="flex gap-2">
                         <div className="w-3 h-3 rounded-full bg-red-500"></div>
                         <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                         <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-slate-400 text-xs font-mono">LIVE SIMULATION</div>
                  </div>
                  <div className="h-64 flex items-center justify-center">
                      <div className="relative">
                         <div className="w-32 h-32 rounded-full border-4 border-green-500 bg-slate-800 flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.4)] animate-pulse">
                            <Bot className="text-green-400" size={48} />
                         </div>
                         <div className="absolute -right-16 top-0 bg-white p-3 rounded-lg rounded-bl-none shadow-lg text-sm max-w-[150px]">
                            <p className="text-slate-800">こんにちは。お名前を教えてください。</p>
                         </div>
                         <div className="absolute -left-16 bottom-0 bg-green-600 p-3 rounded-lg rounded-tr-none shadow-lg text-sm max-w-[150px] text-white">
                            <p>私はカランです。</p>
                         </div>
                      </div>
                  </div>
                  <div className="mt-8 flex justify-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400"><MessageSquare size={20}/></div>
                      <div className="h-12 w-12 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center border border-red-500/50"><div className="w-3 h-3 bg-red-500 rounded-sm"></div></div>
                      <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400"><Mic size={20}/></div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- PRICING (NEW INTEGRATION) --- */}
      <Pricing />

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-green-600 rounded-full blur-[128px] opacity-20"></div>
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-600 rounded-full blur-[128px] opacity-20"></div>
         
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to streamline your visa process?</h2>
            <p className="text-slate-400 text-lg mb-10">Join the platform that is processing thousands of applications for Japan every month.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Link to="/register" className="px-10 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-100 transition shadow-lg hover:shadow-xl hover:scale-105 transform duration-200">
                  Get Started for Free
               </Link>
               <Link to="/contact" className="px-10 py-4 bg-transparent border border-slate-700 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition">
                  Contact Sales
               </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">No credit card required for 14-day trial.</p>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
               <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center text-white text-xs font-bold">J</div>
                  <span className="font-bold text-lg">JapanVisa.ai</span>
               </div>
               <p className="text-sm text-slate-500">Helping students and workers reach Japan with confidence.</p>
            </div>
            <div>
               <h4 className="font-bold text-slate-900 mb-4">Product</h4>
               <ul className="space-y-2 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-green-600">Features</a></li>
                  <li><a href="#" className="hover:text-green-600">Pricing</a></li>
                  <li><a href="#" className="hover:text-green-600">API</a></li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold text-slate-900 mb-4">Resources</h4>
               <ul className="space-y-2 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-green-600">Documentation</a></li>
                  <li><a href="#" className="hover:text-green-600">Visa Guide</a></li>
                  <li><a href="#" className="hover:text-green-600">Blog</a></li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold text-slate-900 mb-4">Company</h4>
               <ul className="space-y-2 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-green-600">About</a></li>
                  <li><a href="#" className="hover:text-green-600">Contact</a></li>
                  <li><a href="#" className="hover:text-green-600">Legal</a></li>
               </ul>
            </div>
         </div>
         <div className="max-w-7xl mx-auto px-6 border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">© 2025 Marici Technology. All rights reserved.</p>
            <div className="flex gap-4">
               {/* Social Icons */}
            </div>
         </div>
      </footer>
    </div>
  );
}

// --- SUB COMPONENTS (If not importing from separate files, keep these here) ---

function FeatureCard({ icon, title, desc }) {
   return (
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
         <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-50 transition-colors">
            {icon}
         </div>
         <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
         <p className="text-slate-500 leading-relaxed">{desc}</p>
      </div>
   )
}

function ListItem({ text }) {
   return (
      <li className="flex items-center gap-3 text-slate-700">
         <CheckCircle2 className="text-green-500 shrink-0" size={20} />
         <span>{text}</span>
      </li>
   )
}