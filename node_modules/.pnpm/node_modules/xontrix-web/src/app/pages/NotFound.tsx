import { Link } from 'react-router';

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4">
      <div className="text-center">

        {/* Glowing 404 */}
        <h1
          className="text-[120px] sm:text-[180px] leading-none text-[#00BFDF] mb-4"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 900,
            textShadow: '0 0 40px rgba(0,191,223,0.6), 0 0 80px rgba(0,191,223,0.3)',
          }}
        >
          404
        </h1>

        {/* Message */}
        <h2
          className="text-2xl sm:text-3xl text-white mb-4"
          style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
        >
          PAGE NOT FOUND
        </h2>
        <p
          className="text-[#aaaaaa] mb-8 max-w-md mx-auto"
          style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.1rem' }}
        >
          Mukhang nawala ka sa circuit board! Ang page na hinahanap mo ay hindi mahanap.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <button
              className="cyber-button px-8 py-3 w-full sm:w-auto"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              GO HOME
            </button>
          </Link>
          <Link to="/products">
            <button
              className="px-8 py-3 w-full sm:w-auto border border-[#00BFDF] text-[#00BFDF] hover:bg-[#00BFDF] hover:text-black transition-all"
              style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}
            >
              SHOP PRODUCTS
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
