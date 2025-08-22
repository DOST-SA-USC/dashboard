import React from 'react';

const Page = () => {
  return <div>Soon</div>;
};

export default Page;

// import { columns, Payment } from './column';
// import { DataRow, DataTable } from './data-table';

// async function getData(): Promise<Payment[]> {
//   return [
//     {
//       id: '1',
//       name: 'Geri Gian Epanto',
//       courseYear: 'BS Computer Science - 2',
//       image:
//         'https://cnfbjdozpfkqlxtqoudy.supabase.co/storage/v1/object/public/users/emman',
//       position: 'President',
//       email: '24100907@usc.edu.ph',
//     },
//     {
//       id: '2',
//       name: 'Geri Gian Epanto',
//       courseYear: 'BS Computer Science - 2',
//       image:
//         'https://cnfbjdozpfkqlxtqoudy.supabase.co/storage/v1/object/public/users/emman',
//       position: 'Vice President Internal',
//       email: '24100907@usc.edu.ph',
//     },
//     {
//       id: '3',
//       name: 'Geri Gian Epanto',
//       courseYear: 'BS Computer Science - 2',
//       image:
//         'https://cnfbjdozpfkqlxtqoudy.supabase.co/storage/v1/object/public/users/emman',
//       position: 'Associate VP Internal',
//       email: '24100907@usc.edu.ph',
//     },
//     {
//       id: '4',
//       name: 'Geri Gian Epanto',
//       courseYear: 'BS Computer Science - 2',
//       image:
//         'https://cnfbjdozpfkqlxtqoudy.supabase.co/storage/v1/object/public/users/emman',
//       position: 'Secretariat Department Member',
//       email: '24100907@usc.edu.ph',
//     },
//     {
//       id: '5',
//       name: 'Geri Gian Epanto',
//       courseYear: 'BS Computer Science - 2',
//       image:
//         'https://cnfbjdozpfkqlxtqoudy.supabase.co/storage/v1/object/public/users/emman',
//       position: 'Secretariat Department Member',
//       email: '24100907@usc.edu.ph',
//     },
//     {
//       id: '6',
//       name: 'Geri Gian Epanto',
//       courseYear: 'BS Computer Science - 2',
//       image:
//         'https://cnfbjdozpfkqlxtqoudy.supabase.co/storage/v1/object/public/users/emman',
//       position: 'Secretariat Department Member',
//       email: '24100907@usc.edu.ph',
//     },
//     {
//       id: '7',
//       name: 'Geri Gian Epanto',
//       courseYear: 'BS Computer Science - 2',
//       image:
//         'https://cnfbjdozpfkqlxtqoudy.supabase.co/storage/v1/object/public/users/emman',
//       position: 'Programs Department Member',
//       email: '24100907@usc.edu.ph',
//     },
//     {
//       id: '8',
//       name: 'Geri Gian Epanto',
//       courseYear: 'BS Computer Science - 2',
//       image:
//         'https://cnfbjdozpfkqlxtqoudy.supabase.co/storage/v1/object/public/users/emman',
//       position: 'Programs Department Member',
//       email: '24100907@usc.edu.ph',
//     },
//     {
//       id: '9',
//       name: 'Geri Gian Epanto',
//       courseYear: 'BS Computer Science - 2',
//       image:
//         'https://cnfbjdozpfkqlxtqoudy.supabase.co/storage/v1/object/public/users/emman',
//       position: 'Programs Department Member',
//       email: '24100907@usc.edu.ph',
//     },
//     {
//       id: '10',
//       name: 'Geri Gian Epanto',
//       courseYear: 'BS Computer Science - 2',
//       image:
//         'https://cnfbjdozpfkqlxtqoudy.supabase.co/storage/v1/object/public/users/emman',
//       position: 'Batch Minister - 1st Year',
//       email: '24100907@usc.edu.ph',
//     },
//     {
//       id: '11',
//       name: 'Geri Gian Epanto',
//       courseYear: 'BS Computer Science - 2',
//       image:
//         'https://cnfbjdozpfkqlxtqoudy.supabase.co/storage/v1/object/public/users/emman',
//       position: 'Batch Minister - 2nd Year',
//       email: '24100907@usc.edu.ph',
//     },
//     {
//       id: '12',
//       name: 'Geri Gian Epanto',
//       courseYear: 'BS Computer Science - 2',
//       image:
//         'https://cnfbjdozpfkqlxtqoudy.supabase.co/storage/v1/object/public/users/emman',
//       position: 'Batch Minister - 3rd Year',
//       email: '24100907@usc.edu.ph',
//     },
//     {
//       id: '13',
//       name: 'Geri Gian Epanto',
//       courseYear: 'BS Computer Science - 2',
//       image:
//         'https://cnfbjdozpfkqlxtqoudy.supabase.co/storage/v1/object/public/users/emman',
//       position: 'Batch Minister - 4th Year',
//       email: '24100907@usc.edu.ph',
//     },
//     {
//       id: '14',
//       name: 'Geri Gian Epanto',
//       courseYear: 'BS Computer Science - 2',
//       image:
//         'https://cnfbjdozpfkqlxtqoudy.supabase.co/storage/v1/object/public/users/emman',
//       position: 'School Representative - SAS',
//       email: '24100907@usc.edu.ph',
//     },
//     {
//       id: '15',
//       name: 'Geri Gian Epanto',
//       courseYear: 'BS Computer Science - 2',
//       image:
//         'https://cnfbjdozpfkqlxtqoudy.supabase.co/storage/v1/object/public/users/emman',
//       position: 'School Representative - SHCP',
//       email: '24100907@usc.edu.ph',
//     },
//     {
//       id: '16',
//       name: 'Geri Gian Epanto',
//       courseYear: 'BS Computer Science - 2',
//       image:
//         'https://cnfbjdozpfkqlxtqoudy.supabase.co/storage/v1/object/public/users/emman',
//       position: 'School Representative - SOE',
//       email: '24100907@usc.edu.ph',
//     },
//   ];
// }

