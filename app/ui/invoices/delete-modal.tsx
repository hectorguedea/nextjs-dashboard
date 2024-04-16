'use client';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import Error from '@/app/dashboard/invoices/error';

interface DeleteModalProps {
  deleteInvoice: () => Promise<{ message: string }>
}

export default function DeleteModal({ deleteInvoice }: DeleteModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const closeModal = () => {
    setIsOpen(false);
    setError(null);  // Limpiar el error al cerrar el modal
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleDelete = async () => {
    try {
       await deleteInvoice();
    } catch (error) {
      setError(error as Error); 
    }
  };

  return (
    <>
      <button onClick={openModal} className="rounded-md border p-2 hover:bg-gray-100">
        <TrashIcon className="w-4" />
      </button>

      <Dialog as="div" className="relative z-10" open={isOpen} onClose={closeModal}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
         
            <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
            {error ? (
                <Error error={error} reset={closeModal} />
              ) : (
                <>
                  <Dialog.Title className="font-bold">Confirm Deletion</Dialog.Title>
                  <Dialog.Description>
                    Are you sure you want to delete this invoice? This action cannot be undone.
                  </Dialog.Description>
                  <div className="mt-4 flex justify-end gap-3">
                    <button 
                      className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100" 
                      onClick={closeModal}>
                      Cancel
                    </button>
                    <button 
                      className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700" 
                      onClick={handleDelete}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </Dialog.Panel>

        </div>
      </Dialog>
    </>
  );
}