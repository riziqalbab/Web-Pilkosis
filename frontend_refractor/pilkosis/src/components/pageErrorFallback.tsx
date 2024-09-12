export default function PageErrorFallback() {
	return (
		<div className="h-screen flex flex-col items-center justify-center gap-4">
			<h1 className="text-accent-primary text-3xl text-center md:text-left">
				Terjadi Kesalahan Pada Website, silakan
				<button
					onClick={() => window.location.reload()}
					className="ml-4 p-4 rounded-xl bg-primary hover:bg-secondary cursor-pointer text-white text-xl transition-colors duration-300"
				>
					Muat Ulang
				</button>
				<p className="text-6xl text-accent-primary hidden md:block">:(</p>
			</h1>
		</div>
	);
}
