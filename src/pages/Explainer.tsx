import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BookOpen, ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

const Explainer = () => {
  const [user, setUser] = useState<User | null>(null);
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("basic");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleExplain = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic to explain");
      return;
    }

    setLoading(true);
    setExplanation("");

    try {
      const { data, error } = await supabase.functions.invoke("explain-concept", {
        body: { topic, level },
      });

      if (error) throw error;

      setExplanation(data.explanation);
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to generate explanation");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-subtle)" }}>
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">Concept Explainer</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card style={{ boxShadow: "var(--shadow-medium)" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Explain Any Concept
              </CardTitle>
              <CardDescription>
                Enter a topic and choose your learning level for a personalized explanation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic">What would you like to understand?</Label>
                <Textarea
                  id="topic"
                  placeholder="e.g., Photosynthesis, Quantum mechanics, The water cycle..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
              </div>

              <div className="space-y-3">
                <Label>Learning Level</Label>
                <RadioGroup value={level} onValueChange={setLevel}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="basic" id="basic" />
                    <Label htmlFor="basic" className="font-normal cursor-pointer">
                      Basic - Simple explanations for beginners
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate" className="font-normal cursor-pointer">
                      Intermediate - More detailed with technical terms
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced" className="font-normal cursor-pointer">
                      Advanced - In-depth analysis for experts
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                onClick={handleExplain}
                disabled={loading || !topic.trim()}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating explanation...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Explain
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {explanation && (
            <Card className="animate-fade-in" style={{ boxShadow: "var(--shadow-soft)" }}>
              <CardHeader>
                <CardTitle>Explanation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-slate max-w-none">
                  <p className="whitespace-pre-wrap leading-relaxed">{explanation}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Explainer;
