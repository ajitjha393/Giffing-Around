import { useEffect } from 'react'
import axios from 'axios'

const GIPHY_URL = `https://api.giphy.com/v1/randomid?api_key=&${process.env.REACT_APP_GIPHY_API_KEY}rating=G`

function GIFList() {
	useEffect(() => {
		const getRandomGIF = async () => {
			const res = await axios.get(GIPHY_URL)
			console.log(res)
		}
		getRandomGIF()
	})

	return <div></div>
}

export default GIFList
