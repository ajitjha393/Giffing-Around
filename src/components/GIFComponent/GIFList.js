import { useState, useEffect } from 'react'
import axios from 'axios'

import * as ml5 from 'ml5'
import GIFItem from './GIFItem'

const BASE_URL = 'https://api.giphy.com/v1'

const tags = [
	'cola',
	'kebab',
	'dog',
	'happy',
	'meme',
	'cat',
	'cricket',
	'dance',
	'wasps',
]

/** AI Reecognition of Gif */
function modelLoaded() {
	console.log('Model Loaded!')
}

// Initialize the Image Classifier method with MobileNet
const classifier = ml5.imageClassifier('MobileNet', modelLoaded)

function getRandomTag() {
	const randomIndex = Math.floor(Math.random() * tags.length)
	return tags[randomIndex]
}

function GIFList() {
	const [gifs, setGifs] = useState([])

	useEffect(() => {
		const classifyImg = gifUrl => {
			const classifier = ml5.imageClassifier('MobileNet', modelLoaded)
			function modelLoaded() {
				console.log('Model Loaded!')
			}
			// Put the image to classify inside a variable

			const gifImage = <video src={gifUrl} loop muted autoPlay />
			// Make a prediction with a selected image
			classifier.predict(gifImage, function (err, results) {
				// print the result in the console
				console.log(results)
			})
		}
		const getRandomGIF = async () => {
			const randomTag = getRandomTag()
			console.log(randomTag)

			const res = await axios.get(
				`${BASE_URL}/gifs/random?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&rating=G&tag=${randomTag}`
			)

			console.log(res)
			const gifUrl = res.data.data.image_mp4_url
			console.log(gifUrl)
			// classifyImg(gifUrl)

			setGifs(prevgifs => prevgifs.concat(gifUrl))
		}
		getRandomGIF()
	}, [])

	return (
		<div>
			{gifs.length && gifs.map((gif, i) => <GIFItem gifUrl={gif} index={i} key={new Date().toISOString()} />)}
		</div>
	)
}

export default GIFList
