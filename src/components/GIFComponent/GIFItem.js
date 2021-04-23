function GIFItem({ gifUrl, index }) {
	return <img id={'gif-' + index} src={gifUrl} alt="Funny Giffy kebab" />
}

export default GIFItem
