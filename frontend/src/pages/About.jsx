export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans antialiased">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl border border-slate-100 overflow-hidden">
        
        {/* Banner Bar */}
        <div className="h-2 bg-emerald-600" />

        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800">About Smart Agri AI</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Empowering Farmers with Technology</p>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-center">
            Farming is hard work, and unpredictability makes it tougher. Every season, sudden crop diseases and volatile market price drops cause major losses for hardworking farming families. 
          </p>

          <hr className="border-slate-100" />

          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-800 uppercase tracking-wide">Our Core Missions:</h2>
            
            <div className="flex items-start space-x-3">
              <span className="text-emerald-600 font-bold">✓</span>
              <p className="text-xs sm:text-sm text-slate-500">
                <span className="font-bold text-slate-700">Instant Plant Care:</span> Helping farmers diagnose leaf diseases immediately right from their field using deep learning neural networks.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-emerald-600 font-bold">✓</span>
              <p className="text-xs sm:text-sm text-slate-500">
                <span className="font-bold text-slate-700">Smart Financial Forecasts:</span> Merging historical mandi logs with rain patterns via AI so farmers know exactly when to sell and when to store their grains.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-emerald-600 font-bold">✓</span>
              <p className="text-xs sm:text-sm text-slate-500">
                <span className="font-bold text-slate-700">Local Language Support:</span> Keeping descriptions translated into local dialects so every farmer feels welcomed.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center text-xs text-slate-500 font-medium">
            🌱 Built with love for the farming communities of the Belgaum Region.
          </div>
        </div>
      </div>
    </div>
  );
}