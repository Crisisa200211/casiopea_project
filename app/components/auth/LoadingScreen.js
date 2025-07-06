"use client";

export default function LoadingScreen() {
  return (
    <div className="loading-container">
      <div className="loading-content">
        {/* Llanta girando */}
        <div className="tire-container">
          <div className="tire">
            <div className="tire-inner">
              <div className="tire-center"></div>
              <div className="tire-spokes">
                <div className="spoke"></div>
                <div className="spoke"></div>
                <div className="spoke"></div>
                <div className="spoke"></div>
                <div className="spoke"></div>
              </div>
            </div>
          </div>
          
          {/* Líneas de movimiento */}
          <div className="speed-lines">
            <div className="line line-1"></div>
            <div className="line line-2"></div>
            <div className="line line-3"></div>
            <div className="line line-4"></div>
          </div>
        </div>
        
        {/* Texto de carga con puntos animados */}
        <div className="loading-text">
          Cargando<span className="dots">
            <span className="dot dot-1">.</span>
            <span className="dot dot-2">.</span>
            <span className="dot dot-3">.</span>
          </span>
        </div>
      </div>
      
      <style jsx>{`
        .loading-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        
        .loading-content {
          text-align: center;
        }
        
        .tire-container {
          position: relative;
          margin-bottom: 2rem;
        }
        
        .tire {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: #2c3e50;
          border: 8px solid #34495e;
          position: relative;
          animation: spin 1s linear infinite;
          box-shadow: 
            inset 0 0 20px rgba(0,0,0,0.3),
            0 0 20px rgba(0,0,0,0.2);
        }
        
        .tire-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, #34495e 30%, #2c3e50 70%);
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .tire-center {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(145deg, #95a5a6, #7f8c8d);
          box-shadow: 
            inset 2px 2px 5px rgba(0,0,0,0.3),
            inset -2px -2px 5px rgba(255,255,255,0.1);
        }
        
        .tire-spokes {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        
        .spoke {
          position: absolute;
          width: 3px;
          height: 35px;
          background: linear-gradient(to bottom, #7f8c8d, #95a5a6);
          left: 50%;
          top: 10px;
          transform-origin: 50% 50px;
          border-radius: 2px;
        }
        
        .spoke:nth-child(1) { transform: translateX(-50%) rotate(0deg); }
        .spoke:nth-child(2) { transform: translateX(-50%) rotate(72deg); }
        .spoke:nth-child(3) { transform: translateX(-50%) rotate(144deg); }
        .spoke:nth-child(4) { transform: translateX(-50%) rotate(216deg); }
        .spoke:nth-child(5) { transform: translateX(-50%) rotate(288deg); }
        
        .speed-lines {
          position: absolute;
          right: -60px;
          top: 50%;
          transform: translateY(-50%);
        }
        
        .line {
          height: 3px;
          background: #1994ED;
          margin: 8px 0;
          border-radius: 2px;
          animation: speedLine 0.6s ease-in-out infinite;
        }
        
        .line-1 {
          width: 40px;
          animation-delay: 0s;
        }
        
        .line-2 {
          width: 30px;
          animation-delay: 0.1s;
        }
        
        .line-3 {
          width: 35px;
          animation-delay: 0.2s;
        }
        
        .line-4 {
          width: 25px;
          animation-delay: 0.3s;
        }
        
        .loading-text {
          color: #000000;
          font-size: 1.5rem;
          font-weight: 600;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .dots {
          display: inline-block;
        }
        
        .dot {
          opacity: 0;
          animation: dotPulse 1.5s ease-in-out infinite;
        }
        
        .dot-1 {
          animation-delay: 0s;
        }
        
        .dot-2 {
          animation-delay: 0.5s;
        }
        
        .dot-3 {
          animation-delay: 1s;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes speedLine {
          0% {
            opacity: 0;
            transform: translateX(0);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(20px);
          }
        }
        
        @keyframes dotPulse {
          0%, 60%, 100% {
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
