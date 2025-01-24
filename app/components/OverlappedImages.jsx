export default function OverlappedImages({ images, selected }) {	
	return (
		<>
		{images.length > 0 && images
		.filter(image => selected.includes(image.id))
		.sort((a, b) => a.ordem - b.ordem)
		.map((image, index) => (
			<div
				key={index}
				className={`z-${image.ordem} relative`}
			>
				<img draggable="false"
				className="absolute border border-grey rounded-[20] p-2"
					src={image.url}
				/>
			</div>
		))}
		</>
	)
}
