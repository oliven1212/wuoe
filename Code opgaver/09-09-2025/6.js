const itemPrices = new Map();

itemPrices.set(`stick`,95);
itemPrices.set(`rock`,10);
itemPrices.set(`boat`,295);


const user = new Map();
user.set(`height`,111);
user.set(`isHigh`,true);
user.set(`email`,`d@d.dk`);


const productCounts = new Map();
productCounts.set(`turtle`,98);
productCounts.set(`steve`,12);
productCounts.set(`haribo`,33);


for (let [key,value] of productCounts){
    console.log(`The value for ${key} is ${value}`);
}