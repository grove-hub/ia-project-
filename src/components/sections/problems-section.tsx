"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AlertTriangle, Clock, FileText, Users } from "lucide-react";
import { useInView } from "react-intersection-observer";

const problems = [
  {
    icon: Clock,
    title: "Recherche chronophage",
    description: "Des heures passées à chercher dans des bases de données juridiques complexes et dispersées. L'information pertinente est noyée dans des milliers de documents.",
    stats: "6h/semaine en moyenne"
  },
  {
    icon: AlertTriangle,
    title: "Risques de conformité",
    description: "Difficulté à identifier rapidement les nouvelles réglementations et leurs impacts sur votre activité. Risque de sanctions et d'amendes importantes.",
    stats: "Jusqu'à 75k€ d'amendes"
  },
  {
    icon: FileText,
    title: "Documentation complexe",
    description: "Multiplicité des sources : directives UE, arrêtés nationaux, décrets régionaux, jurisprudences... Impossible de tout suivre manuellement.",
    stats: "500+ nouvelles normes/an"
  },
  {
    icon: Users,
    title: "Expertise limitée",
    description: "Besoin de juristes spécialisés coûteux. Les équipes internes manquent de temps et d'expertise pour une veille réglementaire efficace.",
    stats: "150k€/an en expertise"
  }
];

export function ProblemsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Les défis que vous{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              rencontrez
            </span>{" "}
            quotidiennement
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            La gestion des déchets implique une réglementation complexe et en constante évolution. 
            Ces défis vous ralentissent et vous exposent à des risques.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full glass hover-glow cursor-glow group transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/10 border border-destructive/20 rounded-2xl mb-6 group-hover:bg-destructive/20 transition-colors">
                    <problem.icon className="h-8 w-8 text-destructive" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {problem.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {problem.description}
                  </p>
                  
                  <div className="inline-flex items-center px-3 py-1 bg-destructive/10 border border-destructive/20 rounded-full">
                    <span className="text-sm font-medium text-destructive">
                      {problem.stats}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-2xl px-6 py-4">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <span className="text-foreground font-medium">
              Ces problèmes vous coûtent du temps et de l&apos;argent. Notre IA les résout.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
