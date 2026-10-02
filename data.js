/* DDTI content. Scores: A = P(+) / S(-), B = D(+) / C(-), C = I(+) / T(-), D = E(+) / F(-).
   v: adds 1 to the conscience meter. x: secondary score on another dimension. */
var DDTI = window.DDTI = {};

DDTI.DIMS = {
  A: { l: "P", r: "S", ln: "Problem-dweller", rn: "Solution-sprinter",
       lx: "You'd rather understand the problem than rush to fix it.",
       rx: "You'd rather build something and learn as you go." },
  B: { l: "D", r: "C", ln: "Diverger", rn: "Converger",
       lx: "You open up more ideas than you close.",
       rx: "You love narrowing things down to what matters." },
  C: { l: "I", r: "T", ln: "Intuition", rn: "Test",
       lx: "You trust your hand and your gut.",
       rx: "You trust evidence and real users." },
  D: { l: "E", r: "F", ln: "Expression", rn: "Function",
       lx: "You leave room for meaning, feeling and culture.",
       rx: "You make sure it works, clearly and smoothly." }
};

DDTI.CHECKIN = {
  t: "Check-in first. How do you feel right now?",
  o: [["🟢 I'm ready to dig in!", "g"], ["🟡 I'm here, let's see what happens", "y"], ["🔴 I'm running on fumes", "r"]]
};

DDTI.MOODS = {
  g: "You checked in 🟢 ready to dig in. Love that energy.",
  y: "You checked in 🟡 “let's see what happens.” Very situated action of you. Suchman approves.",
  r: "You checked in 🔴 running on fumes. A 2026 meta-analysis found that walking boosts divergent thinking. Go for a walk. Doctor's orders (sort of)."
};

