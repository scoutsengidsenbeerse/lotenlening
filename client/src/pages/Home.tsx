import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertCircle, CheckCircle2, Heart, MapPin, Mail, Phone, FileText } from "lucide-react";
import { toast } from "sonner";

/**
 * Design Philosophy: Moderne Vertrouwensstijl
 * - Transparantie en helderheid in alle communicatie
 * - Gemeenschapsgerichtheid: "wij bouwen samen"
 * - Vertrouwen door professionaliteit
 * - Toegankelijkheid voor alle leeftijden
 */

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    loten: 1,
    agreed: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form is now handled by Google Form iframe
    window.open("https://forms.gle/2DsrAiz3vnDYpSha9", "_blank");
    toast.success("De inschrijvingsformulier wordt geopend. Vul deze alstublieft in.");
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        loten: 1,
        agreed: false,
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <img
              src="https://www.scoutsengidsenbeerse.be/banners/logos/Grijs.png"
              alt="Scouts Beerse Logo"
              className="h-16 w-auto rounded-md"
            />
            <div>
              <h1 className="text-2xl font-bold text-primary" style={{fontFamily: 'arial'}}>Scouts en Gidsen Beerse VZW</h1>
              <p className="text-sm text-muted-foreground">Lotenlening 2026</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <a href="#motivatie" className="text-sm font-medium hover:text-primary transition">
              Motivatie
            </a>
            <a href="#hoe-werkt" className="text-sm font-medium hover:text-primary transition">
              Hoe werkt het
            </a>
            <a href="#reglement" className="text-sm font-medium hover:text-primary transition">
              Reglement
            </a>
            <a href="#inschrijving" className="text-sm font-medium hover:text-primary transition">
              Inschrijving
            </a>
            <Button
              size="sm"
              className="bg-accent hover:bg-accent/90 text-primary font-semibold ml-4"
              onClick={() => window.open("https://forms.gle/2DsrAiz3vnDYpSha9", "_blank")}
            >
              Nu inschrijven
            </Button>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-[600px] md:h-[700px] overflow-hidden">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663399650547/FxJT3DcY54WZKrgXeJBzi5/hero-scouts-building_222952d0.jpg"
            alt="Nieuwe scoutslokalen"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight" style={{fontFamily: 'arial'}}>
              Bouw mee aan onze toekomst
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl">
              De Lotenlening van Scouts en Gidsen Beerse
            </p>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8"
              onClick={() => document.getElementById("inschrijving")?.scrollIntoView({ behavior: "smooth" })} style={{color: '#f8f8f7'}}
            >
              Nu inschrijven
            </Button>
          </div>
        </section>

        {/* Motivatie Section */}
        <section id="motivatie" className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="mb-6">Waarom deze lotenlening?</h2>
                <p className="text-lg text-foreground mb-4">
                  U vraagt zich misschien af waarom wij deze lotenlening opstarten. Wij staan namelijk op het punt waarop de bouw van ons nieuwe lokaal bijna kan starten. Doordat wij als scouts al jarenlang sparen, kunnen wij het grootste deel van de kosten met eigen middelen dekken. Het realiseren van een modern jeugdlokaal is tegenwoordig echter een kostbare zaak. Om de start van de werken definitief te garanderen, ontbreekt er nog een klein gedeelte van de totaalprijs.
                </p>
                <p className="text-lg text-foreground mb-4">
                  Met dit project vragen we u niet om een gift of sponsoring, maar om een tijdelijke lening. Wij garanderen dat elke euro die u inlegt, weer wordt terugbetaald.
                </p>
                <p className="text-lg text-foreground mb-6">
                  In onderstaande infobrochure leggen we uit hoe u ons kunt helpen deze laatste stap te zetten.
                </p>
                <div className="inline-block bg-accent/10 border-2 border-accent rounded-lg p-6 mt-4">
                  <p className="text-sm font-semibold text-accent mb-3">📄 INFOBROCHURE</p>
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-primary font-bold text-base px-6"
                    onClick={() => window.open('https://d2xsxph8kpxj0f.cloudfront.net/310519663399650547/FxJT3DcY54WZKrgXeJBzi5/Info-brochure-lotenlening-V1-3(1)_1b02e88d.pdf', '_blank')}
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Download infobrochure
                  </Button>
                </div>
              </div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663399650547/FxJT3DcY54WZKrgXeJBzi5/scouts-groepsfoto_679f635b.jpg"
                alt="Scouts gemeenschap"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Hoe Werkt Het Section */}
        <section id="hoe-werkt" className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-center mb-12">Hoe werkt de lotenlening?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <Card className="border-2 border-primary/20 hover:border-primary/50 transition">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-primary">1</span>
                  </div>
                  <CardTitle className="text-secondary">Intekenen</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">
                    U schrijft zich in voor het gewenste aantal loten. Elk lot kost €250,00. U kunt minimaal 1 en maximaal 50
                    loten kopen.
                  </p>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="border-2 border-primary/20 hover:border-primary/50 transition">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-primary">2</span>
                  </div>
                  <CardTitle className="text-secondary">Steunen</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">
                    U betaalt het bedrag over op onze bankrekening. Uw loten zijn nu geregistreerd en u ontvangt een
                    bevestigingsbrief met uw lotnummers.
                  </p>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="border-2 border-primary/20 hover:border-primary/50 transition">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-primary">3</span>
                  </div>
                  <CardTitle className="text-secondary">Terugbetaling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">
                    Elk jaar loten we 20% van de loten uit (60 loten per jaar). De uitgelote loten worden volledig terugbetaald.
                    Na 5 jaar zijn alle loten uitgeloot.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Key Details Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <h2 className="text-center mb-12">Kerngegevens van de lotenlening</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-secondary">Aantal loten</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">240</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-secondary">Waarde per lot</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">€250</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-secondary">Totaalbedrag</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">€60.000</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-secondary">Looptijd</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">5 jaar</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Reglement Section */}
        <section id="reglement" className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h2 className="mb-12">Reglement en voorwaarden</h2>
            <div className="space-y-6 max-w-3xl mx-auto">

                <Card className="border-primary/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-secondary">Artikel 1: Doel van de lening</CardTitle>
                  </CardHeader>
                  <CardContent className="text-foreground text-sm">
                    De uitgifte van de lotenlening heeft tot doel VZW Scouts En Gidsen - Beerse, met ondernemingsnummer 0806.840.357, te ondersteunen in de financiering van de bouw/verbouwing van de scoutslokalen in de Schoolstraat 59 te Beerse.
                  </CardContent>
                </Card>

                <Card className="border-primary/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-secondary">Artikel 2: Nominale waarde en renteloos karakter</CardTitle>
                  </CardHeader>
                  <CardContent className="text-foreground text-sm">
                    De loten hebben elk een nominale waarde van 250 euro, staan op enkele naam en worden renteloos geleend aan de hogergenoemde vzw. Een persoon kan meerdere loten kopen.
                  </CardContent>
                </Card>

                <Card className="border-primary/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-secondary">Artikel 3: Inschrijvingsperiode en aantal loten</CardTitle>
                  </CardHeader>
                  <CardContent className="text-foreground text-sm">
                    De inschrijvingsperiode voor de lening loopt tot 30 juli 2026. Het aantal loten is beperkt tot 240.
                  </CardContent>
                </Card>

                <Card className="border-primary/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-secondary">Artikel 4: Intekenen en betaling</CardTitle>
                  </CardHeader>
                  <CardContent className="text-foreground text-sm">
                    <p>
                      Intekenen voor deze lotenlening kan door het inschrijvingsformulier op de website van Scouts en Gidsen Beerse (Google Forms) in te vullen en het overeenkomstige bedrag van € 250 (of een veelvoud van € 250: € 500, € 750, € 1000, …) over te schrijven op de rekening van de vzw. Het lot wordt pas aan de inschrijver overhandigd wanneer de betaling van dat lot bevestigd is door hogergenoemde vzw.
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      www.scoutsengidsenbeerse.be | +32 476 50 23 44 | vzw@scoutsengidsenbeerse.be
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-secondary">Artikel 5: Akkoord met reglement</CardTitle>
                  </CardHeader>
                  <CardContent className="text-foreground text-sm">
                    Door het kopen van een lot gaat de inschrijver akkoord met dit reglement.
                  </CardContent>
                </Card>

                <Card className="border-primary/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-secondary">Artikel 6: Vermeldingen op het lot</CardTitle>
                  </CardHeader>
                  <CardContent className="text-foreground text-sm">
                    Om rechtsgeldig te zijn, moet elk lot volgende vermeldingen bevatten: het volgnummer; de datum van verwerving; de naam en voornaam van de lotenhouder; alsook de handtekening van de penningmeester en de voorzitter van de vzw.
                  </CardContent>
                </Card>

                <Card className="border-primary/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-secondary">Artikel 7: Looptijd en jaarlijkse loting</CardTitle>
                  </CardHeader>
                  <CardContent className="text-foreground text-sm">
                    <p>
                      De looptijd van de lening bedraagt maximaal 5 jaar, te rekenen vanaf het jaar 2027. Vanaf dan zal jaarlijks 20% van de loten uitgeloot en vervolgens terugbetaald worden. De loting zal plaatsvinden op de jaarlijkse overgang (eind augustus) van Scouts en Gidsen Beerse. Ook indien niet aanwezig zullen de loten uiteraard worden uitbetaald. De terugbetaling van het lot zal in de maand september gebeuren.
                    </p>
                    <p className="mt-3">
                      De uitslag van de trekking zal jaarlijks worden medegedeeld aan de betrokken partijen via mail.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-secondary">Artikel 8: Vervroegde terugbetaling</CardTitle>
                  </CardHeader>
                  <CardContent className="text-foreground text-sm">
                    Er is geen vervroegde terugbetaling mogelijk, tenzij vanwege uitzonderlijke omstandigheden, waarbij de Raad van Bestuur van de hogergenoemde vzw elke aanvraag zal beoordelen.
                  </CardContent>
                </Card>

                <Card className="border-primary/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-secondary">Artikel 9: Register van lotenhouders</CardTitle>
                  </CardHeader>
                  <CardContent className="text-foreground text-sm">
                    Het register van de lotenhouders wordt opgesteld en beheerd door de Raad van Bestuur. Dit register wordt bewaard op de zetel van de vzw.
                  </CardContent>
                </Card>

                <Card className="border-primary/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-secondary">Artikel 10: Overdraagbaarheid van loten</CardTitle>
                  </CardHeader>
                  <CardContent className="text-foreground text-sm">
                    De loten zijn genummerd, op naam, niet opvraagbaar en op straf van nietigheid verkoopbaar aan derden. Overdracht kan mits de Raad van Bestuur van de vzw schriftelijk op de hoogte gesteld wordt van de naam en het adres van de nieuwe begunstigde.
                  </CardContent>
                </Card>

                <Card className="border-primary/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-secondary">Artikel 11: Overlijden van lotenhouder</CardTitle>
                  </CardHeader>
                  <CardContent className="text-foreground text-sm">
                    Bij het overlijden van de natuurlijke persoon zal de Raad van Bestuur de loten terugbetalen aan de rechthebbende(n).
                  </CardContent>
                </Card>

                <Card className="border-primary/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-secondary">Artikel 12: Afstand van recht op terugbetaling</CardTitle>
                  </CardHeader>
                  <CardContent className="text-foreground text-sm">
                    De eigenaar van een lot kan op elk ogenblik afstand doen van zijn/haar gegarandeerd recht op terugbetaling door een schriftelijke mededeling hiervan aan de Raad van Bestuur van de vzw.
                  </CardContent>
                </Card>

                <Card className="border-primary/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-secondary">Artikel 13: Niet voorziene gevallen</CardTitle>
                  </CardHeader>
                  <CardContent className="text-foreground text-sm">
                    Over alle niet in dit reglement voorziene gevallen beslist de Raad van Bestuur van de vzw.
                  </CardContent>
                </Card>
            </div>
          </div>
        </section>

        {/* Inschrijvingsformulier */}
        <section id="inschrijving" className="py-16 md:py-24 bg-white">
          <div className="container max-w-2xl">
            <h2 className="mb-4 text-center">Schrijf je nu in</h2>
            <p className="text-center text-foreground mb-12">
              Vul het formulier hieronder in om deel te nemen aan de lotenlening. Wij nemen spoedig contact op.
            </p>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle>Inschrijvingsformulier</CardTitle>
                <CardDescription>Vul het formulier hieronder in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-6 rounded-lg border border-primary/20">
                  <p className="text-center text-foreground mb-6">
                    Vul het formulier in via deze link:
                  </p>
                  <div className="text-center">
                    <Button
                      onClick={() => window.open("https://forms.gle/2DsrAiz3vnDYpSha9", "_blank")}
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    >
                      Open inschrijvingsformulier
                    </Button>
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-6">
                    U wordt doorgestuurd naar het inschrijvingsformulier. Na inzending ontvangt u een bevestiging.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact & Transparantie Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container">
            <h2 className="text-white mb-12 text-center">Contact en transparantie</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Contactgegevens</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Adres</p>
                      <p>Schoolstraat 59, 2340 Beerse, België</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Telefoon</p>
                      <p>+32 (0)14 12 34 56</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Mail className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">E-mail</p>
                      <p>vzw@scoutsengidsenbeerse.be</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transparency Info */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Transparantie</h3>
                <p className="mb-4">
                  VZW Scouts en Gidsen Beerse zal deze investeringen alleen gebruiken voor bouw/verbouwingswerken. Alle inschrijvingen en
                  terugbetalingen worden nauwkeurig bijgehouden en jaarlijks gerapporteerd.
                </p>
                <p className="mb-6">
                  U kunt op elk moment contact opnemen voor vragen over de voortgang van het project of de lotenlening.
                </p>
                <Button
                  variant="outline"
                  className="bg-transparent text-white hover:bg-white/10"
                  style={{borderColor: '#2d5016'}}
                  onClick={() => toast.info("Volledige jaarlijkse rapportage beschikbaar op aanvraag.")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container text-center">
            <h2 className="mb-6">Klaar om mee te bouwen?</h2>
            <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto">
              Sluit je aan bij onze sterke schouders die Scouts en Gidsen Beerse helpen groeien. Investeer in onze toekomst en
              ontvang je geld terug via de jaarlijkse loting.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
              onClick={() => document.getElementById("inschrijving")?.scrollIntoView({ behavior: "smooth" })}
            >
              Nu inschrijven
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 border-t border-primary/20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Over ons</h4>
              <p className="text-sm">
                VZW Scouts en Gidsen Beerse is een jeugdorganisatie die jongeren helpt groeien door avontuur, vriendschap en
                persoonlijke ontwikkeling.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Snelle links</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#motivatie" className="hover:underline">
                    Motivatie
                  </a>
                </li>
                <li>
                  <a href="#hoe-werkt" className="hover:underline">
                    Hoe werkt het
                  </a>
                </li>
                <li>
                  <a href="#reglement" className="hover:underline">
                    Reglement
                  </a>
                </li>
                <li>
                  <a href="#inschrijving" className="hover:underline">
                    Inschrijving
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contacteer ons</h4>
              <p className="text-sm">
                Schoolstraat 59<br />
                2340 Beerse, België
                <br />
                <br />
                <a href="mailto:vzw@scoutsengidsenbeerse.be" className="hover:underline">
                  vzw@scoutsengidsenbeerse.be
                </a>
              </p>
            </div>
          </div>
          <div className="border-t border-primary/20 pt-8 text-center text-sm">
            <p>
              © 2026 VZW Scouts en Gidsen Beerse. Alle rechten voorbehouden. | Ondernemingsnummer: 0806840357
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
