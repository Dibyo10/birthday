import { useState, useEffect, useRef } from "react";
import { Heart, Sparkles, Gift, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroBackground from "@/assets/hero-background.jpg";
import photo1 from "@/assets/photo1.jpg";
import photo2 from "@/assets/photo2.jpg";
import photo3 from "@/assets/photo3.jpg";
import photo4 from "@/assets/photo4.jpg";
import photo5 from "@/assets/photo5.jpg";
import photo6 from "@/assets/photo6.jpg";

const Index = () => {
  const [confetti, setConfetti] = useState<boolean>(false);
  const [musicPlaying, setMusicPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Replace this with your video URL or path
  const VIDEO_URL = "/birthdayvid.mp4"; // Put your video URL here (e.g., YouTube embed, Vimeo, or local video path)

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

    // Auto-play music on component mount
    const playMusic = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setMusicPlaying(true);
        } catch (error) {
          // Autoplay blocked by browser, user will need to click the button
          console.log("Autoplay blocked, user interaction required");
        }
      }
    };
    
    playMusic();

    return () => observer.disconnect();
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setMusicPlaying(!musicPlaying);
    }
  };

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
      {/* Background Music */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/song.mp3" type="audio/mpeg" />
      </audio>

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
        onClick={toggleMusic}
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
            Tum harr pal saath ho mere.. meri gift ho tum.. ✨
          </h2>
          <p className="text-center text-muted-foreground mb-12 observe-fade">
            Every moment with you is a treasure
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 observe-fade">
            {[
              { title: "My Hope in Hopelessness", caption: "Tumse hee mera harr effort shuru hota hai 💕" },
              { title: "My second chance..", caption: "Tum ho, tabhi ajtak koshish krrha hu.." },
              { title: "Meri future..", caption: "Tumare saath jeena hai ... aakhri saas tak...uske liye jo bann pade karunga" },
              { title: "Mera ghar..", caption: "pata hai..usi ghar ko kabhi kabhi tod deta hu..parr isse sach nahi badlega ..kabhi bhi" },
              { title: "My bacchi..", caption: "I know .. I never made you feel like that .. I WILL." },
              { title: "My .. Everything..", caption: "Some people , inspite knowing someone is their everything , hurt them.. I WONT BE THAT SOMEONE ANYMORE." },
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
      <div className="w-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
        {VIDEO_URL ? (
          <video
            className="w-full max-h-[70vh] rounded-xl"
            controls
            src={VIDEO_URL}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="text-center p-8">
            <Heart className="w-20 h-20 mx-auto mb-4 text-primary/50" />
            <p className="text-lg text-muted-foreground">
              Video placeholder
            </p>
            <p className="text-sm text-muted-foreground/70 mt-2">
              Add your video URL at the top of Index.tsx (VIDEO_URL constant)
            </p>
          </div>
        )}
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
          Happy Birthday, my love. 💖 Today is your day.. the day the world quietly became
          a little softer, a little brighter, a little more beautiful. You’ve always had that
          kind of magic.. you don’t force joy, you bring it just by being you.
        </p>

        <p className="text-lg">
          I’ve been thinking a lot lately..about us, about time, about how easy it is to get
          lost chasing the future and forget to be present with the person who makes life worth
          chasing in the first place. I know I slipped into that mistake, and I can see now how
          it made you feel distant and unseen.
        </p>

        <p className="text-lg">
          I don’t want to rewrite the past.. I just want to hold it gently, learn from it, and
          build something better. Not bigger, not louder.. just kinder.
        </p>

        <p className="text-lg">
          Rani Sa, you are still the calm in my overthinking, the peace behind my noise, the one
          who makes ordinary days feel like something sacred. Even when words are few between us,
          I still carry you with me.. in how I think, how I dream, how I try to grow.
        </p>

        <p className="text-lg">
          So today, I want this letter to be a quiet space for you... no apologies you have to
          answer, no expectations to meet. Just love..simple, steady, and still yours.
        </p>

        <p className="text-lg">
          Thank you for being you, for every laugh, every small kindness, every piece of your
          heart you’ve shared with me. I’m learning, slowly but surely, to deserve that kind of love.
        </p>

        <p className="text-lg font-medium text-primary">
          Happy Birthday, my Queen. You will always be the most beautiful part of my story..not
          because of how things were, but because of who you are.
        </p>
      </div>

      <div className="mt-8 text-right">
        <p className="font-romantic text-3xl text-primary">Forever yours,</p>
        <p className="font-romantic text-3xl text-foreground">Dibyo 💕</p>
      </div>

      <div className="absolute bottom-4 left-4 flex gap-2">
        <Sparkles className="w-4 h-4 text-accent animate-sparkle" />
        <Sparkles
          className="w-3 h-3 text-primary animate-sparkle"
          style={{ animationDelay: "0.7s" }}
        />
      </div>
    </Card>
  </div>
</section>


      {/* Why You Deserve the World Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-romantic text-5xl md:text-6xl text-center mb-6 text-primary observe-fade">
            Why You Deserve the World 🌍
          </h2>
          <p className="text-center text-lg text-foreground/80 mb-4 observe-fade max-w-3xl mx-auto">
            You deserve everything beautiful this world has to offer, and I promise to keep improving 
            in every way possible to make that happen for you.
          </p>
          <p className="text-center text-muted-foreground mb-12 observe-fade italic">
            Hover over our photos to see why ✨
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 observe-fade">
            {[
              { image: photo1, text: "Tum duniya ho kisi ki.. ❤️" },
              { image: photo2, text: "Himmat ho kisi ki.. ❤️" },
              { image: photo3, text: "Sudharne ki wajah tum banogi kisi ki.. ❤️" },
              { image: photo4, text: "Tumhe aur hurt nahi karunga yaar 🙃❤️" },
              { image: photo5, text: "Pakka.. ab bhot hurt hui .. aur nahi.. ❤️" },
              { image: photo6, text: "Mai..jaisa hu.. bass tumhara hu ..  ❤️" },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="group relative overflow-hidden aspect-square cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30"
              >
                <img 
                  src={item.image} 
                  alt={`Memory ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <p className="font-romantic text-3xl text-background text-center px-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.text}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center observe-fade">
            <p className="text-lg text-foreground/90 leading-relaxed max-w-3xl mx-auto">
              Every day, I want to be better for you. Better at loving you, supporting you, making you smile, 
              and giving you the life you deserve. You inspire me to grow, to be kinder, stronger, and more present. 
              This is my promise — to keep trying, keep improving, and never stop working to give you the world.
            </p>
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
            Made with endless love 💕
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
