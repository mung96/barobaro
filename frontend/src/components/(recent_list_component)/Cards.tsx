import Card from './Card';

export default function Cards() {
  return (
    <section className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex flex-row space-x-4 p-4 min-w-max">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        {/* 5 */}
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        {/* 10 */}
      </div>
    </section>
  );
}
