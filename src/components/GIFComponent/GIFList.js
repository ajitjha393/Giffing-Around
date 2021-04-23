import { useState, useEffect } from 'react'
import axios from 'axios'

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

function getRandomTag() {
	const randomIndex = Math.floor(Math.random() * tags.length)
	return tags[randomIndex]
}

function GIFList() {
	const [gifs, setGifs] = useState([])

	useEffect(() => {
		const getRandomGIF = async () => {
			const randomTag = getRandomTag()
			console.log(randomTag)

			const res = await axios.get(
				`${BASE_URL}/gifs/random?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&rating=G&tag=${randomTag}`
			)

			console.log(res)
			const gifUrl = res.data.data.image_url
			console.log(gifUrl)
			setGifs(prevgifs => prevgifs.concat(gifUrl))
		}
		getRandomGIF()
	}, [])

	return <div>{gifs.length && gifs.map(gif => <GIFItem gifUrl={gif} />)}</div>
}

export default GIFList
