import { AdminLayout } from 'layouts/Admin';

export default function AdminPanel({ session }) {
    return <div>Things</div>;
}

AdminPanel.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
