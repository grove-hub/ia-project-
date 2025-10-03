"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const partners = [
  {
    name: "EcoWaste Solutions",
    logo: "/logos/ecowaste.png",
    description: "Leader européen du traitement des déchets industriels"
  },
  {
    name: "GreenCycle Industries",
    logo: "/logos/greencycle.png", 
    description: "Innovation dans le recyclage des plastiques"
  },
  {
    name: "WasteTech Corp",
    logo: "/logos/wastetech.png",
    description: "Solutions technologiques pour la gestion des déchets"
  },
  {
    name: "CleanEarth Group",
    logo: "/logos/cleanearth.png",
    description: "Services environnementaux intégrés"
  },
  {
    name: "RecycleMax",
    logo: "/logos/recyclemax.png",
    description: "Optimisation des chaînes de recyclage"
  },
  {
    name: "EcoCompliance",
    logo: "/logos/ecocompliance.png",
    description: "Conseil en conformité environnementale"
  }
];

export function PartnersSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ils nous font{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              confiance
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Des entreprises leaders du secteur des déchets et de l&apos;environnement 
            utilisent notre IA pour optimiser leur conformité réglementaire.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full glass hover-glow cursor-glow group transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center">
                  {/* Logo Placeholder */}
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="text-2xl font-bold text-primary">
                      {partner.name.split(' ').map(word => word[0]).join('')}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {partner.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {partner.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
              <div className="text-2xl font-bold text-primary mb-2">
                €2M+
              </div>
              <div className="text-sm text-muted-foreground">
                Chiffre d&apos;affaires total des clients
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
              <div className="text-2xl font-bold text-primary mb-2">
                50+
              </div>
              <div className="text-sm text-muted-foreground">
                Pays couverts par nos clients
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
              <div className="text-2xl font-bold text-primary mb-2">
                99.9%
              </div>
              <div className="text-sm text-muted-foreground">
                Disponibilité de service
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl px-8 py-6">
            <div className="text-center sm:text-left">
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Rejoignez ces entreprises innovantes
              </h4>
              <p className="text-sm text-muted-foreground">
                Découvrez comment notre IA peut transformer votre approche de la conformité
              </p>
            </div>
            <div className="flex items-center space-x-2 text-primary font-medium">
              <span>Devenir partenaire</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
