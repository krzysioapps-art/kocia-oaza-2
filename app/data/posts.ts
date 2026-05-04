export type Post = {
  post_id: string;
  author: {
    name: string;
    profile_picture: string;
  };
  message: string;
  created_time: string;
  media?: {
    url: string;
    type?: "image" | "video";
  }[];
  reactions: { total_count: number };
  comments: { total_count: number };
  cats?: string[];
};

export const posts = [
  {
    post_id: "1",
    author: {
      name: "Fundacja",
      profile_picture: "/avatar.jpg",
    },
    message: `Szukamy wyjątkowego domu dla trójłapki Lili 🐾

Poznajcie Lili – niezwykłą koteczkę w wieku około 3,5–5 lat, która mimo trudnej przeszłości wciąż wierzy w człowieka 💛

Lili została zabrana z terenów wiejskich, gdzie spotkało ją wiele złego. W wyniku ataku psa straciła jedną z tylnych łapek – doszło do martwicy i konieczna była amputacja. Jednak to, co przeszła, nie odebrało jej najważniejszego – chęci do życia i miłości do ludzi 🤍

Dziś Lili to dzielna, silna kotka, która zasługuje na spokojny i kochający dom.

Jest już:
✅ zaszczepiona
✅ odrobaczona
✅ po kastracji
✅ po testach FIV/FELV (wyniki ujemne)
✅ zaczipowana

Lili to taka „mała słodka złośnica" 😸 – kotka o indywidualnym charakterze. Szuka opiekuna, który uszanuje jej granice i da jej czas na budowanie relacji.

🏠 Idealny dom dla Lili:
• spokojny, bez nadmiaru bodźców
• najlepiej jako jedynaczka
• ewentualnie z bardzo spokojnym kotem

Ze względu na brak tylnej łapki wymaga kontroli diety i bezpiecznego, niewychodzącego domu.

Może właśnie u Ciebie znajdzie swoje miejsce na świecie? 🌍
📞 Szczegóły: 515 621 000`,
    created_time: "2026-04-30T14:32:10+02:00",
    media: [
      { url: "/about-cat.webp" }
    ],
    reactions: { total_count: 87 },
    comments: { total_count: 14 },
    cats: ["00719f19-ee4a-4995-91d5-fa05723ac833"],
  },
  {
    post_id: "2",
    author: {
      name: "Fundacja",
      profile_picture: "/avatar.jpg",
    },
    message: `🎉 UDAŁO SIĘ! Maks znalazł swój dom!

Pamiętacie naszego czarnego przystojniaka Maksa, którego szukaliśmy w zeszłym miesiącu? 🖤

Dziś z ogromną radością informujemy, że Maks zamieszkał z cudowną rodziną Kowalskich w Krakowie! Ma do dyspozycji całe mieszkanie, dwie miski zawsze pełne po brzegi i bardzo cierpliwych opiekunów, którzy dali mu czas na oswojenie się.

Po zaledwie tygodniu Maks zaczął przychodzić na kolana sam z siebie. A po dwóch – mruczy głośniej niż odkurzacz 😂

Dziękujemy wszystkim, którzy udostępniali jego ogłoszenie. To właśnie Wy sprawiacie, że takie historie mają szczęśliwe zakończenia 🐾❤️

#AdoptujNieKupuj #SzczęśliweZakończenie #Fundacja`,
    created_time: "2026-04-28T10:15:00+02:00",
    media: [
      { url: "/about-cat.webp" },
      { url: "/gerard.jpg" }
    ],
    reactions: { total_count: 214 },
    comments: { total_count: 38 },
  },
  {
    post_id: "3",
    author: {
      name: "Fundacja",
      profile_picture: "/avatar.jpg",
    },
    message: `🆘 PILNE – potrzebujemy domów tymczasowych!

W ciągu ostatnich 48 godzin przyjęliśmy 7 kotów z jednego adresu. Właścicielka trafiła do szpitala i nie ma komu zaopiekować się jej podopiecznymi.

Koty są w różnym stanie – część wymagała już wizyty u weterynarza. Wszystkie są nakarmione i bezpieczne, ale nasze miejsca są na wyczerpaniu 😔

Szukamy domów tymczasowych dla:
🐱 3 dorosłych kotów (2 kastraty + 1 suczka po sterylizacji)
🐱 2 kociąt ok. 4 miesięcy
🐱 2 kotów starszych, ok. 8–10 lat

Dom tymczasowy to ogromna pomoc – nie musisz adoptować na stałe. Zapewniamy karmę, żwirek i opiekę weterynaryjną.

Jeśli możesz pomóc lub znasz kogoś, kto mógłby – napisz do nas w wiadomości prywatnej lub zadzwoń: 515 621 000

Udostępnijcie – każde udostępnienie może uratować kotu życie! 🙏`,
    created_time: "2026-04-27T18:44:00+02:00",
    media: [
      { url: "/about-cat.webp" }
    ],
    reactions: { total_count: 156 },
    comments: { total_count: 52 },
  },
  {
    post_id: "4",
    author: {
      name: "Fundacja",
      profile_picture: "/avatar.jpg",
    },
    message: `Poznajcie Bursztyna 🟠✨

Ten pomarańczowy dżentelmen ma około 2 lat i trafił do nas po tym, jak jego poprzedni właściciel wyprowadził się za granicę i... zostawił go samego w pustym mieszkaniu. Na szczęście sąsiadka zadzwoniła do nas zanim stało się coś złego.

Bursztyn jest:
💛 bardzo towarzyski i uwielbia ludzi
💛 świetnie dogaduje się z innymi kotami
💛 zna podstawowe komendy (tak, naprawdę!)
💛 przyzwyczajony do dzieci

To kot dla kogoś, kto chce prawdziwego przyjaciela. Bursztyn nie opuszcza swoich opiekunów ani na krok – będzie Ci towarzyszył w każdej chwili, łącznie z poranną kawą ☕😄

Czy masz dla niego miejsce w swoim sercu i domu? Napisz do nas!`,
    created_time: "2026-04-25T12:00:00+02:00",
    media: [
      { url: "/about-cat.webp" }
    ],
    reactions: { total_count: 63 },
    comments: { total_count: 9 },
  },
  {
    post_id: "5",
    author: {
      name: "Fundacja",
      profile_picture: "/avatar.jpg",
    },
    message: `🌸 Wiosenna akcja kastracji – zapisy otwarte!

Startujemy z naszą cykliczną akcją bezpłatnej kastracji i sterylizacji kotów wolno żyjących! 🐾

W tym roku współpracujemy z 3 klinikami weterynaryjnymi w mieście. Akcja potrwa przez cały maj.

Jak to działa?
1️⃣ Zgłoś lokalizację kolonii kotów przez formularz na naszej stronie
2️⃣ Nasz wolontariusz ustali termin odłowu
3️⃣ Koty trafiają do kliniki, wracają na swoje tereny

Kastracja to najskuteczniejszy i najbardziej humanitarny sposób kontroli populacji kotów bezdomnych. Jeden nieskastrowanykowt może być przodkiem setek kotów w ciągu kilku lat.

Masz kolonię w swojej okolicy? Napisz do nas lub zadzwoń: 515 621 000

Razem możemy zrobić prawdziwą różnicę! 💚`,
    created_time: "2026-04-23T09:00:00+02:00",
    media: [
      { url: "/about-cat.webp" }
    ],
    reactions: { total_count: 98 },
    comments: { total_count: 21 },
  },
  {
    post_id: "6",
    author: {
      name: "Fundacja",
      profile_picture: "/avatar.jpg",
    },
    message: `Siostry do adopcji – tylko razem! 🐾🐾

Przedstawiamy Zefir i Zefirkę – dwie nierozłączne siostrzyczki w wieku 8 miesięcy, które szukają domu razem.

Dziewczynki trafiły do nas jako maleńkie kociątka. Przez całe życie były razem i rozłąka byłaby dla nich ogromnym stresem. Obserwowanie ich razem to czysta radość – śpią splecione w kłębek, myją się nawzajem i bawią w nieustanne gonitwy 😍

Zefir (szara) – spokojniejsza, lubi obserwować świat z bezpiecznej odległości
Zefirka (pręgowana) – odważna odkrywczyni, pierwsza do każdej zabawy

Obie są:
✅ zaszczepione i odrobaczone
✅ po sterylizacji
✅ zdrowe, pełne energii

Adopcja razem to podwójna radość i podwójne mruczenie 🎶 Czy masz dla nich miejsce?`,
    created_time: "2026-04-21T16:30:00+02:00",
    media: [
      { url: "/about-cat.webp" }
    ],
    reactions: { total_count: 142 },
    comments: { total_count: 27 },
  },
  {
    post_id: "11",
    author: {
      name: "Fundacja",
      profile_picture: "/avatar.jpg",
    },
    message: `Dziękujemy za wsparcie zbiórki! 🙏💙

Kilka tygodni temu prosiliśmy Was o pomoc w sfinansowaniu operacji małego Cezara. Kotek trafił do nas z poważnym złamaniem miednicy po wypadku z samochodem.

Dzięki Wam zebraliśmy całą potrzebną kwotę w zaledwie 3 dni! 😭❤️

Dziś Cezar ma się świetnie – chodzi, biega i... już upatrył sobie najwygodniejszy kąt w naszym tymczasowym domku. Rehabilitacja przebiega wzorcowo.

Za kilka tygodni będzie gotowy do adopcji. I możemy Wam obiecać – ten mały wojownik odwdzięczy się swojemu przyszłemu opiekunowi miłością bez końca.

Jesteśmy niesamowicie wdzięczni każdemu z Was – tym, którzy wpłacili, udostępniali i trzymali kciuki. Właśnie dlatego robimy to co robimy 🐾`,
    created_time: "2026-04-19T20:00:00+02:00",
    media: [
      { url: "/about-cat.webp" }
    ],
    reactions: { total_count: 301 },
    comments: { total_count: 64 },
  },
  {
    post_id: "12",
    author: {
      name: "Fundacja",
      profile_picture: "/avatar.jpg",
    },
    message: `👴 Starszy pan szuka spokojnego domu

Przedstawiamy Profesora – wiekowego kota w okolicach 11–13 lat, który trafił do nas po śmierci swojego właściciela. Rodzina nie mogła go przyjąć.

Profesor to kot z klasą i historią. Spokojny, dostojny, niewymagający. Lubi leżeć w słońcu, jeść o stałych porach i być głaskany dokładnie za uchem. Nie potrzebuje zabawy ani gonitw – potrzebuje ciepłego miejsca i kogoś, kto uszanuje jego wiek.

Jest w doskonałej kondycji jak na swoje lata. Regularnie badany, bez chorób przewlekłych. Karmy specjalistycznej nie potrzebuje (jeszcze!).

Wiemy, że starsze koty rzadziej trafiają do adopcji. Ale to właśnie one najbardziej potrzebują domu – już nie mają czasu na czekanie w schronisku.

Może masz w domu cichy kąt i otwarte serce? 🤍`,
    created_time: "2026-04-17T11:20:00+02:00",
    media: [
      { url: "/about-cat.webp" }
    ],
    reactions: { total_count: 178 },
    comments: { total_count: 33 },
  },
  {
    post_id: "13",
    author: {
      name: "Fundacja",
      profile_picture: "/avatar.jpg",
    },
    message: `🎂 Nasza fundacja kończy 5 lat!

Pięć lat temu zaczęłyśmy od ratowania jednego kota z piwnicy przy ul. Różanej. Dziś świętujemy razem z Wami ogromne liczby:

🐾 847 kotów znalazło domy dzięki Waszej pomocy
💉 ponad 1200 bezpłatnych kastracji w ramach akcji
🏠 sieć 60 aktywnych domów tymczasowych
❤️ tysiące złotych zebranych na leczenie

To wszystko dzięki Wam – wolontariuszom, adoptującym, darczyńcom i tym, którzy po prostu udostępniali nasze posty.

W tę sobotę zapraszamy na małe świętowanie do Miau Café – będzie tort, będą koty i będziemy razem wspominać wszystkie te piękne historie. Wpadajcie! 🎉

Do zobaczenia!`,
    created_time: "2026-04-15T08:00:00+02:00",
    media: [
      { url: "/about-cat.webp" }
    ],
    reactions: { total_count: 445 },
    comments: { total_count: 89 },
  },
  {
    post_id: "14",
    author: {
      name: "Fundacja",
      profile_picture: "/avatar.jpg",
    },
    message: `⚠️ Znaleziono koty – czy to Twoje?

Wczoraj wieczorem mieszkańcy osiedla Słonecznego zgłosili nam cztery koty przebywające w opuszczonym garażu. Zwierzęta były głodne, ale w dobrej kondycji – wygląda na to, że do niedawna były pod opieką człowieka.

Opis:
🐱 Kotka szara, dorosła, bez chipa
🐱 Kot rudy, ok. 2 lat, bardzo oswojony
🐱 Dwa kociaki pręgowane, ok. 3 miesiące

Koty są teraz bezpieczne u naszego wolontariusza. Jeśli to Twoje zwierzęta lub znasz ich właściciela – skontaktuj się z nami natychmiast: 515 621 000

Prosimy o udostępnienie – może właściciel ich szuka i nie wie, gdzie się zgłosić 🙏`,
    created_time: "2026-04-13T07:45:00+02:00",
    media: [
      { url: "/about-cat.webp" }
    ],
    reactions: { total_count: 72 },
    comments: { total_count: 18 },
  },
  {
    post_id: "15",
    author: {
      name: "Fundacja",
      profile_picture: "/avatar.jpg",
    },
    message: `Wolontariusze – jesteście niesamowici! 💛

W ostatni weekend nasi wolontariusze spędzili łącznie ponad 200 godzin na odłowach, transporach do weterynarzy, karmieniu kolonii i wizytach adopcyjnych.

Chcemy powiedzieć głośno: BEZ WAS TO NIEMOŻLIWE.

Wśród naszych wolontariuszy są studenci, emeryci, mamy z dziećmi, pracownicy korporacji – ludzie z różnych światów, których łączy jedno: miłość do zwierząt i gotowość do działania.

Czy chcesz dołączyć? Szukamy osób do:
🚗 transportu kotów do weterynarzy
🏠 prowadzenia domów tymczasowych
📸 fotografowania kotów do adopcji
📱 pomocy w mediach społecznościowych

Nie musisz mieć doświadczenia – nauczymy Cię wszystkiego. Napisz do nas! 🐾`,
    created_time: "2026-04-10T15:00:00+02:00",
    media: [
      { url: "/about-cat.webp" }
    ],
    reactions: { total_count: 193 },
    comments: { total_count: 41 },
  },
  {
    post_id: "16",
    author: {
      name: "Fundacja",
      profile_picture: "/avatar.jpg",
    },
    message: `Nieśmiała Perła szuka swojego człowieka 🤍

Perła ma 4 lata i od roku jest z nami. Długo nie mogłyśmy jej pokazywać, bo była tak przestraszona, że chowała się przy każdym ruchu. Dziś jest zupełnie inna.

Perła to kotka, która wymaga cierpliwości – ale nagradza ją w stokrotnie. Kiedy w końcu Ci zaufa, stanie się Twoim cieniem. Mruczy jak mała lokomotywa i uwielbia spać przy nodze śpiącego człowieka.

Nie nadaje się do domu z małymi dziećmi ani psami. Idealna dla osoby, która rozumie, że zaufanie trzeba sobie zasłużyć.

Piszemy o niej dziś, bo minął rok od jej przybycia do nas. Rok czekania to za długo dla tak wyjątkowej kotki.

Może właśnie Ty jesteś tym cierpliwym człowiekiem, na którego Perła czeka? 🕊️
📞 515 621 000`,
    created_time: "2026-04-08T19:30:00+02:00",
    media: [
      { url: "/about-cat.webp" }
    ],
    reactions: { total_count: 267 },
    comments: { total_count: 47 },
  },
];