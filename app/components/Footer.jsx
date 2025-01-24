import Image from "next/image";

export default function Footer({ opacity }) {
	return (
		<footer className="mt-5 w-full flex items-center justify-center">
			<div
				className={`flex items-center justify-center gap-1 opacity-${opacity}`}
			>
				<span className="font-bold text-grey">Desenvolvido pela</span>
				<img
					className="w-[92]"
					src="/seubone-full-logo.svg"
					alt="Logo da Seu Boné"
					
					
					
				/>
			</div>
		</footer>
	);
}
