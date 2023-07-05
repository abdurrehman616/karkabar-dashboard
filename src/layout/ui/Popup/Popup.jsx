import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { API } from '../../api.js';
import { MAKE_MANY_QUERY } from "../../../components/Make/queries.js";

export const Popup = ({
                          onSelectItem,
                          onClose,
                          query,
                          filteringProperty,
                          queryName
                      }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [page, setPage] = useState(1);
    
    const fetchData = async (page = 1) => {
        try {
            const response = await API.post('', {
                query,
                variables: {
                    page: page
                },
            });
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    };
    
    const { data, isLoading, error } = useQuery(
        [queryName, page],
        () => fetchData(page),
        { keepPreviousData: true, refetchOnWindowFocus: false }
    );
    
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    
    const handleSelectItem = (item) => {
        setSelectedItem(item);
        onSelectItem(item.id);
        onClose();
    };
    
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    
    const filteredItems = useMemo(() => {
        if (!data || !data[queryName] || !data[queryName].data) {
            return [];
        }
        return data[queryName].data.filter((item) =>
            item[filteringProperty].toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm, filteringProperty, queryName]);
    
    return (
        <div className="popup fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none"
                    />
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none"
                    >
                        Close
                    </button>
                </div>
                {filteredItems.length > 0 ? (
                    <div className="space-y-2">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => handleSelectItem(item)}
                                className={`p-2 border border-gray-300 rounded-lg cursor-pointer ${
                                    selectedItem && selectedItem.id === item.id
                                        ? 'bg-gray-100'
                                        : 'hover:bg-gray-100'
                                }`}
                            >
                                {item[filteringProperty]}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No items found.</div>
                )}
                {data && data[queryName]?.pageInfo && (
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => handlePageChange(data[queryName].pageInfo.previous.page)}
                            disabled={!data[queryName].pageInfo.previous}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(data[queryName].pageInfo.next.page)}
                            disabled={!data[queryName].pageInfo.next}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
