'use client';

import { useState } from 'react';
import { Customer } from '@/app/interfaces/customer.interface';
import { CustomerStatus } from '@/app/enums/status.enum';
import Link from 'next/link';
import DeleteConfirmDialog from '@/app/components/ui/dialogs/DeleteConfirmDialog/DeleteConfirmDialog';
import SuccessDialog from '@/app/components/ui/dialogs/SuccessDialog/SuccessDialog';
import QuickTip from '@/app/components/ui/QuickTip/QuickTip';
import SearchBar from '@/app/components/ui/SearchBar/SearchBar';
import Table from '@/app/components/ui/Table/Table';
import StatCard from '@/app/components/ui/StatCard/StatCard';

// Status Badge Component
function StatusBadge({ status }: { status: CustomerStatus }) {
  const colors: Record<CustomerStatus, string> = {
    [CustomerStatus.ACTIVE]: 'bg-green-900/30 border-green-700/50 text-green-300',
    [CustomerStatus.INACTIVE]: 'bg-red-900/30 border-red-700/50 text-red-300',
    [CustomerStatus.PENDING]: 'bg-yellow-900/30 border-yellow-700/50 text-yellow-300',
  };
  
  const icons: Record<CustomerStatus, string> = {
    [CustomerStatus.ACTIVE]: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z',
    [CustomerStatus.INACTIVE]: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z',
    [CustomerStatus.PENDING]: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z',
  };

  const getLabel = (stat: CustomerStatus) => {
    switch (stat) {
      case CustomerStatus.ACTIVE:
        return 'Active';
      case CustomerStatus.INACTIVE:
        return 'Inactive';
      case CustomerStatus.PENDING:
        return 'Pending';
      default:
        return 'Active';
    }
  };

  return (
    <span className={`inline-flex items-center gap-1 border ${colors[status]} px-3 py-1 rounded-full text-xs font-semibold`}>
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d={icons[status]} />
      </svg>
      {getLabel(status)}
    </span>
  );
}

// Table Actions Component
function TableActions({ customerId, customerName, onDelete }: { customerId: string; customerName: string; onDelete: (id: string, name: string) => void }) {
  return (
    <div className="flex gap-2 justify-center">
      <Link href={`/customers/${customerId}`}>
        <button className="bg-blue-900/40 hover:bg-blue-800/60 text-blue-300 hover:text-blue-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 border border-blue-700/50 hover:border-blue-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
          View
        </button>
      </Link>
      <button
        onClick={() => onDelete(customerId, customerName)}
        className="bg-red-900/40 hover:bg-red-800/60 text-red-300 hover:text-red-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 border border-red-700/50 hover:border-red-600"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z"/>
        </svg>
        Delete
      </button>
    </div>
  );
}

// Main Component
export default function CustomersContent({ initialCustomers }: { initialCustomers: Customer[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | CustomerStatus>('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteCustomerId, setDeleteCustomerId] = useState<string | null>(null);
  const [deleteCustomerName, setDeleteCustomerName] = useState('');
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [successTitle, setSuccessTitle] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [successDetail, setSuccessDetail] = useState('');

  // Calculate stats
  const totalCustomers = initialCustomers.length;
  const activeCount = initialCustomers.filter((c: Customer) => c.status === CustomerStatus.ACTIVE).length;
  const pendingCount = initialCustomers.filter((c: Customer) => c.status === CustomerStatus.PENDING).length;
  const inactiveCount = initialCustomers.filter((c: Customer) => c.status === CustomerStatus.INACTIVE).length;

  // Filter customers
  const filteredCustomers = initialCustomers.filter((customer: Customer) => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.company?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Handle delete
  const handleDelete = (id: string, name: string) => {
    setDeleteCustomerId(id);
    setDeleteCustomerName(name);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (deleteCustomerId !== null) {
      setSuccessTitle('Customer Deleted');
      setSuccessMessage('The customer has been successfully deleted from the system.');
      setSuccessDetail(deleteCustomerName);
      setIsSuccessDialogOpen(true);
      setShowDeleteConfirm(false);
      setDeleteCustomerId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Customers" value={totalCustomers} color="blue"
          icon={
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          }
        />
        <StatCard label="Active" value={activeCount} color="green"
          icon={
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          }
        />
        <StatCard label="Pending" value={pendingCount} color="orange" 
          icon={
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z"/>
            </svg>
          }
        />
        <StatCard label="Inactive" value={inactiveCount} color="red"
          icon={
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
            </svg>
          }
        />
      </div>

      {/* Search and Filter Controls */}
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Search customers by name, email, or company..." focusColor="orange"
      >
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'all' | CustomerStatus)}
          className="bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2.5 text-white min-w-max"
        >
          <option value="all">All Status</option>
          <option value={CustomerStatus.ACTIVE}>Active</option>
          <option value={CustomerStatus.PENDING}>Pending</option>
          <option value={CustomerStatus.INACTIVE}>Inactive</option>
        </select>
      </SearchBar>

      {/* Main Content Area with Sidebar */}
      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Table Section */}
        <div className="flex-1">
          <Table<Customer>
            columns={[
              {
                key: 'id',
                label: 'ID',
                align: 'left',
                render: (_, row) => (
                  <Link href={`/customers/${row.id}`}>
                    <span className="text-blue-400 hover:text-blue-300 cursor-pointer font-semibold underline transition-colors">
                      {row.id}
                    </span>
                  </Link>
                ),
              },
              "company",
              "email",
              {
                key: 'status',
                label: 'Status',
                align: 'left',
                render: (_, row) => (
                  <StatusBadge status={row.status} />
                ),
              },
              {
                key: 'id',
                label: 'Actions',
                align: 'center',
                render: (_, row) => (
                  <TableActions 
                    customerId={String(row.id)}
                    customerName={row.name}
                    onDelete={handleDelete}
                  />
                ),
              },
            ]}
            data={filteredCustomers}
            emptyMessage="No customers found"
            emptyDescription={
              searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'No customers to display'
            }
          />
        </div>

        {/* Quick Tip Sidebar */}
        <div className="w-full lg:w-80">
          <QuickTip 
            text="Click on a customer name to view detailed information. Use the search and filter options to find customers quickly. The status indicators help you identify active, pending, and inactive accounts at a glance." 
            width="w-full" 
          />
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={showDeleteConfirm}
        userName={deleteCustomerName}
        onConfirm={handleConfirmDelete}
        onClose={() => {
          setShowDeleteConfirm(false);
          setDeleteCustomerId(null);
          setDeleteCustomerName('');
        }}
      />

      {/* Success Dialog */}
      <SuccessDialog 
        isOpen={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
        title={successTitle}
        message={successMessage}
        detailLabel="Customer"
        detailValue={successDetail}
        buttonText="Done"
      />
    </div>
  );
}