DDTI.Q = {
 A: [
  { t: "The brief says: “A university wants students to use the library more.” Your first move?", o: [
    ["Highlight every assumption hiding in that one sentence", 2],
    ["Ask who “students” leaves out: commuters, part-timers, people who feel they don't belong there", 1, { v: 1 }],
    ["Sketch three quick concepts and see what sticks", -1],
    ["An app with room booking and a cute owl mascot. Done.", -2]] },
  { t: "Your team has spent two whole sessions on the 4W. You feel…", o: [
    ["Finally getting somewhere. One more round of desk research?", 2, { x: { C: -1 } }],
    ["Calm. Have we mapped the indirect stakeholders yet?", 1, { v: 1 }],
    ["Fine, but I've been doodling solutions in the margins since session one", -1],
    ["Can we PLEASE draw something now", -2]] },
  { t: "A teammate writes: “HMW create an app that reminds people to go running?”", o: [
    ["That's a solution wearing an HMW costume", 2],
    ["Let's zoom out to why routines break in the first place", 1],
    ["Could work. What if the reminders get passive-aggressive?", -1],
    ["Honestly? Ship it.", -2]] },
  { t: "“Problem and solution co-evolve.” In practice, that means…", o: [
    ["I refine the problem until the solution becomes obvious", 2],
    ["Every new idea is a reason to reread the problem", 1],
    ["Ideas first. The problem will sharpen as we go.", -1],
    ["Great, I start solving and the problem can catch up", -2]] },
  { t: "In a user test, people use your prototype for something you never intended.", o: [
    ["Wait… maybe we misunderstood the problem. Back to the Map.", 2, { x: { C: -1 } }],
    ["Ask them why. This is getting interesting.", 1],
    ["Cool, add a feature for that", -1],
    ["Fix the flow so they use it the right way", -2]] },
  { t: "Three days before the deadline, someone suggests revisiting the problem definition.", o: [
    ["Brave. Correct. Let's do it.", 2],
    ["Timebox it to 30 minutes, set a timer", 1],
    ["Let the user test tell us if the problem was wrong", -1],
    ["Over my dead body.", -2]] },
  { t: "Which sentence goes on your laptop sticker?", o: [
    ["“It doesn't matter how well it's crafted if it's the wrong thing to build.”", 2],
    ["“Fall in love with the problem, not the solution.”", 1],
    ["“Think, make, reflect, make some more.”", -1],
    ["“Done is better than perfect.”", -2]] },
  { t: "Desk research shows three existing apps already “solve” your problem.", o: [
    ["Then what do they miss, and who do they leave out? That's our real problem.", 2, { v: 1 }],
    ["Why are people still struggling, then?", 1],
    ["Lightning demo! Let's borrow their best bits.", -1],
    ["We'll just make a better one. How hard can it be?", -2]] }
,
  { t: "A user can't figure out your app and says: “Sorry, I'm just bad with technology.”", o: [
    ["“It's not you, it's the design.” Then ask what they expected to happen.", 2],
    ["Note exactly where the gulf of execution opened up", 1],
    ["Add a tooltip right there", -1],
    ["Add an onboarding tutorial. Seven screens. With a mascot.", -2]] }
 ],
 B: [
  { t: "The Crazy 8 timer goes off. Your paper has…", o: [
    ["Eight sketches, plus three more in the margins", 2],
    ["Eight ideas, at least two of them legally questionable", 1],
    ["One idea, drawn from eight slightly different angles", -1],
    ["Three ideas, already refined. Quality over quantity.", -2]] },
  { t: "Dot vote. Four dots each.", o: [
    ["Ask whether we can get more dots", 2],
    ["Spread them out. Every idea deserves a chance.", 1],
    ["Two on my favourite, two on the runner-up", -1],
    ["All four on one idea. Commitment.", -2]] },
  { t: "A teammate pitches a wild new idea 30 minutes before the hand-in.", o: [
    ["YES. Let's pivot.", 2],
    ["Ooh, can we mash it into what we have?", 1],
    ["Lovely. Into the nice-to-have list it goes.", -1],
    ["Thank them warmly, then lock the scope", -2]] },
  { t: "Your must-have / nice-to-have sorting usually ends with…", o: [
    ["A nice-to-have list longer than the whole project", 2],
    ["Nice-to-haves quietly promoted to must-haves", 1],
    ["A short, honest list on both sides", -1],
    ["An empty nice-to-have list. If it's only nice, it's out.", -2]] },
  { t: "You're preparing a user test. You bring…", o: [
    ["Five rough paper versions. Let the users show us the way.", 2, { x: { C: -1 } }],
    ["Two or three alternatives to compare", 1],
    ["One prototype, plus a backup screen just in case", -1],
    ["One polished prototype. We already decided.", -2]] },
  { t: "Round robin. Someone builds on your sketch and takes it somewhere new.", o: [
    ["Love it. Keep passing it around, let's see where it ends up.", 2],
    ["Nice, now let's mix it with someone else's", 1],
    ["Cool, but let's steer it back to our HMW", -1],
    ["Hmm. Mine was already the answer.", -2]] },
  { t: "When you fill in an effort/impact matrix, you…", o: [
    ["Suggest adding a third axis", 2],
    ["Keep finding new ideas for the “big bets” corner", 1],
    ["Go straight for the quick wins", -1],
    ["Use it to kill half the ideas. Happily.", -2]] },
  { t: "Your Figma file looks like…", o: [
    ["400 frames on an infinite canvas, one named “Frame 382 copy copy”", 2],
    ["Mostly tidy, plus a chaotic page called “playground”", 1],
    ["One page per sprint phase, components named", -1],
    ["Tidy, because I delete everything that didn't make it", -2]] }
,
  { t: "Nobody notices that the cards in your app can be swiped.", o: [
    ["Brainstorm fifteen ways to hint at swiping, from arrows to wobbles", 2],
    ["Try three different hints and see which feels natural", 1],
    ["Use the standard pattern: let the next card peek in", -1],
    ["Replace the swipe with a button. Problem solved.", -2]] }
 ],
 C: [
  { t: "How do you usually start thinking about a new idea?", o: [
    ["Grab a pen. My hand thinks faster than my brain.", 2],
    ["Build a rough model and see how it feels", 1],
    ["Look up what's already out there", -1],
    ["Write down my assumptions so we can test them", -2]] },
  { t: "A teammate asks: “Why did you design it this way?”", o: [
    ["It just felt right.", 2],
    ["Hang on, let me sketch you the reason", 1],
    ["Norman would back me up. Look at the mapping.", -1],
    ["Three users got stuck on the old flow. Here are my notes.", -2]] },
  { t: "Decide day. Your weapon of choice:", o: [
    ["Gut feeling, a.k.a. “accumulated experience compressed into instant recognition”", 2],
    ["A quick prototype of each, to see which feels better", 1],
    ["A decision matrix with weighted criteria", -1],
    ["Whichever one tested better with real users", -2]] },
  { t: "When should a user first see your prototype?", o: [
    ["I already tested it on myself. Twice.", 2],
    ["When it finally feels right to me", 1],
    ["Once the main flow is clickable", -1],
    ["Yesterday. Paper is fine.", -2]] },
  { t: "Two test users give you completely opposite feedback.", o: [
    ["Go with the one that agrees with me", 2],
    ["Sketch both versions and see which looks right", 1],
    ["Look for patterns, and check whose voices are missing from the sample", -1, { v: 1 }],
    ["Recruit three more users", -2]] },
  { t: "Your user test goes badly. Nobody finds the main button.", o: [
    ["Wrong users. Next.", 2],
    ["They'll get it once the visuals are done", 1, { x: { D: 1 } }],
    ["Fix it and run a quick second round", -1],
    ["Great data! Log every single stumble.", -2]] },
  { t: "Pick a design thinker as your spirit guide:", o: [
    ["Schön: reflection-in-action, figure it out by doing", 2],
    ["Suchman: plans are just resources, improvise in context", 1],
    ["Nielsen: just give me the heuristics", -1],
    ["Simon: systematic problem solving, all the way down", -2]] },
  { t: "Your storyboards are usually based on…", o: [
    ["Whatever story appears while I'm drawing", 2],
    ["A strong hunch about a guy called Patrick", 1],
    ["Personas from our research", -1],
    ["An actual interview quote, word for word", -2]] }
,
  { t: "People keep talking to your robot as if it understands everything.", o: [
    ["Make it look a little less clever. I can tell it's over-promising.", 2],
    ["Sketch a few ways it could lower expectations", 1],
    ["Find out what previous experiences people bring with them", -1],
    ["Run an observation study, Pepper-paper style", -2]] }
 ],
 D: [
  { t: "Norman says we experience design on three levels. Which do you design for first?", o: [
    ["Reflective: what it says about you, what it means", 2],
    ["Visceral: the first-glance “ooh”", 1],
    ["Behavioral, but it should still feel nice", -1],
    ["Behavioral. It just has to work, smoothly.", -2]] },
  { t: "In a user test, what are you secretly most curious about?", o: [
    ["What they think it means", 2],
    ["Whether they smile at any point", 1],
    ["Where exactly they hesitate", -1],
    ["Task completion and error rate", -2]] },
  { t: "Lo-fi wireframe review. Someone says: “The colours are ugly.”", o: [
    ["The colours ARE the concept", 2],
    ["Honestly, they're right, and it's been bothering me too", 1],
    ["Fair, but let's fix the flow first", -1],
    ["Good. Nobody should be looking at colours yet.", -2]] },
  { t: "You're designing a tool for discovering local culture. What matters most?", o: [
    ["It should feel like the culture it shows, made with the people behind it", 2, { v: 1 }],
    ["A visual identity people actually remember", 1],
    ["Clear filters for time, place and price", -1],
    ["Find an event in under 30 seconds", -2]] },
  { t: "Provotypes: prototypes made to provoke, not to be used. You think…", o: [
    ["Finally, my kind of prototype", 2],
    ["Great for sparking debate about what technology should do", 1, { v: 1 }],
    ["Interesting, but eventually someone has to use it", -1],
    ["A prototype nobody can use is just a sculpture", -2]] },
  { t: "Nielsen's heuristic: “aesthetic and minimalist design.” Your reading:", o: [
    ["Minimalism is one style among many. Sometimes more says more.", 2],
    ["“Aesthetic” is doing just as much work as “minimalist”", 1],
    ["Clean is good, as long as it stays usable", -1],
    ["Delete everything that doesn't help the task", -2]] },
  { t: "Design the confirmation after someone books a concert ticket. You go for…", o: [
    ["Something that feels like the concert itself: sound, colour, a little ceremony", 2],
    ["A small, delightful animation", 1],
    ["A checkmark plus one friendly line", -1],
    ["A checkmark and the booking details. Done.", -2]] },
  { t: "Your dream portfolio piece:", o: [
    ["An installation that makes people feel something they can't name", 2],
    ["A visual identity for a tiny theatre", 1],
    ["A banking app that works for people with low vision or shaky hands", -1, { v: 1 }],
    ["A ticket machine so clear that no tourist ever cries in front of it again", -2]] }
,
  { t: "A smart lamp turns on with a tap. How should dimming work?", o: [
    ["Make it a small ritual: slow strokes, like calming it down", 2],
    ["A playful gesture, like twisting the air above it", 1],
    ["Hold to dim, with the light changing as you go, and easy for shaky hands too", -1, { v: 1 }],
    ["A plus and a minus button. Everyone gets it instantly.", -2]] }
 ]
};

