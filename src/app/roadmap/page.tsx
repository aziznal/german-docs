export default function RoadmapPage() {
  return (
    <div className="mx-auto flex h-screen w-[400px] flex-col justify-center overflow-y-auto">
      <h1 className="mb-2 text-lg font-bold">Roadmap</h1>

      <ul className="list-disc pl-6">
        <li>Feat: add ability to add internal links</li>

        <li>Feat: have fewer pages, it{`'`}s fine to merge things</li>
      </ul>
    </div>
  );
}
