"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Calendar,
    FileText,
    Filter,
    Search
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const articles = [
  {
    id: 1,
    title: "Nouvelle directive européenne sur les emballages : impacts pour les entreprises",
    excerpt: "La directive (UE) 2023/1234 modifie les obligations en matière d'emballages. Découvrez les nouveaux objectifs de recyclage et les responsabilités des producteurs.",
    date: "2024-01-15",
    category: "Réglementation UE",
    tags: ["emballages", "REP", "recyclage", "directive UE"],
    readTime: "8 min",
    featured: true
  },
  {
    id: 2,
    title: "Guide complet : Conformité déchets dangereux en 2024",
    excerpt: "Tout ce que vous devez savoir sur la gestion des déchets dangereux : classification, obligations de tri, déclarations et sanctions applicables.",
    date: "2024-01-10",
    category: "Guide pratique",
    tags: ["déchets dangereux", "conformité", "guide", "2024"],
    readTime: "12 min",
    featured: true
  },
  {
    id: 3,
    title: "Jurisprudence : Responsabilité du producteur dans la gestion des DEEE",
    excerpt: "Analyse de l'arrêt du Conseil d'État du 15 septembre 2023 concernant les obligations de reprise des équipements électriques et électroniques.",
    date: "2024-01-08",
    category: "Jurisprudence",
    tags: ["DEEE", "responsabilité", "jurisprudence", "reprise"],
    readTime: "6 min",
    featured: false
  },
  {
    id: 4,
    title: "Chiffres clés : Évolution de la réglementation déchets en France",
    excerpt: "Bilan 2023 et perspectives 2024 : évolution des sanctions, nouvelles obligations et tendances réglementaires dans le secteur des déchets.",
    date: "2024-01-05",
    category: "Actualités",
    tags: ["statistiques", "2023", "2024", "tendances"],
    readTime: "5 min",
    featured: false
  },
  {
    id: 5,
    title: "ISO 14001 et gestion des déchets : mise à jour des exigences",
    excerpt: "Les nouvelles exigences de la norme ISO 14001:2015 concernant la gestion des déchets et leur impact sur les systèmes de management environnemental.",
    date: "2024-01-03",
    category: "Normes",
    tags: ["ISO 14001", "SME", "certification", "management"],
    readTime: "10 min",
    featured: false
  },
  {
    id: 6,
    title: "Déchets de chantier : nouvelles obligations de traçabilité",
    excerpt: "Focus sur les nouvelles obligations de traçabilité pour les déchets de construction et démolition, avec exemples pratiques et modèles de documents.",
    date: "2024-01-01",
    category: "Secteur spécifique",
    tags: ["chantier", "traçabilité", "construction", "déchets"],
    readTime: "7 min",
    featured: false
  }
];

const categories = [
  "Tous",
  "Réglementation UE",
  "Guide pratique", 
  "Jurisprudence",
  "Actualités",
  "Normes",
  "Secteur spécifique"
];

const tags = [
  "emballages",
  "REP", 
  "déchets dangereux",
  "DEEE",
  "conformité",
  "jurisprudence",
  "ISO 14001",
  "traçabilité"
];

export function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedTag, setSelectedTag] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Filtrage des articles
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "Tous" || article.category === selectedCategory;
    const matchesTag = !selectedTag || article.tags.includes(selectedTag);
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesTag && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

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
              Ressources{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                juridiques
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8">
              Articles, guides et analyses sur la réglementation des déchets. 
              Restez informé des dernières évolutions juridiques et réglementaires.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Card className="glass">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Search */}
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Rechercher dans les articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Category Filters */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Catégories :</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                            selectedCategory === category
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tag Filters */}
                  <div className="space-y-3">
                    <span className="text-sm font-medium text-foreground">Tags populaires :</span>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                          className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                            selectedTag === tag
                              ? "bg-accent text-accent-foreground border-accent"
                              : "bg-transparent text-muted-foreground border-border hover:border-accent/50"
                          }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Articles en vedette
                </h2>
                <p className="text-muted-foreground">
                  Nos sélections d'articles les plus pertinents et récents
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <Card className="h-full glass hover-glow cursor-glow group transition-all duration-300 hover:scale-105">
                      <CardContent className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="secondary" className="text-xs">
                            {article.category}
                          </Badge>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{article.date}</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>

                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {article.excerpt}
                        </p>

                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span className="flex items-center space-x-1">
                                <FileText className="h-4 w-4" />
                                <span>{article.readTime}</span>
                              </span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-primary/50 text-primary hover:bg-primary/10"
                            >
                              Lire l'article
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Regular Articles */}
      {regularArticles.length > 0 && (
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Tous les articles
                </h2>
                <p className="text-muted-foreground">
                  {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} trouvé{filteredArticles.length > 1 ? 's' : ''}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <Card className="h-full glass hover-glow cursor-glow group transition-all duration-300 hover:scale-105">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {article.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {article.readTime}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {article.excerpt}
                        </p>

                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-1">
                            {article.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{article.date}</span>
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary hover:text-primary/80 p-0 h-auto"
                            >
                              Lire
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="glass border-primary/20">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Restez informé des dernières évolutions
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Recevez notre newsletter hebdomadaire avec les dernières actualités 
                    réglementaires et nos analyses juridiques.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                      asChild
                      className="bg-primary hover:bg-primary/90 text-primary-foreground hover-glow"
                    >
                      <Link href="/demo">
                        S'abonner à la newsletter
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-primary/50 text-primary hover:bg-primary/10 glass"
                    >
                      <Link href="/demo">
                        Voir nos alertes
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
