const TOOLS: [string, string][] = [
  ["unity", "Unity"],
  ["cplusplus", "C++"],
  ["python", "Python"],
  ["openjdk", "Java"],
  ["javascript", "JavaScript"],
  ["react", "React"],
  ["tailwindcss", "Tailwind"],
  ["express", "Express"],
  ["fastapi", "FastAPI"],
  ["postgresql", "PostgreSQL"],
  ["mysql", "MySQL"],
  ["pandas", "Pandas"],
  ["n8n", "n8n"],
  ["flutter", "Flutter"],
  ["espressif", "ESP32"],
  ["git", "Git"],
  ["github", "GitHub"],
  ["figma", "Figma"],
];

export default function Tools() {
  return (
    <section id="tools" className="tools-sec" aria-labelledby="tools-title">
      <div className="wrap">
        <h2 id="tools-title" className="disp sec-title rv">
          Tools
        </h2>
        <ul className="tools-grid rv" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {TOOLS.map(([file, name]) => (
            <li key={file} className="tool">
              <img src={`/icons/${file}.svg`} alt="" width={34} height={34} loading="lazy" />
              <span className="mono">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
