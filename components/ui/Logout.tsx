export default function Logout() {
    return (
        <form action="/api/auth/logout" method="GET">
            <button className="px-8 py-4 rounded-lg bg-white font-bold transform hover:scale-105 duration-200"  >
                Logout
            </button>
        </form>
    );
}
