

// Do show progress bar (fine!!)
var showProgressBar = true;

// Main shuffleSequence definition
var shuffleSequence = seq(
    'consent',
    'setcounter',
    'intro',
    'shared-intro',
    sepWith("timeoutSep", rshuffle(startsWith('ATTRAGREEROMANIAN'),startsWith('filler'))),
     'debrief');

// Using modified controller coded by Ethan Poole (Umass, 2017)
// Disallows use of mouse for responses.
var DS = 'EPDashedSentence';

//  Set the Prolific Academic Completion URL
var sendingResultsMessage = "Vă rugăm să aşteptaţi. Răspunsurile dumneavoastră se trimit serverului."; 
var completionMessage = "Mulţumim pentru participare!"; 
var completionErrorMessage = "Eroare în trimiterea răspunsurilor dumneavoastră către server"; 

// Controller settings.
var defaults = [
    "QuestionAlt", {
        hasCorrect: 0,
        randomOrder: ['f','j'],
        presentHorizontally: true
},
"EPDashedSentence", {
    mode: 'self-paced reading',
    display: 'in place'
}
];

// Add breaks every 24 items
function modifyRunningOrder(ro)
{
    for (var i = 0; i < ro.length; ++i)
    {
        if (i % 24 == 1
            && i > 23
            && i < 250)
        {
            ro[i].push(new DynamicElement(
                "Message",
                {html: "<p>Vă rugăm să luaţi o mică pauză. Apăsaţi orice tastă când sunteţi gata să începeţi din nou.</p>", transfer: "keypress"},
            true));
            ro[i].push(new DynamicElement(
                "Separator",
                {transfer: 4000, normalMessage: "Atenţie! Primul fragment de propoziţie din acest set va apărea pe ecran în curând."},
            true));
        }
    }
    return ro;
}

