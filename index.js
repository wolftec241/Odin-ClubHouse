import main from '/src/app.js'

main().catch(err => {
  console.error("Failed to start server:", err);
});
