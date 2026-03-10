fetch("http://localhost:7000/api/run", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    language: "java",
    code: 'public class Main { public static void main(String[] args) { System.out.println("Java execution works!"); } }',
  }),
})
  .then((res) => res.json())
  .then(console.log)
  .catch(console.error);
