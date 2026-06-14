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
    <div className="min-h-screen bg-[#ffffff]">
      {/* Hero Section */}
      <section className="py-20 bg-[#f5f5f5] border-b border-[rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl mb-6 text-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }}>
            GET IN <span className="text-[#db4444]">TOUCH</span>
          </h1>
          <p className="text-xl text-center text-[#7d8184] max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
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
              <div className="border border-[rgba(0,0,0,0.1)] p-8 bg-[#f5f5f5]">
                <h2 className="text-3xl mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  SEND A MESSAGE
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm mb-2 text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
                      NAME
                    </label>
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-[#ffffff] border border-[rgba(0,0,0,0.1)] text-[#111111] placeholder:text-[#7d8184] focus:border-[#db4444] focus:ring-1 focus:ring-[#db4444]"
                      />
                      {errors.name && (
                      <p className="text-[#dc2626] text-xs mt-1"
                        style={{ fontFamily: 'Inter, sans-serif' }}>
                        {errors.name}
                      </p>
                    )}

                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
                      EMAIL
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-[#ffffff] border border-[rgba(0,0,0,0.1)] text-[#111111] placeholder:text-[#7d8184] focus:border-[#db4444] focus:ring-1 focus:ring-[#db4444]"
                      />
                    {errors.email && (
                      <p className="text-[#dc2626] text-xs mt-1"
                        style={{ fontFamily: 'Inter, sans-serif' }}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
                      SUBJECT
                    </label>
                    <Input
                      type="text"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-[#ffffff] border border-[rgba(0,0,0,0.1)] text-[#111111] placeholder:text-[#7d8184] focus:border-[#db4444] focus:ring-1 focus:ring-[#db4444]"
                      />
                    {errors.subject && (
                      <p className="text-[#dc2626] text-xs mt-1"
                        style={{ fontFamily: 'Inter, sans-serif' }}>
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
                      MESSAGE
                    </label>
                    <textarea
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="w-full bg-[#ffffff] border border-[rgba(0,0,0,0.1)] text-[#111111] placeholder:text-[#7d8184] focus:border-[#db4444] focus:ring-1 focus:ring-[#db4444] px-3 py-2"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      required
                    />
                    {errors.message && (
                      <p className="text-[#dc2626] text-xs mt-1"
                        style={{ fontFamily: 'Inter, sans-serif' }}>
                        {errors.message}
                      </p>
                    )}
                  </div>
                  {submitted ? (
                    <div className="w-full py-4 text-center bg-[rgba(16,185,129,0.1)] border border-[#10b981] text-[#10b981]"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
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
              <div className="border border-[rgba(0,0,0,0.1)] p-6 bg-[#f5f5f5]">
                <h3 className="text-xl mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  CONTACT INFO
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-[#db4444] mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-[#7d8184] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Email
                      </div>
                      <a href="mailto:support@xontrix.com" className="text-[#111111] hover:text-[#db4444] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                        support@xontrix.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-[#db4444] mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-[#7d8184] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Phone
                      </div>
                      <a href="tel:+1-800-XONTRIX" className="text-[#111111] hover:text-[#db4444] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                        +1 (800) XONTRIX
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-[#db4444] mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-[#7d8184] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Address
                      </div>
                      <p className="text-[#111111]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        123 Tech Boulevard
                        <br />
                        Silicon Valley, CA 94025
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code Card */}
              <div className="bg-[#f5f5f5] border border-[rgba(0,0,0,0.1)] p-8">
                <h3 className="text-xl mb-6 text-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  QUICK ACCESS
                </h3>
                <div className="bg-[#ffffff] p-6 mb-6">
                  <img src={logoQrImg} alt="Scan to Connect" className="w-full h-auto" />
                </div>
                <p className="text-[#db4444] text-sm text-center mb-4" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
                  SCAN TO CONNECT
                </p>
                <p className="text-[#7d8184] text-xs text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
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
