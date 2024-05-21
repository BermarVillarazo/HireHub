export default function Loading() {
    const loadingDivs = new Array(6).fill(0);

    return (
        <>
            {loadingDivs.map((_, index) => (
                <div
                    key={index}
                    className="animate-pulse w-11/12 h-12 mx-auto my-5 rounded-xl bg-gray-400/50"
                ></div>
            ))}
        </>
    );
}
