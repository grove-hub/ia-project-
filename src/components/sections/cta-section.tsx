"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const benefits = [
  {
    icon: CheckCircle,
    title: "Conformité garantie",
    description: "Évitez les sanctions avec une veille réglementaire proactive"
  },
  {
    icon: Zap,
    title: "Gain de temps",
    description: "75% de temps économisé sur la recherche juridique"
  },
  {
    icon: Shield,
    title: "Sécurité des données",
    description: "RGPD compliant avec chiffrement end-to-end"
  }
];

export function CtaSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Prêt à révolutionner votre{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              conformité réglementaire
            </span>
            ?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Rejoignez des centaines d&apos;entreprises qui font confiance à notre IA 
            pour optimiser leur gestion des déchets et assurer leur conformité.
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-4 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="glass hover-glow cursor-glow">
            <CardContent className="p-8 lg:p-12 text-center">
              <div className="mb-8">
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
                  Essai gratuit - Aucune carte requise
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  Commencez votre essai gratuit dès maintenant
                </h3>
                <p className="text-muted-foreground text-lg">
                  Testez toutes les fonctionnalités pendant 14 jours. 
                  Aucun engagement, annulation possible à tout moment.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-xl hover-glow cursor-glow group"
                >
                  <Link href="/demo" className="flex items-center space-x-2">
                    <span>Essayer l&apos;IA gratuitement</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary/50 text-primary hover:bg-primary/10 text-lg px-8 py-6 rounded-xl glass cursor-glow"
                >
                  <Link href="/demo">
                    Demander une démo personnalisée
                  </Link>
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Configuration en 5 minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Support technique inclus</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Formation gratuite</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Compliance Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-6 bg-secondary/20 border border-border/50 rounded-2xl px-8 py-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-foreground">RGPD Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-foreground">ISO 27001</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-foreground">Certification Sécurité</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Questions ? Notre équipe est là pour vous aider
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <a 
              href="mailto:contact@ia-juridique-dechets.com"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              contact@ia-juridique-dechets.com
            </a>
            <span className="hidden sm:block text-muted-foreground">•</span>
            <a 
              href="tel:+33123456789"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              +33 1 23 45 67 89
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
