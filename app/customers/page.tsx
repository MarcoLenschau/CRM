import { Customer } from '@/app/interfaces/customer.interface';
import PageHeader from '../components/ui/PageHeader/PageHeader';
import CustomersContent from './CustomersContent';

async function fetchCustomers(): Promise<Customer[]> {
  try {
    const response = await fetch(`${process.env.API_URL}/customer`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      console.error('Failed to fetch customers');
      return [];
    }
    
    const data = await response.json();
    return data.customers || [];
  } catch (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
}

export default async function CustomersPage() {
  const customers = await fetchCustomers();

  return (
    <div className="text-white">
      <PageHeader 
        h1="Customer Management" 
        h2="Manage and track all customer interactions and details" 
        color="#884000" 
        img="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      />

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <section className="max-w-7xl mx-auto">
          <CustomersContent initialCustomers={customers} />
        </section>
      </div>
    </div>
  );
}