// import POSITIONS_DATA from '@/data/positions.json';

// export default async function Page() {
//   const data = await getData();

//   return (
//     <div className="container mx-auto">
//       <h1 className="mb-2 text-lg font-bold sm:text-xl md:text-2xl">
//         DOST SA USC Officers
//       </h1>
//       <p className="text-muted-foreground text-xs md:text-sm">
//         This is a directory that contains the list of DOST SA USC officers,
//         their positions, and contact information.
//       </p>
//       <hr className="my-4" />
//       <div className="space-y-8">
//         <DataTable columns={columns}>
//           <DataRow data={data.filter((d) => d.position === 'President')[0]} />
//         </DataTable>

//         <DataTable columns={columns}>
//           <DataRow
//             data={
//               data.filter(
//                 (d) => d.position === POSITIONS_DATA.OFFICE_VP_INTERNAL.head
//               )[0]
//             }
//           />
//           <DataRow
//             data={
//               data.filter(
//                 (d) =>
//                   d.position === POSITIONS_DATA.OFFICE_VP_INTERNAL.associate
//               )[0]
//             }
//           />
//           {data
//             .filter(
//               (d) =>
//                 d.position ===
//                 POSITIONS_DATA.OFFICE_VP_INTERNAL.secretariat_department_members
//             )
//             .map((d, i) => (
//               <DataRow
//                 key={d.id}
//                 data={{
//                   ...d,
//                   position: i === 0 ? d.position : '',
//                 }}
//               />
//             ))}
//           {data
//             .filter(
//               (d) =>
//                 d.position ===
//                 POSITIONS_DATA.OFFICE_VP_INTERNAL.programs_department_members
//             )
//             .map((d, i) => (
//               <DataRow
//                 key={d.id}
//                 data={{
//                   ...d,
//                   position: i === 0 ? d.position : '',
//                 }}
//               />
//             ))}
//           {data
//             .filter((d) =>
//               d.position.includes(
//                 POSITIONS_DATA.OFFICE_VP_INTERNAL.batch_minister
//               )
//             )
//             .map((d) => (
//               <DataRow key={d.id} data={d} />
//             ))}
//         </DataTable>
//       </div>
//     </div>
//   );
// }
