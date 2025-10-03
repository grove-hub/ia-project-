"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Calendar,
    CheckCircle,
    Clock,
    Download,
    ExternalLink,
    FileText,
    Filter,
    Search,
    Star
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import * as z from "zod";

const demoFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  company: z.string().min(2, "Le nom de l'entreprise est requis"),
  phone: z.string().optional(),
  role: z.string().min(1, "Le rôle est requis"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type DemoFormData = z.infer<typeof demoFormSchema>;

const mockSearchResults = [
  {
    id: 1,
    title: "Directive (UE) 2018/851 - Déchets",
    source: "eur-lex.europa.eu",
    date: "2018-05-30",
    excerpt: "Modifie la directive 2008/98/CE, obligations de tri, objectifs de recyclage pour 2025 et 2030, responsabilité élargie du producteur...",
    type: "Directive UE",
    relevance: 95,
    link: "#"
  },
  {
    id: 2,
    title: "Arrêté régional – Filière REP Emballages",
    source: "Moniteur belge",
    date: "2023-11-14",
    excerpt: "Mise en place des exigences d'information et de traçabilité pour les emballages ménagers, déclarations trimestrielles...",
    type: "Arrêté régional",
    relevance: 88,
    link: "#"
  },
  {
    id: 3,
    title: "Code de l'environnement - Art. L541-1",
    source: "Legifrance",
    date: "2023-01-01",
    excerpt: "Définition des déchets, hiérarchie de traitement, obligation de tri à la source, sanctions administratives...",
    type: "Code de loi",
    relevance: 92,
    link: "#"
  },
  {
    id: 4,
    title: "Jurisprudence - Conseil d'État",
    source: "Conseil d'État",
    date: "2023-09-15",
    excerpt: "Arrêt concernant la responsabilité des producteurs dans la gestion des déchets d'équipements électriques...",
    type: "Jurisprudence",
    relevance: 85,
    link: "#"
  }
];

export function DemoPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(mockSearchResults);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<"sandbox" | "demo">("sandbox");

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<DemoFormData>({
    resolver: zodResolver(demoFormSchema)
  });

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);
    
    // Simulation d'une recherche
    setTimeout(() => {
      setSearchResults(mockSearchResults.filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.excerpt.toLowerCase().includes(query.toLowerCase())
      ));
      setIsSearching(false);
    }, 1500);
  };

  const onSubmitDemo = async (data: DemoFormData) => {
    console.log("Demo form submitted:", data);
    // Ici, vous pourriez envoyer les données à votre API
    alert("Demande de démo envoyée avec succès ! Nous vous contacterons dans les 24h.");
    reset();
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-radial">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Testez notre{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                IA juridique
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8">
              Découvrez la puissance de notre IA avec des questions réelles. 
              Interface de démonstration complète avec recherche sémantique et analyse de documents.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex space-x-1 bg-card/50 rounded-xl p-1 glass">
              <button
                onClick={() => setActiveTab("sandbox")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === "sandbox"
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sandbox IA
              </button>
              <button
                onClick={() => setActiveTab("demo")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === "demo"
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Demander une démo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bandeau IA en travaux */}
      <section className="bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="glass border-yellow-500/30 bg-yellow-500/5 my-8">
            <CardContent className="p-4 sm:p-5 flex items-start sm:items-center gap-3 sm:gap-4">
              <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 sm:mt-0 shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
              <div>
                <p className="text-sm sm:text-base text-yellow-200 font-medium">IA en travaux</p>
                <p className="text-xs sm:text-sm text-yellow-100/80">
                  En attente d&apos;une clé API. La recherche fonctionne en mode démo avec des résultats simulés.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sandbox Section */}
      {activeTab === "sandbox" && (
        <section ref={ref} className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              {/* Search Interface */}
              <Card className="glass hover-glow mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Search className="h-6 w-6 text-primary" />
                    <span>Recherche sémantique juridique</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Posez votre question en langage naturel... (ex: Quelles sont les obligations de tri des déchets dangereux ?)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                        className="text-lg py-6"
                      />
                    </div>
                    <Button
                      onClick={() => handleSearch(searchQuery)}
                      disabled={!searchQuery.trim() || isSearching}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground hover-glow px-8"
                    >
                      {isSearching ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      ) : (
                        <Search className="h-5 w-5" />
                      )}
                    </Button>
                  </div>

                  {/* Quick Examples */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Exemples de questions :</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Obligations REP emballages ménagers",
                        "Sanctions pour non-respect du tri",
                        "Directive européenne déchets 2023",
                        "Responsabilité élargie producteur"
                      ].map((example, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(example);
                            handleSearch(example);
                          }}
                          className="text-xs bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full px-3 py-1 transition-colors"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filters */}
                  <div className="flex items-center space-x-4">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <div className="flex space-x-2">
                      {["Directive UE", "Arrêté", "Code de loi", "Jurisprudence"].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => {
                            if (selectedFilters.includes(filter)) {
                              setSelectedFilters(selectedFilters.filter(f => f !== filter));
                            } else {
                              setSelectedFilters([...selectedFilters, filter]);
                            }
                          }}
                          className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                            selectedFilters.includes(filter)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">
                    Résultats de recherche
                  </h3>
                  <Badge variant="secondary">
                    {searchResults.length} résultats
                  </Badge>
                </div>

                {searchResults.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="glass hover-glow cursor-glow group transition-all duration-300 hover:scale-[1.02]">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                {result.title}
                              </h4>
                              <Badge variant="outline" className="text-xs">
                                {result.type}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                              <span className="flex items-center space-x-1">
                                <FileText className="h-4 w-4" />
                                <span>{result.source}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{result.date}</span>
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium text-foreground">
                                {result.relevance}%
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {result.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="border-primary/50 text-primary hover:bg-primary/10"
                          >
                            <Link href={result.link} className="flex items-center space-x-2">
                              <span>Lire le document</span>
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Exporter
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Demo Request Section */}
      {activeTab === "demo" && (
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              >
                {/* Form */}
                <Card className="glass hover-glow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-6 w-6 text-primary" />
                      <span>Demander une démo personnalisée</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit(onSubmitDemo)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Nom complet *
                          </label>
                          <Input
                            {...register("name")}
                            placeholder="Votre nom"
                            className={errors.name ? "border-destructive" : ""}
                          />
                          {errors.name && (
                            <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Email *
                          </label>
                          <Input
                            {...register("email")}
                            type="email"
                            placeholder="votre@email.com"
                            className={errors.email ? "border-destructive" : ""}
                          />
                          {errors.email && (
                            <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Entreprise *
                          </label>
                          <Input
                            {...register("company")}
                            placeholder="Nom de l'entreprise"
                            className={errors.company ? "border-destructive" : ""}
                          />
                          {errors.company && (
                            <p className="text-sm text-destructive mt-1">{errors.company.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Téléphone
                          </label>
                          <Input
                            {...register("phone")}
                            placeholder="+33 1 23 45 67 89"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Rôle *
                        </label>
                        <Select {...register("role")}>
                          <SelectTrigger className={errors.role ? "border-destructive" : ""}>
                            <SelectValue placeholder="Sélectionnez votre rôle" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="juriste">Juriste</SelectItem>
                            <SelectItem value="responsable-conformite">Responsable Conformité</SelectItem>
                            <SelectItem value="daf">DAF</SelectItem>
                            <SelectItem value="directeur">Directeur</SelectItem>
                            <SelectItem value="consultant">Consultant</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.role && (
                          <p className="text-sm text-destructive mt-1">{errors.role.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Message *
                        </label>
                        <Textarea
                          {...register("message")}
                          placeholder="Décrivez vos besoins et questions spécifiques..."
                          rows={4}
                          className={errors.message ? "border-destructive" : ""}
                        />
                        {errors.message && (
                          <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover-glow"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                            <span>Envoi en cours...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span>Demander la démo</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Info */}
                <div className="space-y-6">
                  <Card className="glass">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-4">
                        Que se passe-t-il ensuite ?
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">1</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">Confirmation</h4>
                            <p className="text-sm text-muted-foreground">
                              Nous confirmons votre demande dans les 2 heures
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">2</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">Planification</h4>
                            <p className="text-sm text-muted-foreground">
                              Nous planifions votre démo personnalisée
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">3</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">Démo</h4>
                            <p className="text-sm text-muted-foreground">
                              Session de 30 minutes adaptée à vos besoins
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-4">
                        Avantages de la démo
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span className="text-sm text-muted-foreground">
                            Démonstration personnalisée selon votre secteur
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span className="text-sm text-muted-foreground">
                            Réponses à vos questions spécifiques
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span className="text-sm text-muted-foreground">
                            Évaluation de vos besoins de conformité
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span className="text-sm text-muted-foreground">
                            Proposition de plan personnalisé
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
