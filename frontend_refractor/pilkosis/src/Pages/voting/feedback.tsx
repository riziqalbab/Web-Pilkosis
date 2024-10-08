import { IFeedback } from "@components/icons";
import { Form, Link, useActionData } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CTitle from "@components/title";

export default function FeedbackVote() {
    const actionData = useActionData();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (actionData) {
            if (actionData instanceof Error) {
                toast.error(actionData.message, { containerId: 'feedback' });
            } else {
                toast.success("Umpan balik berhasil dikirim!", { containerId: 'feedback' })
            }
            setLoading(false);
        }
    }, [actionData]);

    return (
        <div className="flex justify-center pt-10">
            <div className="container">
                <CTitle text="Umpan Balik" logo={<IFeedback width="27" height="27" />} />
                
                <Link to='/' className="px-6 py-2 rounded-md hover:shadow-lg transition-shadow duration-300 border-2 border-thirdtiary">👈Kembali</Link>
                
                <div className="min-h-screen flex flex-col items-center mt-5">
                    <div className="bg-white p-8 rounded-lg shadow-lg max w-full">
                        <Form
                            action=""
                            method="post"
                            encType="multipart/form-data"
                            className="mt-6"
                        >
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="name"
                                >
                                    Nama
                                </label>
                                <input
                                    id="name"
                                    name="nama"
                                    type="text"
                                    placeholder="Nama Anda"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="kritik"
                                >
                                    Kritik
                                </label>
                                <textarea
                                    id="kritik"
                                    name="kritik"
                                    placeholder="Masukkan kritik Anda"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="saran"
                                >
                                    Saran
                                </label>
                                <textarea
                                    id="saran"
                                    name="saran"
                                    placeholder="Masukkan saran Anda"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={loading}
                                >
                                    {loading ? "Mengirim..." : "Kirim"}
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
                <ToastContainer
                    containerId='feedback'
                    key='feedback'
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
            </div>
        </div>
    );
}
