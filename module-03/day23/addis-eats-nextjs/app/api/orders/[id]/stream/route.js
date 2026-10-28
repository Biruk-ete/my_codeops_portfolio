export async function GET(request, { params }) {
    const stream = new ReadableStream({
        async start(controller) {
            const send = (data) => {
                // STRICT FORMAT: "data: " + payload + "\n\n"
                controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
            };

            // 1. Seed initial data
            send({ status: "Preparing", timestamp: new Date().toISOString() });

            // 2. Simulate live updates (e.g., courier moving)
            let step = 0;
            const interval = setInterval(() => {
                step++;
                if (step === 1) send({ status: "Out for Delivery", timestamp: new Date().toISOString() });
                if (step === 2) send({ status: "Nearby", timestamp: new Date().toISOString() });
                if (step === 3) {
                    send({ status: "Delivered", timestamp: new Date().toISOString() });
                    clearInterval(interval);
                    controller.close(); // Deliberately close on delivery
                }
            }, 5000); // Updates every 5 seconds

            // Cleanup if client disconnects
            request.signal.addEventListener("abort", () => {
                clearInterval(interval);
                controller.close();
            });
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    });
}