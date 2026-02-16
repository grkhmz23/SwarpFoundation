"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function FinalCTA() {
  const t = useTranslations("finalCtaSection");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to your backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", company: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-swarp-darker to-swarp-dark" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-swarp-blue/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-swarp-purple/20 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-swarp-blue/10 border border-swarp-blue/20 mb-6">
              <span className="text-sm text-swarp-cyan font-medium">{t("badge")}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">{t("titlePrefix")}</span>{" "}
              <span className="text-gradient">Swarp</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>

          {/* Contact Form */}
          <div className="relative">
            {/* Form Container */}
            <div className="p-8 md:p-12 rounded-2xl bg-swarp-dark/50 backdrop-blur-sm border border-swarp-blue/20">
              {submitted ? (
                // Success Message
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{t("success.title")}</h3>
                  <p className="text-gray-400">{t("success.description")}</p>
                </div>
              ) : (
                // Contact Form
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        {t("form.nameLabel")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-swarp-darker border border-swarp-blue/20 text-white placeholder-gray-500 focus:outline-none focus:border-swarp-cyan transition-colors"
                        placeholder={t("form.namePlaceholder")}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        {t("form.emailLabel")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-swarp-darker border border-swarp-blue/20 text-white placeholder-gray-500 focus:outline-none focus:border-swarp-cyan transition-colors"
                        placeholder={t("form.emailPlaceholder")}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      {t("form.companyLabel")}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-swarp-darker border border-swarp-blue/20 text-white placeholder-gray-500 focus:outline-none focus:border-swarp-cyan transition-colors"
                      placeholder={t("form.companyPlaceholder")}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      {t("form.messageLabel")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-swarp-darker border border-swarp-blue/20 text-white placeholder-gray-500 focus:outline-none focus:border-swarp-cyan transition-colors resize-none"
                      placeholder={t("form.messagePlaceholder")}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    variant="gradient"
                    className="w-full group"
                  >
                    {t("form.submit")}
                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    {t("form.disclaimer")}
                  </p>
                </form>
              )}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-swarp-purple/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-swarp-cyan/20 rounded-full blur-2xl" />
          </div>

          {/* Contact Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-sm font-semibold text-gray-400 mb-1">{t("info.emailLabel")}</div>
              <a href="mailto:hello@swarp.foundation" className="text-swarp-cyan hover:text-swarp-blue transition-colors">
                hello@swarp.foundation
              </a>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-400 mb-1">{t("info.responseTimeLabel")}</div>
              <div className="text-white">{t("info.responseTimeValue")}</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-400 mb-1">{t("info.supportLabel")}</div>
              <div className="text-white">{t("info.supportValue")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
