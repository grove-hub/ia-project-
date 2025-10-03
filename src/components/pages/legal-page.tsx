"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

interface LegalPageProps {
  content: {
    title: string;
    lastUpdated: string;
    sections: Array<{
      title: string;
      content: string;
    }>;
  };
}

export function LegalPage({ content }: LegalPageProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-20 bg-gradient-radial">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <Button
                asChild
                variant="ghost"
                className="mr-4 text-muted-foreground hover:text-foreground"
              >
                <Link href="/" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Retour à l&apos;accueil</span>
                </Link>
              </Button>
            </div>
            
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl mb-6">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              {content.title}
            </h1>
            
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Dernière mise à jour : {content.lastUpdated}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section ref={ref} className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {content.sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="glass hover-glow">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border/50 pb-4">
                        {section.title}
                      </h2>
                      <div 
                        className="prose prose-invert max-w-none text-muted-foreground leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: content.sections.length * 0.1 }}
              className="mt-16"
            >
              <Card className="glass border-primary/20">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Questions sur cette politique ?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Notre équipe est disponible pour répondre à toutes vos questions 
                    concernant la protection de vos données personnelles.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                      asChild
                      className="bg-primary hover:bg-primary/90 text-primary-foreground hover-glow"
                    >
                      <Link href="/contact">
                        Nous contacter
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-primary/50 text-primary hover:bg-primary/10 glass"
                    >
                      <Link href="mailto:dpo@ia-juridique-dechets.com">
                        Email DPO
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
