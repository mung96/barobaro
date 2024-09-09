export default function SearchPage(context: any) {
  const searchData = context.searchParams.query;
  return (
    <h1>{searchData}</h1>
  );
}
