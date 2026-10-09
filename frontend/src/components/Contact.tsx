import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, School } from 'lucide-react';
import { ProfileData, ContactFormInput, SiteSettingsData } from '../types/index.ts';
import { portfolioApi } from '../services/api.ts';
import '../styles/Contact.css';

interface ContactProps {
  profile: ProfileData;
  settings?: SiteSettingsData | null;
}

export const Contact: React.FC<ContactProps> = ({ profile, settings }) => {
  const [formData, setFormData] = useState<ContactFormInput>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const email = settings?.contact?.email || profile.email;
  const phone = settings?.contact?.phone || profile.phone;
  const location = settings?.contact?.location || profile.location;
  const contactDesc = settings?.contact?.description ||
    'I am actively looking for Summer 2026 SDE Internship roles, hackathon collaborations, and open-source opportunities. My inbox is always open!';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await portfolioApi.sendContactMessage(formData);
      setSuccessMsg(res.message || 'Your message has been sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setErrorMsg(
        error.response?.data?.message ||
          'Failed to send message. Please ensure the backend server is running and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Mail size={14} /> Get In Touch
          </div>
          <h2 className="section-title">Let's Build Something Great</h2>
          <p className="section-subtitle">
            Whether you have an internship opportunity, a project proposal, or just want to chat about tech, feel free to reach out.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Info */}
          <div className="contact-info-panel">
            <p className="contact-intro-text">
              {contactDesc}
            </p>

            <div className="contact-channels">
              <div className="contact-channel-item">
                <div className="channel-icon-wrap">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="channel-label">Email Address</div>
                  <div className="channel-value">{email}</div>
                </div>
              </div>

              <div className="contact-channel-item">
                <div className="channel-icon-wrap">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="channel-label">Phone / WhatsApp</div>
                  <div className="channel-value">{phone}</div>
                </div>
              </div>

              <div className="contact-channel-item">
                <div className="channel-icon-wrap">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="channel-label">Location</div>
                  <div className="channel-value">{location}</div>
                </div>
              </div>

              <div className="contact-channel-item">
                <div className="channel-icon-wrap">
                  <School size={20} />
                </div>
                <div>
                  <div className="channel-label">Institution</div>
                  <div className="channel-value">{profile.collegeName}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-card">
            <form className="contact-form" onSubmit={handleSubmit}>
              {successMsg && (
                <div className="form-alert-success">
                  <CheckCircle size={18} />
                  <span>{successMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className="form-alert-error">
                  <AlertCircle size={18} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Your Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-input"
                  placeholder="e.g. SDE Internship Opportunity"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{ width: '100%' }}
              >
                {isSubmitting ? (
                  <>Sending Message...</>
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
