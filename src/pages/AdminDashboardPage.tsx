import { useGetRestaurantManagers, useUpdateApplicationStatus } from "@/api/adminApi";
import type { User } from "@/types";

const AdminDashboardPage = () => {
  const { managers, isLoading } = useGetRestaurantManagers();
  const { updateStatus, isLoading: isUpdating } = useUpdateApplicationStatus();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!managers) {
    return <span>No managers found</span>;
  }

  const handleStatusUpdate = async (userId: string, status: "approved" | "rejected") => {
      await updateStatus({ userId, status });
      window.location.reload(); // Simple reload to refresh list for now
  };

  return (
    <div className="space-y-10 bg-gray-50 min-h-screen p-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Restaurant Manager Applications</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {managers.map((manager: User) => (
                <tr key={manager._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{manager.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{manager.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      manager.applicationStatus === 'approved' ? 'bg-green-100 text-green-800' : 
                      manager.applicationStatus === 'rejected' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {manager.applicationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {manager.applicationStatus === 'pending' && (
                        <>
                            <button 
                                onClick={() => handleStatusUpdate(manager._id, 'approved')}
                                disabled={isUpdating}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-xs disabled:opacity-50">
                                Approve
                            </button>
                            <button 
                                onClick={() => handleStatusUpdate(manager._id, 'rejected')}
                                disabled={isUpdating}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs disabled:opacity-50">
                                Reject
                            </button>
                        </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
