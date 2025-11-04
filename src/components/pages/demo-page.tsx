"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Clock,
  Download,
  ExternalLink,
  FileText,
  Search,
  Star,
  User as UserIcon,
  Bot as BotIcon, // 👈 ajouté pour bulles user/IA
  // Filter // (laisse commenté si tu n’utilises pas)
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import * as z from "zod";

// ================== TIPOS ==================
const demoFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  company: z.string().min(2, "Le nom de l'entreprise est requis"),
  phone: z.string().optional(),
  role: z.string().min(1, "Le rôle est requis"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});
type DemoFormData = z.infer<typeof demoFormSchema>;

type SearchResult = {
  id: number | string;
  title: string;
  source: string;
  date: string;
  excerpt: string;
  type: string;
  relevance: number;
  link: string;
};

// 👇 ajouté : structure de message pour le chat
type ChatMessage =
  | { role: "user"; content: string; createdAt?: string }
  | { role: "assistant"; content: string; meta?: SearchResult; createdAt?: string };

// ================== COMPONENTE ==================
export function DemoPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // 👇 ajouté : état du chat (dernier message en haut)
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm<DemoFormData>({
    resolver: zodResolver(demoFormSchema)
  });

  // ⬇️ changé : handleSearch retourne les résultats pour que ask() puisse construir la bulle IA
  const handleSearch = async (query: string): Promise<SearchResult[]> => {
    const q = query.trim();
    if (!q) return [];
    setIsSearching(true);
    setSearchQuery(q);

    try {
      const res = await fetch("http://localhost:8000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });

      if (!res.ok) throw new Error("Erreur lors de la recherche");

      const data = await res.json();

      const mappedResults: SearchResult[] = (data.results || []).map((item: any, index: number) => ({
        id: item.id ?? index,
        title: item.title ?? "Document sans titre",
        source: item.source ?? "Source inconnue",
        date: item.date ?? "—",
        excerpt: item.excerpt ?? "",
        type: item.type ?? "Document",
        relevance: item.relevance ?? 80,
        link: item.link ?? "#",
      }));

      setSearchResults(mappedResults);
      return mappedResults; // 👈 important pour le chat
    } catch (error) {
      console.error(error);
      setSearchResults([]);
      return [];
    } finally {
      setIsSearching(false);
    }
  };

  // 👇 ajouté : flux style ChatGPT
  const ask = async (q: string) => {
    const query = q.trim();
    if (!query || isSearching) return;

    // 1) push message utilisateur (en HAUT)
    setMessages(prev => [
      { role: "user", content: query, createdAt: new Date().toISOString() },
      ...prev,
    ]);

    // 2) appel backend réutilisant handleSearch
    const results = await handleSearch(query);
    const top = results[0];

    // 3) push message assistant (réponse du RAG dans excerpt)
    if (top) {
      setMessages(prev => [
        {
          role: "assistant",
          content: top.excerpt,
          meta: top,
          createdAt: top.date || new Date().toISOString(),
        },
        ...prev,
      ]);
    }

    // Nettoie le champ
    setSearchQuery("");
  };

  const onSubmitDemo = async (data: DemoFormData) => {
    try {
      const res = await fetch("http://localhost:8000/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Erreur côté serveur");

      alert("Demande de démo envoyée avec succès ! Nous vous contacterons dans les 24h.");
      reset();
    } catch (error) {
      console.error(error);
      alert("Impossible d’envoyer la demande pour le moment.");
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-14 lg:py-10 bg-gradient-radial">
        <div className="container mx-auto px-2 sm:px-6 lg:px-8">
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

      {/* Chat Section (remplace la sandbox & les résultats par un flux de conversation) */}
      <section ref={ref} className="py-10 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            {/* Zone de conversation (nouveau en HAUT) */}
            <div className="space-y-4">
              {/* Si aucune conversation, carte d’accueil */}
              {messages.length === 0 && (
                <Card className="glass hover-glow mb-6">
                  <CardHeader>
                    <CardTitle className="text-center">
                      Posez votre première question 👇
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-muted-foreground">
                    Exemples : “Obligations REP emballages ménagers”, “Sanctions pour non-respect du tri”, etc.
                  </CardContent>
                </Card>
              )}

              {/* Liste des messages (dernier en haut) */}
              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                >
                  {m.role === "user" ? (
                    <Card className="border-primary/30 bg-primary/5">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-primary/10">
                            <UserIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">Vous</Badge>
                              {m.createdAt && (
                                <span className="text-xs text-muted-foreground">
                                  {new Date(m.createdAt).toLocaleString()}
                                </span>
                              )}
                            </div>
                            <p className="text-foreground leading-relaxed">{m.content}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="glass hover-glow">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-accent/10">
                            <BotIcon className="h-5 w-5 text-accent" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge>IA</Badge>
                              {m.meta?.type && (
                                <Badge variant="outline" className="text-xs">{m.meta.type}</Badge>
                              )}
                              {typeof m.meta?.relevance === "number" && (
                                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                  {m.meta.relevance}%
                                </span>
                              )}
                              {m.createdAt && (
                                <span className="text-xs text-muted-foreground">
                                  {new Date(m.createdAt).toLocaleString()}
                                </span>
                              )}
                            </div>

                            {/* Titre + méta (si dispo) */}
                            {m.meta?.title && (
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-foreground">{m.meta.title}</h4>
                              </div>
                            )}
                            {(m.meta?.source || m.meta?.date) && (
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                {m.meta?.source && (
                                  <span className="inline-flex items-center gap-1">
                                    <FileText className="h-4 w-4" />
                                    {m.meta.source}
                                  </span>
                                )}
                                {m.meta?.date && (
                                  <span className="inline-flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {m.meta.date}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Réponse (texte du RAG) */}
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                              {m.content}
                            </p>

                            {/* Actions (ouvrir lien / exporter) */}
                            <div className="mt-4 flex items-center justify-between">
                              <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="border-primary/50 text-primary hover:bg-primary/10"
                              >
                                <Link
                                  href={m.meta?.link || "#"}
                                  className="inline-flex items-center gap-2"
                                  target="_blank"
                                >
                                  Lire le document
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
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Barre d'entrée style ChatGPT (collée en bas de la section) */}
            <div className="sticky bottom-0 left-0 right-0 mt-6 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80 rounded-xl border p-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Posez votre question…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !isSearching && ask(searchQuery)}
                  className="py-6 text-base"
                />
                <Button
                  onClick={() => ask(searchQuery)}
                  disabled={!searchQuery.trim() || isSearching}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
                >
                  {isSearching ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                </Button>
              </div>

              {/* Suggestions rapides (garde tes couleurs) */}
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "Obligations REP emballages ménagers",
                  "Sanctions pour non-respect du tri",
                  "Directive européenne déchets 2023",
                  "Responsabilité élargie producteur"
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => ask(example)}
                    className="text-xs bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full px-3 py-1 transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
