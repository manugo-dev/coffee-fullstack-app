import { Card } from '@/components/Card';
import { fetchItems } from '@/services/fetchItems';

export default async function Home() {
  const items = await fetchItems();

  return (
    <main className='mx-10 mt-12 px-10'>
      <h1 className='text-3xl mb-10'>You&apos;ve got this! 🚀</h1>
      {items.map(({ id, title, description }) => (
        <Card key={id} title={title} description={description} />
      ))}
    </main>
  );
}
