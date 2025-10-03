"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useInView } from "react-intersection-observer";

const testimonials = [
  {
    name: "Marie Dubois",
    role: "Juriste Senior",
    company: "EcoWaste Solutions",
    avatar: "/avatars/marie-dubois.jpg",
    rating: 5,
    quote: "Cette IA a révolutionné notre approche de la veille réglementaire. Ce qui nous prenait des heures de recherche se fait maintenant en quelques minutes. La précision des réponses est impressionnante.",
    results: "75% de temps économisé"
  },
  {
    name: "Thomas Martin",
    role: "Responsable Conformité",
    company: "GreenCycle Industries",
    avatar: "/avatars/thomas-martin.jpg",
    rating: 5,
    quote: "L'analyse automatique des obligations et délais nous a permis d'éviter plusieurs sanctions. L'interface est intuitive et les rapports générés sont parfaitement structurés.",
    results: "100% de conformité"
  },
  {
    name: "Sophie Chen",
    role: "DAF",
    company: "WasteTech Corp",
    avatar: "/avatars/sophie-chen.jpg",
    rating: 5,
    quote: "Un investissement qui se rentabilise dès le premier mois. Les économies en expertise externe sont considérables, et notre équipe est plus autonome sur les questions juridiques.",
    results: "50k€ économisés/an"
  }
];

export function TestimonialsSection() {
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
            Ce que disent nos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              clients
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Plus de 500 professionnels du secteur des déchets nous font confiance 
            pour optimiser leur conformité réglementaire.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="h-full glass hover-glow cursor-glow group transition-all duration-300 hover:scale-105">
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl">
                      <Quote className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center mb-6">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-center mb-8">
                    <p className="text-muted-foreground leading-relaxed italic">
                      &quot;{testimonial.quote}&quot;
                    </p>
                  </blockquote>

                  {/* Results Badge */}
                  <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                      <span className="text-sm font-medium text-primary">
                        {testimonial.results}
                      </span>
                    </div>
                  </div>

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                      <div className="text-sm text-primary">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-4 gap-8 mt-16"
        >
          <div className="text-center p-6 rounded-2xl bg-primary/5 border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-2">
              500+
            </div>
            <div className="text-sm text-muted-foreground">
              Clients satisfaits
            </div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-primary/5 border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-2">
              98%
            </div>
            <div className="text-sm text-muted-foreground">
              Satisfaction client
            </div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-primary/5 border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-2">
              4.9/5
            </div>
            <div className="text-sm text-muted-foreground">
              Note moyenne
            </div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-primary/5 border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-2">
              24h
            </div>
            <div className="text-sm text-muted-foreground">
              Support technique
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
                Rejoignez nos clients satisfaits
              </h4>
              <p className="text-sm text-muted-foreground">
                Découvrez comment notre IA peut transformer votre conformité réglementaire
              </p>
            </div>
            <div className="flex items-center space-x-2 text-primary font-medium">
              <span>Commencer l&apos;essai</span>
              <Star className="h-4 w-4" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
