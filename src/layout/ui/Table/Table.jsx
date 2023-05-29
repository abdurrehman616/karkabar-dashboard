import { DEFAULT_PAGE_SIZE, MutationFn } from "../../api.js";
import { useMutation } from "react-query";
import { SHOP_DELETE_MUTATION } from "../../../components/Shop/queries.js";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const Table = ({ data, page, refetch, updateRoute, deleteMutation }) => {
    const startId = (page - 1) * DEFAULT_PAGE_SIZE + 1;

    const filteredData = data;

    const mutation = useMutation(MutationFn({ query: deleteMutation }));

    // Update Shop
    const navigate = useNavigate();

    const handleUpdateShop = (id) => {
        navigate(`${updateRoute}?id=${id}`);
    };

    // Delete Shop
    const handleDelete = (id) => {
        mutation.mutate(
            { id: id },
            {
                onSuccess: () => {
                    toast.error(
                        "Deleted successfully."
                    );
                    refetch();
                },
                onSettled: () => {
                    console.log('Mutation Settled.');
                },
            }
        );
    };

    return (
        <div className="overflow-x-auto relative shadow-md w-full rounded">
            {data && Array.isArray(data) && data.length > 0 ? (
                <table className="w-full text-sm text-left text-white overflow-y-auto">
                    <thead className="text-xs text-white uppercase bg-primary">
                    <tr>
                        <th scope="col" className="py-3 px-6 text-white">
                            #
                        </th>
                        {Object.keys(data[0])
                            .filter((key) => key !== "id" && key !== "status")
                            .map((key, i) => (
                                <th key={i} scope="col" className="py-3 px-6 text-white">
                                    {key.replace("_", " ")}
                                </th>
                            ))}
                        <th scope="col" className="py-3 px-6">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((row, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-white">
                            <td className="py-4 px-6 text-xs text-gray-600 whitespace-nowrap">
                                {index + startId}
                            </td>
                            {Object.values(row)
                                .slice(1, 3)
                                .map((cell, i) => (
                                    <td
                                        key={i}
                                        className="py-4 px-6 text-gray-900 whitespace-nowrap"
                                    >
                                        {cell}
                                    </td>
                                ))}
                            <td className="py-4 px-6 flex gap-5 justify-end">
                                {/* Update Button */}
                                <button
                                    className="font-medium hover:underline"
                                    onClick={() => handleUpdateShop(row.id)}
                                >
                                    <i className="fa-solid fa-pen-to-square text-blue-600" />
                                </button>
                                {/* Update Button End */}
                                <button
                                    className="font-medium hover:underline"
                                    onClick={() => handleDelete(row.id)}
                                >
                                    <i className="fa-solid fa-trash text-red-600" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available.</p>
            )}
        </div>
    );
};
