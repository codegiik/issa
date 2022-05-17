import { AdminLayout } from 'layouts/Admin';

export default function AdminPanel({ session }) {
    return (
        <div className="h-full w-full flex items-center justify-center">
            <h3 className="font-serif font-bold text-4xl">🚧 In costruzione</h3>
        </div>
    );
}

AdminPanel.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
