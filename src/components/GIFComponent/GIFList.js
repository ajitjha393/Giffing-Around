import { useEffect } from 'react'
import axios from 'axios'

const BASE_URL = 'https://api.giphy.com/v1'

function GIFList() {
	useEffect(() => {
		const getRandomGIF = async () => {
			const res = await axios.get(
				`${BASE_URL}/gifs/random?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&rating=G`
			)
			console.log(res)
		}
		getRandomGIF()
	})

	return <div></div>
}

export default GIFList
