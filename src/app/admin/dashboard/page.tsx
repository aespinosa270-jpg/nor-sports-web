import { supabaseAdmin } from '@/lib/db';

import Link from 'next/link';
import { FiPrinter, FiPackage, FiActivity, FiExternalLink, FiAlertCircle } from 'react-icons/fi';

export const dynamic = 'force-dynamic';

export default async function LogisticsCommandCenter() {
    const { data: labels, error } = await supabaseAdmin
        .from('shipping_labels')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

    if (error) {
        return (
            <div className="min-h-screen bg-nor-black text-nor-accent flex items-center justify-center font-mono">
                <FiAlertCircle className="mr-2" /> CRITICAL SYSTEM FAILURE: {error.message}
            </div>
        );
    }

    const totalLabels = labels?.length || 0;
    const totalSpent = labels?.reduce((acc, curr) => acc + Number(curr.cost_provider || 0), 0).toFixed(2);
    const totalRevenue = labels?.reduce((acc, curr) => acc + Number(curr.price_charged || 0), 0).toFixed(2);

    return (
        <main className="min-h-screen bg-nor-black text-nor-white p-6 font-mono pt-24">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-nor-white/20 pb-6">
                <div>
                    <h1 className="font-syncopate text-3xl md:text-5xl font-bold tracking-tighter mb-2">
                        COMMAND CENTER
                    </h1>
                    <div className="flex items-center gap-2 text-nor-white/60 text-xs">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span>SYSTEM ONLINE</span>
                        <span className="px-2">|</span>
                        <span>LOGISTICS MODULE V1.0</span>
                    </div>
                </div>

                <div className="mt-4 md:mt-0 text-right">
                    <div className="text-xs text-nor-white/40 mb-1">CURRENT OPERATOR</div>
                    <div className="text-sm font-bold">ADMIN_KEY_01</div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                <div className="bg-nor-white/5 border border-nor-white/10 p-4 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                        <FiPackage size={40} />
                    </div>
                    <div className="text-xs text-nor-white/50 mb-2">TOTAL SHIPMENTS</div>
                    <div className="text-3xl font-syncopate font-bold">{totalLabels}</div>
                    <div className="text-[10px] text-green-400 mt-2">▲ ACTIVE</div>
                </div>

                <div className="bg-nor-white/5 border border-nor-white/10 p-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <FiActivity size={40} />
                    </div>
                    <div className="text-xs text-nor-white/50 mb-2">TOTAL SPENT (COST)</div>
                    <div className="text-3xl font-syncopate font-bold">${totalSpent}</div>
                    <div className="text-[10px] text-nor-white/40 mt-2">MXN CURRENCY</div>
                </div>

                <div className="bg-nor-white/5 border border-nor-white/10 p-4 relative overflow-hidden">
                    <div className="text-xs text-nor-white/50 mb-2">TOTAL REVENUE</div>
                    <div className="text-3xl font-syncopate font-bold text-green-400">${totalRevenue}</div>
                    <div className="text-[10px] text-nor-white/40 mt-2">GROSS INCOME</div>
                </div>
            </div>

            <div className="w-full overflow-x-auto border border-nor-white/10">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-nor-white/10 text-nor-white/60 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="p-4">Timestamp</th>
                            <th className="p-4">Tracking ID</th>
                            <th className="p-4">Service</th>
                            <th className="p-4">Route (CP)</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-nor-white/5">
                        {labels?.map((label) => (
                            <tr key={label.id} className="hover:bg-nor-white/5 transition-colors">
                                <td className="p-4 font-mono text-nor-white/50 text-xs">
                                    {new Date(label.created_at).toLocaleString('es-MX', {
                                        month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
                                    })}
                                </td>
                                <td className="p-4 font-bold text-nor-accent">
                                    {label.tracking_number}
                                </td>
                                <td className="p-4 text-xs">
                                    {label.service_type || "STANDARD"}
                                </td>
                                <td className="p-4 text-xs text-nor-white/60">
                                    {label.origin_zip} <span className="text-nor-accent">→</span> {label.dest_zip}
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                        {label.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="p-4 text-right flex justify-end gap-3">
                                    <a
                                        href={label.pdf_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-nor-white text-nor-black hover:bg-nor-accent transition-colors"
                                        title="Print Label"
                                    >
                                        <FiPrinter />
                                    </a>
                                    <Link
                                        href={`/tracking?id=${label.tracking_number}`}
                                        className="p-2 border border-nor-white/20 hover:border-nor-white hover:bg-nor-white/10 transition-all"
                                        title="Track Package"
                                    >
                                        <FiExternalLink />
                                    </Link>
                                </td>
                            </tr>
                        ))}

                        {labels?.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-nor-white/30 italic">
                                    NO DATA FOUND // WAITING FOR OPERATIONS
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
}