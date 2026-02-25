const greeting: string = "Hello TypeScript!";
console.log(greeting);

function add(a: number, b: number): number {
    return a + b;
}

console.log(add(5, 3));

let Fornavn: string = 'Steve';
let Efternavn: string = 'Jensen';
let Alder: number = 58;
let Vægt: number = 75.9;
let Ryger: boolean = true;
let Blodtype: "A+" | "enum?" = "A+";
let Allergier: string[];

let systoliskeBlodtryk: number[];
let diastoliskeBlodtryk: number[];
let systoliskeAverage: number = 0;
systoliskeBlodtryk = [102,162,132];
systoliskeBlodtryk.forEach(element => {
    systoliskeAverage += element;
});
systoliskeAverage /= systoliskeBlodtryk.length;

let eksternData: unknown = 542;
let journalNummer: number = 0;
if(typeof(eksternData) === "number"){
    journalNummer = eksternData as number;
}

let fancyJournalNummer: string | number = 0;
fancyJournalNummer = 'KBH-4421';
console.log('fancyJournalNummer '+ typeof(fancyJournalNummer)+ ' ' + fancyJournalNummer);
fancyJournalNummer = 10;
console.log('fancyJournalNummer '+ typeof(fancyJournalNummer)+ ' ' + fancyJournalNummer);

let statuss: "indlagt" | "udskrevet" | "venteliste" = "indlagt";

type PatientStatus = "indlagt" | "udskrevet" | "venteliste";
let typePatientStatus1: PatientStatus = "indlagt";
let typePatientStatus2: PatientStatus = "udskrevet";
let typePatientStatus3: PatientStatus = "venteliste";
//let typePatientStatus4: PatientStatus = "hjemsendt";

let aktivPatient: boolean = statuss == "indlagt" ? true : false;
console.log("aktivPatient = " + aktivPatient);



console.log("__________________________________________________");
console.log("Patient: "+ Fornavn + " " + Efternavn + ", " + Alder +" år");
console.log("Blodtype: " + Blodtype);
console.log("Ryger: ", Ryger ? "Ja": "Nej");
console.log('Gennemsnitligt systolisk blodtryk: ' + systoliskeAverage);
console.log('Journalnummer: ' + fancyJournalNummer);
console.log('Status: ' + statuss);

console.log("Opgave2 __________________________________________________");
//Trin 1.
function celsiusTilFahrenheit (celsius: number) : number{
    return (celsius * 9/5) + 32;
};

console.log(celsiusTilFahrenheit(0));
console.log(celsiusTilFahrenheit(100));
console.log(celsiusTilFahrenheit(-40));

//Trin 2.
function beskrivVejr (celsius: number, vejrbeskrivelse: string): string {
    return `Det er ${celsius} grader og ${vejrbeskrivelse}`;
};
console.log(beskrivVejr(22, "solrigt")); // "Det er 22 grader og solrigt"
console.log(beskrivVejr(-3, "snestorm")); // "Det er -3 grader og snestorm"

function erVarmt(celsius: number):boolean{
    return celsius > 25;
};
console.log("26 grader er ",erVarmt(26) ? "Varmt":"koldt");

//Trin 3.
function formatérTemperatur (temperatur:number, enhed:string = "C"):string{
    return temperatur + enhed;
}
console.log(formatérTemperatur(22));
console.log(formatérTemperatur(72, "F"));

//Trin 4.
function logTemperatur(by:string, temperatur:number):void{
    console.log(by + ": " + formatérTemperatur(temperatur, "°C"));
}

//Trin 5.
console.log(logTemperatur("København",18));