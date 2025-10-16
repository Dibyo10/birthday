import { useState, useEffect } from "react";
import { Heart, Sparkles, Gift, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroBackground from "@/assets/hero-background.jpg";

const Index = () => {
  const [confetti, setConfetti] = useState<boolean>(false);
  const [musicPlaying, setMusicPlaying] = useState<boolean>(false);

  useEffect(() => {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".observe-fade").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const triggerConfetti = () => {
    setConfetti(true);
    const confettiElements = document.querySelectorAll(".confetti-piece");
    confettiElements.forEach((el) => {
      (el as HTMLElement).style.animation = "confettiFall 3s linear forwards";
    });

    setTimeout(() => setConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/20 floating"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          />
        ))}
      </div>

      {/* Confetti */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10px",
                backgroundColor: ["#f472b6", "#fbbf24", "#fb7185", "#fca5a5"][Math.floor(Math.random() * 4)],
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Music Toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-6 right-6 z-50 rounded-full bg-card/80 backdrop-blur-sm"
        onClick={() => setMusicPlaying(!musicPlaying)}
      >
        {musicPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </Button>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        
        <div className="relative z-10 text-center px-4 space-y-6 max-w-4xl mx-auto">
          <div className="animate-heartBeat mb-8">
            <Heart className="w-20 h-20 mx-auto text-primary fill-primary" />
          </div>
          
          <h1 className="font-romantic text-6xl md:text-8xl font-bold text-foreground drop-shadow-lg">
            Happy Birthday
          </h1>
          <h2 className="font-romantic text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
            My Rani Sa 💖
          </h2>
          
          <p className="text-xl md:text-2xl text-foreground/90 font-light max-w-2xl mx-auto leading-relaxed">
            You are my sunshine, my calm, and my chaos in the best way.
          </p>
          
          <div className="flex gap-2 justify-center items-center pt-4">
            <Sparkles className="w-6 h-6 text-accent animate-sparkle" />
            <Sparkles className="w-4 h-4 text-primary animate-sparkle" style={{ animationDelay: "0.5s" }} />
            <Sparkles className="w-5 h-5 text-accent animate-sparkle" style={{ animationDelay: "1s" }} />
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-romantic text-5xl md:text-6xl text-center mb-4 text-primary observe-fade">
            Our Memories ✨
          </h2>
          <p className="text-center text-muted-foreground mb-12 observe-fade">
            Every moment with you is a treasure
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 observe-fade">
            {[
              { title: "Our First Date", caption: "Where it all began 💕" },
              { title: "Your Beautiful Smile", caption: "Your smile = my peace" },
              { title: "Adventure Together", caption: "Making memories, one trip at a time" },
              { title: "Cozy Moments", caption: "Home is wherever I'm with you" },
              { title: "Late Night Talks", caption: "3 AM conversations hit different" },
              { title: "Us Being Goofy", caption: "You make me laugh like no one else" },
            ].map((memory, idx) => (
              <Card
                key={idx}
                className="group relative overflow-hidden aspect-square cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center p-6">
                    <Gift className="w-16 h-16 mx-auto mb-4 text-primary/60" />
                    <p className="font-romantic text-2xl text-foreground/80 mb-2">{memory.title}</p>
                    <p className="text-sm text-muted-foreground italic">{memory.caption}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white">
                    <p className="font-romantic text-xl mb-1">{memory.title}</p>
                    <p className="text-sm">{memory.caption}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8 italic observe-fade">
            💡 Replace these with our actual photos to make it even more special
          </p>
        </div>
      </section>

      {/* Video Message Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-romantic text-5xl md:text-6xl mb-4 text-primary observe-fade">
            From Me to You 💌
          </h2>
          <p className="text-muted-foreground mb-8 observe-fade">
            A special message just for you
          </p>

          <Card className="overflow-hidden observe-fade shadow-romantic">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <div className="text-center p-8">
                <Heart className="w-20 h-20 mx-auto mb-4 text-primary/50" />
                <p className="text-lg text-muted-foreground">
                  Video placeholder
                </p>
                <p className="text-sm text-muted-foreground/70 mt-2">
                  Replace with your video embed code or URL
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Love Letter Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent" />
        
        <div className="max-w-3xl mx-auto relative">
          <Card className="p-8 md:p-12 glow-effect observe-fade">
            <div className="absolute top-4 right-4">
              <Heart className="w-8 h-8 text-primary fill-primary animate-heartBeat" />
            </div>

            <h2 className="font-romantic text-4xl md:text-5xl mb-6 text-primary">
              Dear Rani Sa,
            </h2>

            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p className="text-lg">
                Every day with you feels like a dream I never want to wake up from. You make life brighter, 
                warmer, and infinitely more beautiful. Your smile is the first thing I think of in the morning 
                and the last thing I picture before I sleep.
              </p>

              <p className="text-lg">
                You've turned ordinary moments into extraordinary memories. From our silly late-night conversations 
                to our comfortable silences, every second spent with you is a treasure I hold close to my heart.
              </p>

              <p className="text-lg">
                On this special day, I want you to know that you are loved beyond measure. You are my best friend, 
                my partner in crime, my peace, and my joy. Thank you for being you, for accepting me as I am, 
                and for making me a better person every single day.
              </p>

              <p className="text-lg font-medium text-primary">
                Here's to celebrating you today and forever. I love you more than words can express.
              </p>
            </div>

            <div className="mt-8 text-right">
              <p className="font-romantic text-3xl text-primary">Forever yours,</p>
              <p className="font-romantic text-3xl text-foreground">Dibyo 💕</p>
            </div>

            <div className="absolute bottom-4 left-4 flex gap-2">
              <Sparkles className="w-4 h-4 text-accent animate-sparkle" />
              <Sparkles className="w-3 h-3 text-primary animate-sparkle" style={{ animationDelay: "0.7s" }} />
            </div>
          </Card>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-romantic text-5xl md:text-6xl text-center mb-12 text-primary observe-fade">
            Our Journey 🌸
          </h2>

          <div className="space-y-12">
            {[
              { title: "When We Met", description: "The universe conspired to bring us together", year: "Day 1" },
              { title: "Our First Date", description: "Butterflies, nervous laughs, and instant connection", year: "The Beginning" },
              { title: "First Trip Together", description: "Creating memories in new places, hand in hand", year: "Adventure" },
              { title: "You Said Yes", description: "Making it official, making it forever", year: "Our Promise" },
              { title: "Forever Loading...", description: "The best is yet to come, my love", year: "∞" },
            ].map((milestone, idx) => (
              <div key={idx} className="flex gap-4 md:gap-8 items-start observe-fade group">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="font-romantic text-2xl text-primary group-hover:scale-110 inline-block transition-transform">
                    {milestone.year}
                  </span>
                </div>
                
                <div className="relative flex-shrink-0">
                  <div className="w-4 h-4 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                  {idx < 4 && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-4 w-0.5 h-20 bg-gradient-to-b from-primary to-primary/20" />
                  )}
                </div>

                <Card className="flex-1 p-6 hover:shadow-romantic transition-all duration-300 group-hover:scale-105">
                  <h3 className="font-semibold text-xl mb-2 text-foreground">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ending Section */}
      <section className="py-20 px-4 text-center relative">
        <div className="max-w-3xl mx-auto space-y-8 observe-fade">
          <h2 className="font-romantic text-5xl md:text-6xl text-primary">
            Here's to Forever 💫
          </h2>
          
          <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed">
            Here's to more birthdays, more laughs, more adventures, and forever us.
            You are my today and all of my tomorrows.
          </p>

          <div className="pt-8">
            <Button
              size="lg"
              onClick={triggerConfetti}
              className="font-romantic text-2xl px-8 py-6 rounded-full bg-gradient-to-r from-primary to-accent hover:scale-110 transition-transform shadow-romantic"
            >
              <Heart className="mr-2 fill-current" />
              I Love You
              <Sparkles className="ml-2" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground pt-8 italic">
            Made with endless love by Dibyo 💕
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
