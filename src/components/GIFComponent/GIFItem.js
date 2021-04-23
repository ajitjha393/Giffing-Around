import { useEffect } from 'react'

function GIFItem({ gifUrl, index, classifier }) {
	useEffect(() => {
		if (!classifier) {
			const ImageElement = document.getElementById('gif-' + index)
			ImageElement.addEventListener('load', () => {
				classifier.classify(imageElement, (err, results) => {
					const labels = getLabels(results)
					console.log(labels)
				})
			})
		}
	}, [classifier])

	return <img id={'gif-' + index} src={gifUrl} alt="Funny Giffy kebab" />
}

export default GIFItem
