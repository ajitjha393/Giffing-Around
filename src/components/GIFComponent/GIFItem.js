import { useEffect } from 'react'

function getLabels(classification) {
	return classification.reduce((tags, result) => {
		return tags.concat(result.label.split(', '))
	}, [])
}

function GIFItem({ gifUrl, index, classifier }) {
	useEffect(() => {
		console.log(classifier)
		if (classifier) {
			const imageElement = document.getElementById('gif-' + index)
			console.log(imageElement)
			imageElement.addEventListener('load', () => {
				console.log('Loaded')
				/*classifier.classify(imageElement, (err, results) => {
					const labels = getLabels(results)
					console.log(labels)
				})*/
			})
		}
	}, [classifier, index])

	return (
		<img
			id={'gif-' + index}
			src={gifUrl}
			alt="Funny Giffy kebab"
			crossOrigin="anonymous"
		/>
	)
}

export default GIFItem
