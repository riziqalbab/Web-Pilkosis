import CButton from "@components/button";
import { IAdd } from "@components/icons";
import CInput from "@components/input";
import CImageInput from "@components/inputImage";
import CTitle from "@components/title";
import { Editor } from "@tinymce/tinymce-react";
import authorizer from "@utils/authorizer";
import cache from "@utils/cache";
import tryRequest from "@utils/tryRequest";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import '@toastifyCss'
import { Bounce, toast, ToastContainer } from "react-toastify";

const tinyMceApiKey = import.meta.env.VITE_TINYMCE_API_KEY;

const TextEditor = ({ initValue = '', getValue }: { initValue?: string, getValue?: (value: string) => void }) => {
   return (
		<Editor
			apiKey={tinyMceApiKey}
			init={{
				plugins: [
					// Core editing features
					"anchor",
					"autolink",
					"charmap",
					"codesample",
					"emoticons",
					"image",
					"link",
					"lists",
					"media",
					"searchreplace",
					"table",
					"visualblocks",
					"wordcount",
               "inlinecss"
					// Your account includes a free trial of TinyMCE premium features
					// Try the most popular premium features until Sep 26, 2024:
				],
				toolbar:
					"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
				tinycomments_mode: "embedded",
				tinycomments_author: "Author name",
				mergetags_list: [
					{ value: "First.Name", title: "First Name" },
					{ value: "Email", title: "Email" },
				],
			}}
         onChange={(e) => getValue && getValue(e.target.getContent())}
			initialValue={initValue}
		/>
	);
};

export default function AddPaslon() {
	const navigate = useNavigate();

	const [image, setImage] = useState<Blob | null>(null);
	const [nomorUrut, setNomorUrut] = useState<string | null>(null);
	const [nama, setNama] = useState<string | null>(null);
	const [kelas, setKelas] = useState<string | null>(null);
	const [motto, setMotto] = useState<string | null>(null);
	const [ttl, setTtl] = useState<string | null>(null);
	const [alamat, setAlamat] = useState<string | null>(null);
	const [misi, setMisi] = useState<string | null>(null)
	const [visi, setVisi] = useState<string | null>(null)
	const [programKerja, setProgramKerja] = useState<string | null>(null)
	const [calonJabatan, setCalonJabatan] = useState<string | null>(null);

	const [submitLoading, setSubmitLoading] = useState<boolean>(false);

	const handdleSubmit = () => {
		if (
			!image ||
			!nomorUrut ||
			!nama ||
			!kelas ||
			!motto ||
			!ttl ||
         !misi ||
         !visi ||
         !programKerja ||
			!alamat ||
			!calonJabatan
		) {
			toast.info("semua field harus diisi", { containerId: 'addpaslon' });
			return;
		}

		setSubmitLoading(true);
		tryRequest({
			apiEndPoint: `/api/calon`,
			axiosOptions: {
				method: "POST",
				data: {
					nomor_urut: nomorUrut,
					nama: nama,
					kelas: kelas,
					motto: motto,
					img: image,
					ttl: ttl,
					alamat: alamat,
					misi: misi,
					visi: visi,
					program_kerja: programKerja,
					calon_jabatan: calonJabatan,
				},
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${cache.get("accessToken")}`,
				},
			},
			tryAgainCallback: async (_, tryAgain) => {
				cache.delete("accessToken");
				if (Array.isArray(await authorizer("admin")))
					//? if the authorizer is successfull the return value will be an array
					return tryAgain();
				return navigate("/");
			},
			onSucceed: () => {
				setSubmitLoading(false);
				toast.success("Calon berhasil ditambahkan", { containerId: 'addpaslon' });
			},
			onFailed: (err) => {
				setSubmitLoading(false);
				toast.error(`Gagal menambahkan calon, ${err.message}`, { containerId: 'addpaslon' });
			},
		});
	};

	return (
		<>
			<CTitle text="Tambah Calon" logo={<IAdd width="30" height="30" />} />
			<div className="flex flex-col items-stretch">
				<CImageInput
					name="img"
					getImage={(img) => setImage(img)}
					className="w-72 h-72 rounded-lg shadow-lg border border-primary self-center mb-8"
				/>
				<div className="flex gap-4">
					<CInput
						onChange={(ev) => setNomorUrut(ev.target.value)}
						className="w-full"
						placeholder="nomor urut"
						type="number"
						name="nomor_urut"
					/>
					<CInput
						onChange={(ev) => setNama(ev.target.value)}
						className="w-full"
						placeholder="nama"
						type="text"
						name="nama"
					/>
				</div>
				<CInput
					onChange={(ev) => setKelas(ev.target.value)}
					className="w-full"
					placeholder="kelas"
					type="text"
					name="kelas"
				/>
				<CInput
					onChange={(ev) => setMotto(ev.target.value)}
					className="w-full"
					placeholder="motto"
					type="text"
					name="motto"
				/>
				<CInput
					onChange={(ev) => setTtl(ev.target.value)}
					className="w-full"
					placeholder="tempat, tanggal lahir"
					type="text"
					name="ttl"
				/>
				<CInput
					onChange={(ev) => setAlamat(ev.target.value)}
					className="w-full"
					placeholder="alamat"
					type="text"
					name="alamat"
				/>
				<div className="mt-8">
					<p className="font-semibold mb-2 text-lg">Visi</p>
               <TextEditor getValue={val => setVisi(val)} />
				</div>
				<div className="mt-8">
					<p className="font-semibold mb-2 text-lg">Misi</p>
               <TextEditor getValue={val => setMisi(val)} />
				</div>
				<div className="mt-8">
					<p className="font-semibold mb-2 text-lg">Program Kerja</p>
               <TextEditor getValue={val => setProgramKerja(val)} />
				</div>
				<div className="mt-8">
					<p className="font-semibold mb-2 text-lg">Calon Jabatan</p>
					<select
						onChange={(ev) => setCalonJabatan(ev.target.value)}
						defaultValue={0}
						name="calon_jabatan"
						className="w-full border border-primary px-4 py-2 rounded-full"
					>
						<option value="">-- pilih jabatan --</option>
						<option value="caksis">caksis</option>
						<option value="cawaksis">cawaksis</option>
					</select>
				</div>
				<CButton
					className="self-end mt-8"
					onClick={handdleSubmit}
					isLoading={submitLoading}
				>
					Tambah
				</CButton>
			</div>

         <ToastContainer
            containerId='addpaslon'
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover
				theme="light"
				transition={Bounce}
			/>
		</>
	);
}
