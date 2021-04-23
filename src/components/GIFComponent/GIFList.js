import { useState, useEffect } from 'react'
import axios from 'axios'

import * as ml5 from 'ml5'
import GIFItem from './GIFItem'

const BASE_URL = 'https://api.giphy.com/v1'

const corsImageProxy = 'https://cors-anywhere.herokuapp.com/'

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

let classifier = null

function GIFList() {
	const [gifs, setGifs] = useState([])

	useEffect(
		() => {
			const getRandomGIF = async () => {
				const randomTag = getRandomTag()
				console.log(randomTag)

				const res = await axios.get(
					`${BASE_URL}/gifs/random?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&rating=G&tag=${randomTag}`
				)

				console.log(res)
				const gifUrl = res.data.data.image_url
				console.log(gifUrl)
				// classifyImg(gifUrl)

				setGifs(prevgifs => prevgifs.concat(gifUrl))
			}

			function modelLoaded() {
				console.log('Model Loaded!')
				getRandomGIF()
			}

			// Put the image to classify inside a variable
			classifier = ml5.imageClassifier('MobileNet', modelLoaded)
		},

		// getRandomGIF()
		[]
	)

	return (
		<div>
			{gifs.length &&
				gifs.map((gif, i) => (
					<GIFItem
						gifUrl={gif}
						index={i}
						key={new Date().toISOString()}
						classifier={classifier}
					/>
				))}
		</div>
	)
}

export default GIFList
