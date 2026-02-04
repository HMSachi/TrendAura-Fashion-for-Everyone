export const metadata = {
    title: "Admin Dashboard | TrendAura",
    description: "Management portal for TrendAura",
};

export default function AdminLayout({ children }) {
    return (
        <div className="admin-root">
            {children}
        </div>
    );
}
