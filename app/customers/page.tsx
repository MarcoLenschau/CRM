import { Customer } from '@/app/interfaces/customer.interface';
import PageHeader from '../components/ui/PageHeader/PageHeader';
import CustomersContent from './CustomersContent';
import { fetchWithAuth } from '@/app/utils/api';

/**
 * Fetches all customer records from the API.
 * Handles errors gracefully and returns empty array on failure.
 *
 * @return Array of Customer objects with full details
 * @category Customer Management
 * @security Requires valid authentication token via fetchWithAuth
 * @performance Async server-side API call with error handling
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
async function fetchCustomers(): Promise<Customer[]> {
  try {
    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/customer`);
    
    if (!response.ok) {
      // failed to fetch customers
      return [];
    }
    
    const data = await response.json();
    return data.customers || [];
  } catch {
    return [];
  }
}

/**
 * Renders customers page with header and customer management content.
 * Fetches customers server-side and displays them with CRUD capabilities.
 *
 * @return Page component with customer list and management UI
 * @category Customer Management
 * @security Server-side rendering protects API URLs and tokens
 * @performance Server-side rendering with async data fetching and caching
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
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
