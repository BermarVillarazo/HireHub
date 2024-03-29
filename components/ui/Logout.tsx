export default function Logout() {
    return (
        <form action="/api/auth/logout" method="GET">
            <button>Logout</button>
        </form>
    );
}
