"use strict";
const greeting = "Hello TypeScript!";
console.log(greeting);
function add(a, b) {
    return a + b;
}
console.log(add(5, 3));
let Fornavn = 'Steve';
let Efternavn = 'Jensen';
let Alder = 58;
let Vægt = 75.9;
let Ryger = true;
let Blodtype = "A+";
let Allergier;
let systoliskeBlodtryk;
let diastoliskeBlodtryk;
let systoliskeAverage = 0;
systoliskeBlodtryk = [102, 162, 132];
systoliskeBlodtryk.forEach(element => {
    systoliskeAverage += element;
});
systoliskeAverage /= systoliskeBlodtryk.length;
let eksternData = 542;
let journalNummer = 0;
if (typeof (eksternData) === "number") {
    journalNummer = eksternData;
}
let fancyJournalNummer = 0;
fancyJournalNummer = 'KBH-4421';
console.log('fancyJournalNummer ' + typeof (fancyJournalNummer) + ' ' + fancyJournalNummer);
fancyJournalNummer = 10;
console.log('fancyJournalNummer ' + typeof (fancyJournalNummer) + ' ' + fancyJournalNummer);
let statuss = "indlagt";
let typePatientStatus1 = "indlagt";
let typePatientStatus2 = "udskrevet";
let typePatientStatus3 = "venteliste";
//let typePatientStatus4: PatientStatus = "hjemsendt";
let aktivPatient = statuss == "indlagt" ? true : false;
console.log("aktivPatient = " + aktivPatient);
console.log("__________________________________________________");
console.log("Patient: " + Fornavn + " " + Efternavn + ", " + Alder + " år");
console.log("Blodtype: " + Blodtype);
console.log("Ryger: ", Ryger ? "Ja" : "Nej");
console.log('Gennemsnitligt systolisk blodtryk: ' + systoliskeAverage);
console.log('Journalnummer: ' + fancyJournalNummer);
console.log('Status: ' + statuss);
