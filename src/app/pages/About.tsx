import { Cpu, Target, Zap } from 'lucide-react';
import logoQrImg from '../../imports/Logo & QR/LOGO QR.png';

export function About() {
  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Hero Section */}
      <section className="py-20 bg-[#f5f5f5] border-b border-[rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl mb-6 text-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }}>
            ABOUT <span className="text-[#db4444]">XONTRIX</span>
          </h1>
          <p className="text-xl text-center text-[#7d8184] max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Redefining the electronics e-commerce experience through cutting-edge technology and AI-powered innovation.
          </p>
        </div>
      </section>

      {/* Main Content - Two Column */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Brand Story */}
            <div className="lg:col-span-2 space-y-8">
              <div className="border border-[rgba(0,0,0,0.1)] p-8 bg-[#f5f5f5]">
                <h2 className="text-3xl mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  OUR MISSION
                </h2>
                <p className="text-[#7d8184] mb-4" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.125rem' }}>
                  At Xontrix, we believe technology should be accessible, innovative, and future-forward. We're not just an electronics store — we're a technology platform that combines cutting-edge products with AI-powered business intelligence.
                </p>
                <p className="text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.125rem' }}>
                  From smartphones to smart home devices, from laptops to wearables, we curate only the best technology products to empower your digital lifestyle.
                </p>
              </div>

              {/* Values */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-[rgba(0,0,0,0.1)] p-6 bg-[#f5f5f5] hover:border-[#db4444] transition-all">
                  <Cpu className="w-10 h-10 text-[#db4444] mb-4" />
                  <h3 className="text-lg mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    INNOVATION
                  </h3>
                  <p className="text-[#7d8184] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Always pushing the boundaries of what's possible in tech retail.
                  </p>
                </div>
                <div className="border border-[rgba(0,0,0,0.1)] p-6 bg-[#f5f5f5] hover:border-[#db4444] transition-all">
                  <Target className="w-10 h-10 text-[#db4444] mb-4" />
                  <h3 className="text-lg mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    PRECISION
                  </h3>
                  <p className="text-[#7d8184] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Curated selection of only the highest-quality products.
                  </p>
                </div>
                <div className="border border-[rgba(0,0,0,0.1)] p-6 bg-[#f5f5f5] hover:border-[#db4444] transition-all">
                  <Zap className="w-10 h-10 text-[#db4444] mb-4" />
                  <h3 className="text-lg mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    SPEED
                  </h3>
                  <p className="text-[#7d8184] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Lightning-fast delivery and seamless shopping experience.
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 border border-[rgba(0,0,0,0.1)] p-8 bg-[#f5f5f5]">
                <div className="text-center">
                  <div className="text-4xl text-[#db4444] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }}>
                    10K+
                  </div>
                  <div className="text-[#7d8184] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Products
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl text-[#db4444] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }}>
                    50K+
                  </div>
                  <div className="text-[#7d8184] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Customers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl text-[#db4444] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }}>
                    99%
                  </div>
                  <div className="text-[#7d8184] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Satisfaction
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - QR Code Card */}
            <div className="lg:col-span-1">
              <div className="bg-[#f5f5f5] border border-[rgba(0,0,0,0.1)] p-8 sticky top-24">
                <h3 className="text-xl mb-6 text-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  CONNECT WITH US
                </h3>
                <div className="bg-[#ffffff] p-6 mb-6">
                  <img src={logoQrImg} alt="Scan to Connect" className="w-full h-auto" />
                </div>
                <p className="text-[#db4444] text-sm text-center mb-4" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
                  SCAN TO ACCESS
                </p>
                <p className="text-[#7d8184] text-xs text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Get instant access to our mobile app, exclusive deals, and member benefits
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
