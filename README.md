# node-text-analyzer-api
<p>An API to analyze text.</p>
<p>Send a post request with data in the format: '{"text":"some text"}'<br>
The analyzer will count the length of the text with and without spaces, number of words, and the frequency of each English alphabet character in alphabetical order.</p>
For the example request above, the response would be:<br>
<pre><code>{
  "textLength":{"withSpaces":9,"withoutSpaces":8},
  "wordCount":2,
  "characterCount":[{"e":2},{"m":1},{"o":1},{"s":1},{"t":2},{"x":1}]}
}</code></pre>
