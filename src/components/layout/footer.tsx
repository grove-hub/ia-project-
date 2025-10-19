import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Scale } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    produit: [
      { name: "Fonctionnalités", href: "/fonctionnalites" },
      { name: "Tarifs", href: "/tarifs" },
      { name: "Démo", href: "/demo" },
      { name: "API", href: "/api-docs" },
    ],
    ressources: [
      { name: "Blog", href: "/ressources" },
      { name: "Documentation", href: "/docs" },
      { name: "Support", href: "/support" },
      { name: "Changelog", href: "/changelog" },
    ],
    légal: [
      { name: "Mentions légales", href: "/legal/mentions" },
      { name: "Politique de confidentialité", href: "/legal/privacy" },
      { name: "CGU", href: "/legal/cgu" },
      { name: "RGPD", href: "/legal/rgpd" },
    ],
    entreprise: [
      { name: "À propos", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Partenaires", href: "/partners" },
      { name: "Carrières", href: "/careers" },
    ],
  };

  const socialLinks = [
    { name: "LinkedIn", href: "https://linkedin.com/company/ia-juridique-dechets" },
    { name: "Twitter", href: "https://twitter.com/iajuridique" },
    { name: "GitHub", href: "https://github.com/ia-juridique-dechets" },
  ];

  return (
    <footer className="bg-secondary/10 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Scale className="h-8 w-8 text-primary glow-effect" />
              <span className="text-xl font-bold text-foreground">
                <span className="text-primary">EcoMind</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              L&apos;IA qui révolutionne la recherche juridique en gestion des déchets. 
              Recherche instantanée dans les textes de loi, jurisprudences et normes environnementales.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contact@ia-juridique-dechets.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Paris, France</span>
              </div>
            </div>

            {/* CTA */}
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground hover-glow"
            >
              <Link href="/demo">Essayer l&apos;IA</Link>
            </Button>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Produit</h3>
            <ul className="space-y-3">
              {footerLinks.produit.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Ressources</h3>
            <ul className="space-y-3">
              {footerLinks.ressources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Légal</h3>
            <ul className="space-y-3">
              {footerLinks.légal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Entreprise</h3>
            <ul className="space-y-3">
              {footerLinks.entreprise.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {currentYear} EcoMind. Tous droits réservés.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Compliance Badge */}
          <div className="mt-6 pt-6 border-t border-border/30">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>RGPD Compliant</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>ISO 27001</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Certification Sécurité</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
