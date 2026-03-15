'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import SuccessDialog from '@/app/components/ui/dialogs/SuccessDialog/SuccessDialog';
import DeleteConfirmDialog from '@/app/components/ui/dialogs/DeleteConfirmDialog/DeleteConfirmDialog';
import CustomerDetailHeader from '@/app/components/CustomerDetailHeader/CustomerDetailHeader';
import CustomerDetailCard from '@/app/components/CustomerDetailCard/CustomerDetailCard';
import CustomerAccountInfo from '@/app/components/CustomerAccountInfo/CustomerAccountInfo';
import CustomerCommunication from '@/app/components/CustomerCommunication/CustomerCommunication';
import { Customer } from '@/app/interfaces/customer.interface';
import { CustomerStatus } from '@/app/enums/status.enum';

interface EditFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: CustomerStatus;
  assignedUserId: string;
}

export default function CustomerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const customerId = typeof params.id === 'string' ? params.id : '';

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<EditFormData>({ 
    name: '', 
    email: '', 
    phone: '', 
    company: '', 
    status: CustomerStatus.ACTIVE,
    assignedUserId: '' 
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successTitle, setSuccessTitle] = useState('Success!');

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/${customerId}`, {
          credentials: 'include'
        });
        if (response.ok) {
          const found = await response.json();
          setCustomer(found);
          setEditForm({
            name: found.name,
            email: found.email,
            phone: found.phone || '',
            company: found.company || '',
            status: found.status || CustomerStatus.ACTIVE,
            assignedUserId: found.assignedUserId || ''
          });
        } else if (response.status === 404) {
          setCustomer(null);
        }
      } catch (error) {
        console.error('Error fetching customer:', error);
        setCustomer(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (customerId) {
      fetchCustomer();
    }
  }, [customerId]);

  const handleSaveEdit = async () => {
    if (editForm.name.trim() && editForm.email.trim()) {
      setCustomer({ 
        ...customer!, 
        ...editForm 
      });
      setSuccessTitle('Customer updated!');
      setSuccessMessage('Customer information has been successfully updated.');
      setIsSuccessDialogOpen(true);
      setIsEditing(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleDeleteCustomer = async () => {
    setShowDeleteConfirm(false);
    setSuccessTitle('Customer deleted!');
    setSuccessMessage('Customer has been successfully deleted.');
    setIsSuccessDialogOpen(true);
    setTimeout(() => router.push('/customers'), 1500);
  };

  const handleEditChange = (field: keyof EditFormData, value: string | CustomerStatus) => {
    setEditForm({ ...editForm, [field]: value });
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-900/30 border-green-700/50 text-green-400';
      case 'inactive':
        return 'bg-red-900/30 border-red-700/50 text-red-400';
      case 'pending':
        return 'bg-yellow-900/30 border-yellow-700/50 text-yellow-400';
      default:
        return 'bg-gray-900/30 border-gray-700/50 text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
        <p className="text-white mt-4">Loading customer details...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-4">
        <div className="bg-red-900/30 rounded-full p-4 border border-red-700/50">
          <svg className="w-12 h-12 text-red-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white">Customer Not Found</h1>
        <p className="text-gray-400">The customer you&apos;re looking for doesn&apos;t exist.</p>
        <button 
          onClick={() => router.push('/customers')}
          className="mt-4 px-6 py-2 bg-orange-700 hover:bg-orange-800 text-white rounded-lg font-semibold transition-colors">
          Back to Customers
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <CustomerDetailHeader 
        title="Customer Details"
        subtitle="View and manage customer information"
      />

      <div className="flex-1 overflow-y-auto scrollbar-dark">
        <section className="flex flex-col justify-start items-center gap-4 px-6 py-4">
          <div className="w-full max-w-4xl">
            <CustomerDetailCard
              customer={customer}
              isEditing={isEditing}
              editForm={editForm}
              onEditChange={handleEditChange}
              onSave={handleSaveEdit}
              onCancel={() => {
                setIsEditing(false);
                setEditForm({
                  name: customer.name,
                  email: customer.email,
                  phone: customer.phone || '',
                  company: customer.company || '',
                  status: customer.status || CustomerStatus.ACTIVE,
                  assignedUserId: customer.assignedUserId || ''
                });
              }}
              onEditToggle={setIsEditing}
              onDelete={() => setShowDeleteConfirm(true)}
              getStatusColor={getStatusColor}
            />

            {/* Additional Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <CustomerAccountInfo customer={customer} />
              <CustomerCommunication />
            </div>
          </div>
        </section>
      </div>

      {/* Dialogs */}
      <DeleteConfirmDialog 
        isOpen={showDeleteConfirm}
        userName={customer.name}
        onConfirm={handleDeleteCustomer}
        onClose={() => setShowDeleteConfirm(false)}
      />

      <SuccessDialog 
        isOpen={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
        title={successTitle}
        message={successMessage}
        detailLabel="Customer"
        detailValue={customer.name}
        buttonText="Done"
      />
    </div>
  );
}