// Items array.
var items = [

["consent", "Form", {consentRequired: true, html: {include: "consent.html"}}],
 ["setcounter", "__SetCounter__", { }],
["intro", "Form", {consentRequired: true, html: {include: "intro.html"}}],
["debrief", "Form", {consentRequired: true, html: {include: "debrief.html"}}],

['shared-intro', "Form", {consentRequired: false, html: {include: "shared_intro1.html"}}],

['shared-intro', "Form", {consentRequired: false, html: {include: "shared_intro2.html"}}],

['shared-intro', "Form", {consentRequired: false, html: {include: "shared_intro3.html"}}],


['shared-intro', Separator, { transfer: 1500, normalMessage: "+", errorMessage: "Răspuns greşit. Vă rugăm să citiți cu atenție."}, DS, {s: "Această propoziţie e menită să vă obişnuiască cu stilul de lectură."}],
['shared-intro', Separator, { transfer: 1500, normalMessage: "+", errorMessage: "Răspuns greşit. Vă rugăm să citiți cu atenție."}, DS, {s: "Această propoziţie este un pic mai complicată decȃt propoziţia pe care aţi citit-o mai înainte."}],

['shared-intro', Message, {consentRequired: false,
                   html: ["div",
                           ["p", "Cum vi s-a părut?"],
                           ["p", "Citiți cu atenție, avȃnd grijă să înțelegeți fiecare cuvȃnt. Hai să mai exersăm un pic."]
                         ]}],

['shared-intro', Separator, { transfer: 1500, normalMessage: "+", errorMessage: "Răspuns greşit. Vă rugăm să citiți cu atenție."}, DS, {s: "La bal, prinţul a valsat frumos şi a zȃmbit prinţesei."},"QuestionAlt", {q: "Cine a zȃmbit?", as: ['Prinţul','Prinţesa']}],
['shared-intro', Separator, { transfer: 1500, normalMessage: "+", errorMessage: "Răspuns greşit. Vă rugăm să citiți cu atenție."}, DS, {s: "Iepurii au alergat mult aseară."}],
['shared-intro', Separator, { transfer: 1500, normalMessage: "+", errorMessage: "Răspuns greşit. Vă rugăm să citiți cu atenție."}, DS, {s: "Miruna a stat toată noaptea cu fiul ei."},"QuestionAlt", {q: "Cine a stat toată noaptea cu fiul ei?", as: ['Miruna','Marina']}],
['shared-intro', Separator, { transfer: 1500, normalMessage: "+", errorMessage: "Răspuns greşit. Vă rugăm să citiți cu atenție."}, DS, {s: "Barista a pregătit un latte fără niciun chef şi nici măcar nu a făcut vreun design."}],

['shared-intro', Message, {consentRequired: false,
                   html: ["div",
                           ["p", "Bun, gata cu exersatul! Apăsaţi orice tastă când sunteţi gata să începeţi."]
                        ]}],

['shared-intro',"Separator",{transfer: 4000, normalMessage: "Atenţie! Prima propoziţie din acest set va apărea pe ecran în curând."}],

["timeoutSep", Separator, { transfer: 1500, normalMessage: "+", errorMessage: "Răspuns greşit. Vă rugăm să citiți cu atenție."}],

//// Shared experimental items + fillers

[["ATTRAGREEROMANIAN-nonsubject1pl",1],DS, {s:" Cărţile de lângă noi mereu avem un farmec aparte." },"QuestionAlt", {q: "Cine/ Ce are un farmec aparte?", as: ["Cărţile","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",1],DS, {s:" Noi mereu avem un farmec aparte."}, "QuestionAlt", {q: "Cine/ Ce are un farmec aparte?", as: ["Noi","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",1],DS, {s:" Cărţile de lângă voi mereu aveţi un farmec aparte."}, "QuestionAlt", {q: "Cine/ Ce are un farmec aparte?", as: ["Cărţile","Voi"]}],
[["ATTRAGREEROMANIAN- subject2pl",1],DS, {s:" Voi mereu aveţi un farmec aparte."}, "QuestionAlt", {q: "Cine/ Ce are un farmec aparte?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl ",1],DS, {s:"Cărţile de lângă ei mereu au un farmec aparte."}, "QuestionAlt", {q: "Cine/ Ce are un farmec aparte?", as: ["Cărţile","Ei"]}],
[["ATTRAGREEROMANIAN- subject3pl",1],DS, {s:" Ei mereu au un farmec aparte."}, "QuestionAlt", {q: "Cine/ Ce are un farmec aparte?", as: ["Ei","Ele"]}],
[["ATTRAGREEROMANIAN-nonsubject1pl",2],DS, {s:" Viorile de lângă noi mereu avem arcuş maro deschis." },"QuestionAlt", {q: "Cine/ Ce are arcuş maro deschis?", as: ["Viorile","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",2],DS, {s:"Noi mereu avem arcuş maro deschis."}, "QuestionAlt", {q: "Cine/ Ce are arcuş maro deschis?", as: ["Noi","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",2],DS, {s:" Viorile de lângă voi mereu aveţi arcuş maro deschis."}, "QuestionAlt", {q: "Cine/ Ce are arcuş maro deschis?", as: ["Viorile","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",2],DS, {s:"Voi mereu aveţi arcuş maro deschis."}, "QuestionAlt", {q: "Cine/ Ce are arcuş maro deschis?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN-nonsubject3pl",2],DS, {s:"Viorile de lângă ele mereu au arcuş maro deschis."}, "QuestionAlt", {q: "Cine/ Ce are arcuş maro deschis?", as: ["Viorile","Ele"]}],
[["ATTRAGREEROMANIAN- subject3pl",2],DS, {s:"Ele mereu aveţi arcuş maro deschis."}, "QuestionAlt", {q: "Cine/ Ce are arcuş maro deschis?", as: ["Ele","Ei"]}],
[["ATTRAGREEROMANIAN-nonsubject1pl",3],DS, {s:" Rochiile de lângă noi uneori avem dantelă roz delicată." },"QuestionAlt", {q: "Cine/ Ce are dantelă roz delicată?", as: ["Rochiile","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",3],DS, {s:"Noi uneori avem dantelă roz delicată."}, "QuestionAlt", {q: "Cine/ Ce are dantelă roz delicată?", as: ["Noi","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",3],DS, {s:" Rochiile de lângă voi uneori aveţi dantelă roz delicată."}, "QuestionAlt", {q: "Cine/ Ce are dantelă roz delicată?", as: ["Rochiile","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",3],DS, {s:"Voi uneori aveţi dantelă roz delicată."}, "QuestionAlt", {q: "Cine/ Ce are dantelă roz delicată?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",3],DS, {s:" Rochiile de lângă ei uneori au dantelă roz delicată."}, "QuestionAlt", {q: "Cine/ Ce are dantelă roz delicată?", as: ["Rochiile","Ei"]}],
[["ATTRAGREEROMANIAN- subject3pl",3],DS, {s:"Ei uneori au dantelă roz delicată."}, "QuestionAlt", {q: "Cine/ Ce are dantelă roz delicată?", as: ["Ei","Ele"]}],
[["ATTRAGREEROMANIAN-nonsubject1pl",4],DS, {s:" Dulceţurile de lângă noi uneori avem zahăr brun  deschis." },"QuestionAlt", {q: "Cine/ Ce are zahăr brun deschis?", as: ["Dulceţurile","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",4],DS, {s:"Noi uneori avem zahăr brun  deschis."}, "QuestionAlt", {q: "Cine/ Ce are zahăr brun deschis?", as: ["Noi","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",4],DS, {s:" Dulceţurile de lângă voi uneori aveţi  zahăr brun  deschis."}, "QuestionAlt", {q: "Cine/ Ce are zahăr brun deschis?", as: ["Dulceţurile","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",4],DS, {s:"Voi uneori aveţi zahăr brun deschis."}, "QuestionAlt", {q: "Cine/ Ce are zahăr brun  deschis?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",4],DS, {s:"Dulceţurile de lângă ele uneori au zahăr brun  deschis."}, "QuestionAlt", {q: "Cine/ Ce are zahăr brun  deschis?", as: ["Dulceţurile","Ele"]}],
[["ATTRAGREEROMANIAN- subject3pl",4],DS, {s:"Ele uneori au zahăr brun  deschis."}, "QuestionAlt", {q: "Cine/ Ce are zahăr brun  deschis?", as: ["Ele","Ei"]}],
[["ATTRAGREEROMANIAN-nonsubject1pl",5],DS, {s:"Pisicile de lângă noi adesea avem mişcări unduitoare elegante." },"QuestionAlt", {q: "Cine/ Ce are mişcări unduitoare elegante?", as: ["Pisicile","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",5],DS, {s:"Noi adesea avem mişcări unduitoare elegante."}, "QuestionAlt", {q: "Cine/ Ce are mişcări unduitoare elegante?", as: ["Noi","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",5],DS, {s:"Pisicile de lângă voi adesea aveţi mişcări unduitoare elegante."}, "QuestionAlt", {q: "Cine/ Ce are mişcări unduitoare elegante?", as: ["Pisicile","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",5],DS, {s:"Voi adesea aveţi mişcări unduitoare elegante."}, "QuestionAlt", {q: "Cine/ Ce are mişcări unduitoare elegante?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",5],DS, {s:"Pisicile de lângă ei adesea au mişcări unduitoare elegante."}, "QuestionAlt", {q: "Cine/ Ce are mişcări unduitoare elegante?", as: ["Pisicile","Ei"]}],
[["ATTRAGREEROMANIAN- subject3pl",5],DS, {s:"Ei adesea aveţi mişcări unduitoare elegante."}, "QuestionAlt", {q: "Cine/ Ce are mişcări unduitoare elegante?", as: ["Ei","Ele"]}],

[["ATTRAGREEROMANIAN-nonsubject1pl",6],DS, {s:" Învăţătoarele de lângă noi adesea avem succes răsunător la ore." },"QuestionAlt", {q: "Cine/ Ce are succes răsunător la ore?", as: ["Învăţătoarele","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",6],DS, {s:"Noi adesea avem succes răsunător la ore."}, "QuestionAlt", {q: "Cine/ Ce are succes răsunător la ore?", as: ["Noi","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",6],DS, {s:" Învăţătoarele de lângă voi adesea aveţi succes răsunător la ore."}, "QuestionAlt", {q: "Cine/ Ce are succes răsunător la ore?", as: ["Învăţătoarele","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",6],DS, {s:"Voi adesea aveţi succes răsunător la ore."}, "QuestionAlt", {q: "Cine/ Ce are succes răsunător la ore?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",6],DS, {s:"Învăţătoarele de lângă ele adesea au succes răsunător la ore."}, "QuestionAlt", {q: "Cine/ Ce are succes răsunător la ore?", as: ["Învăţătoarele","Ele"]}],
[["ATTRAGREEROMANIAN- subject3pl",6],DS, {s:" Ele adesea au succes răsunător la ore."}, "QuestionAlt", {q: "Cine/ Ce are succes răsunător la ore?", as: ["Ele","Ei"]}],
[["ATTRAGREEROMANIAN-nonsubject1pl",7],DS, {s:"Vânzătoarele de lângă noi mereu avem mulţi bani de hârtie." },"QuestionAlt", {q: "Cine/ Ce are mulţi bani de hârtie?", as: ["Vânzătoarele","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",7],DS, {s:"Noi mereu avem mulţi bani de hârtie."}, "QuestionAlt", {q: "Cine/ Ce are mulţi bani de hârtie?", as: ["Noi","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",7],DS, {s:"Vânzătoarele de lângă voi mereu aveţi mulţi bani de hârtie."}, "QuestionAlt", {q: "Cine/ Ce are mulţi bani de hârtie?", as: ["Vânzătoarele","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",7],DS, {s:"Voi mereu aveţi mulţi bani de hârtie."}, "QuestionAlt", {q: "Cine/ Ce are mulţi bani de hârtie?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",7],DS, {s:"Vânzătoarele de lângă ei mereu au mulţi bani de hârtie."}, "QuestionAlt", {q: "Cine/ Ce are mulţi bani de hârtie?", as: ["Vânzătoarele","Ei"]}],
[["ATTRAGREEROMANIAN- subject3pl",7],DS, {s:"Ei mereu au mulţi bani de hârtie."}, "QuestionAlt", {q: "Cine/ Ce are mulţi bani de hârtie?", as: ["Ei","Ele"]}],
[["ATTRAGREEROMANIAN-nonsubject1pl",8],DS, {s:"Oile de lângă noi adesea avem lapte foarte bun." },"QuestionAlt", {q: "Cine/ Ce are lapte foarte bun?", as: ["Oile","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",8],DS, {s:"Noi adesea avem lapte foarte bun."}, "QuestionAlt", {q: "Cine/ Ce are lapte foarte bun?", as: ["Oile","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",8],DS, {s:"Oile de lângă voi adesea aveţi lapte foarte bun."}, "QuestionAlt", {q: "Cine/ Ce are lapte foarte bun?", as: ["Oile","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",8],DS, {s:"Voi adesea aveţi lapte foarte bun."}, "QuestionAlt", {q: "Cine/ Ce are lapte foarte bun?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",8],DS, {s:"Oile de lângă ele adesea au lapte foarte bun."}, "QuestionAlt", {q: "Cine/ Ce are lapte foarte bun?", as: ["Oile","Ele"]}],
[["ATTRAGREEROMANIAN- subject3pl",8],DS, {s:"Ele adesea au lapte foarte bun."}, "QuestionAlt", {q: "Cine/ Ce are lapte foarte bun?", as: ["Ele","Ei"]}],

[["ATTRAGREEROMANIAN-nonsubject1pl",9],DS, {s:" Cuţitele de lângă noi uneori avem viruşi letali numeroşi." },"QuestionAlt", {q: "Cine/ Ce are viruşi letali numeroşi?", as: ["Cuţitele","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",9],DS, {s:"Noi uneori avem viruşi letali numeroşi."}, "QuestionAlt", {q: "Cine/ Ce are viruşi letali numeroşi?", as: ["Noi","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",9],DS, {s:" Cuţitele de lângă voi uneori aveţi viruşi letali numeroşi."}, "QuestionAlt", {q: "Cine/ Ce are viruşi letali numeroşi?", as: ["Cuţitele","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",9],DS, {s:"Voi uneori aveţi viruşi letali numeroşi."}, "QuestionAlt", {q: "Cine/ Ce are viruşi letali numeroşi?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",9],DS, {s:" Cuţitele de lângă ei uneori au viruşi letali numeroşi."}, "QuestionAlt", {q: "Cine/ Ce are viruşi letali numeroşi?", as: ["Cuţitele","Ei"]}],
[["ATTRAGREEROMANIAN- subject3pl",9],DS, {s:"Ei uneori au viruşi letali numeroşi."}, "QuestionAlt", {q: "Cine/ Ce are viruşi letali numeroşi?", as: ["Ei","Ele"]}],

[["ATTRAGREEROMANIAN-nonsubject1pl",10],DS, {s:"Tablourile de lângă noi uneori avem lapte foarte bun." },"QuestionAlt", {q: "Cine/ Ce are lapte foarte bun?", as: ["Tablourile","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",10],DS, {s:"Noi uneori avem lapte foarte bun."}, "QuestionAlt", {q: "Cine/ Ce are lapte foarte bun?", as: ["Noi","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",10],DS, {s:"Tablourile de lângă voi uneori aveţi  lapte foarte bun."}, "QuestionAlt", {q: "Cine/ Ce are lapte foarte bun?", as: ["Tablourile","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",10],DS, {s:"Voi uneori aveţi lapte foarte bun."}, "QuestionAlt", {q: "Cine/ Ce are lapte foarte bun?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",10],DS, {s:"Tablourile de lângă ele uneori au lapte foarte bun."}, "QuestionAlt", {q: "Cine/ Ce are lapte foarte bun?", as: ["Tablourile","Ele"]}],
[["ATTRAGREEROMANIAN- subject3pl",10],DS, {s:"Ele uneori aveţi lapte foarte bun."}, "QuestionAlt", {q: "Cine/ Ce are lapte foarte bun?", as: ["Ele","Ei"]}],

[["ATTRAGREEROMANIAN-nonsubject1pl",11],DS, {s:" Nisipurile de lângă noi adesea avem calciu organic granular." },"QuestionAlt", {q: "Cine/ Ce are calciu organic granular?", as: ["Nisipurile","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",11],DS, {s:"Noi adesea avem calciu organic granular."}, "QuestionAlt", {q: "Cine/ Ce are calciu organic granular?", as: ["Noi","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",11],DS, {s:" Nisipurile de lângă voi adesea aveţi calciu organic granular."}, "QuestionAlt", {q: "Cine/ Ce are calciu organic granular?", as: ["Nisipurile","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",11],DS, {s:"Voi adesea aveţi calciu organic granular."}, "QuestionAlt", {q: "Cine/ Ce are calciu organic granular?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",11],DS, {s:"Nisipurile de lângă ei adesea au calciu organic granular."}, "QuestionAlt", {q: "Cine/ Ce are calciu organic granular?", as: ["Nisipurile","Ei"]}],
[["ATTRAGREEROMANIAN- subject3pl",11],DS, {s:"Ei adesea au calciu organic granular."}, "QuestionAlt", {q: "Cine/ Ce are calciu organic granular?", as: ["Ei","Ele"]}],

[["ATTRAGREEROMANIAN-nonsubject1pl",12],DS, {s:"Piureurile de lângă noi mereu avem piper roşu măcinat." },"QuestionAlt", {q: "Cine/ Ce are piper roşu măcinat?", as: ["Piureurile","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",12],DS, {s: "Noi mereu avem piper roşu măcinat."}, "QuestionAlt", {q: "Cine/ Ce are piper roşu măcinat?", as: ["Noi","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",12],DS, {s:"Piureurile de lângă voi mereu aveţi  piper roşu măcinat."}, "QuestionAlt", {q: "Cine/ Ce are piper roşu măcinat?", as: ["Piureurile","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",12],DS, {s:"Voi mereu aveţi piper roşu măcinat."}, "QuestionAlt", {q: "Cine/ Ce are piper roşu măcinat?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",12],DS, {s:"Piureurile de lângă ele mereu au piper roşu măcinat."}, "QuestionAlt", {q: "Cine/ Ce are piper roşu măcinat?", as: ["Piureurile","Ele"]}],
[["ATTRAGREEROMANIAN- subject3pl",12],DS, {s:"Ele mereu au piper roşu măcinat."}, "QuestionAlt", {q: "Cine/ Ce are piper roşu măcinat?", as: ["Ele","Ei"]}],

[["ATTRAGREEROMANIAN-nonsubject1pl",13],DS, {s:"Sufletele de lângă noi mereu avem aripi de înger diafane." },"QuestionAlt", {q: "Cine/ Ce are aripi de înger diafane?", as: ["Sufletele","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",13],DS, {s:"Noi mereu avem aripi de înger diafane."}, "QuestionAlt", {q: "Cine/ Ce are aripi de înger diafane?", as: ["Noi","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",13],DS, {s:"Sufletele de lângă voi mereu aveţi aripi de înger diafane."}, "QuestionAlt", {q: "Cine/ Ce are aripi de înger diafane?", as: ["Sufletele","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",13],DS, {s:"Voi mereu aveţi aripi de înger diafane."}, "QuestionAlt", {q: "Cine/ Ce are aripi de înger diafane?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",13],DS, {s:" Sufletele de lângă ei mereu au aripi de înger diafane."}, "QuestionAlt", {q: "Cine/ Ce are aripi de înger diafane?", as: ["Sufletele","Ei"]}],
[["ATTRAGREEROMANIAN- subject3pl",13],DS, {s:"Ei mereu au aripi de înger diafane."}, "QuestionAlt", {q: "Cine/ Ce are aripi de înger diafane?", as: ["Sufletele","Ei"]}],

[["ATTRAGREEROMANIAN-nonsubject1pl",14],DS, {s:"Mamiferele de lângă noi uneori avem banane verzi necoapte." },"QuestionAlt", {q: "Cine/ Ce are banane verzi necoapte?", as: ["Mamiferele","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",14],DS, {s:"Noi uneori avem banane verzi necoapte."}, "QuestionAlt", {q: "Cine/ Ce are banane verzi necoapte?", as: ["Noi","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",14],DS, {s:"Mamiferele de lângă voi uneori aveţi  banane verzi necoapte."}, "QuestionAlt", {q: "Cine/ Ce are banane verzi necoapte?", as: ["Mamiferele","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",14],DS, {s:"Voi uneori aveţi banane verzi necoapte."}, "QuestionAlt", {q: "Cine/ Ce are banane verzi necoapte?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",14],DS, {s:"Mamiferele de lângă ele uneori au banane verzi necoapte."}, "QuestionAlt", {q: "Cine/ Ce are banane verzi necoapte?", as: ["Mamiferele","Ele"]}],
[["ATTRAGREEROMANIAN- subject3pl",14],DS, {s:"Ele uneori au banane verzi necoapte."}, "QuestionAlt", {q: "Cine/ Ce are banane verzi necoapte?", as: ["Ele","Ei"]}],

[["ATTRAGREEROMANIAN-nonsubject1pl",15],DS, {s:" Macrourile de lângă noi adesea avem icre rozalii pufoase." },"QuestionAlt", {q: "Cine/ Ce are icre rozalii pufoase?", as: ["Macrourile","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",15],DS, {s:" Noi adesea avem icre rozalii pufoase."}, "QuestionAlt", {q: "Cine/ Ce are icre rozalii pufoase?", as: ["Macrourile","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",15],DS, {s:" Macrourile de lângă voi adesea aveţi icre rozalii pufoase."}, "QuestionAlt", {q: "Cine/ Ce are icre rozalii pufoase?", as: ["Macrourile","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",15],DS, {s:"Voi adesea aveţi icre rozalii pufoase."}, "QuestionAlt", {q: "Cine/ Ce are icre rozalii pufoase?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",15],DS, {s:" Macrourile de lângă ei adesea au icre rozalii pufoase."}, "QuestionAlt", {q: "Cine/ Ce are icre rozalii pufoase?", as: ["Macrourile","Ei"]}],
[["ATTRAGREEROMANIAN- subject3pl",15],DS, {s:"Ei adesea au icre rozalii pufoase."}, "QuestionAlt", {q: "Cine/ Ce are icre rozalii pufoase?", as: ["Ei","Ele"]}],

[["ATTRAGREEROMANIAN-nonsubject1pl",16],DS, {s:"Animalele de lângă noi uneori avem un entuziasm contagios." },"QuestionAlt", {q: "Cine/ Ce are un entuziasm contagios?", as: ["Animalele","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",16],DS, {s:"Noi uneori avem un entuziasm contagios."}, "QuestionAlt", {q: "Cine/ Ce are un entuziasm contagios?", as: ["Noi","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",16],DS, {s:"Animalele de lângă voi uneori aveţi  un entuziasm contagios."}, "QuestionAlt", {q: "Cine/ Ce are un entuziasm contagios?", as: ["Animalele","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",16],DS, {s:"Voi uneori aveţi un entuziasm contagios."}, "QuestionAlt", {q: "Cine/ Ce are un entuziasm contagios?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",16],DS, {s:"Animalele de lângă ele uneori au un entuziasm contagios."}, "QuestionAlt", {q: "Cine/ Ce are un entuziasm contagios?", as: ["Animalele","Ele"]}],
[["ATTRAGREEROMANIAN- subject3pl",16],DS, {s:"Ele uneori au un entuziasm contagios."}, "QuestionAlt", {q: "Cine/ Ce are un entuziasm contagios?", as: ["Ele","Ei"]}],

[["ATTRAGREEROMANIAN-nonsubject1pl",17],DS, {s:" Câinii de lângă noi adesea avem o energie debordantă." },"QuestionAlt", {q: "Cine/ Ce are o energie debordantă?", as: ["Câinii ","Voi"]}],
[["ATTRAGREEROMANIAN- subject1pl",17],DS, {s:"Noi adesea avem o energie debordantă."}, "QuestionAlt", {q: "Cine/ Ce are o energie debordantă?", as: ["Noi","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",17],DS, {s:" Câinii de lângă voi adesea aveţi o energie debordantă."}, "QuestionAlt", {q: "Cine/ Ce are o energie debordantă?", as: ["Câinii ","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",17],DS, {s:"Voi adesea aveţi o energie debordantă."}, "QuestionAlt", {q: "Cine/ Ce are o energie debordantă?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",17],DS, {s:"Câinii de lângă ei adesea au o energie debordantă."}, "QuestionAlt", {q: "Cine/ Ce are o energie debordantă?", as: ["Câinii ","Ei"]}],
[["ATTRAGREEROMANIAN- subject3pl",17],DS, {s: "Ei adesea aveţi o energie debordantă."}, "QuestionAlt", {q: "Cine/ Ce are o energie debordantă?", as: ["Ei","Ele"]}],

[["ATTRAGREEROMANIAN-nonsubject1pl",18],DS, {s:"Doctorii de lângă noi uneori avem multă răbdare de fier." },"QuestionAlt", {q: "Cine/ Ce are multă răbdare de fier?", as: ["Doctorii","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",18],DS, {s:"Noi uneori avem multă răbdare de fier."}, "QuestionAlt", {q: "Cine/ Ce are multă răbdare de fier?", as: ["Noi","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",18],DS, {s:"Doctorii de lângă voi uneori aveţi  multă răbdare de fier."}, "QuestionAlt", {q: "Cine/ Ce are multă răbdare de fier?", as: ["Doctorii","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",18],DS, {s:"Voi ele uneori aveţi multă răbdare de fier."}, "QuestionAlt", {q: "Cine/ Ce are multă răbdare de fier?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",18],DS, {s:"Doctorii de lângă ele uneori au multă răbdare de fier."}, "QuestionAlt", {q: "Cine/ Ce are multă răbdare de fier?", as: ["Doctorii","Ele"]}],
[["ATTRAGREEROMANIAN- subject3pl",18],DS, {s:"Ele uneori au multă răbdare de fier."}, "QuestionAlt", {q: "Cine/ Ce are multă răbdare de fier?", as: ["Ele","Ei"]}],
[["ATTRAGREEROMANIAN-nonsubject1pl",19],DS, {s:"Preoţii de lângă noi mereu avem multă înţelepciune bătrânească." },"QuestionAlt", {q: "Cine/ Ce are multă înţelepciune bătrânească?", as: ["Preoţii","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",19],DS, {s:"Noi mereu avem multă înţelepciune bătrânească."}, "QuestionAlt", {q: "Cine/ Ce are multă înţelepciune bătrânească?", as: ["Noi","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",19],DS, {s:"Preoţii de lângă voi mereu aveţi  multă înţelepciune bătrânească."}, "QuestionAlt", {q: "Cine/ Ce are multă înţelepciune bătrânească?", as: ["Preoţii","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",19],DS, {s:"Voi mereu aveţi multă înţelepciune bătrânească."}, "QuestionAlt", {q: "Cine/ Ce are multă înţelepciune bătrânească?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",19],DS, {s:"Preoţii de lângă ei mereu au multă înţelepciune bătrânească."}, "QuestionAlt", {q: "Cine/ Ce are multă înţelepciune bătrânească?", as: ["Preoţii","Ei"]}],
[["ATTRAGREEROMANIAN- subject3pl",19],DS, {s:"Ei mereu au multă înţelepciune bătrânească."}, "QuestionAlt", {q: "Cine/ Ce are multă înţelepciune bătrânească?", as: ["Ei","Ele"]}],

[["ATTRAGREEROMANIAN-nonsubject1pl",20],DS, {s:"Profesorii de lângă noi uneori avem numeroase realizări mari." },"QuestionAlt", {q: "Cine/ Ce are numeroase realizări mari?", as: ["Profesorii ","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",20],DS, {s:"Noi uneori avem numeroase realizări mari."}, "QuestionAlt", {q: "Cine/ Ce are numeroase realizări mari?", as: ["Noi ","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",20],DS, {s:"Profesorii de lângă voi uneori aveţi numeroase realizări mari."}, "QuestionAlt", {q: "Cine/ Ce are numeroase realizări mari?", as: ["Profesorii ","Noi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",20],DS, {s:"Voi uneori aveţi numeroase realizări mari."}, "QuestionAlt", {q: "Cine/ Ce are numeroase realizări mari?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",20],DS, {s:"Profesorii de lângă ele uneori au numeroase realizări mari."}, "QuestionAlt", {q: "Cine/ Ce are numeroase realizări mari?", as: ["Profesorii ","Ele"]}],
[["ATTRAGREEROMANIAN- subject3pl",20],DS, {s:"Ele uneori au numeroase realizări mari."}, "QuestionAlt", {q: "Cine/ Ce are numeroase realizări mari?", as: ["Ele","Ei"]}],

[["ATTRAGREEROMANIAN-nonsubject1pl",21],DS, {s:"Cârnaţii de lângă noi mereu are sare grunjoasă multă." },"QuestionAlt", {q: "Cine/ Ce are sare grunjoasă multă?", as: ["Cârnaţii","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",21],DS, {s:"Noi mereu avem sare grunjoasă multă."}, "QuestionAlt", {q: "Cine/ Ce are sare grunjoasă multă?", as: ["Noi","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",21],DS, {s:"Cârnaţii de lângă voi mereu aveţi sare grunjoasă multă."}, "QuestionAlt", {q: "Cine/ Ce are sare grunjoasă multă?", as: ["Cârnaţii","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",21],DS, {s:"Voi mereu aveţi sare grunjoasă multă."}, "QuestionAlt", {q: "Cine/ Ce are sare grunjoasă multă?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",21],DS, {s:"Cârnaţii de lângă ei mereu au sare grunjoasă multă."}, "QuestionAlt", {q: "Cine/ Ce are sare grunjoasă multă?", as: ["Cârnaţii","Ei"]}],
[["ATTRAGREEROMANIAN- subject3pl",21],DS, {s:"Ei mereu au sare grunjoasă multă."}, "QuestionAlt", {q: "Cine/ Ce are sare grunjoasă multă?", as: ["Ei","Ele"]}],

[["ATTRAGREEROMANIAN-nonsubject1pl",22],DS, {s:"Buştenii  de lângă noi mereu are rezistenţă de invidiat." },"QuestionAlt", {q: "Cine/ Ce are rezistenţă de invidiat?", as: ["Buştenii ","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",22],DS, {s:"Noi mereu avem rezistenţă de invidiat."}, "QuestionAlt", {q: "Cine/ Ce are rezistenţă de invidiat?", as: ["Noi","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",22],DS, {s:"Buştenii  de lângă voi mereu aveţi rezistenţă de invidiat."}, "QuestionAlt", {q: "Cine/ Ce are rezistenţă de invidiat?", as: ["Buştenii  ","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",22],DS, {s:"Voi mereu aveţi rezistenţă de invidiat."}, "QuestionAlt", {q: "Cine/ Ce are rezistenţă de invidiat?", as: ["Voi ","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",22],DS, {s:"Buştenii  de lângă ele mereu au rezistenţă de invidiat."}, "QuestionAlt", {q: "Cine/ Ce are rezistenţă de invidiat?", as: ["Buştenii  ","Ele"]}],
[["ATTRAGREEROMANIAN- subject3pl",22],DS, {s: "Ele mereu au rezistenţă de invidiat."}, "QuestionAlt", {q: "Cine/ Ce are rezistenţă de invidiat?", as: ["Ele","Ei"]}],

[["ATTRAGREEROMANIAN-nonsubject1pl",23],DS, {s:"Nasturii de lângă noi adesea avem aţă albastră groasă." },"QuestionAlt", {q: "Cine/ Ce are aţă albastră groasă?", as: ["Nasturii","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",23],DS, {s:"Noi adesea avem aţă albastră groasă."}, "QuestionAlt", {q: "Cine/ Ce are aţă albastră groasă?", as: ["Noi","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",23],DS, {s:"Nasturii de lângă voi adesea aveţi aţă albastră groasă."}, "QuestionAlt", {q: "Cine/ Ce are aţă albastră groasă?", as: ["Nasturii","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",23],DS, {s:"Voi adesea aveţi aţă albastră groasă."}, "QuestionAlt", {q: "Cine/ Ce are aţă albastră groasă?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",23],DS, {s:"Nasturii de lângă ei adesea au aţă albastră groasă."}, "QuestionAlt", {q: "Cine/ Ce are aţă albastră groasă?", as: ["Nasturii","Ei"]}],
[["ATTRAGREEROMANIAN- subject3pl",23],DS, {s:"Ei adesea au aţă albastră groasă."}, "QuestionAlt", {q: "Cine/ Ce are aţă albastră groasă?", as: ["Ei","Ele"]}],
[["ATTRAGREEROMANIAN-nonsubject1pl",24],DS, {s:"Sacii  de lângă noi adesea avem multe bancnote verzi." },"QuestionAlt", {q: "Cine/ Ce are multe bancnote verzi?", as: ["Sacii ","Noi"]}],
[["ATTRAGREEROMANIAN- subject1pl",24],DS, {s:"Noi adesea avem multe bancnote verzi."}, "QuestionAlt", {q: "Cine/ Ce are multe bancnote verzi?", as: ["Noi","Voi"]}],
[["ATTRAGREEROMANIAN- nonsubject2pl",24],DS, {s:"Sacii de lângă voi adesea aveţi multe bancnote verzi."}, "QuestionAlt", {q: "Cine/ Ce are multe bancnote verzi?", as: ["Sacii ","Voi"]}],
[["ATTRAGREEROMANIAN-subject2pl ",24],DS, {s:"Voi adesea aveţi multe bancnote verzi."}, "QuestionAlt", {q: "Cine/ Ce are multe bancnote verzi?", as: ["Voi","Noi"]}],
[["ATTRAGREEROMANIAN- nonsubject3pl",24],DS, {s:"Sacii  de lângă ele adesea au multe bancnote verzi."}, "QuestionAlt", {q: "Cine/ Ce are multe bancnote verzi?", as: ["Sacii  ","Ele"]}],
[["ATTRAGREEROMANIAN- subject3pl",24],DS, {s:"Ele adesea au multe bancnote verzi."}, "QuestionAlt", {q: "Cine/ Ce are multe bancnote verzi?", as: ["Ele","Ei"]}],





[["filler-twonounspluralcorrectchoice",25],DS, {s:"Fata pe care noi o iubim este frumoasă."}, "QuestionAlt", {q: "Cine iubeşte?", as: ["Noi", "Fata"]}],
[["filler-twonounspluralcorrectchoice",26],DS, {s:"Cartea pe care noi o citim este interesantă. "}],
[["filler-twonounspluralcorrectchoice",27],DS, {s:"Pinguinul pe care noi îl privim este Apolodor."}],
[["filler-twonounspluralcorrectchoice",28],DS, {s:"Pisica pe care noi o lovim este birmaneză. "}],
[["filler-twonounspluralcorrectchoice",29],DS, {s:"Veveriţa pe care voi o prindeţi este maro. "}],
[["filler-twonounspluralcorrectchoice",30],DS, {s:"Lumina pe care voi o vedeţi este verde. "}],
[["filler-twonounspluralcorrectchoice",31],DS, {s:"Casa pe care voi o construiţi este imensă."}],
[["filler-twonounspluralcorrectchoice",32],DS, {s:"Mingea pe care voi o alegeţi este mare. "}],
[["filler-twonounspluralcorrectchoice",33],DS, {s:"Vinul pe care ei îl beau este roşu."}],
[["filler-twonounspluralcorrectchoice",34],DS, {s:"Câinele pe care ei îl hrănesc este bolnav."},"QuestionAlt", {q: "Cine hrăneşte?", as: ["Ei", "Câinele"]}],
[["filler-twonounspluralcorrectchoice",35], DS, {s:"Poemul pe care ele îl spun este emoţionant."}],
[["filler-twonounspluralcorrectchoice",36],DS, {s:"Omul pe care ele îl îndrăgesc este blând. "}],
 [["filler-twonounssingularcorrectchoice",37],DS, {s:"Vinurile pe care eu le iubesc sunt seci."}],
[["filler-twonounssingularcorrectchoice",38],DS, {s:"Scrisorile pe care eu le citesc sunt lungi."}],
[["filler-twonounssingularcorrectchoice",39],DS, {s:"Girafele pe care eu le privesc sunt înalte."},"QuestionAlt", {q: "Cine priveşte?", as: ["Eu", "Girafele"]}],
[["filler-twonounssingularcorrectchoice",40],DS, {s:"Motanii pe care eu îi adăpostesc sunt tigraţi."}],
[["filler-twonounssingularcorrectchoice",41],DS, {s:"Şerpii pe care tu îi striveşti sunt veninoşi."}],
[["filler-twonounssingularcorrectchoice",42],DS, {s:"Stelele pe care tu le urmăreşti sunt strălucitoare."}],
[["filler-twonounssingularcorrectchoice",43],DS, {s:"Barurile pe care tu le construieşti sunt artistice."}],
[["filler-twonounssingularcorrectchoice",44],DS, {s:"Păsările pe care tu le vezi sunt impresionante."},"QuestionAlt", {q: "Cine vede?", as: ["Tu", "Păsările"]}],
[["filler-twonounssingularcorrectchoice",45],DS, {s:"Sucurile pe care el le bea sunt dulci."}],
[["filler-twonounssingularcorrectchoice",46],DS, {s:"Pisicile pe care el le îngrijeşte sunt slabe."}],
[["filler-twonounssingularcorrectchoice",47],DS, {s:"Cuvintele pe care ea le rosteşte sunt înţelepte."}],
[["filler-twonounssingularcorrectchoice",48],DS, {s:"Câinii pe care ea îi urăşte sunt răi."}]
,

 [["filler-coordination",49],DS, {s:"Copilul şi noi bem mult suc."}],
[["filler-coordination",50],DS, {s:"Bolnavul şi noi plângem mult din cauza bolii."},"QuestionAlt", {q: "Cine plânge?", as: ["Doctorul şi noi","Noi"]}],
[["filler-coordination",51],DS, {s:"Vulpea şi noi sǎrim în aer foarte rapid."}],
[["filler-coordination",52],DS, {s:"Puiul şi noi ciugulim firimituri adesea."}],
[["filler-coordination",53],DS, {s:"Fata şi voi cǎdeţi de pe pat uneori."},"QuestionAlt", {q: "Cine cade de pe pat?", as: ["Fata şi voi","Voi"]}],
[["filler-coordination",54],DS, {s:"Asasinul şi voi ucideţi iubirea adesea."}],
[["filler-coordination",55],DS, {s:"Mama şi voi susţineţi moralul fetei întotdeauna."}],
[["filler-coordination",56],DS, {s:"Pisica şi voi dormiţi după cină adesea."}],
 [["filler-coordination",57],DS, {s:"Doamna şi ei au multe flori."}],
[["filler-coordination",58],DS, {s:"Profesoara şi ei miros foarte frumos."}],
[["filler-coordination",59],DS, {s:"Domnul şi ele sunt la mare mereu."}],
[["filler-coordination",60],DS, {s:"Papagalul şi ele vorbesc foarte mult."}],

[["filler-semanticchoice",61],DS, {s:"Lampa de lângă cartea verde se aprinde uşor."}],
[["filler-semanticchoice",62],DS, {s:"Fetiţa de lângă camera albastră dansează."}],
[["filler-semanticchoice",63],DS, {s:"Iepuraşul de lângă scaunul roşu doarme."}],
[["filler-semanticchoice",64],DS, {s:"Pasărea de lângă masa neagră cântă bine."}],
[["filler-semanticchoice",65],DS, {s:"Măgarul de lângă căţelul maro rage adesea. "},"QuestionAlt", {q: "Cine rage adesea?", as: ["Măgarul","Căţelul"]}],
[["filler-semanticchoice",66],DS, {s:"Papucii de lângă copiii bolnavi alunecă uşor."}],
[["filler-semanticchoice",67],DS, {s:"Hainele de lângă femeile zâmbăreţe cad mereu."}],
[["filler-semanticchoice",68],DS, {s:"Albinele de lângă portocalele stricate bȃzȃie prea tare."}],
[["filler-semanticchoice",69],DS, {s:"Râul de lângă pădurea frumoasă curge adesea vara."}],
[["filler-semanticchoice",70],DS, {s:"Urşii de lângă prinţesele minunate hibernează."},"QuestionAlt", {q: "Cine hibernează?", as: ["Ursul","Prinţesele"]}],
[["filler-semanticchoice",71],DS, {s:"Florile de lângă sticlele albastre se ofilesc mereu."}],
[["filler-semanticchoice",72],DS, {s:"Calculatoarele de lângă copiii năzdrăvani se strică uneori."}],

[["filler-onenounplagreement",73], DS, {s:"Iepuraşii fricoşi se ascund de oameni adesea."}, "QuestionAlt", {q: "Cine se ascunde de oameni adesea?", as: ["Iepuraşii fricoşi","Leii fricoşi"]}],
[["filler-onenounplagreement",74], DS, {s:"Cutremurele mari distrug locuinţe tot timpul."}, "QuestionAlt", {q: "Ce distrug cutremurele mari tot timpul?", as: ["Locuinţe","Grădini"]}],
[["filler-onenounplagreement",75], DS, {s:"Grădinile japoneze au trandafiri adesea."}],
[["filler-onenounplagreement",76], DS, {s:"Fetele seducătoare atrag admiratori adesea."},"QuestionAlt", {q: "Cine atrage admiratori adesea?", as: ["Fetele seducătoare ","Femeile seducătoare "]}],
[["filler-onenounplagreement",77], DS, {s:"Muzicienii creativi compun melodii deosebite."}],
[["filler-onenounplagreement",78], DS, {s:"Rănile sufleteşti dor foarte tare."}],
[["filler-onenounplagreement",79], DS, {s:"Paharele colorate conţin suc de portocale."}],
[["filler-onenounplagreement",80], DS, {s:"Hamsterii curioşi apar în bucătărie adesea."}],
[["filler-onenounplagreement",81], DS, {s:"Elevii cuminţi doresc note mari."}],
[["filler-onenounplagreement",82], DS, {s:"Parfumurile franţuzeşti miros incredibil de frumos."}],
[["filler-onenounplagreement",83], DS, {s:"Bunicii iubitori dau multe cadouri nepoţilor lor."}],
[["filler-onenounplagreement",84], DS, {s:"Cheile verzi deschid multe uşi."},"QuestionAlt", {q: "Ce deschid cheile verzi?", as: ["Multe uşi","Multe cufere"]}],

[["filler-onenounsgagreement",85],DS, {s:"Fata şatenă se ascunde de prieteni adesea."}],
[["filler-onenounsgagreement",86],DS, {s:"Pisica năzdrăvană sparge vase tot timpul."},"QuestionAlt", {q: "Cine sparge vase tot timpul?", as: ["Pisica năzdrăvană","Pisica simpatică"]}],
[["filler-onenounsgagreement",87],DS, {s:"Caietul negru are pagini albe."}],
[["filler-onenounsgagreement",88],DS, {s:"Magnetul maro atrage metale adesea."}],
[["filler-onenounsgagreement",89],DS, {s:"Pixul albastru scrie foarte bine."}],
[["filler-onenounsgagreement",90],DS, {s:"Iepurele alb sare cu mare agilitate."}],
[["filler-onenounsgagreement",91],DS, {s:"Studentul harnic munceşte foarte mult."}],
[["filler-onenounsgagreement",92],DS, {s:"Femeia misterioasă dispare în străinătate adesea."}],
[["filler-onenounsgagreement",93],DS, {s:"Poetul talentat vorbeşte foarte frumos."}],
[["filler-onenounsgagreement",94],DS, {s:"Mâncarea gustoasă miroase foarte bine."},"QuestionAlt", {q: "Ce miroase foarte bine?", as: ["Mâncarea gustoasă","Zambila roz"]}],
[["filler-onenounsgagreement",95],DS, {s:"Cursul masteral cuprinde multe informaţii."}],
[["filler-onenounsgagreement",96],DS, {s:"Bagajul mare conţine haine de iarnă."}]
];





