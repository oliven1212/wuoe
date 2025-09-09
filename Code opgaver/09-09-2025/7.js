let text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem`;
text = text.replaceAll("."," ").replaceAll("'s"," ").replaceAll(","," ").replaceAll("  "," ");
console.log(text);



/* Set opgaver

1. Unique Words in a Text: Create a Set that contains the unique words in a given text string. 
Remove punctuation and separate the words by spaces to obtain a set of unique words.

2. Favorite Colors: Create a Set that contains users' favorite colors. Add at least three different colors to the set.

3. Music Playlist: Create a Set that contains the song titles of a user's music playlist. Add at least three song titles to the set.

4. Unique Ingredients in a Recipe: Create a Set that contains the unique ingredients in a recipe. Add at least three ingredients to the set.

5. Members in a Club: Create a Set that contains the names of the members in a club. Add at least two members to the set.  */