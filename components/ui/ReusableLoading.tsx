export default function ReusableLoading() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-24 p-24 bg-red-900">
            <div className="flex justify-center p-12 bg-white rounded-lg">
                <svg className="animate-spin h-5 w-5 mr-3 bg-red-900" viewBox="0 0 24 24"></svg>
                Processing...
            </div>
        </div>
    );
}
