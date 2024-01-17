import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "../components/utility/table"

type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

const generatePayments = (): Payment[] => {
    const payments: Payment[] = [];

    for (let i = 1; i <= 50; i++) {
        const payment: Payment = {
            id: `payment_${i}`,
            amount: Math.floor(Math.random() * 1000), // Random amount for demonstration
            status: i % 2 === 0 ? "success" : "failed", // Alternate success and failed statuses
            email: `user${i}@example.com`,
        };

        payments.push(payment);
    }

    return payments;
};

const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
]


async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return generatePayments();
}

export default async function NodeRedTable() {
    const data = await getData()

    return (
        <div className="container py-10 mx-auto">
            <DataTable columns={columns} data={data} />
        </div>
    )
}