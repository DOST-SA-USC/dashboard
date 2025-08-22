// 'use client';

// import { Briefcase, CircleUser, Contact, Mail } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { ColumnDef, flexRender } from '@tanstack/react-table';

// const HeaderIcons = {
//   position: <Briefcase className="text-muted-foreground size-3.5" />,
//   name: <CircleUser className="text-muted-foreground size-3.5" />,
//   courseYear: <Contact className="text-muted-foreground size-3.5" />,
//   email: <Mail className="text-muted-foreground size-3.5" />,
// };

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   children: React.ReactNode;
// }

// export function DataTable<TData, TValue>({
//   columns,
//   children,
// }: DataTableProps<TData, TValue>) {
//   return (
//     <div className="overflow-hidden rounded-md border">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             {columns.map((col, index) => (
//               <TableHead key={index}>
//                 <div className="flex items-center gap-2">
//                   {HeaderIcons[col.id as keyof typeof HeaderIcons]}
//                   {flexRender(col.header, {})}
//                 </div>
//               </TableHead>
//             ))}
//           </TableRow>
//         </TableHeader>
//         <TableBody>{children}</TableBody>
//       </Table>
//     </div>
//   );
// }

// interface DataRowProps {
//   data: {
//     id: string;
//     name: string;
//     email: string;
//     position: string;
//     courseYear: string;
//     image?: string;
//   };
// }

// import { getUserInitials } from '@/lib/helpers';

// export function DataRow({ data }: DataRowProps) {
//   return (
//     <TableRow>
//       <TableCell>{data.position}</TableCell>
//       <TableCell className="flex items-center gap-2">
//         {data.image && (
//           <Image
//             src={data.image}
//             alt={getUserInitials(data.name)}
//             className="size-6 rounded-full"
//             width={128}
//             height={128}
//           />
//         )}
//         {data.name}
//       </TableCell>
//       <TableCell>{data.courseYear}</TableCell>
//       <TableCell>
//         <Link
//           href={`mailto:${data.email}`}
//           className="text-secondary underline"
//         >
//           {data.email}
//         </Link>
//       </TableCell>
//     </TableRow>
//   );
// }
