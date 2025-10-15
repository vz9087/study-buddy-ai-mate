import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Brain, MessageSquare, Sparkles, ArrowRight, CheckCircle, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-subtle)" }}>
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">Study Buddy</span>
          </div>
          <Button onClick={() => navigate("/auth")}>
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto space-y-20">
          <section className="text-center space-y-6">
            <div 
              className="inline-block px-6 py-3 rounded-full text-sm font-medium mb-4"
              style={{ 
                background: "var(--gradient-hero)",
                color: "white",
                boxShadow: "var(--shadow-medium)"
              }}
            >
              <Sparkles className="w-4 h-4 inline mr-2" />
              AI-Powered Learning
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Your Personal
              <span className="block mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Study Companion
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Master any topic with AI-powered explanations, chat assistance, and personalized learning experiences.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/auth")}
                className="text-lg px-8"
              >
                Start Learning Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <Card 
              className="transition-all hover:scale-105"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-2xl">Smart Concept Explainer</CardTitle>
                <CardDescription className="text-base">
                  Understand difficult topics instantly with AI explanations tailored to your learning level.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Choose basic, intermediate, or advanced</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Clear, simple language</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Instant explanations</span>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="transition-all hover:scale-105"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="w-7 h-7 text-secondary" />
                </div>
                <CardTitle className="text-2xl">AI Chat Assistant</CardTitle>
                <CardDescription className="text-base">
                  Have real conversations with your AI study buddy. Ask questions and get instant answers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                  <span>Natural conversation flow</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                  <span>Context-aware responses</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                  <span>Available 24/7</span>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="text-center space-y-8">
            <Card 
              className="max-w-3xl mx-auto border-2 border-primary/20"
              style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-strong)" }}
            >
              <CardHeader>
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-3xl">Ready to Learn Smarter?</CardTitle>
                <CardDescription className="text-lg">
                  Join students who are already accelerating their learning with AI
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-8">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/auth")}
                  className="text-lg px-12"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <footer className="border-t mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Study Buddy. AI-powered learning for everyone.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
