

export default function SearchPage(context: any) {
    console.log(context.searchParams.query);
    const searchData = context.searchParams.query;
    return (
        <>
            <h1>{searchData}</h1>
        </>
    )
}