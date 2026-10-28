export default function Loading() {
    return (
        <div className="w-full max-w-4xl mx-auto p-8">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="border rounded-lg">
                {/* 5 Skeleton rows */}
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex gap-4 p-4 border-b">
                        <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse ml-auto"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}