DDTI.GROUPS = {
  PD: { name: "The Explorers", line: "You live in the first diamond. The problem is your playground.", color: "#6F8AA8", pale: "#DDE5EE", ink: "#344A63" },
  PC: { name: "The Diagnosticians", line: "You stay with the problem, then name it precisely.", color: "#7F9A7B", pale: "#DFE7DC", ink: "#3D5239" },
  SD: { name: "The Makers", line: "You think by building. Ideas come out of your hands.", color: "#C2A04A", pale: "#F1E8CC", ink: "#6A5418" },
  SC: { name: "The Deciders", line: "You commit, cut and ship. Someone has to.", color: "#8E7FB0", pale: "#E5E0EF", ink: "#4A3D6B" },
  SQ: { name: "Hidden type", line: "Unlocked only by landing in the middle of everything.", color: "#3A4A63", pale: "#E2E6EC", ink: "#1F2A3B" }
};

DDTI.TYPES = {
 PDIE: { n: "The Wandering Sketchbook", t: "Lost in the problem space. On purpose.",
  d: "You don't solve briefs, you wander through them. Every detour turns into a sketch, every sketch turns into a new question, and somehow your final work still carries the fingerprints of everything you found along the way. Your process is the product.",
  sp: "Turning accidents, scribbles and side quests into ideas nobody could have planned.",
  ma: "Wander so far that you forget where you were going, while the team is still waiting at the start.",
  cap: "Explored everything. Found the exit? Not yet.",
  cr: "Generative: “What if we went the other way?”", hat: "Green hat", hab: "Map",
  ds: [["Bruno Munari", "Designer and artist", "Turned play and experiment into a design method. Wrote Design as Art (1966)."],
       ["Charles & Ray Eames", "Designers and filmmakers", "From chairs to the film Powers of Ten (1977), they wanted to explore everything."],
       ["Kenya Hara", "Graphic designer", "Art director of MUJI. Re-sees everyday things through the idea of emptiness."],
       ["Olafur Eliasson", "Artist", "Installations about perception, like The Weather Project at Tate Modern (2003)."]] },
 PDIF: { n: "The Norman Door Detective", t: "Can't open a door without filing a usability report.",
  d: "Your camera roll is 60% badly designed objects. You notice every confusing button, every misleading sign, every door that lies about push or pull, and you can't stop wondering why. You trust your eye more than any spreadsheet, and your eye is usually right.",
  sp: "Spotting a broken interaction from across the room, before anyone else feels the friction.",
  ma: "Find 47 problems and fix none, because picking one feels like betraying the other 46.",
  cap: "Found 47 problems. Fixed zero.",
  cr: "Interpretative: “This reads as push. It is pull.”", hat: "Black hat", hab: "Map",
  ds: [["Don Norman", "Cognitive scientist", "Wrote The Design of Everyday Things (1988). The Norman door is named after him."],
       ["Naoto Fukasawa", "Product designer", "“Without Thought”: designing from what people do unconsciously. Made MUJI's wall-mounted CD player."],
       ["Jane Fulton Suri", "Design researcher, IDEO", "Thoughtless Acts? (2005) collects photos of everyday improvisations."]] },
 PDTE: { n: "The Cultural Probe", t: "Collects other people's stories like souvenirs.",
  d: "You'd rather hand someone a disposable camera and a stack of postcards than make them fill in a survey. You're fascinated by how people really live, and you go out to find it. Your research doesn't just inform the design, it gives it a soul.",
  sp: "Getting people to show you the parts of their lives they'd never mention in an interview.",
  ma: "Collect so many stories that you drown in them, still pressing the shutter.",
  cap: "Just one more photo. And one more. And…",
  cr: "Interpretative: “What does this mean to the people who live it?”", hat: "Red hat", hab: "Map",
  ds: [["Bill Gaver", "Design researcher", "Created Cultural Probes with Anthony Dunne and Elena Pacenti (1999). Yes, this type is named after that."],
       ["Jan Chipchase", "Field researcher", "Studied how people use phones around the world. Wrote Hidden in Plain Sight (2013)."],
       ["Liz Sanders", "Co-design pioneer", "Generative tools that let people make, not just tell. The Sanders in Sanders & Stappers from our slides."]] },
 PDTF: { n: "The Desk Research Goblin", t: "37 tabs open. All of them relevant.",
  d: "Give you a brief and you vanish into papers, competitor apps, forum threads and a 2026 meta-analysis on walking and creativity. You collect insights the way magpies collect spoons. Your 4W has footnotes, and your footnotes have footnotes.",
  sp: "Knowing what already exists, so nobody reinvents the wheel badly.",
  ma: "Hug the research so tightly that the blank sketch paper never gets touched.",
  cap: "Just one more source before we start.",
  cr: "Comparative: “How is this different from what already exists?”", hat: "White hat", hab: "Map",
  ds: [["Erika Hall", "Design researcher", "Wrote Just Enough Research (2013). The key words are “just enough”. Read it twice."],
       ["Indi Young", "Researcher", "Wrote Mental Models (2008): deep maps of how people actually think."],
       ["Kim Goodwin", "Interaction designer", "Wrote Designing for the Digital Age (2009), on research-driven personas and scenarios."]] },

 PCIE: { n: "The Problem Sommelier", t: "Swirls the brief and detects notes of unmet need.",
  d: "You stay with a problem longer than anyone, quietly tasting it, until you suddenly name the exact one worth solving. Your HMW questions follow all three rules without you even trying. Your gut has excellent taste, and slightly expensive habits.",
  sp: "Writing the one HMW question that makes the whole team go “oh.”",
  ma: "Savour the brief so deeply that you get dizzy before you design anything.",
  cap: "Notes of ambiguity, with a long finish.",
  cr: "Investigative: “Why this problem, and not the one next to it?”", hat: "Blue hat", hab: "Map, right before Decide",
  ds: [["Ilse Crawford", "Interior designer", "Studioilse designs spaces around how people feel and live, not how they photograph."],
       ["Tadao Ando", "Architect", "Self-taught. Distils light and concrete into a single idea, like the Church of the Light (1989)."],
       ["Paula Scher", "Graphic designer, Pentagram", "Sketched the Citi logo on a napkin in minutes. She says it took a lifetime."]] },
 PCIF: { n: "The Pinpointer", t: "Finds the one root cause everyone else walked past.",
  d: "While others brainstorm, you zoom. One tiny detail catches your eye and you follow it all the way down to the root cause. You don't need a spreadsheet to know something is off. You can feel it, like a pebble in your shoe.",
  sp: "Finding the single fix that makes ten other problems disappear.",
  ma: "Zoom in so far that you miss the tower of boxes falling right behind you.",
  cap: "Fascinating button. What tower?",
  cr: "Investigative: “Wait, why does this happen at all?”", hat: "Black hat", hab: "Map",
  ds: [["Dieter Rams", "Industrial designer, Braun", "“Less, but better.” His ten principles of good design are still quoted everywhere."],
       ["Jasper Morrison", "Product designer", "Champions quiet, “Super Normal” everyday objects (with Naoto Fukasawa, 2006)."],
       ["Massimo Vignelli", "Designer", "Reduced New York's subway to a clean diagram in 1972. Strong opinions about typefaces."]] },
 PCTE: { n: "The Interview Whisperer", t: "Asks “why?” until people tell the truth.",
  d: "People tell you things they've never told anyone, mostly because you actually listen. You go deep rather than wide, and you'd trade a hundred survey answers for one honest story. Meaning lives in the pauses, and you are very good at waiting.",
  sp: "Hearing the need behind what people say they want.",
  ma: "Record so many hours of interviews that you get tangled in your own tape.",
  cap: "Just transcribing the last 14 hours.",
  cr: "Interpretative: “What were they really saying there?”", hat: "Red hat", hab: "Map",
  ds: [["Steve Portigal", "User researcher", "Wrote Interviewing Users (2013), the field guide to shutting up and listening."],
       ["Dori Tunstall", "Design anthropologist", "Wrote Decolonizing Design (2023), on whose voices design listens to."],
       ["Sasha Costanza-Chock", "Researcher and designer", "Wrote Design Justice (2020): design led by the communities it affects."]] },
 PCTF: { n: "The 4W Accountant", t: "What, Who, Where, Why. And a spreadsheet for each.",
  d: "Your problem definitions are airtight, evidence-based and version-controlled. You know exactly who has the problem, where it happens and why it matters, with citations. You'd rather build the right small thing than the wrong big thing.",
  sp: "Turning a fuzzy brief into a crisp, testable problem space.",
  ma: "Freeze completely when someone says “eight ideas, eight minutes, go.”",
  cap: "One idea. Eight minutes. Perfectly formatted.",
  cr: "Error correction: “Small thing, but that's not what an affordance is.”", hat: "White hat", hab: "Map",
  ds: [["Edward Tufte", "Information designer", "Wrote The Visual Display of Quantitative Information (1983). Has feelings about chart junk."],
       ["Christopher Alexander", "Architect", "Wrote A Pattern Language (1977), a system for designing almost anything."],
       ["Florence Nightingale", "Nurse and statistician", "Her 1858 rose diagram used data to change how hospitals were run. The original evidence-based designer."]] },

 SDIE: { n: "The Provotype Punk", t: "Didn't make a product. Made a statement.",
  d: "You don't design solutions, you design questions with a user interface. Your prototypes make people uncomfortable, then laugh, then think. You'd rather build a navigation app that ranks routes by ethics than yet another to-do list.",
  sp: "Making abstract debates tangible enough to argue about.",
  ma: "Make something so provocative that your users just turn it upside down.",
  cap: "It's not confusing. It's a statement.",
  cr: "Interpretative: “This reads as surveillance. Good. Lean in.”", hat: "Green hat", hab: "Prototype",
  ds: [["Dunne & Raby", "Speculative designers", "Wrote Speculative Everything, from the further reading in our Lecture 5."],
       ["Superflux", "Speculative design studio", "Anab Jain and Jon Ardern build futures you can walk into, like the climate-hit apartment Mitigation of Shock."],
       ["Stefan Sagmeister", "Graphic designer", "Carved a poster into his own skin. Made an exhibition simply called Beauty."]] },
 SDIF: { n: "The Crazy 8 Gremlin", t: "Eight minutes, nineteen sketches.",
  d: "Give you a pen and a timer and you explode. You think with your hands, your ideas come faster than your sentences, and at least two of them are genuinely brilliant. You just won't know which two until someone else tells you.",
  sp: "Getting a stuck team unstuck in about four minutes.",
  ma: "Bury yourself so deep in your own sketches that you can't find the good one.",
  cap: "The good idea is in here somewhere.",
  cr: "Generative: “What if it was a map? What if it was a pet?”", hat: "Green hat", hab: "Sketch",
  ds: [["Jake Knapp", "Designer", "Created the design sprint at Google Ventures and wrote Sprint (2016). Our whole course is his fault."],
       ["David Kelley", "Designer", "Founded IDEO and the Stanford d.school. Believes in building to think."],
       ["Patricia Urquiola", "Product designer", "Famously prolific, endlessly experimenting with materials and forms."]] },
 SDTE: { n: "The Moodboard Magpie", t: "Tests three shades of blue on real humans.",
  d: "You collect colours, textures, references and vibes, then put them in front of real people to see what actually lands. You believe feelings can be designed, and that they can be tested. Your moodboard has more versions than your prototype.",
  sp: "Knowing which version makes people feel something, and proving it.",
  ma: "Compare 47 nearly identical swatches until all of them fall off the board.",
  cap: "Option 23 or option 24? Asking for a user.",
  cr: "Comparative: “Which one feels more like us?”", hat: "Yellow hat", hab: "Sketch, then Test",
  ds: [["Josef Albers", "Artist and teacher", "Interaction of Color (1963): years of systematic experiments on how colours change each other."],
       ["Hella Jongerius", "Product designer", "Researched colour for Vitra and wrote I Don't Have a Favourite Colour (2016)."],
       ["India Mahdavi", "Architect and designer", "Known for fearless colour, like the all-pink dining room at Sketch in London (2014)."]] },
 SDTF: { n: "The Prototype Machine", t: "Builds it in paper, tests it by lunch.",
  d: "Why discuss an idea when you could build it in ten minutes and put it in someone's hands? You prototype fast, test fast and learn fast. Your desk is a graveyard of cardboard phones, and every one of them taught you something.",
  sp: "Turning “what if” into something testable before the meeting ends.",
  ma: "Build so fast that you tape yourself to the prototype.",
  cap: "Rapid prototyping. Slightly too rapid.",
  cr: "Suggestive: “Let's just mock it up and see.”", hat: "Yellow hat", hab: "Prototype, then Test",
  ds: [["James Dyson", "Inventor and designer", "Built 5,127 prototypes of his bagless vacuum before one worked."],
       ["Carolyn Snyder", "Usability specialist", "Wrote Paper Prototyping (2003). Scissors are a design tool."],
       ["Bill Moggridge", "Designer", "Designed one of the first laptops and coined the term “interaction design”."]] },

 SCIE: { n: "The Auteur", t: "One vision. No notes.",
  d: "You see the finished thing before anyone else has finished reading the brief. Your taste is strong, your vision is clear, and honestly, it's usually right. Committees make you itchy.",
  sp: "Giving a project a clear, memorable point of view.",
  ma: "Keep taking your bow long after the audience has left.",
  cap: "Thank you, thank you. …Hello?",
  cr: "Suggestive: “Trust me on this one.”", hat: "Red hat", hab: "Decide",
  ds: [["Zaha Hadid", "Architect", "Bold, uncompromising forms. First woman to win the Pritzker Prize (2004)."],
       ["Rei Kawakubo", "Fashion designer", "Founder of Comme des Garçons, known for collections that refuse to explain themselves."],
       ["Saul Bass", "Graphic designer", "Film posters and title sequences, like Vertigo, that say everything with one image."]] },
 SCIF: { n: "The Figma Sniper", t: "One idea. One shot. Pixel perfect.",
  d: "While others are still diverging, you've picked the idea, built a clean prototype and named every layer. You trust your instinct, and your instinct is usually right, which is deeply annoying to everyone else.",
  sp: "Getting from sketch to clickable prototype before lunch.",
  ma: "Hit the bullseye of the wrong target. Lecture 5 warned you: going digital too early closes the loop of reflection.",
  cap: "Hit the bullseye. Wrong board.",
  cr: "Suggestive: “Just move it 4px left. Done.”", hat: "Blue hat", hab: "Prototype",
  ds: [["Susan Kare", "Designer", "Drew the original Macintosh icons (1984), pixel by perfect pixel."],
       ["Otl Aicher", "Graphic designer", "Created the pictograms for the 1972 Munich Olympics, still copied today."],
       ["Dylan Field", "Co-founder of Figma", "Without him, you'd have nothing to snipe in."]] },
 SCTE: { n: "The Experience Tuner", t: "Adjusts the feeling until it's just right.",
  d: "You care how things feel, and you won't stop until they feel right for real users, not just for you. You tune timing, tone and texture in tiny increments, testing each one. At 2 a.m., the fifteenth version of a button bounce suddenly feels perfect.",
  sp: "Making an experience feel effortless, with evidence to back it up.",
  ma: "Keep fine-tuning long after everyone else has gone to bed.",
  cap: "Almost there. One more millimetre.",
  cr: "Comparative: “Version 14 felt warmer than version 15.”", hat: "Yellow hat", hab: "Prototype, then Test",
  ds: [["Shigeru Miyamoto", "Game designer", "Known for tuning how Mario feels to control until it's just right."],
       ["Frank Thomas & Ollie Johnston", "Disney animators", "The Illusion of Life (1981) set out the 12 principles that make movement feel alive."],
       ["Brenda Laurel", "Interaction designer", "Computers as Theatre (1991): designing experiences like a stage play."]] },
 SCTF: { n: "The Usability Terminator", t: "Tested. Iterated. Tested again. Shipped.",
  d: "You run user tests the way other people breathe. Nielsen's heuristics live rent-free in your head, and you've never met a gulf of evaluation you couldn't bridge. Your designs aren't always flashy, but nobody ever gets lost in them.",
  sp: "Spotting the usability problem within 30 seconds of watching someone.",
  ma: "Stare at a happy, dancing user with no idea how to measure joy.",
  cap: "Delight: unable to quantify.",
  cr: "Error correction: “Heuristic one, visibility of system status. Fix it.”", hat: "White hat", hab: "Test",
  ds: [["Jakob Nielsen", "Usability expert", "The ten usability heuristics from our Lecture 2. Probably testing this page right now."],
       ["Steve Krug", "Usability consultant", "Wrote Don't Make Me Think (2000). The title is the whole philosophy."],
       ["Jock Kinneir & Margaret Calvert", "Graphic designers", "Designed the UK road signs in the 1960s, made to be read at a glance from a moving car."]] }
};

