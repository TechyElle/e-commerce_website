import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useState } from 'react';
import logoQrImg from '../../imports/Logo & QR/LOGO QR.png';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Enter a valid email address.';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#111111]">
      {/* Hero Section */}
      <section className="py-20 bg-[#1e1e1e] border-b border-[rgba(255,255,255,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl mb-6 text-center" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900 }}>
            GET IN <span className="text-[#00BFDF]">TOUCH</span>
          </h1>
          <p className="text-xl text-center text-[#aaaaaa] max-w-3xl mx-auto" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Have questions? We're here to help. Reach out to our team.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Contact Form */}
            <div className="lg:col-span-2">
              <div className="border border-[rgba(255,255,255,0.1)] p-8 bg-[#1e1e1e]">
                <h2 className="text-3xl mb-6" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}>
                  SEND A MESSAGE
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm mb-2 text-[#aaaaaa]" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}>
                      NAME
                    </label>
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-[#111111] border border-[rgba(255,255,255,0.1)] text-white placeholder:text-[#aaaaaa] focus:border-[#00BFDF] focus:ring-1 focus:ring-[#00BFDF]"
                      />
                      {errors.name && (
                      <p className="text-[#dc2626] text-xs mt-1"
                        style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        {errors.name}
                      </p>
                    )}

                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-[#aaaaaa]" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}>
                      EMAIL
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-[#111111] border border-[rgba(255,255,255,0.1)] text-white placeholder:text-[#aaaaaa] focus:border-[#00BFDF] focus:ring-1 focus:ring-[#00BFDF]"
                      />
                    {errors.email && (
                      <p className="text-[#dc2626] text-xs mt-1"
                        style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-[#aaaaaa]" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}>
                      SUBJECT
                    </label>
                    <Input
                      type="text"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-[#111111] border border-[rgba(255,255,255,0.1)] text-white placeholder:text-[#aaaaaa] focus:border-[#00BFDF] focus:ring-1 focus:ring-[#00BFDF]"
                      />
                    {errors.subject && (
                      <p className="text-[#dc2626] text-xs mt-1"
                        style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-[#aaaaaa]" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}>
                      MESSAGE
                    </label>
                    <textarea
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="w-full bg-[#111111] border border-[rgba(255,255,255,0.1)] text-white placeholder:text-[#aaaaaa] focus:border-[#00BFDF] focus:ring-1 focus:ring-[#00BFDF] px-3 py-2"
                      style={{ fontFamily: 'Rajdhani, sans-serif' }}
                      required
                    />
                    {errors.message && (
                      <p className="text-[#dc2626] text-xs mt-1"
                        style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        {errors.message}
                      </p>
                    )}
                  </div>
                  {submitted ? (
                    <div className="w-full py-4 text-center bg-[rgba(16,185,129,0.1)] border border-[#10b981] text-[#10b981]"
                      style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
                      ✓ Message sent! We'll get back to you soon.
                    </div>
                  ) : (
                    <button type="submit" className="cyber-button w-full py-3">
                      SEND MESSAGE
                      <Send className="ml-2 w-4 h-4 inline" />
                    </button>
                  )}

                </form>
              </div>
            </div>

            {/* Right Column - Contact Info & QR */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Info */}
              <div className="border border-[rgba(255,255,255,0.1)] p-6 bg-[#1e1e1e]">
                <h3 className="text-xl mb-6" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}>
                  CONTACT INFO
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-[#00BFDF] mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-[#aaaaaa] mb-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        Email
                      </div>
                      <a href="mailto:support@xontrix.com" className="text-white hover:text-[#00BFDF] transition-colors" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        support@xontrix.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-[#00BFDF] mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-[#aaaaaa] mb-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        Phone
                      </div>
                      <a href="tel:+1-800-XONTRIX" className="text-white hover:text-[#00BFDF] transition-colors" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        +1 (800) XONTRIX
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-[#00BFDF] mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-[#aaaaaa] mb-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        Address
                      </div>
                      <p className="text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        123 Tech Boulevard
                        <br />
                        Silicon Valley, CA 94025
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code Card */}
              <div className="bg-[#1e1e1e] border border-[rgba(255,255,255,0.1)] p-8">
                <h3 className="text-xl mb-6 text-center" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}>
                  QUICK ACCESS
                </h3>
                <div className="bg-[#111111] p-6 mb-6">
                  <img src={logoQrImg} alt="Scan to Connect" className="w-full h-auto" />
                </div>
                <p className="text-[#00BFDF] text-sm text-center mb-4" style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.05em' }}>
                  SCAN TO CONNECT
                </p>
                <p className="text-[#aaaaaa] text-xs text-center" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  Get instant support through our mobile app
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
