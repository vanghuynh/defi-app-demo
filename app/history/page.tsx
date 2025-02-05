'use client';

import { useState } from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const transactions = [
  {
    username: 'Alice',
    type: 'Stake',
    token: 'ETH',
    amount: 2.5,
    date: '2025-02-05',
  },
  {
    username: 'Bob',
    type: 'Borrow',
    token: 'USDC',
    amount: 500,
    date: '2025-02-04',
  },
  {
    username: 'Charlie',
    type: 'Lend',
    token: 'DAI',
    amount: 1000,
    date: '2025-02-03',
  },
  {
    username: 'Alice',
    type: 'Borrow',
    token: 'DAI',
    amount: 300,
    date: '2025-02-02',
  },
  {
    username: 'Bob',
    type: 'Stake',
    token: 'ETH',
    amount: 1.2,
    date: '2025-02-01',
  },
];

const transactionTypes = ['All', 'Stake', 'Borrow', 'Lend'];

export default function Page() {
  const [filter, setFilter] = useState('All');

  const filteredTransactions =
    filter === 'All'
      ? transactions
      : transactions.filter((t) => t.type === filter);

  return (
    <div className='max-w-7xl mx-auto px-4 py-6'>
      {/* Header */}
      <div className='text-center mb-8'>
        <h1 className='text-2xl font-bold'>History</h1>
        <p className='text-gray-500'>Recent Transactions</p>
      </div>

      <div className='max-w-4xl mx-auto p-4 text-gray-500'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>Recent Transactions</h2>
          <Menu as='div' className='relative inline-block text-left'>
            <div>
              <Menu.Button className='inline-flex justify-center w-36 px-4 py-2 text-sm font-medium bg-white border rounded-lg shadow-sm hover:bg-gray-100'>
                {filter} <ChevronDownIcon className='w-5 h-5 ml-2' />
              </Menu.Button>
            </div>
            <Menu.Items className='absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg'>
              {transactionTypes.map((type) => (
                <Menu.Item key={type}>
                  {({ active }) => (
                    <button
                      onClick={() => setFilter(type)}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block px-4 py-2 w-full text-left`}
                    >
                      {type}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        </div>
        <div className='overflow-x-auto border rounded-lg shadow-md'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='p-3 text-left'>Username</th>
                <th className='p-3 text-left'>Transaction Type</th>
                <th className='p-3 text-left'>Token</th>
                <th className='p-3 text-left'>Amount</th>
                <th className='p-3 text-left'>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <td className='p-3'>{tx.username}</td>
                  <td className='p-3'>{tx.type}</td>
                  <td className='p-3'>{tx.token}</td>
                  <td className='p-3'>{tx.amount}</td>
                  <td className='p-3'>{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
