// export default function ProductDetailPage({ params }: { params: { id: string } }) {
//   return <div>ProductDetailPage {params.id}</div>;
// }  

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
    <div> Product Datail { id } </div>
    )
  }