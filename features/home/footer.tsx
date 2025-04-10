"use client";

import Link from "next/link";
import {
  Truck,
  Mail,
  Twitter,
  Facebook,
  Instagram,
  ChevronRight,
  MapPin,
  Phone,
  Clock,
  Send,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      // Here you would typically handle the newsletter subscription
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-background to-muted border">
      <div className="container mx-auto px-4">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-5">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Truck className="h-8 w-8 text-primary" strokeWidth={1.5} />
              <h2 className="text-2xl font-bold tracking-tight">
                Cargo Connect
              </h2>
            </div>
            <p className="text-muted-foreground">
              Streamlined logistics solutions for businesses of all sizes. We
              provide reliable shipping services to meet your needs.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" strokeWidth={1.5} />
                <span className="text-sm">123 Logistics Ave, CA 90210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" strokeWidth={1.5} />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary" strokeWidth={1.5} />
                <span className="text-sm">Mon - Fri: 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { href: "/tracking", label: "Track Shipment" },
                { href: "/booking", label: "Book Service" },
                { href: "/calendar", label: "Schedule Pickup" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <div className="bg-background rounded-xl p-6 shadow-sm border">
              <p className="text-muted-foreground mb-4">
                Subscribe to our newsletter for exclusive updates, industry
                insights, and special offers.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <Button type="submit" className="shrink-0">
                    <Send className="h-5 w-5" />
                    <span className="ml-2 hidden sm:inline">Subscribe</span>
                  </Button>
                </div>
                {subscribed && (
                  <p className="text-sm text-primary">
                    Thank you for subscribing! Check your email for
                    confirmation.
                  </p>
                )}
              </form>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { Icon: Twitter, href: "#", label: "Twitter" },
                  { Icon: Facebook, href: "#", label: "Facebook" },
                  { Icon: Instagram, href: "#", label: "Instagram" },
                ].map(({ Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    className="bg-muted hover:bg-primary hover:text-primary-foreground p-2 rounded-lg transition-colors"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Cargo Connect. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/cookies", label: "Cookie Policy" },
                { href: "/sitemap", label: "Sitemap" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}