DDTI.SQUIGGLE = { n: "The Squiggle", t: "You are the design process itself.",
  d: "Your answers landed near the middle on every single dimension. Like Newman's design squiggle, you're messy, curious, everywhere at once, and somehow you still end up in a straight line. Either you're beautifully balanced, or you answered at random. Both are valid design methods.",
  sp: "Switching modes as the project needs: explorer on Monday, decider on Friday.",
  ma: "Tie yourself in a knot trying to be every type at once.",
  cap: "Where does this end? Asking for myself.",
  cr: "All seven types, sometimes in one sentence", hat: "All six hats, swapped hourly", hab: "Every phase at once",
  ds: [["Damien Newman", "Designer", "Drew the Design Squiggle, the most honest diagram of the design process."],
       ["Leonardo da Vinci", "Artist, engineer, anatomist", "The original “I do a bit of everything.”"],
       ["Buckminster Fuller", "Architect and inventor", "Called himself a “comprehensive designer”. Geodesic domes, maps, cars, all of it."]] };

DDTI.CONSCIENCE = [
  [0, "Ethics? We'll get to it in the next sprint."],
  [2, "Remembers the indirect stakeholders when someone reminds you."],
  [4, "Friedman would nod at you approvingly."],
  [6, "Has a Value Sensitive Design tattoo. Probably."]
];
