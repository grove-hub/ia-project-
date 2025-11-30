"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

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
        </motion.div>

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
                  Commencez votre essai dès maintenant
                </h3>
                <p className="text-muted-foreground text-lg">
                  Testez toutes les fonctionnalités dès maintenant.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-xl hover-glow cursor-glow group"
                >
                  <Link href="/demo" className="flex items-center space-x-2">
                    <span>Essayer l&apos;IA</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
