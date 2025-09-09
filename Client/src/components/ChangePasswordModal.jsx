import { useState } from "react";
import { toast } from "react-toastify";

export default function ChangePasswordModal({ isOpen, onClose, onSubmit }) {
    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newPassword.trim()) {
            toast.error("Password cannot be empty");
            return;
        }
        onSubmit(newPassword);
        setNewPassword(""); 
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
            <div className="bg-[#f1f0e9] rounded-sm shadow-lg w-96 p-6 border">
                <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-green-800 hover:bg-gray-100 rounded-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-800 text-white rounded-sm hover:bg-green-900"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
