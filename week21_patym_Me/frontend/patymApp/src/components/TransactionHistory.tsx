import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from './Button'

export default function TransactionHistory() {


    const location = useLocation()
    //   console.log(location.state.history[0])
    const nevigator = useNavigate()


    return (
        <div>
            <div className="flex max-w-screen-xl justify-between ">
                <div className="font-bold mt-6 text-lg   ">
                    History
                </div>
                <div className="font-bold mt-6 flex    text-lg">
                    <Button label={"Home"} onClick={() => { nevigator('/') }} />
                </div>

            </div>




            <div className="flex justify-between">
                <div className="flex flex-col justify-center h-full w-full p-4">
                    <table className="table-auto border-collapse border border-gray-400 w-full text-center">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-400 px-4 py-2">ID</th>
                                <th className="border border-gray-400 px-4 py-2">Amount (₹)</th>
                                <th className="border border-gray-400 px-4 py-2">Type</th>
                                <th className="border border-gray-400 px-4 py-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {location.state?.history?.length > 0 ? (
                                location.state.history.map((transaction: any) => (
                                    <tr key={transaction.id}>
                                        <td className="border border-gray-400 px-4 py-2">{transaction.id}</td>
                                        <td className="border border-gray-400 px-4 py-2">
                                            ₹{transaction.amount}
                                        </td>
                                        <td
                                            className={`border border-gray-400 px-4 py-2 font-semibold ${transaction.type === "CREDIT"
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                                }`}
                                        >
                                            {transaction.type}
                                        </td>
                                        <td className="border border-gray-400 px-4 py-2">
                                            {new Date(transaction.date).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="border border-gray-400 py-4 text-gray-500">
                                        No transactions found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>


    )
}
